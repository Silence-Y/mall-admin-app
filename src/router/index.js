import Vue from 'vue'
import Router from 'vue-router'
import store from '@/store';
import getMenuRoutes from '@/utils/permission';
import Home from '../views/layout/Home.vue';
import Login from '../views/layout/Login.vue';
import Register from '../views/layout/Register.vue';

Vue.use(Router)
// 异步路由，根据需要渲染
const ayncRouterMap = [{
  path: '/product',
  name: 'Product',
  meta: {
    title: '商品',
    icon: 'inbox',
    hidden: false
  },
  component: Home,
  children: [{
      path: 'list',
      name: 'ProductList',
      meta: {
        title: '商品列表',
        icon: 'unordered-list',
        hidden: false
      },
      component: () => import('@/views/page/productList.vue')
    },
    {
      path: 'add',
      name: 'ProductAdd',
      meta: {
        title: '添加商品',
        icon: 'file-add',
        hidden: false
      },
      component: () => import('@/views/page/productAdd.vue')
    },
    {
      path: 'category',
      name: 'Category',
      meta: {
        title: '类目管理',
        icon: 'project',
        hidden: false
      },
      component: () => import('@/views/page/category.vue')
    }
  ]
}]

const routes = [{
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      title: '首页',
      hidden: false,
      icon: 'home',
    },
    children: [{
      path: 'index',
      name: 'Index',
      meta: {
        title: '统计',
        icon: 'number',
        hidden: false
      },
      component: () => import( /* webpackChunkName: "about" */ '../views/page/index.vue')
    }],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
    meta: {
      title: '登录',
      hidden: true
    },
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
    meta: {
      title: '注册',
      hidden: true
    },
  },
];

const router = new Router({
  routes
})

// 路由拦截，路由守卫,确保没有登录不能进入首页
// 是否添加过路由
let isAddRoutes = false;
router.beforeEach((to, from, next) => {
  if (!isAddRoutes) {
    // 动态路由 menuRoutes
    const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap)
    // 将路由添加进去
    // 整个权限只添加一次
    router.addRoutes(menuRoutes);
    // 原来的路由拼接动态路由
    store.dispatch('changeMenuRoutes', routes.concat(menuRoutes))
    isAddRoutes = true;
  }
  return next()

})
// router.beforeEach((to, from, next) => {
//   // 判断是不是登录页面
//   // 如果不是，判断有没有用户信息（appkey，用户名，角色），
//   // 如果有，就继续
//   // 如果没有，就跳转到登录页面
//   if (to.path !== '/login') {
//     if (store.state.user.appkey && store.state.user.username && store.state.user.role) {
//       if (!isAddRoutes) {
//         // 动态路由 menuRoutes
//         const menuRoutes = getMenuRoutes(store.state.user.role, ayncRouterMap)
//         // 将路由添加进去
//         // 整个权限只添加一次
//         router.addRoutes(menuRoutes);
//         // 原来的路由拼接动态路由
//         store.dispatch('changeMenuRoutes', routes.concat(menuRoutes))
//         isAddRoutes = true;
//       }
//       return next()
//     }
//     return next('/login')
//   }
//   return next()
// })

export default router
