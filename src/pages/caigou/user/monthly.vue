<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">月账单</section>
    <section class="adminis_tir"><a href="javascript:void(0);" @click.navicon="adminispu_gys">供应商</a></section>
  </article>
  <article class="adminispu_se">
    <form @submit.prevent="submit"  action="">
      <section class="adminispo_sel">
        <input type="text" name="created_at" placeholder=""   id="start_date" autocomplete="off" readonly>
        <button type="submit"><i class="iconfont  icon-sousuo"></i></button>
      </section>
    </form>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminismo_list" data-page="1">
    <section class="adminismo_list_z">月采购金额总计：<dfn>{{ buyerMonthBill.total }}<em>元</em></dfn></section>
    <ol>
      <template v-for="(buyerMonthBill, index) in buyerMonthBill.data">
        <li>
          <section class="adminismo_list_ba">
              <section class="adminismo_list_l">{{ buyerMonthBill.order_sn }}</section>
              <section class="adminismo_list_r">
                <a href="javascriot:void(0);">
                  <dfn>{{ buyerMonthBill.total_price }}元</dfn>
                  <!-- <i class="fa fa-angle-right"></i> -->
                </a>
              </section>
          </section>
          <section class="adminis_gd1"></section>
        </li>
      </template>
    </ol>
  </article>
  <section class="clear"></section>

  <!-- 遮罩 -->
  <article class="adminis_zo" @click.navicon="adminis_zo"></article>
  <article class="adminispu_gy">
    <cite>供应商选择</cite>
    <mt-checklist 
			v-model="value" 
			:options="options" @change="checkon">
		</mt-checklist>
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
      // 存放所选选项
        value:[],
        // 供应商列表 checklist设置
        options : {},
       buyerMonthBill:{
           total:0,
      },     // 月账单
    }
  },
  methods: {
    // 实时监控勾选
    checkon(){
      setTimeout(() => {
          this.$Indicator.open('加载中...');
          // 获取采购列表
          var supplier_id=this.value;
          var created_at=$("#start_date").val();
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.buyerMonthBill,{appid:APIUrl.appid,page:1,supplier_id:supplier_id,created_at:created_at,timeStamp:APIUrl.timeStamp,sign:sign})
            .then((response) => {
                this.$Indicator.close();
                this.buyerMonthBill=[];
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
                    
                    if(response.data.data.length!=0)
                    {
                        $(".placewr_ws").hide();
                        $(".vueappsy_mode").show();
                        this.buyerMonthBill=response.data;
                        if(response.data.data.length<=9)
                        {
                            $(".vueappsy_mode cite").html("已加载完");
                        }
                    }
                    else
                    {
                        this.buyerMonthBill.total=0;
                        $(".placewr_ws").show();
                        $(".vueappsy_mode").hide();
                    }
                }
            });
      },100)
  	},  
    //表单提交
    submit: function() { 
        if($("#start_date").val()==''){
            this.$Toast({
              message: '时间不能为空',
              duration: 1200
            });
            return false;
        }
        else{
          this.$Indicator.open('加载中...');
          // 月账单
          var created_at=$("#start_date").val();
          var supplier_id=this.value;
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.buyerMonthBill,{appid:APIUrl.appid,created_at:created_at,supplier_id:supplier_id,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.buyerMonthBill=[];
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
                  if(response.data.data.length!=0)
                  {
                      $(".placewr_ws").hide();
                      $(".vueappsy_mode").show();
                      this.buyerMonthBill=response.data;
                      if(response.data.data.length<=9)
                      {
                          $(".vueappsy_mode cite").html("已加载完");
                      }
                  }
                  else
                  {
                      this.buyerMonthBill.total=0;
                      $(".placewr_ws").show();
                      $(".vueappsy_mode").hide();
                  }
                    // 供应商
                    var created_at=$("#start_date").val();
                    let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    this.$get(APIUrl.supplier,{appid:APIUrl.appid,created_at:created_at,timeStamp:APIUrl.timeStamp,sign:sign})
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
                            this.options=response.data;
                        }
                    });
              }
          });
        }
    },
    // 显示供应商
    adminispu_gys(){
          $(".adminispu_gy,.adminis_zo").show();
    },
    // 隐藏供应商
    adminis_zo(){
      $(".adminispu_gy,.adminis_zo").hide();
    },
  },
  mounted() {
    // 选择时间
    var calendar = new LCalendar();
		calendar.init({
			'trigger': '#start_date', //标签id
			'type': 'ym', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate': (new Date().getFullYear()-13) + '-' + 1 + '-' + 1, //最小日期
			'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
		});
  },
  created(){
        this.$Indicator.open('加载中...');
        // 月账单
        let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$get(APIUrl.buyerMonthBill,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
        .then((response) => {
            this.$Indicator.close();
            $("#start_date").val(response.data.date);
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
                if(response.data.data.length!=0)
                {
                    this.buyerMonthBill=response.data;
                    if(response.data.data.length<=9)
                    {
                        $(".vueappsy_mode cite").html("已加载完");
                    }
                }
                else
                {
                    this.buyerMonthBill.total=0;
                    $(".placewr_ws").show();
                    $(".vueappsy_mode").hide();
                }
                // 供应商
                var created_at=response.data.date;
                let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                this.$get(APIUrl.supplier,{appid:APIUrl.appid,created_at:created_at,timeStamp:APIUrl.timeStamp,sign:sign})
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
                        this.options=response.data;
                    }
                });
            }
        });
  }
};
</script>