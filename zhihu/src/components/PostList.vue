<template>
  <div class="post-list">
    <article class="card mb-3 shadow-sm" v-for="post in posts" :key="post._id">
      <div class="card-body">
        <h4>
          <router-link :to="`/posts/${post._id}`">{{post.title}}</router-link>
        </h4>
        <div class="row my-3 align-items-center">
          <div class="col-3" v-if="post.image">
            <img
              class="rounded-lg w-100"
              :src="post.image && post.image.fitUrl"
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
import { defineComponent, PropType, computed } from 'vue'
import { PostProps, ImageProps } from '@/store/types'
import { generateFitUrl } from '@/utils/helper'
export default defineComponent({
  name: 'PostList',
  props: {
    list: {
      required: true,
      type: Array as PropType<PostProps[]>
    }
  },
  setup (props) {
    const posts = computed(() => {
      return props.list.map(post => {
        generateFitUrl(post.image as ImageProps, 200, 110, ['m_fill'])
        return post
      })
    })
    return {
      posts
    }
  }
})
</script>

<style scoped>
.rounded-lg {
  border-radius: 0.3rem !important;
}
.post-list h4 a {
  text-decoration: none;
  color:#1a1a1a;
}
.post-list h4 a:hover {
  color:#0d6efd;
}
</style>
