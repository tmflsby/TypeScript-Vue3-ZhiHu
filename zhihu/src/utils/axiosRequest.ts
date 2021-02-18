import axios from 'axios'
import store from '@/store'

const axiosRequest = axios.create({
  baseURL: '/api',
  timeout: 5000
})

// interceptors 发送请求的拦截器
axiosRequest.interceptors.request.use(config => {
  store.commit('setLoading', true)
  store.commit('setError', { status: false, message: '' })
  return config
})

// interceptors 响应的拦截器
axiosRequest.interceptors.response.use(resp => {
  store.commit('setLoading', false)
  return resp
}, e => {
  const { error } = e.response.data
  store.commit('setError', { status: true, message: error })
  store.commit('setLoading', false)
  return Promise.reject(error)
})

export default axiosRequest
