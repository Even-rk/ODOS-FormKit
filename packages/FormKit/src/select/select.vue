<template>
  <div class="odos-select" :class="{ 'odos-select-disabled': disabled, dark: theme === 'dark' }">
    <Select
      @select="selectChange($event as number)"
      showArrow
      v-model:value="selectVal"
      :placeholder="placeholder || '请选择'"
      :mode="mode"
      :options="optionsList"
      :bordered="false"
      :disabled="disabled"
      :max-tag-count="2"
      show-search
      :defaultActiveFirstOption="false"
      :getPopupContainer="getPopupContainer"
    >
      <template #suffixIcon>
        <slot name="suffixIcon">
          <Icon name="ArowDown" size="16px" color="#fff" />
        </slot>
      </template>
      <template #notFoundContent>
        <slot name="notFoundContent">
          <Empty />
        </slot>
      </template>
    </Select>
  </div>
</template>

<script setup lang="ts">
import Icon from '../icon/index.vue'
import { Empty, Select } from 'ant-design-vue'
import { computed, onBeforeMount, ref, nextTick } from 'vue'
const { value, placeholder, options, disabled, multiple, mutex, theme } = defineProps<{
  value?: number[]
  placeholder?: string
  options?: { id?: number; optionsName?: string; mutuallyExclusiveCondition?: number[] }[]
  disabled?: boolean
  // 是否多选
  multiple?: boolean
  // 是否互斥
  mutex?: boolean
  // 主题
  theme?: 'light' | 'dark'
}>()

// 处理options
const optionsList = computed(() => {
  return options?.map((i) => ({
    value: i.id,
    label: i.optionsName,
    mutexList: i.mutuallyExclusiveCondition
  }))
})

const emit = defineEmits<{
  (e: 'update:value', data?: number[]): void
}>()
/**
 * @description: 单选框的select事件
 * @param {number} changeVal 选中的值
 */

const mode = computed(() => {
  return multiple ? 'multiple' : undefined
})

const getPopupContainer = (triggerNode: Element) => {
  return triggerNode.parentElement || document.body
}

// 初始化值
const selectVal = ref()
onBeforeMount(() => {
  if (!multiple) {
    selectVal.value = value![0]
  } else {
    selectVal.value = value || []
  }
})

//  单选框的select事件
const selectChange = (val: number) => {
  // 多选
  if (multiple) {
    // 多选互斥
    if (mutex) {
      nextTick(() => {
        // 当前选项
        const target = optionsList.value?.find((ele) => ele.value === val)
        // 去除互斥的选项
        selectVal.value = selectVal.value.filter((ele: number) => {
          return !target?.mutexList?.includes(ele)
        })
        emit('update:value', selectVal.value)
      })
    }
    // 多选非互斥
    else {
      emit('update:value', selectVal.value)
    }
  }
  // 单选
  else {
    emit('update:value', [selectVal.value])
  }
}
</script>

<style lang="scss" scoped>
// 默认样式
.odos-select {
  height: 40px;
  position: relative;
  background: #f2f3f5;
  border: 1px solid #f2f3f5;
  border-radius: 8px;
  display: flex;
  align-items: center;
  // 鼠标悬浮的样式
  &:hover {
    background: #e5e6eb;
    border-radius: 8px;
  }
  // 获取焦点的样式
  &:focus-within {
    border: 1px solid #2e6ce4;
    background: #fff;
    border-radius: 8px;
  }
  // 禁用的样式
  &.odos-select-disabled:hover {
    background: #fff;
  }
  // 输入框的样式
  :deep .ant-select {
    width: 100%;
    height: 40px;
    // 去除边框阴影
    .ant-select-selector {
      align-items: center;
      height: 40px;
      padding-left: 10px;

      .ant-select-selection-placeholder {
        color: #86909c;
      }
      .ant-select-selection-search {
        display: inline-flex;
        align-items: center;
      }
    }
  }

  // 多选选中的内容tag
  :deep .ant-select-multiple {
    .ant-select-selection-search {
      width: 0;
      margin-inline-start: 0;
    }
    .ant-select-selection-item {
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #ffffff;
      box-sizing: border-box;
      border: 1px solid #e5e6eb;
    }
  }

  // 下拉框的样式
  :deep .ant-select-dropdown {
    .ant-select-item-option-selected {
      background: transparent;
      color: #2e6ce4;
    }
    .ant-select-item {
      &:hover {
        background: #f7f8fa;
      }
    }
  }
}

//  暗黑模式
.odos-select.dark {
  height: 40px;
  position: relative;
  background: #666;
  color: #fff;
  border: 1px solid transparent;
  border-radius: 8px;
  display: flex;
  align-items: center;
  // 禁用的样式
  &.odos-select-disabled:hover {
    background: #666;
  }
  // 输入框的样式
  :deep .ant-select {
    height: 40px;
    // 去除边框阴影
    .ant-select-selector {
      align-items: center;
      height: 40px;
      padding-left: 10px;

      .ant-select-selection-placeholder {
        color: rgba(255, 255, 255, 0.5);
      }
      .ant-select-selection-search {
        display: inline-flex;
        align-items: center;
      }
    }
  }

  // 多选选中的内容tag
  :deep .ant-select-multiple {
    .ant-select-selection-search {
      width: 0;
      margin-inline-start: 0;
      color: #fff;
    }
    .ant-select-selection-item {
      color: #fff;
      border-radius: 4px;
      display: flex;
      justify-content: center;
      align-items: center;
      background: #8a8a8a;
      box-sizing: border-box;
      border: 1px solid transparent;
      * {
        fill: #fff;
      }
    }
  }

  // 下拉框的样式
  :deep .ant-select-dropdown {
    background: #666;
    .ant-select-item-option-selected {
      background: transparent;
      font-weight: 500;
    }
    .ant-select-item {
      color: #fff;
      &:hover {
        background: #5a5a5a;
      }
    }
  }
}
</style>
