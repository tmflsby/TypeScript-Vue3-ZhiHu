<template>
  <teleport to="#modal">
    <div class="modal d-block" tabindex="-1" v-if="visible">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">{{title}}</h5>
            <button
              class="close btn-close"
              type="button"
              data-dismiss="modal"
              aria-label="Close"
              @click="onClose"
            >
            </button>
          </div>
          <div class="modal-body">
            <slot></slot>
          </div>
          <div class="modal-footer">
            <button
              class="btn btn-secondary"
              type="button"
              data-dismiss="modal"
              @click="onClose"
            >
              取消
            </button>
            <button
              class="btn btn-primary"
              type="button"
              @click="onConfirm"
            >
              确定
            </button>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import useDomCreate from '@/hooks/useDOMCreate'
export default defineComponent({
  name: 'Modal',
  props: {
    title: String,
    visible: {
      type: Boolean,
      default: false
    }
  },
  emits: ['modal-on-close', 'modal-on-confirm'],
  setup (props, context) {
    useDomCreate('modal')
    const onClose = () => {
      context.emit('modal-on-close')
    }
    const onConfirm = () => {
      context.emit('modal-on-confirm')
    }
    return {
      onClose,
      onConfirm
    }
  }
})
</script>

<style scoped>

</style>
