import { ActionTree, Commit } from 'vuex'
import axiosRequest from '@/utils/axiosRequest'

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axiosRequest.get(url)
  commit(mutationName, data)
  return data
}

const postAndCommit = async (url: string, mutationName: string, commit: Commit, payload: any) => {
  const { data } = await axiosRequest.post(url, payload)
  commit(mutationName, data)
  return data
}

const actions: ActionTree<any, any> = {
  fetchColumns ({ commit }) {
    return getAndCommit('/columns', 'fetchColumns', commit)
  },
  fetchColumn ({ commit }, cid) {
    return getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
  },
  fetchPosts ({ commit }, cid) {
    return getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
  },
  login ({ commit }, payload) {
    return postAndCommit('/user/login', 'login', commit, payload)
  },
  fetchCurrentUser ({ commit }) {
    return getAndCommit('/user/current', 'fetchCurrentUser', commit)
  },
  loginAndFetch ({ dispatch }, loginData) {
    return dispatch('login', loginData).then(() => {
      return dispatch('fetchCurrentUser')
    })
  },
  register ({ commit }, payload) {
    return postAndCommit('/users', 'register', commit, payload)
  },
  createPost ({ commit }, payload) {
    return postAndCommit('/posts', 'createPost', commit, payload)
  }
}

export default actions
