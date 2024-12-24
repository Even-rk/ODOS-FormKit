<template>
  <div class="odos-textarea" :class="theme">
    <Textarea
      :placeholder="placeholder || '请输入'"
      :value="value"
      @input="$input($event)"
      :disabled="disabled"
      :maxlength="maxlength"
    />
    <div class="length" v-if="maxlength">{{ value?.length }}/{{ maxlength }}</div>
  </div>
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
const { value, maxlength, disabled, placeholder, theme } = defineProps<{
  value?: string
  maxlength?: number
  autoSize?: boolean
  disabled?: boolean
  placeholder?: string
  // 主题
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value', data: string): void
}>()
const $input = (e: ChangeEvent) => {
  const target = e.target as HTMLInputElement
  emit('update:value', target.value)
}
</script>

<style lang="scss" scoped>
.odos-textarea {
  position: relative;
  .length {
    position: absolute;
    right: 0;
    bottom: -15px;
    line-height: 12px;
    font-size: 12px;
    color: #86909c;
  }
  textarea {
    border-color: transparent;
    background: #f2f3f5;
    height: 100%;

    &:hover {
      background: #e5e6eb;
      border-color: transparent;
    }

    &:focus-within {
      border: 1px solid #2e6ce4;
      background: #fff;
    }

    &:focus {
      box-shadow: none;
    }

    &::placeholder {
      color: #86909c;
    }
  }
}

.odos-textarea.dark {
  .length {
    line-height: 12px;
    float: right;
    font-size: 12px;
    color: #fff;
  }
  textarea {
    border-color: transparent;
    background: #666666;
    height: 100%;
    color: #fff;
    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
