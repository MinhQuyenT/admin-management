import { createApp } from "vue"
import "@/permission"
import "@/style.css"
import App from "@/App.vue"
import router from "@/router"
import { store } from "@/stores"
import naive from "naive-ui"

let HOST = import.meta.env.VITE_BASE_URL_PRODUCTION

if (window.location.port !== "96") {
    HOST = import.meta.env.VITE_BASE_URL_LOCAL
}

createApp(App).use(store).use(router).use(naive).mount("#app")

export { HOST }
