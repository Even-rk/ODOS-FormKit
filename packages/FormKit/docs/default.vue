<template>
  <div class="odos-formkit">
    <odos-form-kit
      ref="formRef"
      theme="light"
      v-model:value="FormValue"
      label-width="120px"
      :form-data="formKitData"
    />
    <Button @click="submit">提交</Button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Button } from 'ant-design-vue'
import type { FormKitData, FormKitType } from '../../../types/form'
import data from '../data'

const formKitData = data.data as unknown as FormKitType[]

const FormValue = ref([
  {
    questionId: 1,
    optionsList: [1],
    content: ''
  }
] as FormKitData[])

const formRef = ref()
const submit = async () => {
  const { data } = await formRef.value.submit()
  console.log(data)
}
</script>

<style lang="scss" scoped>
.odos-formkit {
  width: 100%;
}
</style>
