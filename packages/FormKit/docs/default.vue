<template>
  <div class="odos-formkit">
    <odos-form-kit v-model:value="FormValue" label-width="120px" :form-data="formKitData"></odos-form-kit>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { FormKitData, FormKitType } from '../../../types/form'
import data from '../data'

const formKitData = data.data as unknown as FormKitType[]

const FormValue = ref([] as FormKitData[])
</script>

<style lang="scss" scoped>
.odos-formkit {
  width: 100%;
}
</style>
