<template>
  <div class="main-header">
    <!-- 按钮 -->
    <a-button
      type="primary"
      style="margin-bottom: 16px"
      @click="toggleCollapsed"
    >
      <a-icon :type="$store.state.collapsed ? 'menu-unfold' : 'menu-fold'" />
    </a-button>

    <!-- 面包屑 -->
    <div class="breadcrumb">
      <a-breadcrumb>
        <a-breadcrumb-item>首页</a-breadcrumb-item>
        <a-breadcrumb-item>
          <a href>统计</a>
        </a-breadcrumb-item>
      </a-breadcrumb>
    </div>
    <!-- 用户信息 -->
    <ul class="user-info">
      <li class="user-name">
        欢迎mqy
        <a-icon type="down" />
        <!-- 用户的登录信息 -->
        <!-- {{ $store.state.user.username}} -->
      </li>
      <li class="login-out" @click="logout">退出</li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
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
