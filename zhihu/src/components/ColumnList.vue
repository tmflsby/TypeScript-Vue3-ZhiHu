<template>
  <div class="row">
    <div
      class="col-4 mb-4"
      v-for="column in columnList"
      :key="column._id"
    >
     <div class="card h-100 shadow-sm">
       <div class="card-body text-center d-flex flex-column align-items-center justify-content-between">
         <img
           class="rounded-circle border border-light my-3"
           :src="column.avatar && column.avatar.fitUrl"
           :alt="column.title"
         >
         <h5 class="card-title">{{column.title}}</h5>
         <p class="card-text text-start">{{column.description}}</p>
         <router-link
           class="btn btn-outline-primary"
           :to="`/column/${column._id}`">
           进入专栏
         </router-link>
       </div>
     </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from 'vue'
import { ColumnProps } from '@/store/types'
import { addColumnAvatar } from '@/utils/helper'
export default defineComponent({
  name: 'ColumnList',
  props: {
    list: {
      type: Array as PropType<ColumnProps[]>,
      required: true
    }
  },
  setup (props) {
    const columnList = computed(() => {
      return props.list.map(column => {
        addColumnAvatar(column, 50, 50)
        return column
      })
    })
    return {
      columnList
    }
  }
})
</script>

<style scoped>
.card-body img {
  width: 50px;
  height: 50px;
}
</style>
