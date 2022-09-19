import Taro from '@tarojs/taro'
import getBaseUrl from './baseUrl'
import interceptors from './interceptors.js'

interceptors.forEach(interceptorItem => Taro.addInterceptor(interceptorItem))

class http {

  baseOptions(params, method = "GET") {
    let { url, data } = params;
    const BASE_URL = getBaseUrl(url);
    // let contentType = "application/x-www-form-urlencoded";
    let contentType = "application/json;charset=UTF-8";
    contentType = params.contentType || contentType;
    const option = {
      url: BASE_URL + url,  //地址
      data: data,   //传参
      method: method, //请求方式
      timeout:50000, // 超时时间
      header: {  //请求头
        'content-type': contentType,
        'token':Taro.getStorageSync('token')
      }
    };
    return Taro.request(option);
  }

  get(url, data) {
    let option = { url, data };
    return this.baseOptions(option);
  }

  post(url, data, contentType) {
    let params = { url, data, contentType };
    return this.baseOptions(params, "POST");
  }

}

export default new http()
