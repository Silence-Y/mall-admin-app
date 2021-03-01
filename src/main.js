// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VCharts from 'v-charts';
import App from './App'
import router from './router'
import store from './store';
import './plugins/ant-design-vue'
import '@/assets/css/reset.less';

Vue.use(VCharts);
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: {
    App
  },
  template: '<App/>'
})
