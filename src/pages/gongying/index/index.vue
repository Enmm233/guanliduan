<template>
<article class="main">
  <article class="adminisin_bj">
    <canvas id="incomplete" width="250" height="300"></canvas>
    <section class="adminisin_bjw">
        <cite>{{ supplierIndex.buyerNum }}</cite>
        <section class="adminisin_bjw_l">
          <address><aside>未备数量</aside><dfn>{{ supplierIndex.unBuyerNum }}</dfn></address>
          <address><aside>应备数量</aside><dfn>{{ supplierIndex.total }}</dfn></address>
        </section>
    </section>
  </article>
  
  <article class="adminisin_list">
    <ol>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>今日完成</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ supplierIndex.finsh }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>今日未完成</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ supplierIndex.unfinsh }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>今日供应品种</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ supplierIndex.cateCount }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <!--<li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>历史完成</cite>
        </section>
        <aside>{{ supplierIndex.beforeFinsh }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>历史未完成</cite>
        </section>
        <aside>{{ supplierIndex.beforeUnfinsh }}</aside>
      </li>-->
      <!--<section class="adminis_gd"></section>-->
    </ol>
  </article>

  <judge></judge>
  <footerw></footerw>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'
import footerw from "../public/footerw.vue"
import judge from "../public/judge.vue"

export default {
  components:{
    footerw,judge
    // 'footerw':()=>import('../public/footerw.vue'),   // 底部导航
    // 'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
  },
  data () {
    return {
       nowTimes:0,   // 获取今天时间
       proportw:0,   // 获取百分比
       supplierIndex:{
         unBuyerNum:0,
         buyerNum:0,
         finsh:0,
         unfinsh:0,
         cateCount:0,
         beforeFinsh:0,
         beforeUnfinsh:0,
         proport:0,
       },   // 首页信息
    }
  },
  methods: {
      // 获取当前时间函数
      timeFormate() {
        let timeStamp=new Date()
        let year = new Date(timeStamp).getFullYear();
        let month =new Date(timeStamp).getMonth() + 1 < 10? "0" + (new Date(timeStamp).getMonth() + 1): new Date(timeStamp).getMonth() + 1;
        let date =new Date(timeStamp).getDate() < 10? "0" + new Date(timeStamp).getDate(): new Date(timeStamp).getDate();
        let hh =new Date(timeStamp).getHours() < 10? "0" + new Date(timeStamp).getHours(): new Date(timeStamp).getHours();
        let mm =new Date(timeStamp).getMinutes() < 10? "0" + new Date(timeStamp).getMinutes(): new Date(timeStamp).getMinutes();
        // let ss =new Date(timeStamp).getSeconds() < 10? "0" + new Date(timeStamp).getSeconds(): new Date(timeStamp).getSeconds();
        // return year + "年" + month + "月" + date +"日"+" "+hh+":"+mm ;
        this.nowTimes = year + "-" + month + "-" + date ;
      },
  },
  watch:{
      proportw(val, oldVal){ // 普通的watch监听  val变化的值    oldVal默认的值
        var that=this;
        var width=$(".adminisin_bj").width();
        var height=$(".adminisin_bj").height();
        $("#incomplete").attr("width",width);
        $("#incomplete").attr("height",height);
        setTimeout(() => {
          CircleProcess(document.getElementById("incomplete"),{
              "size":"complete", //complete,half,incomplete or todo-percent
              "percent": val,
              "percentCircle":{
                  "show":true,
                  "speed": "gradient",//gradient normal fast
                  "gradientColorShow":true
              },
              "endSmallCircle":{
                  "show": true,
              },
          });
        },200)
        $(window).resize(function(){
            setTimeout(() => {
                var width=$(".adminisin_bj").width();
                var height=$(".adminisin_bj").height();
                $("#incomplete").attr("width",width);
                $("#incomplete").attr("height",height);
            },300)
            setTimeout(() => {
                CircleProcess(document.getElementById("incomplete"),{
                    "size":"complete", //complete,half,incomplete or todo-percent
                    "percent": val,
                    "percentCircle":{
                        "show":true,
                        "speed": "gradient",//gradient normal fast
                        "gradientColorShow":true
                    },
                    "endSmallCircle":{
                        "show": true,
                    },
                });
            },350)
        });
      },
  },
  created(){
      this.$Indicator.open('加载中...');
      this.timeFormate();
      // 获取首页信息
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.supplierIndex,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.supplierIndex=response.data;
                if(response.data.proport==0)
                {
                    this.proportw=0.01;
                }
                else
                {
                    this.proportw=response.data.proport;
                }
            }
            
        });
  }
};
</script>