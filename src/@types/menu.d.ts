interface MenuType {
    no?: number | null
    menuId?: string | null
    apiPath?: string | null
    createTime?: string | null
    description?: string | null
    enable?: number | null | string
    icon?: string | null
    menuName?: string | null
    menuType?: number | null | string
    methodApi?: string | null
    parentId?: string | null
    parentName?: string | null
    path?: string | null
    sn?: number | null
    test?: string | null
    children?: MenuType[] | null
}

interface OptionParent {
    label: string | null
    value: string | null
}

interface MenuParamsSearch {
    menuName?: string | null
    description?: string | null
    path?: string | null
    enable?: number | null
}
