<template>
  <div :class="`odos-radio ${theme}`">
    <randerContent />
  </div>
</template>

<script setup lang="tsx">
import { ref, useSlots } from 'vue'

const props = defineProps<{
  value?: number[]
  itemWidth?: string
  // 主题
  theme?: 'light' | 'dark'
}>()

const emit = defineEmits<{
  (e: 'update:value' | 'change', data?: number[]): void
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
