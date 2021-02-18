<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <Loader
      v-if="isLoading"
      text="拼命加载中"
      background="rgba(0, 0, 0, .8)"
    />
    <router-view/>
    <footer class="text-center py-4 text-secondary bg-light mt-6">
      <div>
        <ul class="list-inline mb-0">
          <li class="list-inline-item">© 2021 知乎专栏</li>
          <li class="list-inline-item">课程</li>
          <li class="list-inline-item">文档</li>
          <li class="list-inline-item">联系</li>
          <li class="list-inline-item">更多</li>
        </ul>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from 'vuex'
import { GlobalDataProps } from '@/store/types'
import GlobalHeader from '@/components/GlobalHeader.vue'
import Loader from '@/components/Loader.vue'
import createMessage from '@/components/createMessage'
export default defineComponent({
  name: 'App',
  components: { GlobalHeader, Loader },
  setup () {
    const store = useStore<GlobalDataProps>()
    const currentUser = computed(() => store.state.user)
    const isLoading = computed(() => store.state.loading)
    const error = computed(() => store.state.error)
    watch(() => error.value.status, () => {
      const { status, message } = error.value
      if (status && message) {
        createMessage(message, 'error')
      }
    })
    return {
      currentUser,
      isLoading,
      error
    }
  }
})
</script>

<style>

</style>
