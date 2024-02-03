import { RouteApi } from "@/@types/route"
import { asyncRouterHandle } from "@/utils/asyncRouteHandle"
import { defineStore } from "pinia"
import { ref } from "vue"
import { getRouteServerApi } from "@apis/permission.ts"
import { camelToSnakeCase } from "@/utils/string.ts"
import { compare } from "@/utils/arrayUtil.ts"

export const useRouterStore = defineStore("router", () => {
    const asyncRouterFlag = ref(0)
    const routes = ref<RouteApi[]>([])
    const listMenu = ref<RouteApi[]>([])

    async function setAsyncRoute() {
        asyncRouterFlag.value++
        const baseRouterApi: RouteApi[] = [
            {
                children: [],
                icon: "",
                key: "9999",
                label: "layout",
                menuId: "9999",
                menuName: "layout",
                menuType: 0,
                parentId: "",
                path: "/layout",
                component: "views/layout/index.vue",
                sn: 9999, // sort
            },
        ]
        const resR = await getRouteServerApi()
        if (resR.data.code !== -1) {
            // resR.data.data = resR.data.data.map((it: RouteApi) => {
            //     if (!(it.path.includes("/views/"))) {
            //         return
            //     }
            //     return {
            //         ...it,
            //         component: `${it.path.substring(1)}index.vue`,
            //         path: `${camelToSnakeCase(`${it.path.replace("/views", "")}`.slice(0, -1))}`,
            //     }
            // })
            const dataTmp = []
            for (let i = 0; i < resR.data.data.length; i++) {
                if (resR.data.data[i].path.includes("/views/")) {
                    dataTmp.push({
                        ...resR.data.data[i],
                        component: `${resR.data.data[i].path.substring(
                            1
                        )}index.vue`,
                        path: `${camelToSnakeCase(
                            `${resR.data.data[i].path.replace(
                                "/views",
                                ""
                            )}`.slice(0, -1)
                        )}`,
                    })
                }
            }
            dataTmp.sort((a, b) => compare(a, b, "sn"))
            listMenu.value = [...dataTmp]
            baseRouterApi[0].children = [...dataTmp] as RouteApi[]
        }
        if (baseRouterApi[0].children) {
            baseRouterApi[0].children.push({
                children: [],
                icon: "",
                key: "9997",
                label: "wrong",
                menuId: "9997",
                menuName: "wrong",
                menuType: 0,
                parentId: "",
                path: "/wrong",
                component: "views/default/index.vue",
                sn: 9997, // sort
            })
            baseRouterApi[0].children.push({
                children: [],
                icon: "",
                key: "9996",
                label: "404",
                menuId: "9996",
                menuName: "404",
                menuType: 0,
                parentId: "",
                path: "/404",
                component: "views/error/404.vue",
                sn: 9996, // sort
            })
        }
        asyncRouterHandle(baseRouterApi)
        routes.value = baseRouterApi
        return baseRouterApi
    }

    return {
        routes,
        asyncRouterFlag,
        listMenu,
        setAsyncRoute,
    }
})
