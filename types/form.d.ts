export interface FormKitType {
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
}

export interface FormKitData {
  questionId?: number // '题目id'
  optionsList?: number[] // '选中的id'
  content?: string // '文本内容'
}
