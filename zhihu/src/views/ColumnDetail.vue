<template>
  <div class="column-detail-page w-75 mx-auto">
    <div
      class="column-info row mb-4 border-bottom pb-4 align-items-center"
      v-if="column"
    >
      <div class="col-3 text-center">
        <img
          class="rounded-circle border w-100"
          :src="column.avatar && column.avatar.fitUrl"
          :alt="column.title"
        >
      </div>
      <div class="col-9">
        <h4>{{column.title}}</h4>
        <p class="text-muted">{{column.description}}</p>
      </div>
    </div>
    <PostList :list="list"/>
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
import { defineComponent, computed, onMounted, reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { GlobalDataProps, ColumnProps } from '@/store/types'
import { addColumnAvatar } from '@/utils/helper'
import useLoadMore from '@/hooks/useLoadMore'
import PostList from '@/components/PostList.vue'
type ColumnIdProps = string | undefined;
export default defineComponent({
  name: 'ColumnDetail',
  components: { PostList },
  setup () {
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const currentId = route.params.id as ColumnIdProps
    const loaded = reactive({
      currentPage: 0,
      total: 0
    })
    const total = computed(() => loaded.total)
    watch(store.state.posts.loadedColumns, () => {
      const { currentPage, total } = store.getters.getLoadedPost(currentId)
      loaded.currentPage = currentPage
      loaded.total = total
    })
    onMounted(() => {
      store.dispatch('fetchColumn', currentId)
      store.dispatch('fetchPosts', { columnId: currentId, pageSize: 4 })
    })
    const column = computed(() => {
      const selectColumn = store.getters.getColumnById(currentId) as ColumnProps | undefined
      if (selectColumn) {
        addColumnAvatar(selectColumn, 100, 100)
      }
      return selectColumn
    })
    const params = {
      columnId: currentId,
      pageSize: 4,
      currentPage: loaded.currentPage ? loaded.currentPage + 1 : 2
    }
    const { loadMorePage, isLastPage } = useLoadMore(
      'fetchPosts',
      total,
      params
    )
    const list = computed(() => store.getters.getPostsByCid(currentId))
    return {
      column,
      list,
      loadMorePage,
      isLastPage
    }
  }
})
</script>

<style scoped>

</style>
