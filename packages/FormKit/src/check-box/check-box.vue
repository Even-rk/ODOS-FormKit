<template>
  <div :class="`odos-check-box ${theme}`">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { ref, useSlots } from 'vue'

const props = defineProps<{
  value?: number[]
  mutex?: boolean
  // 主题
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value', data?: string[] | number[]): void
}>()

type Item = {
  props: {
    label?: string | number
    value?: string | number
    alarm?: boolean
    disabled?: boolean
    mutexList?: number[]
  }
}

const slots = useSlots()
const randerContent = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1) {
    return CheckBoxItem((slots.default && slots.default()[0].children) as Item[])
  } else {
    return CheckBoxItem(list.value)
  }
}

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
                // 数组清空
                emit('update:value', newValue)
              }
              // 如果不是互斥内容，直接添加到数组中
              else {
                props.value?.push(it.props.value as never)
                emit('update:value', props.value)
              }
            }
          }}
        >
          {it.props.label}
          {list[index]}
        </div>
      ))}
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
}
</style>
