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
            <h3>1. 今日配送金额指的是什么金额？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>是您自己所有的客户当天总的下单金额。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>2. 我要怎么查看我的客户订单配送情况？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>在配送单页面及订单列表根据订单号收货人和手机号置顶查看。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>3. 我可以增加和审核我的用户吗？</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以在用户列表首页右上角增加用户按钮，可以自己新增用户，点击自己的客户也可审核和修改客户资料。</address>
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
};
</script>