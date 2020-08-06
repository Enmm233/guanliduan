<template>
<article class="main">
  <article class="adminis_ti">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">采购单详情</section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisde_dh">
    <h3>单号：{{ buyerListDetail.order_sn }}</h3>
    <section class="adminisde_dhg">
      <address>
        <aside><ruby>供 应 商：</ruby><dfn>{{ buyerListDetail.suppler_name }}</dfn></aside>
        <template v-if="buyerListDetail.type==1">
          <aside><ruby class="adminisde_dhg_w">类型：</ruby><dfn>计划采购</dfn></aside>
        </template>
        <template v-if="buyerListDetail.type==2">
          <aside><ruby class="adminisde_dhg_w">类型：</ruby><dfn>临时采购</dfn></aside>
        </template>
      </address>
      <address><aside><ruby>采购金额：</ruby><dfn class="on">￥{{ buyerListDetail.amout }}</dfn></aside></address>
    </section>
    <section class="adminisde_dhz">
      <template v-if="buyerListDetail.status==0">
        <aside>状态：采购中</aside>
      </template>
      <template v-if="buyerListDetail.status==1">
        <aside>状态：已完成</aside>
      </template>
      <template v-if="buyerListDetail.status==2">
        <aside>状态：已取消</aside>
      </template>
      <aside>创建时间：{{ buyerListDetail.created_at }}</aside>
    </section>
    <section class="clear"></section>
  </article>
  
  <article class="adminisde_list">
    <ol>
      <template v-for="(purchase_list, index) in buyerListDetail.purchase_list">
        <li>
            <section class="adminis_gd1"></section>
            <section class="adminisde_list_ba">
                <section class="adminisde_list_ti"><dfn></dfn><cite>{{ purchase_list.item_title }}</cite>
                <template v-if="purchase_list.status==0">
                  <aside class="adminisde_list_tis1">采购中</aside>
                </template>
                <template v-if="purchase_list.status==1">
                  <aside class="adminisde_list_tis1">已完成</aside>
                </template>
                <template v-if="purchase_list.status==2">
                  <aside class="adminisde_list_tis1">已取消</aside>
                </template>
                </section>
                <section class="adminisde_list_ad">
                    <template v-if="purchase_list.attr_title==''">
                        <address><aside>规格</aside><dfn>/</dfn></address>
                    </template>
                    <template v-else>
                        <address><aside>规格</aside><dfn>{{ purchase_list.attr_title }}</dfn></address>
                    </template>
                  <address><aside>需采量</aside><dfn>{{ purchase_list.amount }}{{ purchase_list.item_unit }}</dfn></address>
                  <address><aside>备注</aside><dfn>{{ purchase_list.remark }}</dfn></address>
                </section>
                <section class="adminisde_list_cl">
                  <aside>实采量：<dfn>{{ purchase_list.p_num }}</dfn></aside>
                  <aside>单价：<dfn>{{ purchase_list.p_price }}</dfn></aside>
                  <aside>合计：<dfn>{{ purchase_list.total_price }}</dfn></aside>
                </section>
            </section>
        </li>
      </template>
    </ol>
  </article>

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
      buyerListDetail:[],      // 采购单详情
    }
  },
  created(){
      this.$Indicator.open('加载中...');
      // 获取采购单详情
      var id=this.$route.query.id;
      let sign=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.buyerListDetail,{appid:APIUrl.appid,id:id,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.buyerListDetail=response.data;
            }
        });
  }
};
</script>