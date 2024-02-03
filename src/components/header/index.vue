<template>
    <n-space
        justify="space-between"
        class="px-3 bg-white rounded-md h-[48.8px]"
        align="center"
    >
        <div>
            <n-breadcrumb>
                <n-breadcrumb-item
                    v-for="item in path"
                    :key="item"
                    class="capitalize"
                >
                    {{ item }}
                </n-breadcrumb-item>
            </n-breadcrumb>
        </div>
        <div class="hidden">
            <n-dropdown
                trigger="click"
                :options="options"
                :render-label="renderDropdownLabel"
            >
                <n-avatar
                    bordered
                    class="mt-[6.4px] cursor-pointer"
                    round
                    size="medium"
                    src="https://img.freepik.com/free-photo/cartoon-character-with-handbag-sunglasses_71767-99.jpg?size=626&ext=jpg&ga=GA1.1.104662806.1702623731&semt=ais"
                />
            </n-dropdown>
        </div>
        <div>
            <n-dropdown
                size="large"
                class="capitalize"
                trigger="click"
                :options="menuOptions"
                :render-label="renderDropdownLabel"
            >
                <n-button>
                    <template #icon>
                        <n-icon>
                            <Menu />
                        </n-icon>
                    </template>
                </n-button>
            </n-dropdown>
        </div>
    </n-space>
</template>

<script setup lang="ts">
import { Component, h, onMounted, ref, watch } from "vue"
import { NIcon } from "naive-ui"
import { Person, Settings, LogOut, Menu } from "@vicons/ionicons5"
import { renderDropdownLabel } from "@components/header/options/render.tsx"
import { useRoute } from "vue-router"
import { RouteApi } from "@/@types/route"
import { GetItemComponets, iconType } from "@/utils/iconS5.ts"
import { compare } from "@/utils/arrayUtil.ts"
import { useRouterStore } from "@stores/modules/router"

const route = useRoute()
const routerStore = useRouterStore()

const path = ref<string[]>([])
const menuOptions = ref<RouteApi[]>([])

const renderIcon = (icon: Component) => {
    return () => {
        return h(
            NIcon,
            {
                onClick: () => {
                    console.log("logout")
                },
            },
            {
                default: () => h(icon),
            }
        )
    }
}

const options = [
    {
        label: "Profile",
        key: "profile",
        icon: renderIcon(Person),
    },
    {
        label: "Setting",
        key: "setting",
        icon: renderIcon(Settings),
    },
    {
        type: "divider",
        key: "d1",
    },
    {
        label: "Log out",
        key: "logout",
        icon: renderIcon(LogOut),
    },
]

onMounted(() => {
    path.value = route.fullPath.split("/")
    path.value.shift()
    path.value = path.value.map((item: string) => {
        return item.replace("-", " ")
    }) as string[]
    menuOptions.value = routerStore.listMenu.map((it: RouteApi) => {
        delete it.children
        return {
            ...it,
            label: it.menuName,
            key: it.path.substring(1),
            icon: renderIcon(GetItemComponets(it.icon as iconType)),
        }
    })
    menuOptions.value.sort((a, b) => compare(a, b, "sn"))
})

watch(
    () => route.path,
    () => {
        path.value = route.fullPath.split("/")
        path.value.shift()
        path.value = path.value.map((item: string) => {
            return item.replace("-", " ")
        }) as string[]
    }
)
</script>

<style lang="css" scoped></style>
