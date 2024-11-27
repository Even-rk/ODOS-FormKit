<template>
  <div class="odos-formkit">
    <odos-form-kit ref="formRef" v-model:value="FormValue" label-width="120px" :form-data="formKitData" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
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
onMounted(() => {
  // formRef.value.submit()
})
</script>

<style lang="scss" scoped>
.odos-formkit {
  width: 100%;
}
</style>
