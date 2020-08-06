<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_tio">订单列表</section>
  </article>
  <article class="adminispu_se">
    <form @submit.prevent="submit"  action="">
      <section class="adminispo_sel adminisdl_sel">
        <section class="adminisdl_sel_b">
          <input type="text" name="keyword" placeholder="订单号|收货人|单位名称" v-model="inputtext.keyword" autocomplete="off">
          <input type="text" name="send_time" placeholder="配送日期" id="start_date"  autocomplete="off" readonly>
        </section>
        <button type="submit"><i class="iconfont  icon-sousuo"></i></button>
      </section>
    </form>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisdl_list" data-page="1">
    <ol>
      <template v-for="(salesmanOrderList, index) in salesmanOrderList">
        <li>
          <section class="adminisdl_list_ba">
              <section class="adminisdl_list_t">
                <cite>单号：{{  salesmanOrderList.order_sn }}</cite>
                <template v-if="salesmanOrderList.order_status==0">
                  <dfn class="adminisdl_list_ds3">待审核</dfn>
                </template>
                <template v-if="salesmanOrderList.order_status==1">
                  <dfn class="adminisdl_list_ds1">备货中</dfn>
                </template>
                 <template v-if="salesmanOrderList.order_status==2">
                  <dfn class="adminisdl_list_ds2">配送中</dfn>
                </template>
                <template v-if="salesmanOrderList.order_status==3">
                  <dfn class="adminisdl_list_ds4">已收货</dfn>
                </template>
                <template v-if="salesmanOrderList.order_status==4">
                  <dfn class="adminisdl_list_ds5">已取消</dfn>
                </template>
              </section>
              <section class="adminisdl_list_s">
                <router-link :to="'/yewu_orderdetail?id='+salesmanOrderList.id">
                  <address>收货人：{{  salesmanOrderList.contact }}</address>
                  <address>单位名称：{{  salesmanOrderList.nickname }}</address>
                  <address>配送日期：{{  salesmanOrderList.send_time }}</address>
                </router-link>
                <section class="clear"></section>
              </section>
           </section>
           <section class="adminis_gd1"></section>
        </li>
      </template>
    </ol>
  </article>

  <section class="placewr_ws"><img src="/mangement/img/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>

  <article class="vueappsy_mode">
    <mt-spinner type="fading-circle" color="#bdbdbd" :size="20"></mt-spinner>
    <cite>上拉加载更多</cite>
  </article>

  <judge></judge>
  <footerw></footerw>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'
export default {
  components:{
    'footerw':()=>import('../public/footerw.vue'),   // 底部导航
    'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
  },
  data () { 
    return {
      inputtext:{
        keyword:'',
      },
      salesmanOrderList:[],       // 订单列表  
    }
  },
  methods: {
    //表单提交
    submit: function() { 
          this.$Indicator.open('加载中...');
          // 采购单
          var send_time=$("#start_date").val();
          var keyword=this.inputtext.keyword;
		  $(".adminisdl_list").attr("data-page",1);
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.salesmanOrderList,{appid:APIUrl.appid,send_time:send_time,keyword:keyword,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.salesmanOrderList=[];
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
                      this.salesmanOrderList=response.data;
                      if(response.data.length<=3)
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
        var page=parseInt($(".adminisdl_list").attr("data-page")); 
        var nDivHight = $(document).height();
        var nScrollTop = $(this).scrollTop();
        var nScrollHight = $(this).height();
        if(parseInt(nScrollTop) + parseInt(nScrollHight) >= nDivHight-3) 
          {
                if(that.$route.name=='yewu_order')
                {
                    that.$Indicator.open('加载中...');
                    var send_time=$("#start_date").val();
                    var keyword=that.inputtext.keyword;
                    let sign1=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    $(".vueappsy_mode .mint-spinner-fading-circle").css({"display":"inline-block"});
                    that.$get(APIUrl.salesmanOrderList,{appid:APIUrl.appid,page:(page+1),send_time:send_time,keyword:keyword,timeStamp:APIUrl.timeStamp,sign:sign1})
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
                                  that.salesmanOrderList.push(response.data[i]);
                              }
                              $(".adminisdl_list").attr("data-page",(page+1));
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
      this.$Indicator.open('加载中...');
      // 订单列表
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.salesmanOrderList,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
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
                    this.salesmanOrderList=response.data;
                    if(response.data.length<=3)
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
  }
};
</script>