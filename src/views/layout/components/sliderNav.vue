<template>
  <div class="main-header">
    <!-- 按钮 -->
    <a-button type="primary" @click="toggleCollapsed">
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>

    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb v-if="currentRoute.length > 1">
        <a-breadcrumb-item>{{
          currentRoute[0] ? currentRoute[0].meta.title : ""
        }}</a-breadcrumb-item>
        <a-breadcrumb-item>
          <router-link :to="{ name: currentRoute[1].name }">
            {{ currentRoute[1] ? currentRoute[1].meta.title : "" }}
          </router-link>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>

    <!-- 用户信息 -->
    <ul class="user-info">
      <li class="user-name">
        <!-- 用户的登录信息 -->
        {{ $store.state.user.username }}
        <a-icon type="down" />
      </li>
      <li class="login-out" @click="logout">退出</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentRoute: this.$router.currentRoute.matched
    };
  },
  watch: {
    $route() {
      this.currentRoute = this.$router.currentRoute.matched;
    }
  },
  methods: {
    toggleCollapsed() {
      // 调用方法
      this.$store.dispatch("changeCollapsed");
    },
    // 退出
    logout() {
      // 改变状态
      this.$store.dispatch("logout");
      this.$router.push({
        name: "Login"
      });
    }
  }
};
</script>
