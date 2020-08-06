<template>
  <article>
    <keep-alive>
        <router-view v-if="$route.meta.keepAlive">
            <!-- 这里是会被缓存的视图组件，比如 Home！ -->
        </router-view>
    </keep-alive>

     <router-view v-if="!$route.meta.keepAlive">
        <!--这里是不被缓存的视图组件，比如 Edit！ -->
    </router-view>
  </article>
</template>

<script>
export default {
  name: 'App',
  created() {
  },
}
</script>