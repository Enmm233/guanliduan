<template>
  <article class="main">
      <article class="adminis_ti">
        <section class="adminis_tio">毛利</section>
        <section class="adminisft_tir"><router-link :to="'/guanli_profitdetail?id='+timeType">明细</router-link></section>
      </article>
      <section class="adminis_tih"></section>

      <article class="adminisft_se">
          <address @click.navicon="adminisua_px" data-id="1" class="on"><aside>今天</aside></address>
          <address @click.navicon="adminisua_px" data-id="2"><aside>本月</aside></address>
          <address @click.navicon="adminisua_px" data-id="3"><aside>上月</aside></address>
      </article>

      <article class="adminisft_tj">
          <section class="adminisft_tjb">
              <address>{{ adminProfit.price }}</address>
              <address>{{ adminProfit.purchase_price }}</address>
              <address>{{ adminProfit.profit_price }}</address>
              <address>{{ adminProfit.lv }}%</address>
          </section>
          <section class="adminisft_tjw">
              <address><dfn></dfn>配送金额</address>
              <address><dfn></dfn>毛利金额</address>
              <address><dfn></dfn>成本金额</address>
              <address><dfn></dfn>毛利率</address>
          </section>
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
        timeType:1,
        adminProfit:[],       // 毛利  
      }
    },
    methods: {
      // 搜索
      adminisua_px()
      {
            var timeType=event.currentTarget.getAttribute("data-id");
            this.timeType=timeType;
            this.$store.commit('set_tripList',timeType);
            $(".adminisft_se address").removeClass("on");
            $(".adminisft_se address[data-id="+timeType+"]").addClass("on");
            $("#adminisft_tb").html("");
            $("#adminisft_tb").removeAttr("_echarts_instance_");
            $("#adminisft_tb").removeAttr("style");
            //   毛利
            let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
            this.$get(APIUrl.adminProfit,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:timeType,sign:sign})
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
                          this.adminProfit=response.data;
                    }
                });
          
      },
    },
    destroyed(){
        var name=this.$route.name;
        if(name!='guanli_profitdetail'){
            this.$store.commit('set_tripList',1)
        }
    },
    mounted() {
        var timeType=this.$store.state.triplist;
        $(".adminisft_se address").removeClass("on");
        $(".adminisft_se address[data-id="+timeType+"]").addClass("on");
    },
    created(){
      this.$Indicator.open('加载中...');
      //   毛利
      var timeType=this.$store.state.triplist;
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.adminProfit,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:timeType,sign:sign})
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
                  this.adminProfit=response.data;
            }
        });
    }
}
</script>

