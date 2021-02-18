<template>
  <div class="post-list">
    <article class="card mb-3 shadow-sm" v-for="post in list" :key="post._id">
      <div class="card-body">
        <h4>{{post.title}}</h4>
        <div class="row my-3 align-items-center">
          <div class="col-3" v-if="post.image">
            <img
              class="rounded-lg w-100"
              :src="post.image && post.image.url"
              :alt="post.title"
            >
          </div>
          <p :class="['text-muted', {'col-9': post.image}]">{{post.excerpt}}</p>
        </div>
        <span class="text-muted">{{post.createdAt}}</span>
      </div>
    </article>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { PostProps } from '@/store/types'
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  }
})
</script>

<style scoped>

</style>
