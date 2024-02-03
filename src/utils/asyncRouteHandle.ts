import { RouteApi } from "@/@types/route"

const viewModules = import.meta.glob("../views/**/*.vue")

export const asyncRouterHandle = (asyncRouter: RouteApi[]) => {
    asyncRouter.forEach((item: RouteApi) => {
        if (item.component) {
            item.component = dynamicImport(viewModules, item.component)
        }
        if (item.children) {
            asyncRouterHandle(item.children)
        }
    })
}

function dynamicImport(
    dynamicViewsModules: string | string[],
    component: string
) {
    const keys = Object.keys(dynamicViewsModules)
    const matchKeys = keys.filter(key => {
        const k = key.replace("../", "")
        return k === component
    })
    const matchKey = matchKeys[0]
    return dynamicViewsModules[matchKey]
}
