<template>
  <div class="create-post-page">
    <h4>{{isEditMode ? '编辑文章' : '新建文章'}}</h4>
    <Uploader
      class="d-flex align-items-center justify-content-center bg-light text-secondary w-100 my-4"
      action="/upload"
      :beforeUpload="uploadCheck"
      @file-uploaded-success="onFileUploadedSuccess"
      :uploaded="uploadedData"
    >
      <h2>点击上传头图</h2>
      <template #loading>
        <div class="d-flex">
          <div class="spinner-border text-secondary" role="status">
            <span class="visually-hidden">Loading...</span>
          </div>
          <h2>正在上传</h2>
        </div>
      </template>
      <template #uploadedSuccess="dataProps">
        <div class="uploaded-area">
          <img :src="dataProps.uploadedData.data.url" :alt="dataProps.uploadedData.data.filename">
          <h3>点击重新上传</h3>
        </div>
      </template>
    </Uploader>
    <ValidateForm @form-submit="onFormSubmit">
      <div class="mb-3">
        <label class="form-label">文章标题：</label>
        <ValidateInput
          type="text"
          placeholder="请输入文章标题"
          v-model="titleVal"
          :rules="titleRules"
        />
      </div>
      <div class="mb-3">
        <label class="form-label">文章详情：</label>
        <ValidateInput
          rows="10"
          tag="textarea"
          placeholder="请输入文章内容"
          v-model="contentVal"
          :rules="contentRules"
        />
      </div>
      <template #submit>
        <button class="btn btn-primary btn-lg">{{isEditMode ? '更新文章' : '发表文章'}}</button>
      </template>
    </ValidateForm>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import { useRouter, useRoute } from 'vue-router'
import { GlobalDataProps, PostProps, ResponseType, ImageProps } from '@/store/types'
import { beforeUploadCheck } from '@/utils/helper'
import ValidateForm from '@/components/ValidateForm.vue'
import ValidateInput, { RulesProps } from '@/components/ValidateInput.vue'
import Uploader from '@/components/Uploader.vue'
import createMessage from '@/components/createMessage'
export default defineComponent({
  name: 'CreatePost',
  components: { ValidateForm, ValidateInput, Uploader },
  setup () {
    const router = useRouter()
    const route = useRoute()
    const store = useStore<GlobalDataProps>()
    const titleVal = ref('')
    const titleRules: RulesProps = [
      { type: 'required', message: '文章标题不能为空' }
    ]
    const contentVal = ref('')
    const contentRules: RulesProps = [
      { type: 'required', message: '文章详情不能为空' }
    ]
    const queryId = route.query.id
    const isEditMode = !!queryId
    const uploadedData = ref()
    let imageId = ''
    onMounted(() => {
      if (isEditMode) {
        store.dispatch('fetchPost', queryId).then((rawData: ResponseType<PostProps>) => {
          const currentPost = rawData.data
          const { image, title, content } = currentPost
          if (image) {
            uploadedData.value = { data: image }
          }
          titleVal.value = title
          contentVal.value = content || ''
        })
      }
    })
    const onFormSubmit = (result: boolean) => {
      if (result) {
        const { column, _id } = store.state.user
        if (column) {
          const newPost: PostProps = {
            title: titleVal.value,
            content: contentVal.value,
            column,
            author: _id
          }
          if (imageId) {
            newPost.image = imageId
          }
          const actionName = isEditMode ? 'updatePost' : 'createPost'
          const sendData = isEditMode ? {
            id: queryId,
            payload: newPost
          } : newPost
          store.dispatch(actionName, sendData).then(() => {
            createMessage('发表成功，2秒后跳转到文章', 'success', 2000)
            setTimeout(() => {
              router.push({ name: 'column', params: { id: column } })
            }, 2000)
          })
        }
      }
    }
    const uploadCheck = (file: File) => {
      const result = beforeUploadCheck(file, {
        format: ['image/jpeg', 'image/png'],
        size: 1
      })
      const { passed, error } = result
      if (error === 'format') {
        createMessage('上传图片只能是 JPG/PNG 格式!', 'error')
      }
      if (error === 'size') {
        createMessage('上传图片大小不能超过 1Mb!', 'error')
      }
      return passed
    }
    const onFileUploadedSuccess = (rawData: ResponseType<ImageProps>) => {
      if (rawData.data._id) {
        imageId = rawData.data._id
      }
    }
    return {
      titleVal,
      titleRules,
      contentVal,
      contentRules,
      onFormSubmit,
      onFileUploadedSuccess,
      uploadCheck,
      uploadedData,
      isEditMode
    }
  }
})
</script>

<style>
.create-post-page .file-upload-container {
  height: 200px;
  cursor: pointer;
  overflow: hidden;
}
.create-post-page .file-upload-container img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.uploaded-area {
  position: relative;
}
.uploaded-area:hover h3 {
  display: block;
}
.uploaded-area h3 {
  display: none;
  position: absolute;
  color: #999;
  text-align: center;
  width: 100%;
  top: 50%;
}
</style>
