<template>
<article class="main">
   <article class="adminis_ti adminis_ti1">
    <section class="adminis_tio">用户列表</section>
    <section class="adminisac_tir"><router-link to="/yewu_accountadd"><i class="fa fa-plus-square-o"></i></router-link></section>
  </article>
  
  <article class="adminispu_se">
    <form @submit.prevent="submit"  action="">
      <section class="adminispo_sel">
        <input type="text" name="keyword" placeholder="联系人、手机、单位名称" v-model="inputtext.keyword"  autocomplete="off" >
        <button type="submit"><i class="iconfont  icon-sousuo"></i></button>
      </section>
    </form>
  </article>
  <section class="adminispu_seh"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisat_list" data-page="1">
    <ol>
        <template v-for="(salesmanMemberList, index) in salesmanMemberList">
            <li>
                <!-- <mt-cell-swipe
                :right="[
                    {
                        content: '删除',
                        style: { width: '1.4rem'},
                        handler: () => deleteSection(salesmanMemberList.id,index)
                    }
                ]"> -->
                <section class="adminisat_list_ba">
                    <router-link :to="'/yewu_accountedit?id='+salesmanMemberList.id">
                    <section class="adminisat_list_l"><a :href="'tel:'+salesmanMemberList.mobile"><i class="fa fa-phone-square"></i></a></section>
                    <section class="adminisat_list_o">
                        <template v-if="salesmanMemberList.status==0">
                            <address><aside>{{ salesmanMemberList.contact }}</aside></address>
                        </template>
                        <template v-if="salesmanMemberList.status==1">
                            <address><aside class="adminisat_list_se">{{ salesmanMemberList.contact }}</aside></address>
                        </template>
                        <address><aside>{{ salesmanMemberList.mobile }}</aside><aside class="adminisat_list_ow">{{ salesmanMemberList.nickname }}</aside></address>
                    </section>
                    <section class="adminisat_list_r">{{ salesmanMemberList.date }}</section>
                    </router-link>
                </section>
                <section class="adminis_gd1"></section>
            <!-- </mt-cell-swipe> -->
            </li>
      </template>
    </ol>
  </article>

  <section class="placewr_ws"><img src="../../../../static/img/adminis_pic9.png" alt=""/><cite>亲，目前暂无数据～</cite></section>

  <article class="vueappsy_mode">
    <mt-spinner type="fading-circle" color="#bdbdbd" :size="20"></mt-spinner>
    <cite>上拉加载更多</cite>
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
      inputtext:{
        keyword:'',
      },
      salesmanMemberList:[],       // 订单列表  
    }
  },
  methods: {
    // 删除
    deleteSection(id,index) {
      console.log(id,index);
    },
    //表单提交
    submit: function() { 
          this.$Indicator.open('加载中...');
          // 采购单
          var keyword=this.inputtext.keyword;
		  $(".adminisat_list").attr("data-page",1);
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.salesmanMemberList,{appid:APIUrl.appid,keyword:keyword,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.salesmanMemberList=[];
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
                      $(".placewr_ws").hide();
                      $(".vueappsy_mode").show();
                      this.salesmanMemberList=response.data;
                      if(response.data.length<=7)
                      {
                          $(".vueappsy_mode cite").html("已加载完");
                      }
                  }
                  else
                  {
                      $(".placewr_ws").show();
                      $(".vueappsy_mode").hide();
                  }
              }
          });
    },
    //商品流加载
    scrolle() {
      var that=this;
      $(window).off("scroll").on('scroll',function(){   
        var page=parseInt($(".adminisat_list").attr("data-page")); 
        var nDivHight = $(document).height();
        var nScrollTop = $(this).scrollTop();
        var nScrollHight = $(this).height();
        if(parseInt(nScrollTop) + parseInt(nScrollHight) >= nDivHight-3)  
          {
                if(that.$route.name=='yewu_account')
                {
                    that.$Indicator.open('加载中...');
                    var keyword=that.inputtext.keyword;
                    let sign1=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    $(".vueappsy_mode .mint-spinner-fading-circle").css({"display":"inline-block"});
                    that.$get(APIUrl.salesmanMemberList,{appid:APIUrl.appid,keyword:keyword,page:(page+1),timeStamp:APIUrl.timeStamp,sign:sign1})
                    .then((response) => {
                      that.$Indicator.close();
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
                          if(response.data.length!=0)
                          {
                              for( var i=0;i<response.data.length;i++)
                              {
                                  that.salesmanMemberList.push(response.data[i]);
                              }
                              $(".adminisat_list").attr("data-page",(page+1));
                              $(".vueappsy_mode .mint-spinner-fading-circle").hide();
                          }
                          else
                          {
                              $(".vueappsy_mode .mint-spinner-fading-circle").hide();
                              $(".vueappsy_mode cite").html("已加载完");
                          }
                      }
                    })
                }
          }
      });
    },
  },
  mounted() {
    this.scrolle();
  },
  created(){
      this.$Indicator.open('加载中...');
      // 用户列表
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.salesmanMemberList,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
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
                    this.salesmanMemberList=response.data;
                    if(response.data.length<=7)
                    {
                        $(".vueappsy_mode cite").html("已加载完");
                    }
                }
                else
                {
                    $(".placewr_ws").show();
                    $(".vueappsy_mode").hide();
                }
            }
        });
  }
};
</script>