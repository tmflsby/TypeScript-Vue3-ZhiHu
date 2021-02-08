<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
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
import { defineComponent } from 'vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
const currentUser: UserProps = {
  isLogin: false,
  name: 'curry'
}
export default defineComponent({
  name: 'App',
  components: { GlobalHeader },
  setup () {
    return {
      currentUser
    }
  }
})
</script>

<style>

</style>
