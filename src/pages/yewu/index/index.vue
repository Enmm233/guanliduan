<template>
<article class="main">
  <article class="adminisin_bj">
    <canvas id="incomplete" width="250" height="300"></canvas>
    <section class="adminisin_bjw">
        <cite>{{ salesmanIndex.finsh }}</cite>
        <section class="adminisin_bjw_l">
          <address><aside>未下单</aside><dfn>{{ salesmanIndex.unfinsh }}</dfn></address>
          <address><aside>全部</aside><dfn>{{ salesmanIndex.total }}</dfn></address>
        </section>
    </section>
  </article>
  
  <article class="adminisin_list">
    <ol>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>今日配送金额</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ salesmanIndex.today_price }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>今日新增用户</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ salesmanIndex.today_member }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>今日待审核订单</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ salesmanIndex.unReview }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>本月配送金额</cite>
        </section>
        <aside>{{ salesmanIndex.month_price }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>本月新增用户</cite>
        </section>
        <aside>{{ salesmanIndex.month_member }}</aside>
      </li>
      <section class="adminis_gd"></section>
    </ol>
  </article>

  <judge></judge>
  <footerw></footerw>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'
import footerw from '../public/footerw.vue'

export default {
  components:{
    'footerw':()=>import('../public/footerw.vue'),   // 底部导航
    // footerw
    'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
  },
  data () {
    return {
       nowTimes:0,   // 获取今天时间
       proportw:0,   // 获取百分比
       salesmanIndex:{
         finsh:0,
         month_price:0,
         today_member:0,
         today_price:0,
         total:0,
         unReview:0,
         unfinsh:0,
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
      this.$get(APIUrl.salesmanIndex,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            this.$Indicator.close();
            if(response.code==401)
            {
                this.$Toast({
                    message: '请重新登录',
                    duration: 1000
                });
                setTimeout(() => {
                    this.$store.commit(types.LOGOUT)
                    this.$router.push("/");
                },1500)
            }
            else if(response.code==200)
            {
                this.salesmanIndex=response.data;
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