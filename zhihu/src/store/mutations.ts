import { MutationTree } from 'vuex'

/* eslint-disable */
const mutations: MutationTree<any> = {
  login (state) {
    state.user = { ...state.user, isLogin: true, name: 'ShuaiYang' }
  },
  createPost (state, newPost) {
    state.posts.push(newPost)
  }
}

export default mutations
