import { RouteRecordRaw } from "vue-router"

interface Route extends Omit<RouteRecordRaw> {
    path: string
    name: string
    component?: Component | string
    parent: string
    children?: Route[]
}

interface RouteApi extends Omit<RouteRecordRaw> {
    children?: RouteApi[]
    icon: string
    key: string
    label: string
    menuId: string
    menuName: string
    menuType: number
    parentId: string
    path: string
    component: string
    sn: number // sort
}
