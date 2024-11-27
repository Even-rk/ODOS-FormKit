<template>
  <div :class="`odos-check-box ${theme}`">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { ref, useSlots } from 'vue'

const props = defineProps<{
  content?: string
  value?: number[]
  mutex?: boolean
  // 主题
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value', data?: number[]): void
  (e: 'update:content', data?: string): void
}>()

type Item = {
  props: {
    label?: string
    value?: number
    alarm?: boolean
    disabled?: boolean
    mutexList?: number[]
  }
}
// 获取插槽
const slots = useSlots()
// 渲染内容
const randerContent = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1) {
    return CheckBoxItem((slots.default && slots.default()[0].children) as Item[])
  } else {
    return CheckBoxItem(list.value)
  }
}
// 处理其他
const handleOther = (list: Item[], val?: number[]) => {
  if (!list.some((i) => i.props.label == '其他' && val?.includes(i.props.value as number))) {
    emit('update:content', '')
  } else {
    emit('update:content', props.content)
  }
}

// 多选项
const CheckBoxItem = (list: Item[]) => {
  return (
    <>
      {list?.map((it: Item, index: number) => (
        <div
          class={{
            'odos-check-box-item': true,
            'active-alarm': it.props.alarm,
            active: props.value?.includes(it.props.value as never),
            disabled: it.props.disabled
          }}
          onClick={() => {
            // 如果当前项（it.props.value）已经被禁用（it.props.disabled），则直接返回，不执行任何操作。
            if (it.props.disabled) return
            // 如果props.value数组已经包含了当前项（it.props.value），则从数组中移除这个项。
            if (props.value?.includes(it.props.value as never)) {
              props.value.splice(props.value.indexOf(it.props.value as never), 1)
              handleOther(list, props.value)
              emit('update:value', props.value)
            }
            // 如果props.value数组中不包含当前项，则将这个项添加到数组的末尾。
            else {
              // 处理互斥内容
              if (props.mutex) {
                props.value?.push(it.props.value as never)
                const newValue = props.value?.filter((item) => {
                  return !it.props.mutexList?.includes(item)
                })
                handleOther(list, newValue)
                // 数组清空
                emit('update:value', newValue)
              }
              // 如果不是互斥内容，直接添加到数组中
              else {
                props.value?.push(it.props.value as never)
                handleOther(list, props.value)
                emit('update:value', props.value)
              }
            }
          }}
        >
          {it.props.label}
          {list[index]}
        </div>
      ))}
      {/* 其他输入 */}
      {list.some((i) => i.props.label == '其他' && props.value?.includes(i.props.value as number)) && (
        <input
          class="odos-check-box-input"
          placeholder="请输入"
          onInput={(e) => {
            emit('update:content', (e.target as HTMLInputElement).value)
          }}
        />
      )}
    </>
  )
}
</script>

<style lang="scss" scoped>
.odos-check-box {
  display: inline-flex;
  flex-wrap: wrap;

  :deep .odos-check-box-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    font-size: 14px;
    padding: 0 20px;
    margin: 2px 1px;
    color: #4e5969;
    background: #f2f3f5;

    &.disabled {
      cursor: not-allowed;
      color: #c9cdd4;

      &:hover {
        background: #f2f3f5;
      }
    }

    &:first-child {
      border-radius: 6px 0px 0px 6px;
      margin-left: 0;
    }

    &:last-child {
      border-radius: 0px 6px 6px 0px;
      margin-right: 0;
    }

    &:hover {
      background: #e5e6eb;
    }

    &.active {
      background: #e7efff;
      color: #2e6ce4;
      font-weight: bold;

      &.active-alarm {
        background: #feefef;
        color: #ff4f49;
      }
    }
  }

  :deep .odos-check-box-input {
    width: 100px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 10px 4px;
    height: 36px;
    outline: none;
    margin: 2px 1px;
    border-radius: 0px 6px 6px 0px;
    border: 1px solid #f2f3f5;
    background: #f2f3f5;

    &::placeholder {
      color: #86909c;
    }
  }
}

.odos-check-box.dark {
  display: inline-flex;
  flex-wrap: wrap;

  :deep .odos-check-box-item {
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 36px;
    font-size: 14px;
    padding: 0 20px;
    margin: 2px 1px;
    color: #fff;
    background: #666666;

    &.disabled {
      cursor: not-allowed;
      color: #444444;

      &:hover {
        background: #999999;
      }
    }

    &:first-child {
      border-radius: 6px 0px 0px 6px;
      margin-left: 0;
    }

    &:last-child {
      border-radius: 0px 6px 6px 0px;
      margin-right: 0;
    }

    &:hover {
      background: #606060;
    }

    &.active {
      background: #e2e2e2;
      color: #1d1c1c;
      font-weight: bold;

      &.active-alarm {
        background: #feefef;
        color: #ff4f49;
      }
    }
  }

  :deep .odos-check-box-input {
    width: 100px;
    display: flex;
    box-sizing: border-box;
    align-items: center;
    padding: 10px 4px;
    background: #666666;
    color: #fff;
    height: 36px;
    border: 1px solid transparent;
    outline: none;
    margin: 2px 1px;
    border-radius: 0px 6px 6px 0px;

    &::placeholder {
      color: rgba(255, 255, 255, 0.5);
    }
  }
}
</style>
