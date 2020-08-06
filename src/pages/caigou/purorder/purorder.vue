<template>
  <article class="main">
    <article class="adminis_ti adminis_ti1">
      <section class="adminis_tio">采购单</section>
    </article>
    <article class="adminispu_se">
      <form @submit.prevent="submit" action="">
        <section class="adminispo_sel">
          <input type="text" name="created_at" placeholder="" id="selete_date" autocomplete="off" readonly>
          <button type="submit"><i class="iconfont  icon-sousuo"></i></button>
        </section>
      </form>
    </article>
    <section class="adminispu_seh"></section>
        
    <section class="adminis_gd"></section>
    <article class="adminispu_list_tab">
      <div v-for="item in tab_list" :class="{adminispu_list_tab_on:list_status == item.status}" @click="statusClick(item.status)">
        {{item.name}}
      </div>
    </article>
    <article class="adminispo_list" data-page="1">
      <ol>
        <template v-for="(buyerList, index) in buyerList">
          <li>
            <section class="adminispo_list_ba">
              <router-link :to="'/caigou_purorderdetail?id='+buyerList.id">
                <section class="adminispo_list_d">
                  <cite>单号：{{ buyerList.order_sn }}</cite>
                  <template v-if="buyerList.status==0">
                    <dfn class="adminispo_list_ds2">采购中</dfn>
                  </template>
                  <template v-if="buyerList.status==1">
                    <dfn class="adminispo_list_ds1">已完成</dfn>
                  </template>
                  <template v-if="buyerList.status==2">
                    <dfn class="adminispo_list_ds3">已取消</dfn>
                  </template>
                </section>
                <section class="clear"></section>
                <section class="adminispo_list_s">
                  <aside>时间：{{ buyerList.created_at }}</aside>
                  <aside>供应商：{{ buyerList.supplier_name }}</aside>
                </section>
              </router-link>
            </section>
            <section class="adminis_gd1"></section>
          </li>
        </template>
      </ol>
    </article>

    <section class="placewr_ws"><img :src="bitmap" alt="" /><cite>亲，目前暂无数据～</cite></section>

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
      bitmap:require('../../../../static/img/adminis_pic9.png'),
      buyerList:[], // 供应单
				//tab
				tab_list: [{
						name: '采购中',
						status: 0
					},
					{
						name: '已完成',
						status: 1
					},
					{
						name: '已取消',
						status: 2
					}
				],
      //选中状态
      list_status: 0,
    }
    },
		methods: {
			statusClick(data) {
				if(this.list_status != data) {
					this.list_status = data
					this.onCreated()
				}
			},
    //表单提交
    submit: function() {
          this.$Indicator.open('加载中...');
          // 采购单
          this.buyerList = [];
          $(".vueappsy_mode cite").html("");
          var created_at=$("#selete_date").val();
		  $(".adminispo_list").attr("data-page",1);
          let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.buyerList,{appid:APIUrl.appid,created_at:created_at,status: this.list_status,timeStamp:APIUrl.timeStamp,page:1,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.buyerList=[];
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
                      this.buyerList=response.data;
                      if(response.data.length<=4)
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
        var page=parseInt($(".adminispo_list").attr("data-page"));
        var nDivHight = $(document).height();
        var nScrollTop = $(this).scrollTop();
        var nScrollHight = $(this).height();
        if(parseInt(nScrollTop) + parseInt(nScrollHight) >= nDivHight-3)
          {
                if(that.$route.name=='caigou_purorder')
                {
                    that.$Indicator.open('加载中...');
                    var created_at=$("#selete_date").val();
                    let sign1=that.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                    $(".vueappsy_mode .mint-spinner-fading-circle").css({"display":"inline-block"});
                    that.$get(APIUrl.buyerList,{appid:APIUrl.appid,page:(page+1),created_at:created_at,status: that.list_status,timeStamp:APIUrl.timeStamp,sign:sign1})
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
                                  that.buyerList.push(response.data[i]);
                              }
                              $(".adminispo_list").attr("data-page",(page+1));
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
    onCreated(){
    	this.$Indicator.open('加载中...');
      // 获取采购单列表
      this.buyerList = [];
      $(".vueappsy_mode cite").html("");
      var created_at=$("#selete_date").val();
      console.log
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.buyerList,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,page:1,created_at:created_at,status: this.list_status,sign:sign})
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
                      $(".placewr_ws").hide();
                      $(".vueappsy_mode").show();
                      this.buyerList=response.data;
                      if(response.data.length<=4)
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
  },
  mounted() {
    this.scrolle();
     // 选择时间
    var calendar = new LCalendar();
		calendar.init({
			'trigger': '#selete_date', //标签id
			'type': 'date', //date 调出日期选择 datetime 调出日期时间选择 time 调出时间选择 ym 调出年月选择,
			'minDate': (new Date().getFullYear()-13) + '-' + 1 + '-' + 1, //最小日期
			'maxDate': (new Date().getFullYear()+3) + '-' + 12 + '-' + 31 //最大日期
		});
  },
  created(){
      this.onCreated()
  }
};
</script>
<style type="text/css">

</style>
