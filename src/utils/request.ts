import { useAuthStore } from "@stores/modules/auth"
import axios from "axios"
import { HOST } from "@/main.ts"
import { useRouter } from "vue-router"

const service = axios.create({
    timeout: 99999,
})

service.interceptors.request.use(
    config => {
        const authStore = useAuthStore()
        const token = authStore.token
        if (token !== "") {
            config.headers["Authorization"] = "Bearer " + token
        }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        return response
    },
    async error => {
        const authStore = useAuthStore()
        const router = useRouter()
        const { config } = error
        switch (error.response.status) {
            case 500:
                console.log(error)
                break
            case 404:
                console.log(error)
                break
            case 403:
                authStore.clearLocalStorage()
                await router.push({ path: "/login" })
                break
            case 401: {
                config._retry = true
                const resRefresh = await authStore.refreshTokenServer({
                    refreshToken: authStore.getRefreshToken(),
                })
                const resData = resRefresh.data as RefreshTokenRes
                if (resData.code !== -1) {
                    authStore.setToken(resData.data.accessToken)
                    authStore.setRefreshTokenLocal(resData.data.refreshToken)
                    config.headers["Authorization"] =
                        "Bearer " + authStore.token
                    return service(config)
                }
                break
            }
        }
        return Promise.reject(error)
    }
)

const axiosGet = (url: string) => {
    return service.get(HOST + url)
}

const axiosGetWithParams = (
    url: string,
    params?: Record<string, string | number>
) => {
    const p = new URLSearchParams(params)
    return service.get(HOST + url + "?" + p)
}
const axiosDowload = (
    url: string,
    params?: Record<string, string | number>
) => {
    const p = new URLSearchParams(params)
    return service.get(HOST + url + "?" + p, { responseType: "blob" })
}

const axiosPost = (uri: string, model: NonNullable<unknown>) => {
    return service.post(HOST + uri, model, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}

const axiosPostFile = (url: string, file: File) => {
    const formData = new FormData()
    formData.append("file", file)
    return service.post(HOST + url, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    })
}

const axiosPut = (uri: string, params: NonNullable<unknown>) => {
    return service.put(HOST + uri, params, {
        headers: {
            "Content-Type": "application/json",
        },
    })
}
const axiosDel = (uri: string, id: string) => {
    return service({
        url: HOST + uri + "?id=" + id,
        method: "delete",
    })
}

export {
    axiosGetWithParams,
    axiosGet,
    axiosDel,
    axiosPost,
    axiosPut,
    axiosDowload,
    axiosPostFile,
}
