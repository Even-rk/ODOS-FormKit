<template>
  <div :class="`odos-radio ${theme}`">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { ref, useSlots } from 'vue'

const props = defineProps<{
  content?: string
  value?: number[]
  itemWidth?: string
  // 反选择
  reverse?: boolean
  // 主题
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value' | 'change', data?: number[]): void
  (e: 'update:content', data: string): void
}>()

type Item = {
  props: {
    label?: string | number
    value?: number
    alarm?: boolean
    disabled?: boolean
  }
}

const slots = useSlots()
const randerContent = () => {
  const list = ref([] as Item[])
  list.value = (slots.default && slots.default()) as Item[]
  if (list.value.length <= 1) {
    return RadioItem((slots.default && slots.default()[0].children) as Item[])
  } else {
    return RadioItem(list.value)
  }
}
const RadioItem = (list: Item[]) => {
  return (
    <>
      {list?.map((it: Item, index: number) => (
        <div
          class={{
            'odos-radio-item': true,
            'active-alarm': it.props.alarm,
            active: it.props.value == props.value,
            disabled: it.props.disabled
          }}
          style={{ width: props.itemWidth }}
          onClick={() => {
            if (it.props.disabled) return
            if (it.props.value === props.value![0]) {
              if (!props.reverse) return
              emit('update:value', [])
            } else {
              emit('update:value', [it.props.value as number])
            }
          }}
        >
          {it.props.label}
          {list[index]}
        </div>
      ))}

      {list.some((i) => i.props.label == '其他' && props.value?.includes(i.props.value as number)) && (
        <input
          class="odos-radio-box-input"
          placeholder="请输入"
          maxlength={50}
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
.odos-radio {
  display: inline-flex;
  flex-wrap: wrap;
  user-select: none;

  :deep .odos-radio-item {
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

.odos-radio.dark {
  display: inline-flex;
  flex-wrap: wrap;
  user-select: none;

  :deep .odos-radio-item {
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
      color: #fff;

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

  :deep .odos-radio-box-input {
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
