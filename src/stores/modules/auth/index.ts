import { defineStore } from "pinia"
import { ref } from "vue"
import { getTokenServer, login } from "@apis/auth.ts"
import { useRouterStore } from "@stores/modules/router"
import { RouteRecordRaw, useRouter } from "vue-router"
import router from "@/router"
// import { useMessage } from "naive-ui"

// const message = useMessage()

export const useAuthStore = defineStore("auth", () => {
    const token = ref<string>("")

    const routerStore = useRouterStore()
    const routerVue = useRouter()

    function setToken(val: string) {
        token.value = val
    }

    function setRefreshTokenLocal(val: string) {
        localStorage.setItem("RTOKEN", val)
    }

    function clearLocalStorage() {
        localStorage.clear()
    }

    function getRefreshToken() {
        return localStorage.getItem("RTOKEN") as string | ""
    }

    const signIn = async (value: AuthReq) => {
        const res = await login(value)
        const resData = res.data as AuthRes
        if (resData.code !== -1) {
            setToken(resData.data.accessToken)
            setRefreshTokenLocal(resData.data.refreshToken)
            await routerStore.setAsyncRoute()
            routerStore.routes.forEach(route => {
                router.addRoute(route as RouteRecordRaw)
            })
            await routerVue.push({ path: "/dashboard" })
        }

        return resData
    }

    const refreshTokenServer = async (value: RefreshTokenReq) => {
        return await getTokenServer(value)
    }

    return {
        token,
        setToken,
        setRefreshTokenLocal,
        signIn,
        clearLocalStorage,
        refreshTokenServer,
        getRefreshToken,
    }
})
