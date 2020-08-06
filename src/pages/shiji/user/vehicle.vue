<template>
<article class="main">
  <article class="maingp_map_lb">
    <section id="allmap"></section>
    <!-- <section class="maingp_map_bu">
      <section class="maingp_map_bub">
        <button type="button" class="adminis_button"><aside>位置</aside>南昌市八一大道88号</button>
      </section>
    </section> -->
  </article>
  <section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>
</article>
</template>

<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'

export default {
    components:{
    },
    methods: {
      map(longitude,latitude) {
          // 百度地图API功能
          var map = new BMap.Map("allmap");
          map.centerAndZoom(new BMap.Point(116.331398,39.897445),15);
          map.enableScrollWheelZoom(true);

          var new_point = new BMap.Point(longitude,latitude);

          //转换坐标
          var convertor = new BMap.Convertor();
          var pointArr = [new_point];
          convertor.translate(pointArr, 1, 5, function (data) {
              var myIcon = new BMap.Icon("/images/car_green.png", new BMap.Size(20,42));
              var marker = new BMap.Marker(data.points[0],{icon:myIcon});  // 创建标注
              map.addOverlay(marker);              // 将标注添加到地图中
              map.panTo(new_point);
          });
      }
    },
    created(){
      this.$Indicator.open('加载中...');
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$get(APIUrl.vehicleCarPosition,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            this.$Indicator.close();
            if(response.data.length!=0)
            {
                this.map(response.data.longitude,response.data.latitude);
            }
            else
            {
                $(".maingp_map_lb").hide();
                $(".placewr_ws").show();
            }
        });
    }
}
</script>

