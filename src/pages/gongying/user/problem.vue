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
            <h3>1.为什么首页的今日完成和其他的东西点不开?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>首页的数据只是用来看的,看完成了哪些,哪些未完成,具体的操作在采购,采购单,询价里面!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>2. 为什么我输入的菜品不能置顶?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>只能把今天需要采购的菜品进行置顶,方便查看!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>3. 菜品的合计自动计算的吗?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>是的菜品的合计是根据,前面的数量乘以单价来实时计算的!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>4. 为什么今日供应是空白的?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>因为今日供应只会显示今天供应商需要供应的商品,其他日期的则不会显示!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>5. 可以看到以前的供应单嘛?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以的在采购单页面就可以看到以前所有的供应单!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>6. 可以看到以前的供应单价嘛?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以的在询价页面可以看到以前的商品的供应单价!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>7. 为什么账单里面看不到供应单的详情?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>账单里面主要是用来核对账单的,要看供应单的详情和商品价格的话到供应单页面里面有!</address>
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