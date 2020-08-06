<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">我要收款</section>
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
  
  <article class="adminisbu_list">
    <section class="adminisbu_list_z">待收款：<dfn>{{ salesmanGathering.total }}<em>元</em></dfn></section>
    <ol>
      <template v-for="(salesmanGathering, index) in salesmanGathering.member">
        <li>
          <section class="adminisbu_list_ba">
              <section class="adminisbu_list_l"><a :href="'tel:'+salesmanGathering.mobile"><i class="fa fa-phone-square"></i></a></section>
              <section class="adminisbu_list_o">
                <address><aside>{{ salesmanGathering.contact }}</aside></address>
                <address><aside>{{ salesmanGathering.mobile }}</aside><aside class="adminisbu_list_ow">{{ salesmanGathering.nickname }}</aside></address>
              </section>
              <section class="adminisbu_list_r">
                <a href="javascriot:void(0);">
                  <dfn>{{ salesmanGathering.total_sales }}元</dfn>
                  <!-- <i class="fa fa-angle-right"></i> -->
                </a>
              </section>
          </section>
          <section class="adminis_gd1"></section>
        </li>
      </template>
    </ol>
  </article>

  <section class="placewr_ws"><img src="images/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>

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
       salesmanGathering:{
           total:0,
      },   // 我要收款
    }
  },
  methods: {
    //表单提交
    submit: function() { 
          this.$Indicator.open('加载中...');
          // 月账单
          var created_at=$("#start_date").val();
          var supplier_id=this.value;
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.salesmanGathering,{appid:APIUrl.appid,created_at:created_at,supplier_id:supplier_id,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.salesmanGathering=[];
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
                  if(response.data.member.length!=0)
                  {
                      $(".placewr_ws").hide();
                      $(".vueappsy_mode").show();
                      this.salesmanGathering=response.data;
                      if(response.data.member.length<=7)
                      {
                          $(".vueappsy_mode cite").html("已加载完");
                      }
                  }
                  else
                  {
                      this.salesmanGathering.total=0;
                      $(".placewr_ws").show();
                      $(".vueappsy_mode").hide();
                  }
              }
          });
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
        this.$get(APIUrl.salesmanGathering,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
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
                if(response.data.member.length!=0)
                {
                    this.salesmanGathering=response.data;
                    if(response.data.member.length<=7)
                    {
                        $(".vueappsy_mode cite").html("已加载完");
                    }
                }
                else
                {
                    this.salesmanGathering.total=0;
                    $(".placewr_ws").show();
                    $(".vueappsy_mode").hide();
                }
            }
        });
  }
};
</script>