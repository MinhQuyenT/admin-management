import router from "@/router"
import { useAuthStore } from "./stores/modules/auth"
import { useRouterStore } from "./stores/modules/router"
import Nprogress from "nprogress"
import "nprogress/nprogress.css"
import { RouteRecordRaw } from "vue-router"

const WHITE_LIST = ["/login", "/register"]

const getRouter = async () => {
    const routerStore = useRouterStore()
    await routerStore.setAsyncRoute()
    routerStore.routes.forEach(route => {
        router.addRoute(route as RouteRecordRaw)
    })
}

Nprogress.configure({ showSpinner: false, easing: "ease", speed: 500 })
router.beforeEach(async to => {
    Nprogress.start()
    const routerStore = useRouterStore()
    const authStore = useAuthStore()
    const token = authStore.token
    if (token) {
        // if đã đăng nhập
        if (!routerStore.asyncRouterFlag) {
            // if chưa lấy list route
            await getRouter()
            if (WHITE_LIST.indexOf(to.path as string) > -1) {
                // if path trong white list
                if (
                    routerStore.routes &&
                    routerStore.routes[0].children &&
                    routerStore.routes[0].children[0]
                ) {
                    // if có route trong list route
                    return { path: routerStore.routes[0].children[0].path } // -> go to trang đầu
                } else {
                    // else không có route trong list route
                    return { path: "/wrong" }
                }
            } else {
                // else path không trong white list
                const listRoute = router.getRoutes().map(it => it.path)
                if (listRoute.indexOf(to.path as string) > -1) {
                    // if path trong list route
                    return { ...to }
                } else {
                    return { path: "404" }
                }
            }
        } else {
            // else đã lấy list route
            if (WHITE_LIST.indexOf(to.path as string) > -1) {
                // if path trong white list
                if (
                    routerStore.routes &&
                    routerStore.routes[0].children &&
                    routerStore.routes[0].children[0]
                ) {
                    // if có route trong list route
                    return { path: routerStore.routes[0].children[0].path } // -> go to trang đầu
                } else {
                    return { path: "/wrong" }
                }
            } else {
                // else path không trong white list
                const listRoute = router.getRoutes().map(it => it.path)
                if (listRoute.indexOf(to.path as string) < 0) {
                    // if path không trong list route
                    return { path: "404" }
                } else {
                    return true
                }
            }
        }
    } else {
        // else chưa đăng nhập
        if (authStore.getRefreshToken()) {
            const resRefresh = await authStore.refreshTokenServer({
                refreshToken: authStore.getRefreshToken(),
            })
            const resData = resRefresh.data as RefreshTokenRes
            if (resData.code !== -1) {
                authStore.setToken(resData.data.accessToken)
                authStore.setRefreshTokenLocal(resData.data.refreshToken)
                return { ...to }
            } else {
                authStore.clearLocalStorage()
                return { path: "/login" }
            }
        } else {
            if (WHITE_LIST.indexOf(to.path as string) < 0) {
                // if path không trong white list
                return { path: "/login" }
            }
        }
    }
})

router.afterEach(() => {
    Nprogress.done()
})

router.onError(() => {
    Nprogress.remove()
})
