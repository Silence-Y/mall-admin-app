// 对于用户操作的接口管理,导入的是axios.js文件
import axios from '@/axios';

export default {
  // 登录
  login(params) {
    return axios.post('/passport/login', params)
  },
  // 注册
  register(params) {
    return axios.post('/passport/logon', params)
  },
  // 获取验证码
  getCode(params) {
    return axios.post('/passport/getCode', params)
  }
}
