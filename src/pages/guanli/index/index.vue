<template>
<article class="main">
  <article class="adminisui_ds">
      <ol>
        <li>
          <section class="adminisui_dsb">
            <cite>订单数</cite>
            <aside>{{ adminIndex.orderNum  }}</aside>
          </section>
        </li>
        <li>
          <section class="adminisui_dsb">
            <cite>销售总额</cite>
            <aside class="adminisui_dss">{{ adminIndex.totalPrice  }}</aside>
          </section>
        </li>
        <li>
          <section class="adminisui_dsb">
            <cite>退货总额</cite>
            <aside class="adminisui_dss">{{ adminIndex.returnPrice  }}</aside>
          </section>
        </li>
        <li>
          <section class="adminisui_dsb">
            <cite>新增用户</cite>
            <aside>{{ adminIndex.memberNum  }}</aside>
          </section>
        </li>
      </ol>
  </article>

  <article class="adminisui_bt">
      <section class="adminisui_bti">
        <section  id="trigger1"></section>
        <cite>一周</cite>
        <i class="fa fa-angle-down"></i>
      </section>
      <section id="adminisui_bt"></section>
  </article>
  <article class="adminisui_zt">
      <section class="adminisui_ztt">
        <cite>每日销售额监测</cite>
        <!-- <address><aside>同比 <ruby>+8.4%</ruby></aside><aside>环比 <ruby>+8.4%</ruby></aside></address> -->
      </section>
      <section id="adminisui_zt"></section>
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
    //'footerw':()=>import('../public/footerw.vue'),   // 底部导航
    //'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
  },
  data () {
    return {
       adminIndex:[],   // 首页统计
       adminIndex:[],   // 首页图表
    }
  },
  methods: {
      // 图标
      echarts(cateName,cateList,dayDate,dayPrice){
          // 饼图
          var dom = document.getElementById("adminisui_bt");
          var myChart = echarts.init(dom);
          var app = {};
          var optione = null;
          var optione = {
                backgroundColor: 'white',
                title : {
                text: '',
                subtext: '',
                subtextStyle: {
                    fontSize : 20,
                    padding: 20,
                    color: '#ea7c67'
                },
                    x: '45%',
                    y: '43%',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16
                    }
                },
                tooltip : {
                    trigger: 'item',
                    formatter: "{a} <br/>{b} : {c} ({d}%)"
                },
                legend: {
                    orient: 'vertical',
                    top:'3%',
                    itemGap: 25,
                    itemWidth: 7,
                    itemHeight: 7,
                    icon: "circle", 
                    left: 'left',
                    data: cateName
                },
                color : ['#0e9afe','#84d600','#FD9A36','#EBE028','#31CE65','#20DACD','#D671F5'],
                series : [
                    {
                        name: '访问来源',
                        type: 'pie',
                        radius : ['50%','70%'],
                        center: ['55%', '50%'],
                        data:cateList,
                        label: {
                             normal: {
                                show:false  
                             }
                        },
                        itemStyle: {
                            
                            normal: {
                                color: function(params) {
                                    // build a color map as your need.
                                    var colorList = [
                                    '#ed400b','#55a4ee','#e59be1','#35a17a','#ef9376','#c3b32c','#3d860d',
                                    '#16afd3'
                                    ];
                                    return colorList[params.dataIndex]
                                },
                                shadowBlur: 10,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    }
                ]
            };
          if (optione && typeof optione === "object") {
              myChart.clear();
              myChart.setOption(optione, true);
          }


          // 折线图
          var dom = document.getElementById("adminisui_zt");
          var myChart = echarts.init(dom);
          var app = {};
          var optione = null;
          var optione = {
                grid: {
                   left: '3%',
                  right: '10%',
                  top: '3.5%',
                  bottom:0,
                  containLabel: true
                },
                tooltip: {
                    show:true,
                    trigger: 'axis',
                    axisPointer: {
                        type: 'cross',
                        label: {
                            backgroundColor: '#9dbe64'
                        }
                    }
                },
                xAxis: {
                    type: 'category',
                    boundaryGap: false,
                    axisLabel : {
                        margin: 15,
                        show : true,
                        lineStyle : {
                            color : '#808080'
                        }
                    },
                    axisTick: {
                      show : false,
                    },
                    splitLine: {
                        show : false
                    },
                    axisLine : {
                        show : false,
                        lineStyle : {
                            color : '#808080'
                        }
                    },
                    data: dayDate
                },
                yAxis: {
                    type: 'value',
                    boundaryGap: false,
                    splitLine: {
                        show : true,
                        lineStyle : {
                            color : '#e6e6e6'
                        }
                    },
                    axisTick: {
                      show : false,
                    },
                    axisLabel : {
                        margin: 20,
                        show : true,
                        formatter: '{value} K',
                        textStyle : {
                            color : '#808080'
                        }
                    },
                    axisLine : {
                        show : false,
                        lineStyle : {
                            color : '#808080'
                        }
                    }
                },
                series: [{
                    name:'数据',
                    data: dayPrice,
                    type: 'line',
                    z:1,
                    symbolSize: 6,//拐点大小
                    smooth:true,  //这句就是让曲线变平滑的
                    itemStyle: {
                        normal:{
                            color:'#a2e95c',
                            borderWidth:2
                        }
                    },
                    lineStyle: {
                        normal:{
                            width: 4,
                            color:"#a2e95c"
                        },
                    },
                    areaStyle:{
                        normal:{
                            color:"#d7fcd5",
                            opacity:0.7
                        },
                    }
                }],
            };
          if (optione && typeof optione === "object") {
              myChart.clear();
              myChart.setOption(optione, true);
          }
      },
  },
  mounted() {
      var that=this;
      // 实时监听屏幕宽度
      $(window).resize(function(){
          $("#adminisui_bt,#adminisui_zt").html("");
          $("#adminisui_bt,#adminisui_zt").removeAttr("_echarts_instance_");
          $("#adminisui_bt,#adminisui_zt").removeAttr("style");
          setTimeout(() => {
            that.echarts(that.adminIndexCount.cateName,that.adminIndexCount.cateList,that.adminIndexCount.dayDate,that.adminIndexCount.dayPrice);
          },350)
      });
       // 下拉菜单
        var weekdayArr=[{id:'1',value:'一周'},
                    {id:'2',value:'半个月'},
                    {id:'3',value:'一个月'}];
        var mobileSelect1 = new MobileSelect({
            trigger: '#trigger1',
            title: '',
            wheels: [
                        {data: weekdayArr}
                    ],
            position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
            transitionEnd:function(indexArr, data){
                //console.log(data);
            },
            callback:function(indexArr, data){
                that.$Indicator.open('加载中...');
                $(".adminisui_bti cite").html(data[0].value);
                $("#adminisui_bt,#adminisui_zt").html("");
                $("#adminisui_bt,#adminisui_zt").removeAttr("_echarts_instance_");
                $("#adminisui_bt,#adminisui_zt").removeAttr("style");
                // 首页图表
                let sign=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                that.$get(APIUrl.adminIndexCount,{appid:APIUrl.appid,timeType:data[0].id,timeStamp:APIUrl.timeStamp,sign:sign})
                .then((response) => {
                    that.$Indicator.close();
                    if(response.code==401)
                    {
                        that.$Toast({
                            message: '请重新登录',
                            duration: 1000
                        });
                        setTimeout(() => {
                            that.$store.commit(types.LOGOUT)
                            that.$router.push("/");
                        },1500)
                    }
                    else if(response.code==200)
                    {
                        that.adminIndexCount=response.data;
                        that.echarts(response.data.cateName,response.data.cateList,response.data.dayDate,response.data.dayPrice);
                    }
                    
                });
            }
        });
  },
  created(){
      this.$Indicator.open('加载中...');
      // 首页统计
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.adminIndex,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.adminIndex=response.data;
            }
            
        });

        // 首页图表
        this.$get(APIUrl.adminIndexCount,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.adminIndexCount=response.data;
                this.echarts(response.data.cateName,response.data.cateList,response.data.dayDate,response.data.dayPrice);
            }
            
        });
  }
};
</script>