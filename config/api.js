// 引入api.url.js
import APIUrl from '../config/apiurl'; 
import store from '../config/store'
import * as types from '../config/types'
import router from '../config/routes'
import axios from 'axios';


// 配置API接口地址
// axios 默认配置  更多配置查看Axios中文文档
axios.defaults.timeout       = 5000;             // 超时默认值
axios.defaults.baseURL       = APIUrl.baseURL;   // 默认baseURL
// axios.defaults.responseType  = 'json'         // 默认数据响应类型
axios.defaults.headers.common['Content-Type'] = 'application/json;charset=UTF-8';
axios.defaults.withCredentials = true;           // 表示跨域请求时是否需要使用凭证



// http request 拦截器  请求
axios.interceptors.request.use(   
  config => {
    if (store.state.tokenw) {
      config.headers.Authorization = JSON.parse(localStorage.getItem('tokenw')).tokenw
      // config.headers.Authorization = `tokenw ${store.state.tokenw}`
    }
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器  返回
axios.interceptors.response.use(
  response => {
    if(typeof(response.headers.authorization) != "undefined")
    {
      var data = new Object();
      data.tokenw=response.headers.authorization;
      data.type=JSON.parse(localStorage.getItem('tokenw')).type;
      var str = JSON.stringify(data);
      store.commit(types.LOGIN,str)
    }
    return response
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 401 清除token信息并跳转到登录页面
          store.commit(types.LOGOUT)
          
          // 只有在当前路由不是登录页面才跳转
          router.currentRoute.path !== '/' &&
            router.replace({
              path: '/',
              query: { redirect: router.currentRoute.path },
            })
      }
    }
    // console.log(JSON.stringify(error));//console : Error: Request failed with status code 402
    return Promise.reject(error.response.data)
  })

export default axios






// //http request 拦截器
// axios.interceptors.request.use(
//   config => {
//     // const tokenw = getCookie('名称');注意使用的时候需要引入cookie方法，推荐js-cookie
//     config.data = JSON.stringify(config.data);
//     config.headers = {
//       'Content-Type':'application/x-www-form-urlencoded'
//     }
//     // if(tokenw){
//     //   config.params = {'tokenw':tokenw}
//     // }
//     return config;
//   },
//   error => {
//     return Promise.reject(err);
//   }
// );

// // http response 拦截器
// // ajax请求回调之前拦截 对请求返回的信息做统一处理 比如error为401无权限则跳转到登陆界面
// axios.interceptors.response.use(
//     response => {
//         switch (response.data.error) {
//         case 401:
//             response.data.msg = '未授权，请登录';
//             break;
//         default:
//             break;
//         }
//         return response;
//     },
//     error => {
//         // console.log(error);
//         return Promise.reject(error);
//     }
// );

// //http response 拦截器
// axios.interceptors.response.use(
//   response => {
//     if(response.data.errCode ==2){
//       router.push({
//         path:"/login",
//         querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
//       })
//     }
//     return response;
//   },
//   error => {
//     return Promise.reject(error)
//   }
// )


// export default axios;  // 这句千万不能漏下！！！



/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.get(APIUrl.root+url, {params: data})
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post (url, data = {}) {
    return new Promise((resolve, reject) => {
        axios.post(APIUrl.root+url, data)
            .then(response => {
                resolve(response.data);
            }, err => {
                reject(err);
            });
    });
}

 /**
 * 封装patch请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function patch(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.patch(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}

 /**
 * 封装put请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function put(url,data = {}){
  return new Promise((resolve,reject) => {
    axios.put(url,data)
         .then(response => {
           resolve(response.data);
         },err => {
           reject(err)
         })
  })
}