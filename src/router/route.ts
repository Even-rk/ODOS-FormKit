import type { RouteRecordRaw } from 'vue-router'

const route: RouteRecordRaw[] = [
  {
    name: 'useCopm',
    path: '/components/useComp',
    component: () => import('packages/README.md')
  },
  {
    name: 'FormKit',
    path: '/components/FormKit',
    component: () => import('packages/FormKit/docs/README.md')
  }
]

export default route
