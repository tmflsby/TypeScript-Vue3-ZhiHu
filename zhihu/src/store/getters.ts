import { GetterTree } from 'vuex'

const getters: GetterTree<any, any> = {
  biggerColumnLen (state) {
    return state.columns.filter((c: { id: number }) => c.id > 2).length
  },
  getColumnById: state => (id: number) => {
    return state.columns.find((c: { id: number }) => c.id === id)
  },
  getPostsByCid: state => (cid: number) => {
    return state.posts.filter((post: { columnId: number }) => post.columnId === cid)
  }
}

export default getters
