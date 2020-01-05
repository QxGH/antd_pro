import axios from 'axios';
import { message } from 'antd';

let instance = axios.create({
  timeout: 1000 * 20
});

// if(process.env.NODE_ENV == 'development') {
//   instance.defaults.baseURL = '/api/'
// };

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
  config => {
    let xc_H5_user_info = JSON.parse(localStorage.getItem("xc_H5_user_info"));
    if (xc_H5_user_info) {
      // config.headers.Authorization = 'Bearer ' + xc_H5_user_info.token;
      config.headers.TOKEN = xc_H5_user_info.token;
      config.headers.APPID = localStorage.getItem("xc_H5_appid")
    };
    return config;
  },
  error => Promise.error(error)
);

instance.interceptors.response.use(
  // 请求成功
  res => res.status === 200 ? Promise.resolve(res) : Promise.reject(res),
  // 请求失败
  error => {
    message.error('服务器错误！');
    return Promise.reject(error);
  }
);

export default instance;