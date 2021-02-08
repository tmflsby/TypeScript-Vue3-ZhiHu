<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img class="w-50" src="../assets/callout.svg" alt="callout">
          <h2 class="fw-light">随心写作，自由表达</h2>
          <p>
            <a class="btn btn-primary my-2" href="/">开始写文章</a>
          </p>
        </div>
      </div>
    </section>
    <h4 class="fw-bold text-center">发现精彩</h4>
    <ColumnList :list="list"/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
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
export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    return {
      list: columnData
    }
  }
})
</script>

<style scoped>

</style>
