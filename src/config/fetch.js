import {BASEURL} from './env'
import {checkToken,setSessionStorageToken} from './reqestCommon'
import axios from 'axios'
axios.defaults.timeout = 50000
axios.defaults.withCredentials = true;

let apiList = []; //一个页面有多个网络请求，加载动画所有接口请求完才消失

let fetchP = ((url, data = {}) => {
	 return new Promise((resolve,reject) => {
			axios.post(BASEURL + url, data)
			.then(function(response){
			   let res = response.data;

		      //登陆失效拦截
		      if (res.code == "999") { //登陆失效

		      }
		      resolve(res);


			})
			.catch(function(err){

			});


	 })
})


//fetch 文件上传
let fetchU = ((url, formData, needBase = true) => {
	return new Promise((resolve,reject) => {
		var responseJson = null;
      	//显示加载中动画
      	window.loading.open('上传中...');
      	if (url.indexOf('http://') == -1 && url.indexOf('https://') == -1 && needBase) {
          url = "/api" + url //拼接域名
        }
		axios.post(url,formData)
		.then(function(response){
		   let res = response.data;
	      //登陆失效拦截
	      if (res.code == "999") { //登陆失效
	      	sessionStorage.clear();//失效时清除session
	        window.$router.replace("/login?url="+window.location.pathname+window.location.search)
	      }
	      resolve(res);
	      window.loading.close(); //关闭加载中动画
		})
		.catch(function(err){
		   alertTip(err.message);
		   window.loading.close(); //关闭加载中动画
		});
	})
})


export {
  fetchP,
  fetchU,
}
