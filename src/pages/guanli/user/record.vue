<template>
<article class="main">
  <article class="adminis_ti adminis_ti1">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">操作记录</section>
  </article>
  <article class="adminispu_se">
    <form @submit.prevent="submit"  action="">
      <section class="adminispo_sel adminisdl_sel">
        <section class="adminisdl_sel_b">
          <section class="adminislo_i"><i class="fa fa-angle-down"></i></section>
          <input type="hidden" name="typew" v-model="inputtext.typew" readonly>
          <input type="text" placeholder="角色" autocomplete="off" id="trigger1" readonly>
          <input type="text" name="created_at" placeholder="操作时间" id="start_date"  autocomplete="off" readonly>
        </section>
        <button type="submit"><i class="iconfont  icon-sousuo"></i></button>
      </section>
    </form>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisre_list" data-page="1">
    <ol>
      <template v-for="(adminRowList, index) in adminRowList">
        <li>
          <section class="adminisre_list_b">
            <section class="adminisre_list_s">{{  adminRowList.date }}</section>
            <address>角色：<dfn>{{  adminRowList.role }}</dfn></address>
            <address>姓名：<dfn>{{  adminRowList.role_name }}</dfn></address>
            <address>内容：{{  adminRowList.remark }}</address>
          </section>
          <section class="adminisre_list_h"></section>
          <section class="clear"></section>
        </li>
      </template>
    </ol>
  </article>
  
  <section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>

  <article class="vueappsy_mode">
    <mt-spinner type="fading-circle" color="#bdbdbd" :size="20"></mt-spinner>
    <cite>上拉加载更多</cite>
  </article>

  <judge></judge>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'

export default {
  components:{
    'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
  },
  data () {
    return {
      inputtext:{
        typew: '',
      },
      adminRowList:[],       // 操作记录  
    }
  },
  methods: {
    //表单提交
    submit: function() { 
          this.$Indicator.open('加载中...');
          // 采购单
          var created_at=$("#start_date").val();
          var typew=this.inputtext.typew;
		  $(".adminisre_list").attr("data-page",1);
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.adminRowList,{appid:APIUrl.appid,created_at:created_at,type:typew,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.adminRowList=[];
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
                  if(response.data.length!=0)
                  {
                      $(".placewr_ws").hide();
                      $(".vueappsy_mode").show();
                      this.adminRowList=response.data;
                      if(response.data.length<=5)
                      {
                          $(".vueappsy_mode cite").html("已加载完");
                      }
                  }
                  else
                  {
                      $(".placewr_ws").show();
                      $(".vueappsy_mode").hide();
                  }
              }
          });
    },
    //商品流加载
    scrolle() {
      var that=this;
      $(window).off("scroll").on('scroll',function(){   
        var page=parseInt($(".adminisre_list").attr("data-page")); 
        var nDivHight = $(document).height();
        var nScrollTop = $(this).scrollTop();
        var nScrollHight = $(this).height();
        if(parseInt(nScrollTop) + parseInt(nScrollHight) >= nDivHight-3) 
          {
                if(that.$route.name=='guanli_record')
                {
                    that.$Indicator.open('加载中...');
                    var created_at=$("#start_date").val();
                    var typew=that.inputtext.typew;
                    let sign1=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    $(".vueappsy_mode .mint-spinner-fading-circle").css({"display":"inline-block"});
                    that.$get(APIUrl.adminRowList,{appid:APIUrl.appid,page:(page+1),type:typew,created_at:created_at,timeStamp:APIUrl.timeStamp,sign:sign1})
                    .then((response) => {
                      that.$Indicator.close();
                      if(response.code==401)
                      {
                          let signw=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                            that.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                            .then((response) => {
                                that.$Toast({
                                    message: '请重新登录',
                                    duration: 1000
                                });
                                setTimeout(() => {
                                    that.$store.commit(types.LOGOUT)
                                    that.$router.push("/");
                                },1500)
                            });
                            return false
                      }
                      else if(response.code==200)
                      {
                          if(response.data.length!=0)
                          {
                              for( var i=0;i<response.data.length;i++)
                              {
                                  that.adminRowList.push(response.data[i]);
                              }
                              $(".adminisre_list").attr("data-page",(page+1));
                              $(".vueappsy_mode .mint-spinner-fading-circle").hide();
                          }
                          else
                          {
                              $(".vueappsy_mode .mint-spinner-fading-circle").hide();
                              $(".vueappsy_mode cite").html("已加载完");
                          }
                      }
                    })
                }
          }
      });
    },
  },
  mounted() {
    this.scrolle();
     // 选择时间
    var calendar = new LCalendar();
		calendar.init({
			'trigger': '#start_date', //标签id
			'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate': (new Date().getFullYear()-13) + '-' + 1 + '-' + 1, //最小日期
			'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
		});
  },
  created(){
      var that=this;
      this.$Indicator.open('加载中...');
      // 操作记录
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.adminRowList,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
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
                if(response.data.length!=0)
                {
                    this.adminRowList=response.data;
                    if(response.data.length<=5)
                    {
                        $(".vueappsy_mode cite").html("已加载完");
                    }
                }
                else
                {
                    $(".placewr_ws").show();
                    $(".vueappsy_mode").hide();
                }
            }
        });




        // 获取角色
        this.$get(APIUrl.roleType,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            if(response.code==200)
            {
                // 下拉菜单
                var weekdayArr=response.data;
                var weekdayArr1=[{id: '', value: "所有"}]
                var mobileSelect1 = new MobileSelect({
                    trigger: '#trigger1',
                    title: '',
                    wheels: [
                                {data: weekdayArr1.concat(weekdayArr)}
                            ],
                    position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                    transitionEnd:function(indexArr, data){
                        //console.log(data);
                    },
                    callback:function(indexArr, data){
                        $("#trigger1").val(data[0].value)
                        that.inputtext.typew=data[0].id
                    }
                });
            }
        });

  }
};
</script>