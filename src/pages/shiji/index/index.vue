<template>
<article class="main">
  <article class="adminisin_bj">
    <!--<section class="adminisin_sc" @click.navicon="Scan"><i class="icon iconfont icon-saoyisao"></i></section>-->
    <canvas id="incomplete" width="250" height="300"></canvas>
    <section class="adminisin_bjw">
        <cite>{{ vehicleIndex.buyerNum }}</cite>
        <section class="adminisin_bjw_l">
          <address><aside>未配送</aside><dfn>{{ vehicleIndex.unBuyerNum }}</dfn></address>
          <address><aside>应该配送</aside><dfn>{{ vehicleIndex.total }}</dfn></address>
        </section>
    </section>
  </article>
  
  <article class="adminisin_list">
    <ol>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>备货中</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ vehicleIndex.stock }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>配货中</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ vehicleIndex.distribution }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>配货单位</cite>
          <address>{{ nowTimes }}</address>
        </section>
        <aside>{{ vehicleIndex.cateCount }}</aside>
      </li>
      <section class="adminis_gd"></section>
      <li>
        <i class="fa fa-ellipsis-v"></i>
        <section class="adminisin_list_o">
          <cite>历史未收货</cite>
        </section>
        <aside>{{ vehicleIndex.beforeUnfinsh }}</aside>
      </li>
      <section class="adminis_gd"></section>
    </ol>
  </article>

  <judge></judge>
  <footerw></footerw>
  <weiapi></weiapi>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'

export default {
  components:{
    'footerw':()=>import('../public/footerw.vue'),   // 底部导航
    'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
    'weiapi':()=>import('../../login/weiapi.vue'),   // 验证微信
  },
  data () {
    return {
       nowTimes:0,   // 获取今天时间
       proportw:0,   // 获取百分比
       vehicleIndex:{
         beforeUnfinsh:0,
         buyerNum:0,
         cateCount:0,
         distribution:0,
         stock:0,
         total:0,
         unBuyerNum:0,
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
      // 扫一扫
//    Scan(){
//      wx.scanQRCode({
//        needResult : 1,
//        scanType : [ "qrCode", "barCode" ],
//        success : function(res) {
//          // alert(res)
//          // alert(JSON.stringify(res));
//          var result = res.resultStr;
//          window.location.href=result;
//        },
//        fail : function(res) {
//          // console.log(res)
//        }
//      });
//    }
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
      this.$get(APIUrl.vehicleIndex,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.vehicleIndex=response.data;
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