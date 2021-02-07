<template>
  <div class="container">
    <GlobalHeader :user="currentUser"/>
    <ColumnList :list="list"/>
    <ValidateForm @form-submit="onFormSubmit">
      <ValidateInput
        type="email"
        placeholder="请输入邮箱地址"
        :rules="emailRules"
        v-model="emailVal"
        ref="inputRef"
      />
      <template #submit>
        <span class="btn btn-danger">Submit</span>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import ColumnList, { ColumnProps } from '@/components/ColumnList.vue'
import GlobalHeader, { UserProps } from '@/components/GlobalHeader.vue'
import ValidateInput, { RulesProp } from '@/components/ValidateInput.vue'
import ValidateForm from '@/components/ValidateForm.vue'
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
const currentUser: UserProps = {
  isLogin: true,
  name: 'curry'
}
export default defineComponent({
  name: 'App',
  components: { ColumnList, GlobalHeader, ValidateInput, ValidateForm },
  setup () {
    const inputRef = ref<any>()
    const emailVal = ref('Curry')
    const emailRules: RulesProp = [
      { type: 'required', message: '电子邮箱地址不能为空' },
      { type: 'email', message: '请输入正确的电子邮箱格式' }
    ]
    const onFormSubmit = (result: boolean) => {
      console.log('result', result)
    }
    return {
      list: columnData,
      currentUser,
      emailRules,
      emailVal,
      onFormSubmit,
      inputRef
    }
  }
})
</script>

<style>

</style>
