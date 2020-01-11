import base from '../http/base'; // 导入接口域名列表
import axios from '../http'; // 导入http中创建的axios实例

const common = {
  // login    
  login(data) {
    return axios.post(`${base.request}users/login`, data);
  },
  info() {
    return axios.post(`${base.request}users/info`);
  }
}

export default common;