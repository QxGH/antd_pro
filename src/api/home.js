import base from '../http/base'; // 导入接口域名列表
import axios from '../http'; // 导入http中创建的axios实例
import qs from 'qs'; // 根据需求是否导入qs模块

const home = {
  // home    
  index(data, params) {
    return axios.get(`${base.http}pwd_red_pack_web/index/${data.id}`, {
      headers: {
        'ReferData': JSON.stringify(params)
      }
    });
  },
  // home list
  list(params) {
    return axios.get(`${base.http}pwd_red_pack_web/list`, {
      headers: {
        'ReferData': JSON.stringify(params)
      }
    });
  },
  // js-sdk init 配置
  get_sdk(url) {
    return axios.get(`${base.http}pwd_red_pack_web/get_sdk?url=${url}`);
  }
}

export default home;