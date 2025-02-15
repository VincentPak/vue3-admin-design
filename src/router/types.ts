import type { RouteRecordRaw, RouteMeta } from 'vue-router'
import { defineComponent } from 'vue'

export type Component<T = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// RouteRecordRaw detail, see: https://router.vuejs.org/api/#routerecordraw
export interface AppRoute extends Omit<RouteRecordRaw, 'children'> {
  name: string
  meta: RouteMeta
  component?: Component | string
  children?: AppRoute[]
  fullPath?: string
}

export interface AppMenu {
  name: string
  path: string
  children?: AppMenu[]
  disabled?: boolean
  icon?: string
  affix?: boolean
  orderNo?: number
  currentActiveMenu?: string
  ignoreKeepAlive?: boolean
  hideMenu?: boolean
  hideChildrenInMenu?: boolean
  hideBreadcrumb?: boolean
}

