<template>
  <div class="home">
    <left-menu />
    <!-- 点击按钮和头部 -->
    <div :class="{ 'main-app': true, 'menu-unfold': $store.state.collapsed }">
      <!-- 上面 -->
      <slider-nav />
      <!-- 下面 -->
      <router-view></router-view>
    </div>
  </div>
</template>



<script>
import LeftMenu from "./components/menu.vue";
import SliderNav from "./components/sliderNav.vue";
export default {
  data() {
    return {
      collapsed: false
    };
  },
  components: {
    LeftMenu,
    SliderNav
  },
  methods: {}
};
</script>

<style  lang="less">
@import url("~@/assets/css/home.less");
</style>
