<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_tio">配送单</section>
  </article>
  <article class="adminispu_se">
    <section class="adminispu_seb">
      <input type="text" placeholder="订单号、收货人、手机等" autocomplete="off">
      <cite class="adminispu_seb_zd" @click.navicon=""><dfn>置顶</dfn></cite>
    </section>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>

  <article class="adminisdl_list adminiszd_list">
    <ol>
      <template v-for="(salesmanList, index) in salesmanList">
        <li>
          <section class="adminisdl_list_ba">
              <section class="adminisdl_list_t">
                <cite>单号：{{ salesmanList.order_sn }}</cite>
                <template v-if="salesmanList.order_status==0">
                  <dfn class="adminisdl_list_ds3">待审核</dfn>
                </template>
                <template v-if="salesmanList.order_status==1">
                  <dfn class="adminisdl_list_ds1">备货中</dfn>
                </template>
                 <template v-if="salesmanList.order_status==2">
                  <dfn class="adminisdl_list_ds2">配送中</dfn>
                </template>
                <template v-if="salesmanList.order_status==3">
                  <dfn class="adminisdl_list_ds4">已收货</dfn>
                </template>
                <template v-if="salesmanList.order_status==4">
                  <dfn class="adminisdl_list_ds5">已取消</dfn>
                </template>

              </section>
              <section class="adminisdl_list_s">
                <a :href="'tel:'+salesmanList.mobile" class="adminisdl_list_sa"><i class="fa fa-phone-square"></i></a>
                <router-link :to="'/yewu_deliverydetail?id='+salesmanList.id">
                  <address>收货人：{{ salesmanList.contact }}</address>
                  <address>收货手机：{{ salesmanList.mobile }}</address>
                  <address>单位名称：{{ salesmanList.nickname }}</address>
                  <address>收货地址：{{ salesmanList.address }}</address>
                </router-link>
                <section class="clear"></section>
              </section>
           </section>
           <section class="adminis_gd1"></section>
        </li>
      </template>
    </ol>
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
  components: {
    'footerw': () => import('../public/footerw.vue'), // 底部导航
    'judge': () => import('../public/judge.vue') // 判断加背景颜色
  },
  data () {
    return {
      salesmanList: [] // 配送单
    }
  },
  methods: {

  },
  created () {
    this.$Indicator.open('加载中...')
    // 获取配送单
    let sign = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret)
    this.$get(APIUrl.salesmanList, {appid: APIUrl.appid, timeStamp: APIUrl.timeStamp, sign: sign})
      .then((response) => {
        this.$Indicator.close()
        if (response.code == 401) {
          let signw = this.$md5('appid=' + APIUrl.appid + '&timeStamp=' + APIUrl.timeStamp + APIUrl.appsecret)
          this.$get(APIUrl.logout, {appid: APIUrl.appid, timeStamp: APIUrl.timeStamp, sign: signw})
            .then((response) => {
              this.$Toast({
                message: '请重新登录',
                duration: 1000
              })
              setTimeout(() => {
                this.$store.commit(types.LOGOUT)
                this.$router.push('/')
              }, 1500)
            })
          return false
        } else if (response.code == 200) {
          if (response.data.length != 0) {
            this.salesmanList = response.data
          } else {
            $('.placewr_ws').show()
          }
        }
      })
  }
}
</script>
