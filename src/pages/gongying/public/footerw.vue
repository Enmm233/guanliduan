<template>
  <!-- 通用底部 -->
  <article v-if="isShow">
    <article class="clear"></article>
    <article class="adminis_footer_h"></article>
    <article class="adminis_footer">
      <router-link to="/gongying_index"><i class="iconfont  icon-shouye1"></i><cite>首页</cite></router-link>
      <router-link to="/gongying_purchase"><i class="iconfont  icon-gouwuche"></i><cite>备货</cite></router-link>
      <router-link to="/gongying_purorder"><i class="iconfont  icon-caigoudan"></i><cite>供应单</cite></router-link>
      <router-link to="/gongying_inquiry"><i class="iconfont  icon-zaixianxunjia"></i><cite>询价</cite></router-link>
      <router-link to="/gongying_user"><i class="iconfont icon-icon-"></i><cite>我的</cite></router-link>
    </article>
  </article>
</template>

<script>
export default {
  data () {
    return {
      defaultHeight: '0', // 默认屏幕高度
      nowHeight: '0', // 实时屏幕高度
      isShow: true
    }
  },
  watch: {
    nowHeight: function () {
      if (this.defaultHeight != this.nowHeight) {
        // 键盘弹出操作
        this.isShow = false
      } else {
        // 键盘不弹出操作
        this.isShow = true
      }
    }
  },
  created () {
    // 获取默认高度
    this.defaultHeight = $(window).height()
    window.onresize = () => {
      return (() => {
        // 实时屏幕高度
        this.nowHeight = $(window).height()
      })()
    }
  },
  mounted () {
    // alert(this.$route.query.id)
    var name = this.$route.name
    if (name == 'gongying_index') {
      $('.adminis_footer a').removeClass('on')
      $('.adminis_footer a:nth-child(1)').addClass('on')
    }
    if (name == 'gongying_purchase') {
      $('.adminis_footer a').removeClass('on')
      $('.adminis_footer a:nth-child(2)').addClass('on')
    }
    if (name == 'gongying_purorder') {
      $('.adminis_footer a').removeClass('on')
      $('.adminis_footer a:nth-child(3)').addClass('on')
    }
    if (name == 'gongying_purorderdetail') {
      $('.adminis_footer a').removeClass('on')
      $('.adminis_footer a:nth-child(3)').addClass('on')
    }
    if (name == 'gongying_inquiry') {
      $('.adminis_footer a').removeClass('on')
      $('.adminis_footer a:nth-child(4)').addClass('on')
    }
    if (name == 'gongying_user') {
      $('.adminis_footer a').removeClass('on')
      $('.adminis_footer a:nth-child(5)').addClass('on')
    }
  }
}
</script>
