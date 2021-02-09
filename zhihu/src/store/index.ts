import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'

interface UserProps {
  isLogin: boolean;
  name?: string;
  id?: number;
  columnId?: number;
}
export interface ColumnProps {
  id: number;
  title: string;
  avatar?: string;
  description: string;
}
export interface PostProps {
  id: number;
  title: string;
  content: string;
  image?: string;
  createdAt: string;
  columnId: number;
}
export interface GlobalDataProps {
  columns: ColumnProps[];
  posts: PostProps[];
  user: UserProps;
}

const store = createStore<GlobalDataProps>({
  state,
  getters,
  mutations,
  actions
})

export default store
