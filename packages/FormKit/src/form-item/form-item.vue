<template>
  <div
    :class="`${className} ${theme} ${labelPosition}`"
    :style="{
      width: width || '100%',
      paddingLeft: labelPosition == 'top' ? labelWidth || '100px' : 0
    }"
    ref="el"
  >
    <div class="label" v-if="labelPosition == 'left'" :style="{ width: labelWidth || '100px' }">
      <div class="required" v-if="required">*</div>
      {{ label }}：
    </div>
    <div class="label" v-if="labelPosition == 'top'">
      <div class="required" v-if="required">*</div>
      {{ label }}
    </div>
    <div
      class="value"
      :style="{
        height: valueHeight,
        width: labelPosition == 'top' ? `calc(100% - ${labelWidth})` || '100%' : 0
      }"
    >
      <slot>--</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
const { label, labelWidth, width, valueHeight, theme, labelPosition, required } = defineProps<{
  label?: string
  labelWidth?: string
  width?: string
  valueHeight?: string
  theme?: 'light' | 'dark'
  // 必填
  required?: boolean
  // 标题位置
  labelPosition?: 'left' | 'top'
}>()

const el = ref()
const { height: elHeight } = useElementSize(el)
// 类名
const className = computed(() => {
  if (elHeight.value > 40) {
    return 'form-item-multiple'
  } else {
    return 'form-item'
  }
})
</script>

<style scoped lang="scss">
// 星星
.required {
  display: inline-block;
  color: #ff4d4f;
  font-size: 14px;
  line-height: 1;
}
.form-item {
  min-height: 24px;
  display: inline-flex;
  align-items: center;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    min-width: 70px;
    font-size: 14px;
    text-align: end;
    color: #1d2129;
  }
  &.dark .label {
    min-width: 70px;
    font-size: 14px;
    text-align: end;
    color: #fff;
  }
  .value {
    flex: 1;
    height: 100%;
    color: #fff;
  }
}

.form-item-multiple {
  min-height: 24px;
  display: inline-flex;
  margin-bottom: 12px;

  &:last-child {
    margin-bottom: 0;
  }

  .label {
    margin-top: 8px;
    height: 20px;
    line-height: 20px;
    min-width: 70px;
    font-size: 14px;
    text-align: end;
    color: #1d2129;
  }
  &.dark .label {
    margin-top: 8px;
    height: 20px;
    line-height: 20px;
    min-width: 70px;
    font-size: 14px;
    text-align: end;
    color: #fff;
  }

  .value {
    flex: 1;
    color: #fff;
  }
}

.form-item,
.form-item-multiple {
  &.top {
    display: flex;
    flex-direction: column;
    .label {
      text-align: left;
      margin-top: 0;
    }
  }
}
</style>
