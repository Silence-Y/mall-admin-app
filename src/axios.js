import axios from 'axios';
import store from './store';
//创建一个axios实例
const instance = axios.create({
  // 配置信息,
  baseURL: 'https://mallapi.duyiedu.com/',
});
// 请求拦截器
instance.interceptors.request.use((config) => {
  // 加上统一的appkey
  if (config.url.includes('/passport')) {
    return config
  }
  return {
    ...config,
    params: {
      ...config.params,
      appkey: store.state.user.appkey
    }
  }
  // console.log(config);
}, (error) => Promise.reject(error));


// 响应拦截器
instance.interceptors.response.use((response) => {
  // console.log(response);
  if (response.data.status === 'fail') {
    return Promise.reject(response.data.msg);
  }
  return response.data.data;
}, (error) => Promise.reject(error))

export default instance;
