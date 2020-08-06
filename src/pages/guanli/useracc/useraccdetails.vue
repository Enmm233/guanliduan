<template>
<article class="main">
  <article class="adminis_ti adminis_ti1">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">明细</section>
  </article>
  <article class="adminispu_se">
    <section class="adminispu_seb">
      <input type="text"  autocomplete="off">
      <cite class="adminispu_seb_zd" @click.navicon=""><dfn>置顶</dfn></cite>
    </section>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminispd_list adminiszd_list">
    <ol>
      <template v-for="(adminListDetail, index) in adminListDetail">
        <li>
          <section class="adminispd_list_b">
            <section class="adminispd_list_ti">
              <i class="iconfont icon-dalou4"></i>
              <cite>单位名称：<ruby>{{ adminListDetail.nickname }}</ruby></cite>
            </section>
            <section class="adminispd_list_ad">
              <address><aside><dfn>销售额：</dfn><ruby class="adminispd_list_ads">{{ adminListDetail.price }}元</ruby></aside><aside><dfn>毛利率：</dfn><ruby class="adminispd_list_ads">{{ adminListDetail.lv }}%</ruby></aside></address>
              <address><aside><dfn>毛利：</dfn><ruby class="adminispd_list_ads1">{{ adminListDetail.profit_price }}元</ruby></aside><aside><dfn>成本：</dfn><ruby class="adminispd_list_ads1">{{ adminListDetail.cg_price }}元</ruby></aside></address>
            </section>
          </section>
          <section class="adminispd_list_h"></section>
          <section class="clear"></section>
        </li>
      </template>
    </ol>
  </article>
  
  <section class="placewr_ws"><img src="images/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>

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
      adminListDetail:[],   // 用户明细
    }
  },
  created(){
      this.$Indicator.open('加载中...');
      //  用户明细
      var timeType=this.$route.query.id;
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.adminListDetail,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:timeType,sign:sign})
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
                if(response.data.length!=0)
                {
                    this.adminListDetail=response.data;
                }
                else
                {
                    $(".placewr_ws").show();
                }
            }
          });
    }
};
</script>