<template>
  <article class="main">
      <article class="adminis_ti">
        <section class="adminis_tio">采购</section>
      </article>
      <section class="adminis_tih"></section>

      <article class="adminisft_se">
          <address @click.navicon="adminisua_px" data-id="1" class="on"><aside>今天</aside></address>
          <address @click.navicon="adminisua_px" data-id="2"><aside>本月</aside></address>
          <address @click.navicon="adminisua_px" data-id="3"><aside>上月</aside></address>
      </article>
      
      <article class="adminisup_zj">{{ adminPurchaseCount.total }}<ruby>元</ruby></article>

      <article class="adminisft_tb adminisup_tb">
          <section id="adminisft_tb"></section>
      </article>

     <section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>

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
        adminPurchaseCount:{
            total:0,
        },       // 采购  
      }
    },
    methods: {
      // 搜索
      adminisua_px()
      {
            var timeType=event.currentTarget.getAttribute("data-id");
            $(".adminisft_se address").removeClass("on");
            $(".adminisft_se address[data-id="+timeType+"]").addClass("on");
            $("#adminisft_tb").html("");
            $("#adminisft_tb").removeAttr("_echarts_instance_");
            $("#adminisft_tb").removeAttr("style");
            //   采购
            let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
            this.$get(APIUrl.adminPurchaseCount,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:timeType,sign:sign})
                .then((response) => {
                    this.$Indicator.close();
                    this.adminPurchaseCount=[];
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
                            this.adminPurchaseCount=response.data;
                            this.echarts(response.data.list);
                            $(".placewr_ws").hide();
                        }
                        else
                        {
                            $(".placewr_ws").show();
                            this.adminPurchaseCount.total=0;
                        }
                    }
                });
          
      },
      // 图标
      echarts(appusage_data){
          // 折线图
          var dom = document.getElementById("adminisft_tb");
          var myChart = echarts.init(dom);
          var myColor = ['#20ce9c', '#f7a83e', '#f75555', '#80d512', '#af44ec', '#12b7d5','#1eb43d','#80e91a','#d1d1d1'];
          var app = {};
          var optione = null;
          var optione = {
              tooltip: {
                  trigger: 'axis',
                  backgroundColor:'rgba(255,255,255,0.8)',
                  extraCssText: 'box-shadow: 0 0 8px rgba(0, 0, 0, 0.3);',
                  textStyle:{
                      color:'#6a717b',
                  },
                  
              }, 
              grid: {
                  left: '0.5%',
                  right: '6%',
                  top: '3.5%',
                  bottom:0,
                  containLabel: true
              },
              yAxis: [{
                  type: 'category',
                  boundaryGap: false,
                  data: ['NO.1','NO.2','NO.3','NO.4','NO.5','NO.6','NO.7','NO.8','NO.9'],
                  inverse: true,
                  axisTick: {
                      show : false,
                      alignWithLabel: true,
                  },
                  axisLabel: {
                      margin: 10,
                      textStyle: {
                          fontSize: 12,
                          color:'#999'
                          }
                  },
                  axisLine: {
                      lineStyle: {
                          color: '#e6e6e6'
                      }
                  },
                  
              }],
              xAxis: [{
                  type: 'value',
                  boundaryGap: false,
                  axisLabel: {
                      margin: 25,
                      textStyle: {
                          fontSize: 12,
                          color:'#cccccc'
                      }
                  },
                  axisLine: {
                      show : false,
                      lineStyle: {
                          color: '#e6e6e6'
                      }
                  },
                  splitLine: {
                      lineStyle: {
                          color: '#e6e6e6'
                      }
                  }
              }],
              series: [{
                  name: '金额',
                  type: 'bar',
                  barWidth:35,
                  data: appusage_data,
                  label: {
                      normal: {
                          show: true,
                          position: [10, 10],
                          "formatter": function(params) {
                              return params.data.name;
                          },
                          textStyle: {
                              color: '#666' //color of value
                          }
                      }
                  },
                  itemStyle: {
                      normal: {
                          color: function(params) {
                              var num = myColor.length;
                              return myColor[params.dataIndex % num]
                          },
                          barBorderRadius: [0, 20,20, 0],
                      }
                  }
              }]
          };
          if (optione && typeof optione === "object") {
              myChart.clear();
              myChart.setOption(optione, true);
          }
      }
    },
    mounted() {
      var that=this;
      // 实时监听屏幕宽度
      $(window).resize(function(){
          $("#adminisft_tb").html("");
          $("#adminisft_tb").removeAttr("_echarts_instance_");
          $("#adminisft_tb").removeAttr("style");
          setTimeout(() => {
            that.echarts(that.adminPurchaseCount.list);
          },350)
      });
    },
    created(){
      this.$Indicator.open('加载中...');
      //   采购
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.adminPurchaseCount,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:1,sign:sign})
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
                if(response.data.list.length!=0)
                {
                    this.adminPurchaseCount=response.data;
                    this.echarts(response.data.list);
                }
                else
                {
                    $(".placewr_ws").show();
                }
            }
        });
    }
}
</script>

