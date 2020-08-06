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
            <h3>1. 为什么首页的今日完成和其他的东西点不开?</h3>
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
            <h3>4. 今日采购右边有个供应商是干嘛的?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>根据现场情况,比如供应商突然不供应了,或者一些其他的情况需要我们采购员把供应商的商品进行采购,就可以点击供应商,然后选中即可把供应商的商品,放到我们这个采购员里面,就可以采购了!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>5. 为什么今日采购是空白的?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>因为今日采购只会显示今天这个采购员需要采购的商品,其他日期的则不会显示!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>6. 可以看到以前的采购单嘛?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以的在采购单页面就可以看到以前所有的采购单</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>7. 可以看到以前的采购单价嘛?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以的在询价页面可以看到以前的商品的采购单价!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>8. 为什么账单里面看不到采购单的详情?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>账单里面主要是用来核对账单的,要看采购单的详情和商品价格的话到采购单页面里面有!</address>
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