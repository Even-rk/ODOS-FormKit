<template>
  <div class="odos-formkit" v-if="loading">
    <odos-form-kit
      ref="formRef"
      theme="light"
      v-model:value="FormValue"
      label-width="120px"
      :form-data="formKitData"
    />
    <Button @click="subMit">提交</Button>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch, watchEffect } from 'vue'
import { Button } from 'ant-design-vue'
import type { FormKitData, FormKitType } from '../../../types/form'
import data from '../data'

const formKitData = ref([] as FormKitType[])

const FormValue = ref([
  {
    questionId: 1,
    optionsList: [],
    content: ''
  },
  {
    questionId: 2,
    optionsList: [],
    content: ''
  },
  {
    questionId: 3,
    optionsList: [],
    content: ''
  },
  {
    questionId: 4,
    optionsList: [],
    content: ''
  },
  {
    questionId: 5,
    optionsList: [],
    content: ''
  },
  {
    questionId: 6,
    optionsList: [],
    content: ''
  },
  {
    questionId: 7,
    optionsList: [],
    content: ''
  },
  {
    questionId: 8,
    optionsList: [],
    content: ''
  },
  {
    questionId: 9,
    optionsList: [],
    content: ''
  },
  {
    questionId: 10,
    optionsList: [],
    content: ''
  },
  {
    questionId: 11,
    optionsList: [],
    content: ''
  },
  {
    questionId: 12,
    optionsList: [],
    content: ''
  },
  {
    questionId: 13,
    optionsList: [],
    content: ''
  },
  {
    questionId: 14,
    optionsList: [],
    content: ''
  },
  {
    questionId: 15,
    optionsList: [],
    content: ''
  },
  {
    questionId: 16,
    optionsList: [],
    content: ''
  },
  {
    questionId: 17,
    optionsList: [999],
    content: 'AAAA'
  },
  {
    questionId: 18,
    optionsList: [],
    content: ''
  }
] as FormKitData[])

const loading = ref(true)
const formRef = ref()
onMounted(async () => {
  formKitData.value = await new Promise<FormKitType[]>((resolve) => {
    setTimeout(() => {
      resolve(data.data as unknown as FormKitType[])
    }, 1000)
  })
})

watch(formKitData, () => {
  console.log(formKitData.value)
}, { deep: true })

const subMit = () => {
  loading.value = false
  setTimeout(() => {
    loading.value = true
  }, 2000)
}
</script>

<style lang="scss" scoped>
.odos-formkit {
  width: 100%;
}
</style>
