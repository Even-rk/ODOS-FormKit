<template>
  <div class="`odos-formkit">
    <div class="odos-formkit-item" v-for="(i, index) in formData">
      <OdosCell
        :label="i.name"
        :label-width="labelWidth"
        v-if="!i.parentId || isShow(i.parentId, i.parentOptionsId)"
      >
        <!-- 下拉框 -->
        <template v-if="i.type == '下拉框'">
          <Select
            :theme="theme"
            v-model:value="FormValue[index].optionsList"
            width="100%"
            :disabled="i.hasDisabled"
            :multiple="i.dropdownType == '多选'"
            :mutex="i.hasMutuallyExclusive"
            :placeholder="i.placeholderContent"
            :options="i.optionsList"
          />
        </template>
        <!-- 单选按钮 -->
        <template v-else-if="i.type == '单选按钮'">
          <Radio v-model:value="FormValue[index].optionsList" :theme="theme">
            <RadioItem
              v-for="item in i.optionsList"
              :key="item.id"
              :value="item.id"
              :disabled="item.hasDisabled || i.hasDisabled"
            >
              {{ item.optionsName }}
            </RadioItem>
          </Radio>
        </template>
        <!-- 多选按钮 -->
        <template v-else-if="i.type == '多选按钮'">
          <Checkbox
            v-model:value="FormValue[index].optionsList"
            :theme="theme"
            :mutex="i.hasMutuallyExclusive"
          >
            <CheckboxItem
              v-for="item in i.optionsList"
              :key="item.id"
              :value="item.id"
              :disabled="item.hasDisabled || i.hasDisabled"
              :mutexList="item.mutuallyExclusiveCondition"
            >
              {{ item.optionsName }}
            </CheckboxItem>
          </Checkbox>
        </template>
        <!-- 多行文本框 -->
        <template v-else-if="i.type == '多行文本框'">
          <Textarea
            :theme="theme"
            v-model:value="FormValue[index].content"
            :placeholder="i.placeholderContent"
            :disabled="i.hasDisabled"
            :maxlength="i.maxLength"
          />
        </template>
      </OdosCell>
    </div>
  </div>
</template>

<script setup lang="ts">
// 表格
import OdosCell from './odos-cell/odos-cell.vue'
// 单选按钮
import Radio from './radio/radio.vue'
import RadioItem from './radio/radio-item.vue'
// 多选按钮
import Checkbox from './check-box/check-box.vue'
import CheckboxItem from './check-box/check-box-item.vue'
// 下拉框
import Select from './select/select.vue'
// 多行文本框
import Textarea from './textarea/textarea.vue'
import { nextTick, onBeforeMount, ref, watch } from 'vue'
import type { FormKitData, FormKitType } from '../../../types/form'

// 表单数据
const { formData, labelWidth, value, theme } = defineProps<{
  // 表单值
  value?: FormKitData[]
  // 表单题目数据
  formData?: FormKitType[]
  // 标签宽度
  labelWidth?: string
  // 主题
  theme?: 'light' | 'dark'
}>()

// 表单值
const emit = defineEmits<{
  (e: 'update:value', data?: FormKitData[]): void
}>()
// 表单值
const FormValue = ref<FormKitData[]>([])
onBeforeMount(() => {
  // 处理回显数据
  if (value && value?.length > 0) {
    FormValue.value = formData?.map((i, index) => {
      return {
        questionId: value[index] ? value[index].questionId : i.id,
        optionsList: value[index] ? value[index].optionsList : [],
        content: value[index] ? value[index].content : ''
      }
    }) as FormKitData[]
  }
  // 没有回显数据，初始化数据
  else {
    FormValue.value = formData?.map((i) => {
      return {
        questionId: i.id,
        optionsList: [],
        content: ''
      }
    }) as FormKitData[]
  }
})
// 表单值
watch(
  FormValue,
  (newValue) => {
    emit('update:value', newValue)
  },
  { deep: true }
)

// 二级/三级根据上级展示
const isShow = (parentId?: number, parentOptionsId?: string) => {
  if (parentId && parentOptionsId) {
    // 找到父级
    const target = FormValue.value.find((i) => i.questionId == parentId)
    // 找到父级的选项id
    const parentIdList = parentOptionsId.split(',')
    // 过滤出选项
    const list = target?.optionsList?.filter((i) => parentIdList.includes(i.toString()))
    if (!!list?.length) {
      return true
    } else {
      return false
    }
  } else {
    return true
  }
}

// 表单提交
const errorList = ref<
  {
    questionId?: number
    errorMessage?: string
    type?: string
    name?: string
  }[]
>([])
const submit = () => {
  return new Promise((resolve, reject) => {
    formData?.map((i, index) => {
      if (i?.hasRequired) {
        if (FormValue.value[index].optionsList!.length <= 0) {
          errorList.value.push({
            name: i.name,
            questionId: i.id,
            errorMessage: i.validationMessage,
            type: 'required'
          })
        }
      }
    })
    nextTick(() => {
      if (errorList.value.length > 0) {
        reject(errorList.value)
      } else {
        resolve(FormValue.value)
      }
    })
  })
}
// 重制
const reset = () => {
  FormValue.value = formData?.map((i) => {
    return {
      questionId: i.id,
      optionsList: [],
      content: ''
    }
  }) as FormKitData[]
}
// 暴露方法
defineExpose({ submit, reset })
</script>

<style scoped lang="scss">
@import '/styles/index.scss';
</style>
