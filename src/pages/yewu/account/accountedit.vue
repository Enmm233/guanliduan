<template>
	<article class="main">
		<article class="adminis_ti">
			<section class="adminis_til">
				<a href="javascript:history.back(-1)">
					<i class="fa fa-angle-left"></i>
				</a>
			</section>
			<section class="adminis_tio">保存用户信息</section>
			<section class="adminis_tir">
				<a href="javascript:void(0);" @click.navicon="adminispu_gys">保存</a>
			</section>
		</article>
		<section class="adminis_tih"></section>
		<section class="adminiswj"></section>

		<article class="adminisad_list">
			<ol>
				<li>
					<div class="list_title">单位名称</div>
					<input type="text" name="nickname" placeholder="请输入单位名称" v-model="inputtext.nickname" autocomplete="off" class="adminisad_list_in">
				</li>
				<li>
					<div class="list_title">用户手机</div>
					<input type="text" name="mobile" placeholder="请输入手机号码" v-model="inputtext.mobile" autocomplete="off" class="adminisad_list_in">
				</li>
				<li>
					<div class="list_title">用户密码</div>
					<input type="password" name="password" placeholder="请输入6位以上" v-model="inputtext.password" autocomplete="off" class="adminisad_list_in">
				</li>
				<li>
					<div class="list_title">用户分组</div>
					<div class="admin_inp_box">
						<input type="text" placeholder="请选择分组" id="adminisad_fz" autocomplete="off" readonly class="adminisad_list_in">
						<i class="fa fa-angle-right adminisad_list_i"></i>
					</div>
				</li>
				<li>
					<div class="list_title">用户区域</div>
					<div class="admin_inp_box">
						<input type="text" placeholder="请选择区域" id="multiPickerInput" readonly autocomplete="off" class="adminisad_list_in">
						<i class="fa fa-angle-right adminisad_list_i"></i>
					</div>
				</li>
				<li>
					<div class="list_title">用户编码</div>
					<section class="adminisad_list_z">
							<!--<input style="width: 37%;" type="text" placeholder="选择字母" id="adminisad_bm" class="acc_inp adminisad_list_in" autocomplete="off" readonly>
							<i style="margin-right: 10px;" class="fa fa-angle-down"></i>-->
							<input type="text" name="code_h" placeholder="输入号码" v-model="inputtext.code_h" autocomplete="off" class="acc_inp adminisad_list_in">
						</div>
					</section>
				</li>
				<li>
					<div class="list_title">信用金</div>
					<input type="text" name="credit" placeholder="请输入信用金(元)" v-model="inputtext.credit" autocomplete="off" class="adminisad_list_in">
				</li>
				<li>
					<div class="switch_box">
						<div class="list_title">审核状态</div>
						<div>
							<div class="select_box" @click="touch_pick1">
								<div :class="{pick:adminisad1_s}" class="select_item select_left">开</div>
								<div :class="{pick:adminisad1_j}" class="select_item select_right">关</div>
							</div>
							<!-- <mt-switch v-model="adminisad_s"></mt-switch> -->
						</div>
					</div>
				</li>
				<li>
					<div class="switch_box">
						<div class="list_title">查看价格</div>
						<div>
							<div class="select_box" @click="touch_pick2">
								<div :class="{pick:adminisad2_s}" class="select_item select_left">开</div>
								<div :class="{pick:adminisad2_j}" class="select_item select_right">关</div>
							</div>
							<!-- <mt-switch v-model="adminisad1_j"></mt-switch> -->
						</div>
					</div>
				</li>
				<li>
					<div class="list_title">收货人</div>
					<input type="text" name="contact" placeholder="请输入收货人姓名" v-model="inputtext.contact" autocomplete="off" class="adminisad_list_in">
				</li>
				<li>
					<div class="list_title">收货手机</div>
					<input type="text" name="phone" placeholder="请输入收货人手机号" v-model="inputtext.phone" autocomplete="off" class="adminisad_list_in">
				</li>
				<li class="adminisad_list_li">
					<div class="list_title">详细地址</div>
					<textarea type="text" name="address" placeholder="请输入详细地址信息..." v-model="inputtext.address" autocomplete="off"></textarea>
				</li>
			</ol>

			<section class="clear"></section>
			<section class="adminis_button_m">
				<button type="submit" class="adminis_button" @click.navicon="adminispu_gys">保存</button>
			</section>
		</article>
		<section id="targetContainer"></section>

		<judge></judge>
	</article>
</template>
<script>
import APIUrl from "../../../../config/apiurl";
import * as types from "../../../../config/types";

