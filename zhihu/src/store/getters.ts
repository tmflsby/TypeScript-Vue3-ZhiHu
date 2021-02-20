import { GetterTree } from 'vuex'
import { objToArr } from '@/utils/helper'

const getters: GetterTree<any, any> = {
  getColumns: state => {
    return objToArr(state.columns.data)
  },
  getColumnById: state => (id: string) => {
    return state.columns.data[id]
  },
  getPostsByCid: state => (cid: string) => {
    return objToArr(state.posts.data).filter((post: any) => post.column === cid)
  },
  getCurrentPost: (state) => (id: string) => {
    return state.posts.data[id]
  },
  // 根据columnId 获得已加载的记录
  getLoadedPost: (state) => (id: string) => {
    return state.posts.loadedColumns[id]
  }
}

export default getters
