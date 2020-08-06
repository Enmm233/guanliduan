<template>
  
</template>

<script>
import APIUrl from '../../../config/apiurl' 
import * as types from '../../../config/types'

export default {
    created(){
        let signipa=this.$md5('appid='+APIUrl.appid+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
          this.$get(APIUrl.wxParams,{appid:APIUrl.appid,type:1,timeStamp:APIUrl.timeStamp,sign:signipa})
          .then((response) => {
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
                  wx.config({
                    debug: false, // 开启调试模式
                    appId: response.data.appId, // 必填，公众号的唯一标识
                    timestamp: response.data.timestamp, // 必填，生成签名的时间戳
                    nonceStr: response.data.nonceStr, // 必填，生成签名的随机串
                    signature: response.data.signature, // 必填，签名，见附录1
                    jsApiList: [
						'onMenuShareTimeline',
						'onMenuShareAppMessage',
                      'checkJsApi',
//                    'scanQRCode', 
                      'openLocation',
                    ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
                  });
                  wx.ready((res) => {
                  
                  })
              }
          });
    }
}
</script>

