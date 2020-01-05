import base from '../http/base'; // 导入接口域名列表
import axios from '../http'; // 导入http中创建的axios实例

const common = {
  // home    
  getQiniuToken() {
    return axios.get(`${base.request}qiniu/getToken`);
  },
  qiniuUploadFile(data) {
    return axios.post(`${base.qiniu}`, data, {headers:{'Content-Type':'multipart/form-data'}});
  }
}

export default common;