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
      <address>账号：{{ mine.mobile }}</address>
    </section>
    <section class="clear"></section>
    <ol>
      <li><router-link to="/guanli_change"><img src="../../../../static/img/adminis_pic.png" alt=""/><cite>修改密码</cite><i class="fa fa-angle-right"></i></router-link></li>
      <section class="adminis_gd1"></section>
      <li><router-link to="/guanli_problem"><img src="../../../../static/img/adminis_pic1.png" alt=""/><cite>常见问题</cite><i class="fa fa-angle-right"></i></router-link></li>
      <section class="adminis_gd1"></section>
      <li><router-link to="/guanli_record"><img src="../../../../static/img/adminis_pic2.png" alt=""/><cite>操作记录</cite><i class="fa fa-angle-right"></i></router-link></li>
      <section class="adminis_gd1"></section>
      <li><a href="javascript:void(0);" class="adminisus_list_e" @click.navicon="adminisus_list_e"><img src="../../../../static/img/adminis_pic4.png" alt=""/><cite>退出登录</cite><i class="fa fa-angle-right"></i></a></li>
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
  },
  created(){
      this.$Indicator.open('加载中...');
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
  
  }
};
</script>