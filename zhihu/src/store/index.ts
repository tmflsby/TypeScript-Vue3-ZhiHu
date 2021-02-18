import { createStore } from 'vuex'
import state from './state'
import getters from './getters'
import mutations from './mutations'
import actions from './actions'
import { GlobalDataProps } from '@/store/types'

const store = createStore<GlobalDataProps>({
  state,
  getters,
  mutations,
  actions
})

export default store
