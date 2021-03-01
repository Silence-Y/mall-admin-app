// 对于用户操作的接口管理,导入的是axios.js文件
import axios from '@/axios';

export default {
  login(params) {
    return axios.post('/passport/login', params)
  }
}
