<template>
    <n-layout-sider
        bordered
        show-trigger
        collapse-mode="width"
        :collapsed-width="64"
        :width="240"
        :native-scrollbar="false"
        class="h-[100vh] hidden lg:flex"
    >
        <div class="flex justify-center my-5">
            <img :src="logo" alt="" class="w-[40px]" />
        </div>
        <n-menu
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="menuOptions"
            :value="tabSelected"
            :on-update:value="handleSelectTab"
            class="capitalize"
        />
    </n-layout-sider>
</template>

<script setup lang="ts">
import { Component, h, onMounted, ref } from "vue"
import { NIcon } from "naive-ui"
import { GetItemComponets, iconType } from "@/utils/iconS5.js"
import { useRoute, useRouter } from "vue-router"
import { useRouterStore } from "@stores/modules/router"
import { RouteApi } from "@/@types/route"
import Logo from "@assets/logo.jpg"

const logo = Logo

const router = useRouter()
const route = useRoute()
const routerStore = useRouterStore()

const tabSelected = ref<string>("")
const menuOptions = ref<RouteApi[]>([])

function renderIcon(icon: Component) {
    return () => h(NIcon, null, { default: () => h(icon) })
}

function handleSelectTab(value: string) {
    tabSelected.value = value
    router.push({ path: `/${value}` })
}

// const menuOptions = [
//     {
//         label: "Dashboard",
//         key: "dashboard",
//         icon: renderIcon(GetItemComponets("Home")),
//     },
//     {
//         label: "Quản lí tài khoản",
//         key: "account-management",
//         icon: renderIcon(GetItemComponets("IdCardSharp")),
//     },
//     {
//         label: "Quản lí sản phẩm",
//         key: "product-management",
//         icon: renderIcon(GetItemComponets("Apps" as iconType)),
//     },
//     {
//         label: "Quản lí key",
//         key: "key-management",
//         icon: renderIcon(GetItemComponets("Key" as iconType)),
//     },
//     {
//         label: "Quản lí khách hàng",
//         key: "customer-management",
//         icon: renderIcon(GetItemComponets("People" as iconType)),
//     },
//     {
//         label: "Thống kê",
//         key: "statistical",
//         icon: renderIcon(GetItemComponets("Cellular" as iconType)),
//     },
// ]

onMounted(() => {
    menuOptions.value = routerStore.listMenu.map((it: RouteApi) => {
        delete it.children
        return {
            ...it,
            label: it.menuName,
            key: it.path.substring(1),
            icon: renderIcon(GetItemComponets(it.icon as iconType)),
        }
    })
    // menuOptions.value.sort((a, b) => compare(a, b, "sn"))
    menuOptions.value.forEach((it: RouteApi) => {
        if (route.path === `/${it.key}`) {
            tabSelected.value = it.key
            return
        }
    })
})
</script>

<style lang="scss" scoped></style>
