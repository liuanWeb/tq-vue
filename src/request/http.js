// 封装 axios
import axios from 'axios';
import QS from 'qs';
import { Toast } from 'mint-ui'

// 环境的切换
axios.defaults.timeout = 10000;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

// 请求拦截器
axios.interceptors.request.use(
config => {
  // 每次发送请求之前判断vuex中是否存在token
  // 如果存在，则统一在http请求的header都加上token，这样后台根据token判断你的登录情况
  // 即使本地存在token，也有可能token是过期的，所以在响应拦截器中要对返回状态进行判断
  // const token = store.state.token;
  // token && (config.headers.Authorization = token);
  config.params = {
    clientType: '5',
    cv: '2.5.7',
    aid: 1
  };
  let sid = localStorage.getItem('sid');
  if(sid){
    config.headers['sid'] = sid;
  }
  return config;
},
error => {
  return Promise.error(error);
});

axios.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      if(!(response.data.code == '0000' || response.data.code == '1')){
        Toast(response.data.message?response.data.message:response.data.msg);
      }
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  error => {
    if (error) {
      Toast('网络异常');
      return Promise.reject(error);
    }
});

 // * get方法，对应get请求
 // * @param {String} url [请求的url地址]
 // * @param {Object} params [请求时携带的参数]
export function get(url, params){
  return new Promise((resolve, reject) =>{
    axios.get(url, QS.stringify(params)).then(res => {
      resolve(res);
    }).catch(err =>{
      reject(err)
    })
  });
}

// * post方法，对应post请求
// * @param {String} url [请求的url地址]
// * @param {Object} params [请求时携带的参数]
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios.post(url, QS.stringify(params))
      .then(res => {
        resolve(res.data);
      })
      .catch(err =>{
        reject(err.data)
      })
  });
}

