<template>
<article class="main">
   <article class="adminis_ti">
    <section class="adminis_til"><router-link to="/yewu_user"><i class="fa fa-angle-left"></i></router-link></section>
    <section class="adminis_tio">二维码名片</section>
  </article>
  <section class="adminis_tih"></section>
  <section class="adminis_gd"></section>
  

  <article id="cover" @click.navicon="cover"></article>
  <article id="cover1"><img src="images/guide1.png" alt=""/></article>


  <article class="adminispr_code">
      <img :src="saleQrcode.codeUrl" alt=""/>
      <address>分享二维码请点击页面右上角</address>
  </article>
  
  <judge></judge>
  <weiapi></weiapi>
</article>
</template>
<script>
import APIUrl from '../../../../config/apiurl' 
import * as types from '../../../../config/types'

export default {
  components:{
    'judge':()=>import('../public/judge.vue'),       // 判断加背景颜色
	'weiapi':()=>import('../../login/weiapi.vue'),   // 验证微信
  },
  data () {
    return {
      saleQrcode:[],    // 二维码
    }
  },
  methods:{
      cover(){
          $("#cover,#cover1").hide();
      },
	  codew(){
			var _that = this;
			wx.ready(()=> {
				if (/Android/gi.test(navigator.userAgent)) {
					var shareWxLink = "http://"+window.location.host+"/Mobile?#/yewu_code?uid="+this.$route.query.uid;
				} else {
					var shareWxLink = "http://"+window.location.host+"\/Mobile\#/yewu_code?uid="+this.$route.query.uid;
				}
				wx.onMenuShareTimeline({
					title: '二维码名片', // 分享标题
					link: shareWxLink,        // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl:"", // 分享图标
					success:function() {
						_that.$Toast({
						  message: '分享朋友圈成功',
						  duration: 1000
						});
						// 用户确认分享后执行的回调函数
					},
					cancel:function() {
						// 用户取消分享后执行的回调函数
					}
				});

				wx.onMenuShareAppMessage({
					title: '二维码名片', // 分享标题
					desc: _that.saleQrcode.saleName+"业务员的二维码名片，识别二维码注册", // 分享描述
					link: shareWxLink,  // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
					imgUrl: "", // 分享图标
					success: function () {
						_that.$Toast({
						  message: '分享给朋友成功',
						  duration: 1000
						});
						// 用户确认分享后执行的回调函数
					},
					cancel: function () {
						// 用户取消分享后执行的回调函数
					}
				})
			})

	  }
  },
  mounted(){
		this.codew();
  },
  beforeCreate(){
      let sign=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
      this.$get(APIUrl.saleQrcode,{appid:APIUrl.appid,id:this.$route.query.uid,timeStamp:APIUrl.timeStamp,sign:sign})
        .then((response) => {
            if(response.code==406)
            {
                this.$Toast({
                    message: '二维码错误',
                    duration: 1000
                });
                setTimeout(() => {
                  this.$router.push("/yewu_user");
                },1500)
                return false
            }
			if(response.code==404)
            {
                this.$Toast({
                    message: '二维码错误',
                    duration: 1000
                });
                setTimeout(() => {
                  this.$router.push("/yewu_user");
                },1500)
                return false
            }
            else(response.code == 200)
            {
                this.saleQrcode=response.data;
            }
        });
  }
};
</script>