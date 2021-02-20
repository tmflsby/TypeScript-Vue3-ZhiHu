import { MutationTree } from 'vuex'
import { GlobalErrorProps } from '@/store/types'
import { arrToObj } from '@/utils/helper'
import { StorageHandler, storageType } from '@/utils/storage'
import axiosRequest from '@/utils/axiosRequest'

const storageHandler = new StorageHandler()
const mutations: MutationTree<any> = {
  fetchColumns (state, rawData) {
    const { data } = state.columns
    const { list, count, currentPage } = rawData.data
    state.columns = {
      data: { ...data, ...arrToObj(list) },
      total: count,
      currentPage: currentPage * 1
    }
  },
  fetchColumn (state, rawData) {
    state.columns.data[rawData.data._id] = rawData.data
  },
  fetchPosts (state, { data: rawData, extraData: columnId }) {
    const { data } = state.posts
    const { list, count, currentPage } = rawData.data
    state.posts.data = { ...data, ...arrToObj(list) }
    state.posts.loadedColumns[columnId] = {
      columnId: columnId,
      total: count,
      currentPage: currentPage * 1
    }
  },
  fetchPost (state, rawData) {
    state.posts.data[rawData.data._id] = rawData.data
  },
  createPost (state, newPost) {
    state.posts.data[newPost._id] = newPost
  },
  updatePost (state, { data }) {
    state.posts.data[data._id] = data
  },
  deletePost (state, { data }) {
    delete state.posts.data[data._id]
  },
  fetchCurrentUser (state, rawData) {
    state.user = { isLogin: true, ...rawData.data }
  },
  login (state, rawData) {
    const { token } = rawData.data
    state.token = token
    storageHandler.setItem(storageType, 'token', token)
    axiosRequest.defaults.headers.common.Authorization = `Bearer ${token}`
  },
  logout (state) {
    state.token = ''
    state.user = { isLogin: false }
    storageHandler.remove(storageType, 'token')
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
