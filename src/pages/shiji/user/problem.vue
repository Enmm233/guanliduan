<template>
<article class="main">
   <article class="adminis_ti">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">常见问题</section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminispr_list">
    <ol>
          <li>
            <h3>1. 司机在哪里绑定需要配送的订单？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>在移动端首页左上角扫一扫按钮，点击扫码扫配送单上的二维码进行绑定需要配送的客户。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>2. 订单列表如何找到我需要的订单，和查看详情？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>订单列表上方可根据订单号收货人，单位，日期查看您所配送的订单及详情。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>3. 配送线路可以自己调配和选择吗？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>点击线路，上下拖动可调配配送顺序。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>4. 我能看到车辆在哪个位置？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以，点击我的。查看车辆位置百度地图可实时查看车辆实时位置。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>5. 我如何确认送达客户？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>首页扫一扫按钮再扫一次显示商品详情可在右上角确认收货。也可在配送单你点击详情 ，及订单列表详情页右上角确认收货。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
        </ol>
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
      
    }
  },
  methods: {
   
  },
  mounted() {
    
  },
  created(){
    
  }
};
</script>