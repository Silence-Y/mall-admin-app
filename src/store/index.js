import Vue from 'vue';
import Vuex from 'vuex';
import {
  setCookie,
  getUserCookie,
  removeUserCookie
} from '@/utils/userCookie';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    // 用于切换菜单的闭合状态  false 代表不闭合  true代表闭合
    collapsed: false,
    // 存储用户信息,是一个对象
    user: {
      username: 'Silence.Y',
      email: '1509023406@qq.com',
      password: '123456',
      role: 'customer'
    },
    // user: getUserCookie(),
    // 存储菜单的路由
    menuRoutes: []
  },
  // 提交变更，在有需要的时候调用
  mutations: {
    changeCollapsed(state) {
      state.collapsed = !state.collapsed;
    },

    // 用户信息提交
    setUserInfo(state, userInfo) {
      state.user = userInfo
    },
    // 退出
    logout(state) {
      state.user = {
        username: '',
        appkey: '',
        role: '',
        email: '',
      };
    },
    // 改变路由
    changeMenuRoutes(state, routes) {
      state.menuRoutes = routes;
    },
  },
  // 提交mutation的方法
  actions: {
    changeCollapsed({
      commit
    }) {
      commit('changeCollapsed');
    },
    // 提交用户信息
    setUserInfo({
      commit
    }, userInfo) {
      commit('setUserInfo', userInfo);
      setCookie(userInfo)
    },
    // 退出的时候移除cookie信息
    logout({
      commit
    }) {
      commit('logout');
      removeUserCookie();
    },
    changeMenuRoutes({
      commit
    }, routes) {
      commit('changeMenuRoutes', routes)
    }
  },
  modules: {}
})
