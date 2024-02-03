import { createRouter, createWebHistory } from "vue-router"
import Login from "@views/login/index.vue"
import Register from "@views/register/index.vue"

const routes = [
    {
        path: "/",
        name: "default",
        redirect: "/login",
    },
    {
        path: "/login",
        name: "login",
        component: Login,
    },
    {
        path: "/register",
        name: "register",
        component: Register,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
