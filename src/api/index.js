/** 
 * api接口的统一出口
 */
import home from './home';
import qiniu from './qiniu';
import login from './login';


// 导出接口
export default {    
  home,
  qiniu,
  login
};