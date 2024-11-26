<template>
  <Textarea
    class="odos-textarea"
    :placeholder="placeholder || '请输入'"
    :value="value"
    @input="$input($event)"
    :disabled="disabled"
    :maxlength="maxlength"
  />
</template>

<script setup lang="ts">
import { Textarea } from 'ant-design-vue'
import type { ChangeEvent } from 'ant-design-vue/es/_util/EventInterface'
const { value, maxlength, disabled, placeholder } = defineProps<{
  value?: string
  maxlength?: number
  autoSize?: boolean
  disabled?: boolean
  placeholder?: string
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
</style>
