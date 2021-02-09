import { testData, testPosts } from '@/testData'

const state = {
  columns: testData,
  posts: testPosts,
  user: {
    isLogin: true,
    name: 'ShuaiYang',
    columnId: 1
  }
}

export default state
