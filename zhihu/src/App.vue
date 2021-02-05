<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <ColumnList :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
const columnData: ColumnProps[] = [
  {
    id: 1,
    title: 'test1专栏',
    description: '12312132131232132133333333',
    avatar: 'https://avatars.githubusercontent.com/u/48079487?s=60&v=4'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '12312132131232132133333333'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '12312132131232132133333333',
    avatar: 'https://avatars.githubusercontent.com/u/48079487?s=60&v=4'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '12312132131232132133333333'
  },
  {
    id: 2,
    title: 'test2专栏',
    description: '12312132131232132133333333',
    avatar: 'https://avatars.githubusercontent.com/u/48079487?s=60&v=4'
  }
]
const currentUser: UserProps = {
  isLogin: true,
  name: 'curry'
}
export default defineComponent({
  name: 'App',
  components: { ColumnList, GlobalHeader },
  setup () {
    return {
      list: columnData,
      currentUser
    }
  }
})
</script>

<style>

</style>
