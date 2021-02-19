<template>
  <div class="file-upload">
    <div
      class="file-upload-container"
      @click.prevent="triggerUploader"
      v-bind="$attrs"
    >
      <slot name="loading" v-if="fileStatus === 'loading'">
        <button class="btn btn-primary" disabled>正在上传...</button>
      </slot>
      <slot
        name="uploadedSuccess"
        :uploadedData="uploadedData"
        v-else-if="fileStatus === 'success'"
      >
        <button class="btn btn-primary">上传成功</button>
      </slot>
      <slot name="default" v-else>
        <button class="btn btn-primary">点击上传</button>
      </slot>
    </div>
    <input
      class="file-input d-none"
      type="file"
      ref="fileInput"
      @change="handleFileChange"
    >
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue'
import axiosRequest from '@/utils/axiosRequest'
type UploadStatus = 'ready' | 'loading' | 'success' | 'error'
type CheckFunction = (file: File) => boolean
export default defineComponent({
  name: 'Uploader',
  props: {
    action: {
      type: String,
      required: true
    },
    beforeUpload: {
      type: Function as PropType<CheckFunction>
    }
  },
  inheritAttrs: false,
  emits: ['file-uploaded-success', 'file-uploaded-error'],
  setup (props, context) {
    const fileInput = ref<null | HTMLInputElement>(null)
    const fileStatus = ref<UploadStatus>('ready')
    const uploadedData = ref()
    const triggerUploader = () => {
      if (fileInput.value) {
        fileInput.value.click()
      }
    }
    const handleFileChange = (e: Event) => {
      const currentTarget = e.target as HTMLInputElement
      if (currentTarget.files) {
        const files = Array.from(currentTarget.files)
        if (props.beforeUpload) {
          const result = props.beforeUpload(files[0])
          if (!result) {
            return
          }
        }
        fileStatus.value = 'loading'
        const formData = new FormData()
        formData.append('file', files[0])
        axiosRequest.post(props.action, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(resp => {
          console.log(resp.data)
          fileStatus.value = 'success'
          uploadedData.value = resp.data
          context.emit('file-uploaded-success', resp.data)
        }).catch(error => {
          fileStatus.value = 'error'
          context.emit('file-uploaded-error', { error })
        }).finally(() => {
          if (fileInput.value) {
            fileInput.value.value = ''
          }
        })
      }
    }
    return {
      fileInput,
      triggerUploader,
      fileStatus,
      handleFileChange,
      uploadedData
    }
  }
})
</script>

<style scoped>

</style>
