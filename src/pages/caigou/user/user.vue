<template>
<article class="main">
   <article class="adminis_ti">
    <section class="adminis_tio">个人中心</section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  
  <article class="adminisus_list">
    <section class="adminisus_list_m">
      <address>姓名：{{ mine.name }}</address>
      <address>手机：{{ mine.mobile }}</address>
    </section>
    <section class="clear"></section>
    <ol>
      <li><router-link to="/caigou_change"><img src="../../../../static/img/adminis_pic.png" alt=""/><cite>修改密码</cite><i class="fa fa-angle-right"></i></router-link></li>
      <section class="adminis_gd1"></section>
      <li><router-link to="/caigou_problem"><img src="../../../../static/img/adminis_pic1.png" alt=""/><cite>常见问题</cite><i class="fa fa-angle-right"></i></router-link></li>
      <section class="adminis_gd1"></section>
      <li><router-link to="/caigou_monthly"><img src="../../../../static/img/adminis_pic2.png" alt=""/><cite>各月账单</cite><i class="fa fa-angle-right"></i></router-link></li>
      <section class="adminis_gd1"></section>
      <li><a href="javascript:void(0);" class="adminisus_list_p" @click.navicon="adminisus_list_p"><img src="../../../../static/img/adminis_pic3.png" alt=""/><cite>绑定微信</cite><i class="fa fa-angle-right"></i></a></li>
      <section class="adminis_gd1"></section>
      <li><a href="javascript:void(0);" class="adminisus_list_e" @click.navicon="adminisus_list_e"><img src="../../../../static/img/adminis_pic4.png" alt=""/><cite>退出登录</cite><i class="fa fa-angle-right"></i></a></li>
    </ol>
  </article>

  <judge></judge>
  <footerw></footerw>
  <weiapi></weiapi>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'


export default {
  components:{
    'footerw':()=>import('../public/footerw.vue'),   // 底部导航
    'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
    'weiapi':()=>import('../../login/weiapi.vue'),   // 验证微信
  },
  data () {
    return {
      mine:[],    // 我的信息
    }
  },
  methods: {
      // 退出登录
      adminisus_list_e(){
        this.$MessageBox.confirm('', { 
            message: '确定要退出登录吗？', 
            title: '提示', 
            }).then(action => { 
            if (action == 'confirm') {     //确认的回调
              let signw=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                this.$get(APIUrl.logout,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:signw})
                .then((response) => {
                    this.$Toast({
                      message: '退出成功',
                      duration: 1000
                    });
                    setTimeout(() => {
                      this.$store.commit(types.LOGOUT)
                      this.$router.push("/");
                    },1500)
                });
            }
          });
      },
      // 绑定微信
      adminisus_list_p(){
          let url="http://"+window.location.host+'/Mobile#/caigou_user';
          var urle='https://open.weixin.qq.com/connect/oauth2/authorize?appid='+this.mine.appid+'&redirect_uri='+encodeURIComponent(url)+'&response_type=code&scope=snsapi_base#wechat_redirect';
              window.location.href=urle;
      },
      // 判断有没有微信code
      GetUrlParam(paraName) {
          var url = document.location.toString();
          var arrObj = url.split("?");

            if (arrObj.length > 1) {
    　　　　　　var arrPara = arrObj[1].split("&");
    　　　　　　var arr;

    　　　　　　for (var i = 0; i < arrPara.length; i++) {
    　　　　　　　　arr = arrPara[i].split("=");

    　　　　　　　　if (arr != null && arr[0] == paraName) {
    　　　　　　　　　　return arr[1];
    　　　　　　　　}
    　　　　　　}
    　　　　　　return "";
    　　　　}
    　　　　else {
    　　　　　　return "";
    　　　　}
      }
  },
  created(){
      this.$Indicator.open('加载中...');
      let code=this.GetUrlParam("code");
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.mine,{appid:APIUrl.appid,timeStamp:APIUrl.timeStamp,sign:sign})
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
            else(response.code == 200)
            {
                this.mine=response.data;
            }
        });
        if(code!='')
        {

            let sign1=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
                this.$get(APIUrl.buyerBind,{appid:APIUrl.appid,code:code,timeStamp:APIUrl.timeStamp,sign:sign1})
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
                    else(response.code == 200)
                    {
                        this.$Toast({
                            message: '绑定成功',
                            duration: 1200
                        });
                    }
                });
        }   
  }
};
</script>