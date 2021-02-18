import { MutationTree } from 'vuex'
import { GlobalErrorProps } from '@/store/types'
import axiosRequest from '@/utils/axiosRequest'

const mutations: MutationTree<any> = {
  createPost (state, newPost) {
    state.posts.push(newPost)
  },
  fetchColumns (state, rawData) {
    state.columns = rawData.data.list
  },
  fetchColumn (state, rawData) {
    state.columns = [rawData.data]
  },
  fetchPosts (state, rawData) {
    state.posts = rawData.data.list
  },
  fetchCurrentUser (state, rawData) {
    state.user = { isLogin: true, ...rawData.data }
  },
  login (state, rawData) {
    const { token } = rawData.data
    state.token = token
    localStorage.setItem('token', token)
    axiosRequest.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  logout (state) {
    state.token = ''
    state.user = { isLogin: false }
    localStorage.removeItem('token')
    delete axiosRequest.defaults.headers.common.Authorization
  },
  setLoading (state, status) {
    state.loading = status
  },
  setError (state, e: GlobalErrorProps) {
    state.error = e
  }
}

export default mutations
