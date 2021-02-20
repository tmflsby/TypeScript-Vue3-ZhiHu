import { ActionTree, Commit } from 'vuex'
import axiosRequest from '@/utils/axiosRequest'
import { AxiosRequestConfig } from 'axios'

const asyncAndCommit = async (
  url: string, mutationName: string, commit: Commit,
  config: AxiosRequestConfig = { method: 'get' }, extraData?: any
) => {
  const { data } = await axiosRequest(url, config)
  if (extraData) {
    commit(mutationName, { data, extraData })
  } else {
    commit(mutationName, data)
  }
  return data
}

const actions: ActionTree<any, any> = {
  fetchColumns ({ state, commit }, params = {}) {
    const { currentPage = 1, pageSize = 6 } = params
    if (state.columns.currentPage < currentPage) {
      return asyncAndCommit(`/columns?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchColumns', commit)
    }
  },
  fetchColumn ({ state, commit }, cid) {
    if (!state.columns.data[cid]) {
      return asyncAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
    }
  },
  fetchPosts ({ state, commit }, params = {}) {
    const { columnId, currentPage = 1, pageSize = 3 } = params
    const loadedPost = state.posts.loadedColumns[columnId]
    // 如果loadedPost存在 不为undefined
    if (!loadedPost) {
      return asyncAndCommit(`/columns/${columnId}/posts?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchPosts', commit, {
        method: 'get'
      }, columnId)
    } else {
      const loadedPostCurrentPage = loadedPost.currentPage || 0
      if (loadedPostCurrentPage < currentPage) {
        return asyncAndCommit(`/api/columns/${columnId}/posts?currentPage=${currentPage}&pageSize=${pageSize}`, 'fetchPosts', commit, {
          method: 'get'
        }, columnId)
      }
    }
  },
  fetchPost ({ state, commit }, id) {
    const currentPost = state.posts.data[id]
    // 没有获取过 或者 没有详细内容的话要发送请求
    if (!currentPost || !currentPost.content) {
      return asyncAndCommit(`/posts/${id}`, 'fetchPost', commit)
    } else {
      return Promise.resolve({ data: currentPost })
    }
  },
  createPost ({ commit }, payload) {
    return asyncAndCommit('/posts', 'createPost', commit, {
      method: 'post',
      data: payload
    })
  },
  updatePost ({ commit }, { id, payload }) {
    return asyncAndCommit(`/posts/${id}`, 'updatePost', commit, {
      method: 'patch',
      data: payload
    })
  },
  deletePost ({ commit }, id) {
    return asyncAndCommit(`/posts/${id}`, 'deletePost', commit, {
      method: 'delete'
    })
  },
  login ({ commit }, payload) {
    return asyncAndCommit('/user/login', 'login', commit, {
      method: 'post',
      data: payload
    })
  },
  fetchCurrentUser ({ commit }) {
    return asyncAndCommit('/user/current', 'fetchCurrentUser', commit)
  },
  loginAndFetch ({ dispatch }, loginData) {
    return dispatch('login', loginData).then(() => {
      return dispatch('fetchCurrentUser')
    })
  },
  register ({ commit }, payload) {
    return asyncAndCommit('/users', 'register', commit, {
      method: 'post',
      data: payload
    })
  }
}

export default actions
