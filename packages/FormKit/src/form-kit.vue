<template>
  <div class="`odos-formkit">
    <div class="odos-formkit-item" v-for="(i, index) in formData">
      <OdosCell :label="i.name" :label-width="labelWidth">
        <!-- 下拉框 -->
        <template v-if="i.type == '下拉框'">
          <Select
            :theme="theme"
            v-model:value="FormValue[index].optionsList"
            width="100%"
            :disabled="i.disabled"
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
              :disabled="item.disabled || i.disabled"
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
              :disabled="item.disabled || i.disabled"
              :mutexList="item.mutuallyExclusiveCondition"
            >
              {{ item.optionsName }}
            </CheckboxItem>
          </Checkbox>
        </template>
        <!-- 多行文本框 -->
        <template v-else-if="i.type == '多行文本框'">
          <Textarea
            v-model:value="FormValue[index].content"
            :placeholder="i.placeholderContent"
            :theme="theme"
            :disabled="i.disabled"
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
import { onBeforeMount, ref, watch } from 'vue'
import type { FormKitData, FormKitType } from '../../../types/form'

// 表单数据
const { formData, labelWidth, value, theme } = defineProps<{
  value?: FormKitData[]
  formData?: FormKitType[]
  labelWidth?: string
  // 主题
  theme?: 'light' | 'dark'
}>()

// 表单值
const emit = defineEmits<{
  (e: 'update:value', data?: FormKitData[]): void
}>()

const FormValue = ref<FormKitData[]>([])
onBeforeMount(() => {
  if (value && value?.length > 0) {
    FormValue.value = value
  } else {
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
</script>

<style scoped lang="scss">
@import '/styles/index.scss';
</style>
