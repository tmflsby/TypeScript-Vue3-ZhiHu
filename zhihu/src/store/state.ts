import { StorageHandler, storageType } from '@/utils/storage'

const storageHandler = new StorageHandler()
const state = {
  loading: false,
  error: {
    status: false
  },
  token: storageHandler.getItem(storageType, 'token') || '',
  columns: {
    data: {},
    currentPage: 0,
    total: 0
  },
  posts: {
    data: {},
    loadedColumns: {}
  },
  user: {
    isLogin: false
  }
}

export default state
