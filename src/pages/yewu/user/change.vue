<template>
<article class="main">
  <article class="adminis_ti">
    <section class="adminis_til"><a href="javascript:history.back(-1)"><i class="fa fa-angle-left"></i></a></section>
    <section class="adminis_tio">修改密码</section>
  </article>
  <section class="adminis_tih"></section>

  <article class="adminiswj"></article>
  <article class="adminislo adminiswj_li">
    <form @submit.prevent="submit"  action="">
      <ol>
        <li>
          <cite>原密码：</cite>
          <input type="text" name="old_pwd" placeholder="请输入原密码" v-model="inputtext.old_pwd" autocomplete="off">
        </li>
        <li>
          <cite>新密码：</cite>
          <input type="text" name="password" placeholder="请输入新密码" v-model="inputtext.password" autocomplete="off">
        </li>
        <li>
          <cite>确定密码：</cite>
          <input type="text" name="password_confirmation" placeholder="请再次输入新密码" v-model="inputtext.password_confirmation" autocomplete="off">
        </li>
      </ol>
      <section class="adminis_button_m">
        <button type="submit" class="adminis_button">确定</button>
      </section>
    </form>
  </article>
  <section class='clear'></section>

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
        inputtext:{
          old_pwd: '',
          password: '',
          password_confirmation: '',
        }
      }
  },
  methods: {
    //表单提交
    submit: function() { 
      if(this.inputtext.old_pwd==''){
          this.$Toast({
            message: '原密码不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.password==''){
          this.$Toast({
            message: '新密码不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.password.length<6){
          this.$Toast({
            message: '密码必须6位以上',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.password_confirmation==''){
          this.$Toast({
            message: '确定密码不能为空',
            duration: 1200
          });
          return false;
      }
      else if(this.inputtext.password_confirmation!=this.inputtext.password){
          this.$Toast({
            message: '密码需要一致',
            duration: 1200
          });
          return false;
      }
      else{
        let old_pwd=this.inputtext.old_pwd;
        let password=this.inputtext.password;
        let password_confirmation=this.inputtext.password_confirmation;
        let sign1=this.$md5('appid='+APIUrl.appid+'&old_pwd='+old_pwd+'&password='+password+'&password_confirmation='+password_confirmation+'&timeStamp='+APIUrl.timeStamp+APIUrl.appsecret);
        this.$post(APIUrl.salesmanModifyPassword,{appid:APIUrl.appid,old_pwd:old_pwd,password:password,password_confirmation:password_confirmation,timeStamp:APIUrl.timeStamp,sign:sign1})
        .then((response) => {
            // console.log(response)
            if(response.code==400)
            {
                this.$Toast({
                  message: response.msg,
                  duration: 1200
                });
                return false
            }
            else if(response.code==500)
            {
                this.$Toast({
                  message: "系统繁忙，请重试",
                  duration: 1200
                });
                return false
            }
            else(response.code==200)
            {
                this.$Toast({
                  message: '修改成功',
                  duration: 1000
                });
                // 本地存储
                setTimeout(() => {
                  this.$store.commit(types.LOGOUT)
                  this.$router.push("/");
                },1500)
            }
        });
      }
    }
  },
};
</script>