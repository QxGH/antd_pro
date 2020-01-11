import axios from 'axios';
import { message } from 'antd';
import { createHashHistory } from 'history'; // 如果是hash路由
const history = createHashHistory();

let instance = axios.create({
  timeout: 1000 * 20
});

// if(process.env.NODE_ENV == 'development') {
//   instance.defaults.baseURL = '/api/'
// };

instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';

instance.interceptors.request.use(
  config => {
    let token = localStorage.getItem("token");
    let Authorization = 'Bearer ' + token
    if (token) {
      config.headers.Authorization = Authorization;
    };
    return config;
  },
  error => Promise.error(error)
);

instance.interceptors.response.use(
  // 请求成功
  res => {
    // console.log(res)
    if(res.status === 200) {
      if(res.data.code === 401) {
        message.error('用户信息验证失败！');
        history.push('/login');
      } else {
        return Promise.resolve(res)
      }
    } else {
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    message.error('服务器错误！');
    return Promise.reject(error);
  }
);

export default instance;