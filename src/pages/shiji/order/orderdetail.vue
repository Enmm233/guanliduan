<template>
<article class="main">
  <article class="adminis_ti">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">订单详情</section>
    <section class="adminisdt_tir">
      <template v-if="vehicleListDetail.vehicle_id==0">
        <aside @click.navicon="adminisdt_bdo">绑定订单</aside>
      </template>
      <template v-else>
        <template v-if="vehicleListDetail.order_status==0">
         <dfn></dfn>待审核
        </template>
        <template v-if="vehicleListDetail.order_status==1">
          <dfn></dfn>备货中
        </template>
        <template v-if="vehicleListDetail.order_status==2">
          <aside @click.navicon="adminisdt_qrs">确认收货</aside>
        </template>
        <template v-if="vehicleListDetail.order_status==3">
          <dfn></dfn>已收货
        </template>
        <template v-if="vehicleListDetail.order_status==4">
          <dfn></dfn>已取消
        </template>
      </template>
    </section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisdt_dh">
    <h3>单号：{{ vehicleListDetail.order_sn }}</h3>
    <section class="adminisdt_dhd">
      <address><dfn>单位名称：</dfn><aside>{{ vehicleListDetail.nickname }}</aside></address>
      <address><dfn>配送时间：</dfn><aside>{{ vehicleListDetail.send_time }}</aside></address>
      <address><dfn>收货人：</dfn><aside>{{ vehicleListDetail.contact }}</aside></address>
      <address><dfn>配送金额：</dfn><aside class="on">￥{{ vehicleListDetail.total_price }}</aside></address>
      <address><dfn>手机：</dfn><aside>{{ vehicleListDetail.mobile }}</aside><a :href="'tel:'+vehicleListDetail.mobile"><i class="fa fa-phone-square"></i></a></address>
      <address class="adminisdt_dhd_w"><dfn>收货地址：</dfn><aside>{{ vehicleListDetail.address }}</aside></address>
      <section class="clear"></section>
    </section>
    <section class="adminisdt_dhb">
      <aside>备注：</aside>
      <address>{{ vehicleListDetail.remark }}</address>
      <section class="clear"></section>
    </section>
    <section class="clear"></section>
  </article>
  
  <article class="adminisde_list">
    <ol>
      <template v-for="(order_list, index) in vehicleListDetail.order_list">
        <li>
            <section class="adminis_gd1"></section>
            <section class="adminisde_list_ba">
                <section class="adminisde_list_ti"><dfn></dfn><cite>{{ order_list.item_title }}</cite>
                <template v-if="order_list.status==0">
                  <aside class="adminisde_list_tis2">未分拣</aside>
                </template>
                <template v-if="order_list.status==1">
                  <aside class="adminisde_list_tis1">已分拣</aside>
                </template>
                </section>
                <section class="adminisde_list_ad">
                  <template v-if="order_list.attr_title==''">
                      <address><aside>规格</aside><dfn>/</dfn></address>
                  </template>
                  <template v-else>
                      <address><aside>规格</aside><dfn>{{ order_list.attr_title }}</dfn></address>
                  </template>
                  <address><aside>预定量</aside><dfn>{{ order_list.num }}{{ order_list.item_unit }}</dfn></address>
                  <address><aside>配送量</aside><dfn>{{ order_list.weight }}{{ order_list.item_unit }}</dfn></address>
                  <address><aside>备注</aside><dfn>{{ order_list.remark }}</dfn></address>
                </section>
            </section>
        </li>
      </template>
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
      vehicleListDetail:[],      // 订单详情
    }
  },
  methods: {
        // 确认收货
        adminisdt_qrs(){
          this.$MessageBox.confirm('', { 
            message: '确定要收货吗？', 
            title: '提示', 
            }).then(action => { 
              if (action == 'confirm') {     //确认的回调
                  var id=this.$route.query.id;
                  let sign=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                  this.$get(APIUrl.vehicleModifyOrderStatus,{appid:APIUrl.appid,id:id,timeStamp:APIUrl.timeStamp,sign:sign})
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
                            this.$Toast({
                                message: '收货成功',
                                duration: 1000
                            });
                            $(".adminisdt_tir").html('<dfn></dfn>已收货');
                        }
                    });
                }
            });
        },
        // 绑定订单
        adminisdt_bdo(){
          this.$MessageBox.confirm('', { 
            message: '确定要绑定订单吗？', 
            title: '提示', 
            }).then(action => { 
              if (action == 'confirm') {     //确认的回调
                  var id=this.$route.query.id;
                  let sign=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                  this.$get(APIUrl.vehicleBindOrder,{appid:APIUrl.appid,id:id,timeStamp:APIUrl.timeStamp,sign:sign})
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
                            this.$Toast({
                                message: '绑定订单成功',
                                duration: 1000
                            });
                            location.reload();
                        }
                    });
                }
            });
        }
    },
  created(){
      this.$Indicator.open('加载中...');
      // 获取订单详情
      var id=this.$route.query.id;
      let sign=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.vehicleListDetail,{appid:APIUrl.appid,id:id,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.vehicleListDetail=response.data;
            }
        });
  }
};
</script>