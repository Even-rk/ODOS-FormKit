# 快速上手

介绍如何在项目中使用 odos-form-kit 组件。

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

form.d.ts

```ts
// 表单题目数据类型
type FormKitType = {
  id?: number // 题目id
  name?: string // 题目名称
  type?: string // 题目类型
  dropdownType?: string // 下拉框类型
  hasRequired?: boolean // '是否必选'
  hasInverseSelection?: boolean // '是否反选'
  hasMutuallyExclusive?: boolean // '是否互斥'
  questionLevel?: number // '等级'
  parentId?: number // '父级id'
  parentOptionsId?: number[] // '父级选项id(id拼接的字符串)'
  validationMessage?: string // '校验必填提示'
  placeholderContent?: string // '占位符内容'
  prompt?: string // '提示'
  hasDisabled?: boolean // '是否禁用'
  maxLength?: number // '最大长度'
  ruleValidation?: string // '校验规则'
  optionsList?: {
    id?: number // '选项id'
    hasDisabled?: boolean // '是否禁用'
    optionsName?: string // '选项名称'
    color?: string // '颜色'
    mutuallyExclusiveCondition?: number[] // '互斥选项多个'
    optionTooltip?: string // '选项提示'
  }[]
  remark?: string // '备注'
}[]

// 表单绑定数据类型
type FormKitData = {
  questionId?: number // '题目id'
  optionsList?: number[] // '选中的id'
  content?: string // '文本内容'
}[]
```
