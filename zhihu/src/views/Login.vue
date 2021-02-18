<template>
  <div class="login-page mx-auto p-3 w-330">
    <h5 class="my-4 text-center">登录到知乎</h5>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">邮箱地址</label>
        <ValidateInput
          type="email"
          ref="inputRef"
          placeholder="请输入邮箱地址"
          v-model="emailVal"
          :rules="emailRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">密码</label>
        <ValidateInput
          type="password"
          placeholder="请输入密码"
          v-model="passwordVal"
          :rules="passwordRules"
        />
        <div class="form-text">
          <router-link to="/signup">还没有账户？去注册一个新的吧！</router-link>
        </div>
      </div>
      <template #submit>
        <button
          class="btn btn-primary btn-block btn-large w-100"
          type="submit"
        >
          登录
        </button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
import createMessage from '@/components/createMessage'
export default defineComponent({
  name: 'Login',
  components: { ValidateForm, ValidateInput },
  setup () {
    const router = useRouter()
    const store = useStore()
    const emailVal = ref('')
    const emailRules: RulesProps = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const passwordVal = ref('')
    const passwordRules: RulesProps = [
      { type: 'required', message: '密码不能为空' }
    ]
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const payload = {
          email: emailVal.value,
          password: passwordVal.value
        }
        store.dispatch('loginAndFetch', payload).then(() => {
          createMessage('登录成功 2秒后跳转首页', 'success')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }).catch(e => {
          console.log(e)
        })
      }
    }
    return {
      emailVal,
      emailRules,
      passwordVal,
      passwordRules,
      onFormSubmit
    }
  }
})
</script>

<style scoped>
.w-330 {
  max-width: 330px;
}
.btn-block{
  width: 100%;
  display: block;
}
</style>
