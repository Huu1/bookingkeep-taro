
import { HTTP_STATUS } from './config'

const customInterceptor = (chain) => {

  const requestParams = chain.requestParams
  // Taro.showLoading({
  //   title: '加载中',
  // })
  return chain.proceed(requestParams).then(res => {
     if (res.statusCode === HTTP_STATUS.AUTHENTICATE) {
      return Promise.reject({ desc: "需要鉴权" })
    } else if (res.statusCode === HTTP_STATUS.SERVER_ERROR) {
      return Promise.reject({ desc: "服务器错误" });
    }  else if (HTTP_STATUS.SUCCESS.includes(res.statusCode)) {
      if (res.data.code === 200) {
        return res.data.data
      } else {
        return Promise.reject(res.data)
      }
    } else {
      return Promise.reject(res.data.msg)
    }
  }).catch(error=> {
    return Promise.reject(error)
  })
}

// Taro 提供了两个内置拦截器
// logInterceptor - 用于打印请求的相关信息
// timeoutInterceptor - 在请求超时时抛出错误。
// const interceptors = [customInterceptor, Taro.interceptors.logInterceptor]
const interceptors = [customInterceptor]

export default interceptors
