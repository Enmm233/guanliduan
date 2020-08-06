<template>
<article class="main">
  <article class="adminis_ti">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">明细</section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisua_px">
      <!-- <address @click.navicon="adminisua_px" data-id="0">
              <cite>默认</cite>
              <aside>
                <i class="fa fa-caret-up "></i>
                <i class="fa fa-caret-down"></i>
              </aside>
            </address> -->
      <address @click.navicon="adminisua_px" data-id="1">
        <cite>时间</cite>
        <aside>
          <i :class="caret==1 ? 'fa fa-caret-up on': 'fa fa-caret-up'"></i>
          <i :class="caret==2 ? 'fa fa-caret-down on': 'fa fa-caret-down'"></i>
        </aside>
      </address>
      <address @click.navicon="adminisua_px" data-id="2">
        <cite>销售额</cite>
        <aside>
          <i :class="caret1==1 ? 'fa fa-caret-up on': 'fa fa-caret-up'"></i>
          <i :class="caret1==2 ? 'fa fa-caret-down on': 'fa fa-caret-down'"></i>
        </aside>
      </address>
      <address @click.navicon="adminisua_px" data-id="3">
        <cite>毛利率</cite>
        <aside>
          <i :class="caret2==1 ? 'fa fa-caret-up on': 'fa fa-caret-up'"></i>
          <i :class="caret2==2 ? 'fa fa-caret-down on': 'fa fa-caret-down'"></i>
        </aside>
      </address>
  </article>
  <section class="clear"></section>

  <article class="adminispd_list">
    <ol>
      <template v-for="(adminProfitDetail, index) in adminProfitDetail">
        <li>
          <section class="adminispd_list_b">
            <section class="adminispd_list_ti">
              <i class="iconfont icon-ico_home_committed"></i>
              <cite>{{ adminProfitDetail.send_time }}</cite>
            </section>
            <section class="adminispd_list_ad">
              <address><aside><dfn>销售额：</dfn><ruby class="adminispd_list_ads">{{ adminProfitDetail.total_price }}元</ruby></aside><aside><dfn>毛利率：</dfn><ruby class="adminispd_list_ads">{{ adminProfitDetail.lv }}%</ruby></aside></address>
              <address><aside><dfn>毛利：</dfn><ruby class="adminispd_list_ads1">{{ adminProfitDetail.profit_price }}元</ruby></aside><aside><dfn>成本：</dfn><ruby class="adminispd_list_ads1">{{ adminProfitDetail.cg_total_price }}元</ruby></aside></address>
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
      caret:0,
      caret1:0,
      caret2:0,
      cateType:0,
      sortType:0,
      adminProfitDetail:[],       // 毛利明细  
    }
  },
  methods: {
    // 排序搜索
    adminisua_px(){
        var cateType=event.currentTarget.getAttribute("data-id");
        var timeType=this.$route.query.id;
        if(cateType==0)
        {
            this.caret='';
            this.caret1='';
            this.caret2='';
            this.cateType='';
            this.sortType='';
        }
        if(cateType==1)
        {
            var pid=this.caret;
            this.caret1='';
            this.caret2='';
            this.cateType=cateType;
            if(pid=='')
            {
                this.caret=1;
                this.sortType=1;
            }
            if(pid==1)
            {
                this.caret=2;
                this.sortType=2;
            }
            if(pid==2)
            {
                this.caret=1;
                this.sortType=1;
            }
        }
        if(cateType==2)
        {
            var pid=this.caret1;
            this.caret='';
            this.caret2='';
            this.cateType=cateType;
            if(pid=='')
            {
                this.caret1=1;
                this.sortType=1;
            }
            if(pid==1)
            {
                this.caret1=2;
                this.sortType=2;
            }
            if(pid==2)
            {
                this.caret1=1;
                this.sortType=1;
            }
        }
        if(cateType==3)
        {
            var pid=this.caret2;
            this.caret='';
            this.caret1='';
            this.cateType=cateType;
            if(pid=='')
            {
                this.caret2=1;
                this.sortType=1;
            }
            if(pid==1)
            {
                this.caret2=2;
                this.sortType=2;
            }
            if(pid==2)
            {
                this.caret2=1;
                this.sortType=1;
            }
        }

        this.$Indicator.open('加载中...');
        // 毛利
        let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$get(APIUrl.adminProfitDetail,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:timeType,sortType:this.sortType,cateType:this.cateType,sign:sign})
          .then((response) => {
              this.$Indicator.close();
              this.adminProfitDetail=[];
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
                    this.adminProfitDetail=response.data;
              }
          });
    },
  },
  created(){
      this.$Indicator.open('加载中...');
      //   毛利
      var timeType=this.$route.query.id;
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.adminProfitDetail,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,timeType:timeType,sign:sign})
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
                    this.adminProfitDetail=response.data;
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