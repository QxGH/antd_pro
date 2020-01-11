import base from '../http/base'; // 导入接口域名列表
import axios from '../http'; // 导入http中创建的axios实例

const home = {
  // home    
  index() {
    return axios.post(`${base.request}qinxus/home`);
  }
}

export default home;