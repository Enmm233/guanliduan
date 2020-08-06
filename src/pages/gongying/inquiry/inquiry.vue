<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_tio">询价</section>
  </article>
  <article class="adminispu_se adminisiq_gew">
    <article class="adminisiq_se">
        <input type="text"  @focus.navicon='focus' placeholder="请输入商品名称、拼音、编码"  autocomplete="off">
    </article>
    <section class="clear"></section>
    <section class="adminisiq_ge">
        <cite>规格：</cite>
        <section class="adminisiq_i"><i class="fa fa-angle-down"></i></section>
        <input type="text" placeholder="请选择规格"  autocomplete="off" id="trigger1" readonly>
    </section>
    <section class="clear"></section>
  </article>
  <section class="adminisiq_geh"></section>
  <article class="adminis_gd"></article>
  
  <article class="adminisiq_list">
    <h3><dfn></dfn><cite>近5次供应单价</cite></h3>
    <section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>
    <section class="adminisiq_list_sj">
      <template v-for="(enquiry, index) in enquiry">
        <address><aside>{{ enquiry.created_at }}：</aside><dfn>￥{{ enquiry.p_price }}</dfn><ruby>元</ruby></address>
      </template>
    </section>
  </article>

  <!-- 遮罩 -->
  <section class="adminisiq_zo">
    <section class="adminisiq_zob">
      <template v-for="(searchItem, index) in searchItem">
        <template v-if="searchItem.attr.length==0">
          <a href="javascript:void(0);" :data-id="searchItem.id" :data-index="index" data-attr="0" @click.navicon="searchItem_s">{{ searchItem.title }}</a>
        </template>
        <template v-else>
          <a href="javascript:void(0);" :data-id="searchItem.id" :data-index="index" :data-attr="searchItem.attr[0].id" @click.navicon="searchItem_s">{{ searchItem.title }}</a>
        </template>
      </template>
    </section>
  </section>

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
      typew:0,
      searchItem:[],        // 询价搜索商品
      enquiry:[],           // 询价点击商品
    }
  },
  methods: {
    // 焦点显示
    focus(){
      $(".adminisiq_zo").show();
    },
    // 点击商品
    searchItem_s(){
        var that=this; 
        var attr_id=event.target.getAttribute("data-attr");
        var item_id=event.target.getAttribute("data-id");
        var index=event.target.getAttribute("data-index");
        $(".adminisiq_se input").val(event.target.innerText);
        $("#trigger1").val("");
        let sign=this.$md5('appid='+APIUrl.appid+'&attr_id='+attr_id+'&item_id='+item_id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.enquiry,{appid:APIUrl.appid,attr_id:attr_id,item_id:item_id,timeStamp:APIUrl.timeStamp,sign:sign})
            .then((response) => {
                this.enquiry=[]; 
                $(".mobileSelect").remove();
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
                    if(response.data.length==0)
                    {
                        $(".placewr_ws").show();
                    }
                    else
                    {
                        $(".placewr_ws").hide();
                        this.enquiry=response.data;
                    }
                    if(this.searchItem[index].attr.length==0)
                    {
                       var weekdayArr=[{id:'0',value:'/'}];
                       $("#trigger1").val("/");
                    }
                    else
                    {
                        var weekdayArr=this.searchItem[index].attr;
                        $("#trigger1").val(this.searchItem[index].attr[0].value);
                    }
                    // 下拉菜单
                    var mobileSelect1 = new MobileSelect({
                        trigger: '#trigger1',
                        title: '',
                        wheels: [
                                    {data: weekdayArr}
                                ],
                        position:[0], //初始化定位 打开时默认选中的哪个 如果不填默认为0
                        transitionEnd:function(indexArr, data){
                            //console.log(data);
                        },
                        callback:function(indexArr, data){
                            $("#trigger1").val(data[0].value)
                            let sign=that.$md5('appid='+APIUrl.appid+'&attr_id='+data[0].id+'&item_id='+item_id+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                              that.$get(APIUrl.enquiry,{appid:APIUrl.appid,attr_id:data[0].id,item_id:item_id,timeStamp:APIUrl.timeStamp,sign:sign})
                                .then((response) => {
                                    that.enquiry=[]; 
                                    if(response.code==401)
                                    {
                                        let signw=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                                        that.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                                          .then((response) => {
                                              that.$Toast({
                                                  message: '请重新登录',
                                                  duration: 1000
                                              });
                                              setTimeout(() => {
                                                  that.$store.commit(types.LOGOUT)
                                                  that.$router.push("/");
                                              },1500)
                                          });
                                          return false
                                    }
                                    else if(response.code==200)
                                    {
                                        that.enquiry=response.data;
                                    }
                                });
                        }
                    });
                    $(".adminisiq_zo").hide();
                }
            });
    }
  },
  mounted() {
    var that=this;
    $(".placewr_ws").show();
    // 实时监听键盘
    $(document).off("input propertychange").on("input propertychange",".adminisiq_se input",function(){
      var keyword=$(".adminisiq_se input").val();
      let sign=that.$md5('appid='+APIUrl.appid+'&keyword='+keyword+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      that.$get(APIUrl.searchItem,{appid:APIUrl.appid,keyword:keyword,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            that.searchItem=[]; 
            if(response.code==401)
            {
                let signw=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                that.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                  .then((response) => {
                      that.$Toast({
                          message: '请重新登录',
                          duration: 1000
                      });
                      setTimeout(() => {
                          that.$store.commit(types.LOGOUT)
                          that.$router.push("/");
                      },1500)
                  });
                  return false
            }
            else if(response.code==200)
            {
                that.searchItem=response.data;
            }
        });
    });
  },
};
</script>