# 快速上手

ODOS-FormKit -- Vue.js 3 UI 库

## 介绍

- <img src="public/favicon.ico" alt="image" style="zoom:25%;" /> 基于antd vue 封装的一套用于极橙系统开发的Form表单
- 💪 基于 Vue 3 Composition API
- 🔥 用 TypeScript 编写

## 用法

### 安装

```shell
# npm
npm install odos-form-kit
# yarn
yarn add odos-form-kit
# pnpm
pnpm install odos-form-kit
# bun
bun install odos-form-kit
```

### 使用方式

main.ts

```ts
import { createApp } from 'vue'
import App from './App.vue'
// 引入样式和组件
import 'odos-form-kit/lib/style.css'
import odosFormKit from 'odos-form-kit'

createApp(App).use(odosFormKit).mount('#app')
```
