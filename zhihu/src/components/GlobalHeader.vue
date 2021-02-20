<template>
  <nav class="navbar navbar-dark bg-primary justify-content-between mb-4 px-4">
    <div class="w-75 mx-auto navbar">
      <router-link class="navbar-brand" to="/">知乎专栏</router-link>
      <ul class="list-inline mb-0" v-if="!user.isLogin">
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/login">登录</router-link>
        </li>
        <li class="list-inline-item">
          <router-link class="btn btn-outline-light my-2" to="/signup">注册</router-link>
        </li>
      </ul>
      <ul class="list-inline mb-0" v-else>
        <li class="list-inline-item">
          <Dropdown :title="`你好 ${user.nickName}`">
            <DropdownItem>
              <router-link class="dropdown-item" to="/create">新建文章</router-link>
            </DropdownItem>
            <DropdownItem>
              <router-link class="dropdown-item" :to="`/column/${user.column}`">我的专栏</router-link>
            </DropdownItem>
            <DropdownItem disabled>
              <router-link class="dropdown-item" to="/">编辑资料</router-link>
            </DropdownItem>
            <DropdownItem>
              <router-link
                class="dropdown-item"
                to="/"
                @click.prevent="handleLogout"
              >
                退出登录
              </router-link>
            </DropdownItem>
          </Dropdown>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import { GlobalDataProps, UserProps } from '@/store/types'
import Dropdown from '@/components/Dropdown.vue'
import DropdownItem from '@/components/DropdownItem.vue'
export default defineComponent({
  name: 'GlobalHeader',
  components: { Dropdown, DropdownItem },
  props: {
    user: {
      type: Object as PropType<UserProps>,
      required: true
    }
  },
  setup () {
    const store = useStore<GlobalDataProps>()
    const router = useRouter()
    const handleLogout = () => {
      store.commit('logout')
      router.push({ name: 'home' })
    }
    return {
      handleLogout
    }
  }
})
</script>

<style scoped>

</style>
