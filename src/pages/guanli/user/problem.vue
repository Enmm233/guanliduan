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
            <h3>1. 首页的数据是根据哪里来计算的?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>首页的数据跟我们系统后台的首页是一样的!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>2. 可以按时间来查看吗?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以按一周来查,也可以按月来查。</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>3. 毛利可以看到明细吗?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以的,在右上角有个明细,点击进去就可以看到了!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>4. 用户明细可以看到吗?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>在右上角有个明细,点击进去就可以看到了!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>5. 采购员每天买的金额看的到吗?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>点击采购员,就可以看到,当天的和本月的还有上个月的!</address>
            <section class="clear"></section>
            <section class="adminis_gd1"></section>
            <section class="clear"></section>
          </li>
          <li>
            <h3>6. 可以看到有谁在我们系统操作了嘛?</h3>
            <section class="clear"></section>
            <cite>答：</cite>
            <address>可以的在我的页面有个操作记录可以看到有谁在后天系统里面进行了操作!</address>
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