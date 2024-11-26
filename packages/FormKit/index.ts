import type { App, Plugin } from 'vue'
import FormKit from './src/form-kit.vue'

export const FormKitPlugin: Plugin = {
  install(app: App) {
    app.component('OdosFormKit', FormKit)
  }
}

export { FormKit }
