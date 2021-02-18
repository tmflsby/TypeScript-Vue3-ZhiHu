import axios from 'axios'
import store from '@/store'

const axiosRequest = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// interceptors 发送请求的拦截器
axiosRequest.interceptors.request.use(config => {
  store.commit('setLoading', true)
  return config
})

// interceptors 响应的拦截器
axiosRequest.interceptors.response.use(config => {
  store.commit('setLoading', false)
  return config
})

export default axiosRequest
