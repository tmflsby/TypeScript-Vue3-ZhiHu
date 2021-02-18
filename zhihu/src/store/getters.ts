import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  getColumnById: state => (id: string) => {
    return state.columns.find((c: { _id: string }) => c._id === id)
  },
  getPostsByCid: state => (cid: string) => {
    return state.posts.filter((post: { column: string }) => post.column === cid)
  }
}

export default getters
