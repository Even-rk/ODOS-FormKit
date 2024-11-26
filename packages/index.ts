/* eslint-disable */

/**
 * !--------- FBI WARNING ----------!
 *
 * 根据 /packages 目录下的组件所生成的模块导出，请勿手动修改
 */
import type { App } from 'vue'
import { FormKitPlugin } from './FormKit'
const Packages = [FormKitPlugin]

const OdosPlugin: any = {
  install(app: App) {
    Packages.forEach((item) => {
      item.install?.(app)
    })
  }
}

export default OdosPlugin

// 统一导出
export * from './FormKit'
