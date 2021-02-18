import { MutationTree } from 'vuex'

const mutations: MutationTree<any> = {
  login (state) {
    state.user = { ...state.user, isLogin: true, name: 'ShuaiYang' }
  },
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
  setLoading (state, status) {
    state.loading = status
  }
}

export default mutations
