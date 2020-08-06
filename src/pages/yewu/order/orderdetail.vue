<template>
<article class="main">
  <article class="adminis_ti">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">订单详情</section>
    <section class="adminisdt_tir">
        <template v-if="salesmanListDetail.order_status==0">
         <dfn></dfn>待审核
         <!-- <aside @click.navicon="adminisdt_qrh">审核</aside> -->
        </template>
        <template v-if="salesmanListDetail.order_status==1">
          <dfn></dfn>备货中
        </template>
        <template v-if="salesmanListDetail.order_status==2">
          <dfn></dfn>配送中
        </template>
        <template v-if="salesmanListDetail.order_status==3">
          <dfn></dfn>已收货
        </template>
        <template v-if="salesmanListDetail.order_status==4">
          <dfn></dfn>已取消
        </template>
    </section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisdt_dh">
    <h3>单号：{{ salesmanListDetail.order_sn }}</h3>
    <section class="adminisdt_dhd">
      <address><dfn>单位名称：</dfn><aside>{{ salesmanListDetail.nickname }}</aside></address>
      <address><dfn>配送时间：</dfn><aside>{{ salesmanListDetail.send_time }}</aside></address>
      <address><dfn>收货人：</dfn><aside>{{ salesmanListDetail.contact }}</aside></address>
      <address><dfn>配送金额：</dfn><aside class="on">￥{{ salesmanListDetail.total_price }}</aside></address>
      <address><dfn>手机：</dfn><aside>{{ salesmanListDetail.mobile }}</aside><a :href="'tel:'+salesmanListDetail.mobile"><i class="fa fa-phone-square"></i></a></address>
      <address class="adminisdt_dhd_w"><dfn>收货地址：</dfn><aside>{{ salesmanListDetail.address }}</aside></address>
      <section class="clear"></section>
    </section>
    <section class="adminisdt_dhb">
      <aside>备注：</aside>
      <address>{{ salesmanListDetail.remark }}</address>
      <section class="clear"></section>
    </section>
    <section class="clear"></section>
  </article>
  
  <article class="adminisde_list">
    <ol>
      <template v-for="(order_list, index) in salesmanListDetail.order_list">
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
  
  <article class="mint_msgboxw" v-if="showPrise">
    <section class="mint-msgboxw">
        <section class="mint-msgbox-headerw">
            <section class="mint-msgbox-titlew">审核</section>
        </section> 
        <section class="mint-msgbox-contentw">
            <section class="mint-msgbox-messagew">
                <input type="hidden" name="" id="type" value="1">
                <section class="placean">
                  <section data-id="1" class="placean_se on" @click.navicon="placean_se"><i class="fa fa-check-circle"></i><ruby>审核成功</ruby></section>
                  <section data-id="2" class="placean_se" @click.navicon="placean_se"><i class="fa fa-circle-thin"></i><ruby>审核失败</ruby></section>
                </section>
            </section> 
        </section> 
        <section class="clear"></section>
        <section class="mint-msgbox-btnsw">
            <button class="mint-msgbox-btnw mint-msgbox-cancelw"  @click.navicon="placean_qx">取消</button> 
            <button class="mint-msgbox-btnw mint-msgbox-confirmw"  @click.navicon="placean_qd">确定</button>
        </section>
    </section>
    <section class="v-modalw"></section>
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
	  showPrise:false,
      salesmanListDetail:[],      // 订单详情
    }
  },
  methods: {
      // 勾选
      placean_se(){
         var id=event.currentTarget.getAttribute("data-id");
         $(".placean .placean_se").removeClass("on");
         $(".placean .placean_se i").removeClass("fa-check-circle");
         $(".placean .placean_se i").removeClass("fa-circle-thin");
         $(".placean .placean_se i").addClass("fa-circle-thin");
         $(".placean .placean_se[data-id="+id+"]").addClass("on");
         $(".placean .placean_se[data-id="+id+"] i").removeClass("fa-circle-thin");
         $(".placean .placean_se[data-id="+id+"] i").addClass("fa-check-circle");
         $("#type").val(id)
      },
      // 确认审核
      adminisdt_qrh(){
          this.showPrise=true; 
      },
      // 取消
      placean_qx(){
          this.showPrise=false;
      },
      // 确定
      placean_qd(){
          this.$Indicator.open('加载中...');
          var id=this.$route.query.id;
          var type=$("#type").val();
          let sign=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+'&type='+type+APIUrl.appsecret);
          this.$get(APIUrl.salesmanModifyOrderStatus,{appid:APIUrl.appid,id:id,type:type,timeStamp:APIUrl.timeStamp,sign:sign})
            .then((response) => {
                this.$Indicator.close();
                this.showPrise=false;
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
                        message: '审核成功',
                        duration: 1000
                    });
                    if(type==1)
                    {
                        $(".adminisdt_tir").html('<dfn></dfn>备货中');
                    }
                    if(type==2)
                    {
                        $(".adminisdt_tir").html('<dfn></dfn>已取消');
                    }
                }
            });
      },
  },
  created(){
      this.$Indicator.open('加载中...');
      // 获取订单详情
      var id=this.$route.query.id;
      let sign=this.$md5('appid='+APIUrl.appid+'&id='+id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.salesmanListDetail,{appid:APIUrl.appid,id:id,timeStamp:APIUrl.timeStamp,sign:sign})
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
                this.salesmanListDetail=response.data;
            }
        });
  }
};
</script>