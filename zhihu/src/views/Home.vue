<template>
  <div class="home-page">
    <section class="py-5 text-center container">
      <div class="row py-lg-5">
        <div class="col-lg-6 col-md-8 mx-auto">
          <img class="w-50" src="../assets/callout.svg" alt="callout">
          <h2 class="fw-light">随心写作，自由表达</h2>
          <p>
            <router-link class="btn btn-primary my-2" to="/create">开始写文章</router-link>
          </p>
        </div>
      </div>
    </section>
    <h4 class="fw-bold text-center">发现精彩</h4>
    <ColumnList :list="list"/>
    <button
      class="btn btn-outline-primary mt-2 mb-5 mx-auto btn-block w-25 load-more"
      v-if="!isLastPage"
      @click="loadMorePage"
    >
      加载更多
    </button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, onMounted } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'
import useLoadMore from '@/hooks/useLoadMore'
import ColumnList from '@/components/ColumnList.vue'
export default defineComponent({
  name: 'Home',
  components: { ColumnList },
  setup () {
    const store = useStore<GlobalDataProps>()
    const total = computed(() => store.state.columns.total)
    const currentPage = computed(() => store.state.columns.currentPage)
    onMounted(() => {
      store.dispatch('fetchColumns', { pageSize: 3 })
    })
    const list = computed(() => store.getters.getColumns)
    const { loadMorePage, isLastPage } = useLoadMore(
      'fetchColumns',
      total,
      {
        pageSize: 3,
        currentPage: currentPage.value ? currentPage.value + 1 : 2
      }
    )
    return {
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>

<style scoped>
.load-more {
  margin-left: 50% !important;
  transform: translate3d(-50%, 0, 0);
}
</style>
