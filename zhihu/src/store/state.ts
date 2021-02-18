const state = {
  loading: false,
  error: {
    status: false
  },
  token: localStorage.getItem('token') || '',
  columns: [],
  posts: [],
  user: {
    isLogin: false
  }
}

export default state
