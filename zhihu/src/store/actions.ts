import { ActionTree, Commit } from 'vuex'
import axiosRequest from '@/utils/axiosRequest'

const getAndCommit = async (url: string, mutationName: string, commit: Commit) => {
  const { data } = await axiosRequest.get(url)
  commit(mutationName, data)
}

const actions: ActionTree<any, any> = {
  fetchColumns ({ commit }) {
    getAndCommit('/columns', 'fetchColumns', commit)
  },
  fetchColumn ({ commit }, cid) {
    getAndCommit(`/columns/${cid}`, 'fetchColumn', commit)
  },
  fetchPosts ({ commit }, cid) {
    getAndCommit(`/columns/${cid}/posts`, 'fetchPosts', commit)
  }
}

export default actions
