<template>
  <div class="odos-formkit">
    <odos-form-kit
      ref="formRef"
      theme="light"
      v-model:value="FormValue"
      label-width="120px"
      :form-data="formKitData"
    />
    <Button>提交</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { Button } from 'ant-design-vue'
import type { FormKitData, FormKitType } from '../../../types/form'
import data from '../data'

const formKitData = ref([] as FormKitType[])

const FormValue = ref([
  {
    questionId: 1,
    optionsList: [1],
    content: ''
  }
] as FormKitData[])

const formRef = ref()
onMounted(async () => {
  formKitData.value = await new Promise<FormKitType[]>((resolve) => {
    setTimeout(() => {
      resolve(data.data as unknown as FormKitType[])
    }, 1000)
  })
})
</script>

<style lang="scss" scoped>
.odos-formkit {
  width: 100%;
}
</style>