export default {
  components: {
    judge: () => import("../public/judge.vue") // 判断加背景颜色
  },
  data() {
    return {
      inputtext: {
        nickname: "", // 单位名称
        mobile: "", // 用户手机
        password: "", // 用户密码
        group_id: "", // 用户分组
        region_id: "", // 用户区域
//      code_z: "", // 用户编码
        code_h: "", // 用户编码
        credit: "", // 信用金
        status: 1, // 审核状态
        is_look: 1, // 查看价格
        contact: "", // 收货人
        phone: "", // 收货手机
        address: "" // 详细地址
      },
      adminisad1_s: true,  //审核状态  开
      adminisad1_j: false,   //审核状态  关
      adminisad2_s: true,  //查看价格  开
      adminisad2_j: false,   //查看价格  关
    };
  },
  watch: {
    adminisad1_s(val, oldVal) {
      // 普通的watch监听  val变化的值    oldVal默认的值
      if (val == true) {
        this.inputtext.status = 1;
      } else {
        this.inputtext.status = 0;
      }
    },
    adminisad1_j(val, oldVal) {
      // 普通的watch监听  val变化的值    oldVal默认的值
      if (val == true) {
        this.inputtext.status = 0;
      } else {
        this.inputtext.status = 1;
      }
    },
    adminisad2_s(val, oldVal) {
      // 普通的watch监听  val变化的值    oldVal默认的值
      if (val == true) {
        this.inputtext.is_look = 1;
      } else {
        this.inputtext.is_look = 0;
      }
    },
    adminisad2_j(val, oldVal) {
      // 普通的watch监听  val变化的值    oldVal默认的值
      if (val == true) {
        this.inputtext.is_look = 0;
      } else {
        this.inputtext.is_look = 1;
      }
    },
  },
  methods: {
    touch_pick1(){
      if(this.adminisad1_s == true){
         this.adminisad1_s = false;
         this.adminisad1_j = true;
      }else if(this.adminisad1_j == true){
        this.adminisad1_s = true;
         this.adminisad1_j = false;
      }
    },
    touch_pick2(){
      if(this.adminisad2_s == true){
         this.adminisad2_s = false;
         this.adminisad2_j = true;
      }else if(this.adminisad2_j == true){
        this.adminisad2_s = true;
         this.adminisad2_j = false;
      }
    },
    //表单提交
    adminispu_gys() { 
      var id=this.$route.query.id;
      var phoneReg = /^((0\d{2,3}-\d{7,8})|(1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}))$/;
      if(this.inputtext.nickname==''){
          this.$Toast({
            message: '单位名称不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.mobile==''){
          this.$Toast({
            message: '用户手机不能为空',
            duration: 1200
          });
          return false;
      }
      else if(!phoneReg.test(this.inputtext.mobile)){
          this.$Toast({
            message: '请输入正确的用户手机',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.password.length<6&& this.inputtext.password.length>0){
          this.$Toast({
            message: '密码必须6位以上',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.group_id==''){
          this.$Toast({
            message: '用户分组不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.region_id==''){
          this.$Toast({
            message: '用户区域不能为空',
            duration: 1200
          });
          return false;
      }
//    else if(this.inputtext.code_z==''){
//        this.$Toast({
//          message: '用户编码不能为空',
//          duration: 1200
//        });
//        return false;
//    }
      else if(this.inputtext.code_h==''){
          this.$Toast({
            message: '用户编码不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.contact==''){
          this.$Toast({
            message: '收货人不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.phone==''){
          this.$Toast({
            message: '收货手机不能为空',
            duration: 1200
          });
          return false;
      }
      else if(!phoneReg.test(this.inputtext.phone)){
          this.$Toast({
            message: '请输入正确的收货手机',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.address==''){
          this.$Toast({
            message: '详细地址不能为空',
            duration: 1200
          });
          return false;
      }
      else{
        let nickname=this.inputtext.nickname;
        let mobile=this.inputtext.mobile;
        let password=this.inputtext.password;
        let group_id=this.inputtext.group_id;
        let region_id=this.inputtext.region_id;
        let code=this.inputtext.code_h;
        let contact=this.inputtext.contact;
        let phone=this.inputtext.phone;
        let address=this.inputtext.address;
        let status=this.inputtext.status;
        let is_look=this.inputtext.is_look;
        let credit=this.inputtext.credit;
        let sign1=this.$md5('appid='+APIUrl.appid+'&mobile='+mobile+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$post(APIUrl.salesmanMemberUpdate,{appid:APIUrl.appid,nickname:nickname,mobile:mobile,password:password,group_id:group_id,region_id:region_id,code:code,contact:contact,phone:phone,address:address,is_look:is_look,status:status,id:id,credit:credit,timeStamp:APIUrl.timeStamp,sign:sign1})
        .then((response) => {
//             console.log(response)
            if(response.code==400)
            {
                this.$Toast({
                  message: response.msg,
                  duration: 1200
                });
                return false
            }
            else if(response.code==401)
            {
                let signw=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    this.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                    .then((response) => {
                        this.$Toast({
                            message: '请重新登录',
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.$store.commit(types.LOGOUT)
                            this.$router.push("/");
                        },1500)
                    });
                    return false
            }
            else if(response.code==500)
            {
                this.$Toast({
                  message: "系统繁忙，请重试",
                  duration: 1200
                });
                return false
            }
            else(response.code==200)
            {
                this.$Toast({
                  message: '修改成功',
                  duration: 1000
                });
                // 本地存储
                setTimeout(() => {
                  this.$router.push("/yewu_account");
                },1500)
            }
        });
      }
    }
  },
  created(){
      this.$Indicator.open('加载中...');
      // 用户列表下拉
      var that=this;
      var id=this.$route.query.id;
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.memberParams,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            this.$Indicator.close();
            if(response.code==401)
            {
                let signw=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    this.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                    .then((response) => {
                        this.$Toast({
                            message: '请重新登录',
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.$store.commit(types.LOGOUT)
                            this.$router.push("/");
                        },1500)
                    });
                    return false
            }
            else if(response.code==200)
            {
                    // 用户分组
                    var weekdayArr=response.data.group;
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#adminisad_fz',
                        title: '',
                        wheels: [
                                    {data: weekdayArr}
                                ],
                        position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                        transitionEnd:function(indexArr, data){
                            //console.log(data);
                        },
                        callback:function(indexArr, data){
                            $("#adminisad_fz").val(data[0].value)
                            that.inputtext.group_id=data[0].id
                        }
                    });

                    // 选择地区
                    var weekdayArr=response.data.region;
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#multiPickerInput',
                        title: '',
                        wheels: [
                                    {data: weekdayArr}
                                ],
                        position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                        transitionEnd:function(indexArr, data){
                            //console.log(data);
                        },
                        callback:function(indexArr, data){
                            $("#multiPickerInput").val(data[0].value)
                            that.inputtext.region_id=data[0].id
                        }
                    });

                    // 用户编码
//                  var weekdayArr1e=response.data.code;
//                  var mobileSelect1 = new MobileSelect({
//                      trigger: '#adminisad_bm',
//                      title: '',
//                      wheels: [
//                                  {data: weekdayArr1e}
//                              ],
//                      position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
//                      transitionEnd:function(indexArr, data){
//                          //console.log(data);
//                      },
//                      callback:function(indexArr, data){
//                          $("#adminisad_bm").val(data[0].value)
//                          that.inputtext.code_z=data[0].value
//                      }
//                  });
            }
        });

      let sign1=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.salesmanMember,{appid:APIUrl.appid,id:id,timeStamp:APIUrl.timeStamp,sign:sign1})
        .then((response) => {
//      	console.log(JSON.stringify(response))
            this.$Indicator.close();
            if(response.code==401)
            {
                let signw=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    this.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                    .then((response) => {
                        this.$Toast({
                            message: '请重新登录',
                            duration: 1000
                        });
                        setTimeout(() => {
                            this.$store.commit(types.LOGOUT)
                            this.$router.push("/");
                        },1500)
                    });
                    return false
            }
            else if(response.code==200)
            {
                 this.inputtext.nickname=response.data.nickname;
                 this.inputtext.mobile=response.data.mobile;
                 this.inputtext.group_id=response.data.group_id;
                 $("#adminisad_fz").val(response.data.group_title);
                 this.inputtext.region_id=response.data.region_id;
                 $("#multiPickerInput").val(response.data.region_title);
//               this.inputtext.code_z=response.data.codeLetter;
//               $("#adminisad_bm").val(response.data.codeLetter);
                 this.inputtext.code_h=response.data.code;
                 this.inputtext.credit=response.data.credit;
                 if(response.data.status==0)  //0是关闭 1是打开
                 {
                     this.adminisad1_s = false;
                     this.adminisad1_j = true;
                 }
                 if(response.data.is_look==0) //0是关闭 1是打开
                 {
                 		this.adminisad2_s = false;
                     this.adminisad2_j = true;
                 }
                this.inputtext.contact=response.data.contact;
                this.inputtext.phone=response.data.phone;
                this.inputtext.address=response.data.address;
            } 
        });
  
  }
};
</script>