<template>
  <div class="odos-input" :class="{ 'odos-input-disabled': disabled, dark: theme == 'dark' }">
    <input
      :style="inputStyle"
      :type="typeName || 'text'"
      :value="value"
      :disabled="disabled"
      @input="handleInput"
      :placeholder="placeholder || '请输入'"
    />
    <div
      v-if="type && type !== 'text'"
      class="odos-icon"
      :class="{ 'odos-search-icon': type == 'search' }"
      @click="iconClick"
    >
      <Icon :name="iconName" :color="theme == 'dark' ? 'rgba(255, 255, 255, 0.5)' : '#86909c'" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import Icon from '../icon/index.vue'

const emit = defineEmits<{
  (e: 'update:value' | 'search', data: string): void
  (e: 'input' | 'focus' | 'change' | 'blur', data: Event): void
}>()

const { value, placeholder, disabled, type, maxlength } = defineProps<{
  type?: 'text' | 'password' | 'search'
  value?: string
  placeholder?: string
  disabled?: boolean
  theme?: 'light' | 'dark'
  maxlength?: number
}>()
const Type = ref(type)
// typeName
const typeName = computed(() => {
  return Type.value == 'search' ? 'text' : Type.value
})
// iconName
const iconName = computed(() => {
  return Type.value == 'password' ? 'hide' : Type.value == 'search' ? 'Search' : 'View'
})
// inputStyle
const inputStyle = computed(() => {
  if (type === 'password' || type === 'search') {
    return {
      paddingRight: '35px'
    }
  } else {
    return {}
  }
})
const iconClick = () => {
  if (Type && Type.value == 'password') {
    Type.value = 'text'
  } else if (Type.value == 'text') {
    Type.value = 'password'
  }
}
// 处理input事件
const handleInput = (e: Event) => {
  if (maxlength) {
    emit('update:value', (e.target as HTMLInputElement).value.slice(0, maxlength))
  } else {
    emit('update:value', (e.target as HTMLInputElement).value)
  }
}
</script>

<style lang="scss" scoped>
.odos-input {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  input {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: 8px;
    padding: 10px 16px;
    width: 100%;
    height: 100%;
    border: 1px solid #f2f3f5;
    background: #f2f3f5;
    outline: none;

    &:hover {
      background: #e5e6eb;
    }

    &:focus-within {
      border: 1px solid #2e6ce4;
      background: #fff;
    }

    &::placeholder {
      color: #86909c;
    }
  }

  .odos-icon {
    position: absolute;
    right: 12px;
    cursor: pointer;

    &.odos-search-icon {
      cursor: auto;
    }
  }

  &.odos-input-disabled {
    background: #f2f3f5;
    border-radius: 8px;

    input:hover {
      cursor: not-allowed;
      background: #f2f3f5;
    }
  }
}

.odos-input.dark {
  position: relative;
  width: 100%;
  height: 40px;
  display: flex;
  align-items: center;

  input {
    display: flex;
    box-sizing: border-box;
    align-items: center;
    border-radius: 8px;
    padding: 10px 16px;
    background: #666666;
    color: #fff;
    width: 100%;
    height: 100%;
    border: 1px solid transparent;
    outline: none;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }

  .odos-icon {
    position: absolute;
    right: 12px;
    cursor: pointer;

    &.odos-search-icon {
      cursor: auto;
    }
  }
}
</style>
