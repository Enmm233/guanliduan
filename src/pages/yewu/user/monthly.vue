<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">月账单</section>
  </article>
  <article class="adminispu_se">
    <form @submit.prevent="submit"  action="">
      <section class="adminispo_sel">
        <input type="text" name="created_at" placeholder="" id="start_date" autocomplete="off" readonly>
        <button type="submit"><i class="iconfont  icon-sousuo"></i></button>
      </section>
    </form>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisbu_list adminisyz_list" data-page="1">
    <section class="adminisbu_list_z">业绩：<dfn>{{ salesmanMonthBill.total_month }}<em>元</em></dfn></section>
    <ol>
      <template v-for="(salesmanMonthBill, index) in salesmanMonthBill.list">
        <li>
          <section class="adminisbu_list_ba">
              <section class="adminisbu_list_o">
                <address><aside>{{ salesmanMonthBill.contact }}</aside></address>
                <address><aside class="adminisbu_list_ow">{{ salesmanMonthBill.nickname }}</aside></address>
              </section>
              <section class="adminisbu_list_r">
                <a href="javascriot:void(0);">
                  <dfn>{{ salesmanMonthBill.total_sales }}元</dfn>
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
      salesmanMonthBill:{
           total_month:0,
      },    // 月账单
    }
  },
  methods: {
    //商品流加载
    scrolle() {
      var that=this;
      $(window).off("scroll").on('scroll',function(){   
        var page=parseInt($(".adminisbu_list").attr("data-page")); 
        var nDivHight = $(document).height();
        var nScrollTop = $(this).scrollTop();
        var nScrollHight = $(this).height();
        if(parseInt(nScrollTop) + parseInt(nScrollHight) >= nDivHight-3)
          {
                if(that.$route.name=='yewu_monthly')
                {
                    that.$Indicator.open('加载中...');
                    var supplier_id=that.value;
                    var created_at=$("#start_date").val();
                    let sign1=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    $(".vueappsy_mode .mint-spinner-fading-circle").css({"display":"inline-block"});
                    that.$get(APIUrl.salesmanMonthBill,{appid:APIUrl.appid,page:(page+1),created_at:created_at,supplier_id:supplier_id,timeStamp:APIUrl.timeStamp,sign:sign1})
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
                          if(response.data.list.length!=0)
                          {
                              for( var i=0;i<response.data.list.length;i++)
                              {
                                  that.salesmanMonthBill.list.push(response.data.list[i]);
                              }
                              that.salesmanMonthBill.total_month=response.data.total_month;
                              $(".adminisbu_list").attr("data-page",(page+1));
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
    //表单提交
    submit: function() { 
          this.$Indicator.open('加载中...');
          // 月账单
          var created_at=$("#start_date").val();
          var supplier_id=this.value;
		  $(".adminisbu_list").attr("data-page",1);
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.salesmanMonthBill,{appid:APIUrl.appid,created_at:created_at,supplier_id:supplier_id,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.salesmanMonthBill=[];
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
                  if(response.data.list.length!=0)
                  {
                      $(".placewr_ws").hide();
                      $(".vueappsy_mode").show();
                      this.salesmanMonthBill=response.data;
                      if(response.data.list.length<=7)
                      {
                          $(".vueappsy_mode cite").html("已加载完");
                      }
                  }
                  else
                  {
                      this.salesmanMonthBill.total_month=0;
                      $(".placewr_ws").show();
                      $(".vueappsy_mode").hide();
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
			'type': 'ym', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate': (new Date().getFullYear()-13) + '-' + 1 + '-' + 1, //最小日期
			'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
		});
  },
  created(){
        this.$Indicator.open('加载中...');
        // 月账单
        let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$get(APIUrl.salesmanMonthBill,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
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
                if(response.data.list.length!=0)
                {
                    this.salesmanMonthBill=response.data;
                    if(response.data.list.length<=7)
                    {
                            $(".vueappsy_mode cite").html("已加载完");
                    }
                }
                else
                {
                    this.salesmanMonthBill.total_month=0;
                    $(".placewr_ws").show();
                    $(".vueappsy_mode").hide();
                }
            }
        });
  }
};
</script>