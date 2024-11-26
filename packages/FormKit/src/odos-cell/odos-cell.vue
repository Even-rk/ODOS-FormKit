<template>
  <div :class="className" :style="{ width: width || '100%' }" ref="el">
    <div class="label" :style="{ width: labelWidth || '100px' }">{{ label }}：</div>
    <div class="value" :style="{ height: valueHeight }">
      <slot>--</slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useElementSize } from '@vueuse/core'
import { computed, ref } from 'vue'
const { label, labelWidth, width, valueHeight } = defineProps<{
  label?: string
  labelWidth?: string
  width?: string
  valueHeight?: string
}>()

const el = ref()
const { height: elHeight } = useElementSize(el)
// 类名
const className = computed(() => {
  if (elHeight.value > 40) {
    return 'odos-cell-multiple'
  } else {
    return 'odos-cell'
  }
})
</script>

<style scoped lang="scss">
.odos-cell {
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

  .value {
    flex: 1;
    height: 100%;
    color: #fff;
  }
}

.odos-cell-multiple {
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

  .value {
    flex: 1;
    color: #fff;
  }
}
</style>
