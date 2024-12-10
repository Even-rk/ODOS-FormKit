<template>
  <div class="odos-formkit" v-if="FormValue.length > 0">
    <div
      class="odos-formkit-item"
      :class="{
        required: errorList.some((el) => el.questionId == i.id) && i.hasRequired
      }"
      v-for="(i, index) in formData"
      :key="i.id"
    >
      <FormItem
        :labelPosition="i.parentId ? 'top' : 'left'"
        :theme="theme"
        :label="i.name"
        :required="i.hasRequired"
        :label-width="labelWidth"
        v-if="!i.parentId || isShow(i.parentId, i.parentOptionsId, i.id)"
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
          <Radio
            v-model:value="FormValue[index].optionsList"
            v-model:content="FormValue[index].content"
            :theme="theme"
            :reverse="i.hasInverseSelection"
          >
            <RadioItem
              v-for="item in i.optionsList"
              :key="item.id"
              :value="item.id"
              :label="item.optionsName"
              :disabled="item.hasDisabled || i.hasDisabled"
            />
          </Radio>
        </template>
        <!-- 多选按钮 -->
        <template v-else-if="i.type == '多选按钮'">
          <Checkbox
            v-model:value="FormValue[index].optionsList"
            v-model:content="FormValue[index].content"
            :theme="theme"
            :mutex="i.hasMutuallyExclusive"
          >
            <CheckboxItem
              v-for="item in i.optionsList"
              :key="item.id"
              :value="item.id"
              :label="item.optionsName"
              :disabled="item.hasDisabled || i.hasDisabled"
              :mutexList="item.mutuallyExclusiveCondition"
            />
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
        <!-- 校验提示 -->
        <div class="validationMessage" v-if="errorList.some((el) => el.questionId == i.id) && i.hasRequired">
          {{ i.validationMessage || '请选择' }}
        </div>
      </FormItem>
    </div>
  </div>
</template>

<script setup lang="ts">
// 表格
import FormItem from './form-item/form-item.vue'
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
// 单行文本框
import { nextTick, ref, watch } from 'vue'
import type { FormKitData, FormKitType } from '../../../types/form'

// 表单数据
const props = defineProps<{
  // 表单值
  value: FormKitData[]
  // 表单题目数据
  formData?: FormKitType[]
  // 标签宽度
  labelWidth?: string
  // 主题
  theme?: 'light' | 'dark'
}>()
// 表单值
const emit = defineEmits(['update:value'])
// 表单值
const FormValue = ref<FormKitData[]>([])

// 二级/三级根据上级展示
const isShow = (parentId?: number, parentOptionsId?: number[], id?: number) => {
  if (parentId && parentOptionsId) {
    // 找到父级
    const target = FormValue.value.find((i) => i.questionId == parentId)
    // 过滤出选项
    const list = target?.optionsList?.filter((i) => parentOptionsId.includes(i))
    if (list?.length) {
      return true
    } else {
      // 处理二级选项的清除问题
      FormValue.value.find((i) => i.questionId == id)!.optionsList = []
      FormValue.value.find((i) => i.questionId == id)!.content = ''
      return false
    }
  } else {
    return true
  }
}

// 表单提交
const errorList = ref<FormKitData[]>([])
const isRequired = ref(false)
// 错误提交
const updateError = (flag?: boolean) => {
  errorList.value = []
  return new Promise<void>((resolve) => {
    props.formData?.forEach((i, index) => {
      // 一级选项
      if (i?.hasRequired && !i.parentId) {
        if (FormValue.value[index].optionsList!.length <= 0) {
          errorList.value.push(FormValue.value[index])
        }
      }
      // 次级选项
      else if (i?.hasRequired && i.parentId && flag) {
        // 找到父级
        const target = FormValue.value.find((el) => el.questionId == i.parentId)
        if (target?.optionsList?.some((el) => i.parentOptionsId?.includes(el))) {
          if (FormValue.value[index].optionsList!.length <= 0) {
            errorList.value.push(FormValue.value[index])
          }
        }
      }
    })
    resolve()
  })
}
// 提交
const submit = () => {
  isRequired.value = true
  return new Promise<FormKitData[]>((resolve, reject) => {
    updateError(true)
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
  FormValue.value = props.formData?.map((i) => {
    return {
      questionId: i.id,
      optionsList: [],
      content: ''
    }
  }) as FormKitData[]
}
// 表单值
const initVal = async () => {
  if (isRequired.value) {
    await updateError(false)
    emit('update:value', FormValue.value)
  } else {
    FormValue.value = FormValue.value.map((i, index) => {
      if (props.formData![index].parentId) {
        // 找到父级
        const target = FormValue.value.find((el) => {
          return el.questionId == props.formData![index].parentId
        })
        // 如果选中了父级，返回选项和内容
        const flag = target?.optionsList?.some((el) => {
          return props.formData![index].parentOptionsId?.includes(el)
        })
        if (flag) {
          return i
        } else {
          return {
            questionId: i.questionId,
            optionsList: [],
            content: ''
          }
        }
      } else {
        return i
      }
    })
    emit('update:value', FormValue.value)
  }
}

watch(props.value, () => initVal(), { deep: true, immediate: false })
watch(
  FormValue,
  () => {
    emit('update:value', FormValue.value)
  },
  { deep: true, immediate: false }
)
// 侦听
watch(
  () => props.formData,
  () => {
    nextTick(() => {
      if (props.value && props.value?.length > 0) {
        FormValue.value = props.formData?.map((i, index) => {
          return {
            questionId: props.value[index] ? props.value[index].questionId : i.id,
            optionsList: props.value[index] ? props.value[index].optionsList : [],
            content: props.value[index] ? props.value[index].content : ''
          }
        }) as FormKitData[]
      }
      // 没有回显数据，初始化数据
      else {
        FormValue.value = props.formData?.map((i) => {
          return {
            questionId: i.id,
            optionsList: [],
            content: ''
          }
        }) as FormKitData[]
      }
    })
  },
  { deep: true, immediate: true }
)
// 暴露方法
defineExpose({ submit, reset })
</script>

<style scoped lang="scss">
.odos-formkit {
  width: 100%;
  .odos-formkit-item {
    margin: 12px 0;
    width: 100%;
    &:first-child {
      margin-top: 0;
    }

    // 必填校验提示
    &.required {
      :deep {
        .odos-select,
        .odos-textarea {
          border: 1px solid #f65b56;
        }
      }
      .validationMessage {
        display: block;
        color: #f65b56;
      }
    }
  }
}
</style>
