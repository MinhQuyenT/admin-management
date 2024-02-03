<template>
    <n-data-table
        class="mt-4 flex-1"
        :single-line="false"
        :columns="columns"
        :data="menuStore.listMenuTree"
        :bordered="true"
        :pagination="false"
        :scroll-x="1300"
    />
</template>

<script setup lang="ts">
import { createColumns } from "@views/menuManagement/options/table.tsx"
import { onMounted } from "vue"
import { useMenuStore } from "@stores/modules/menu"
import { useMessage } from "naive-ui"
import { deleteMenu } from "@apis/menu.ts"

const menuStore = useMenuStore()
const message = useMessage()

const handleDeleteMenu = async (row: MenuType) => {
    menuStore.turnOnIsLoadingDelete()
    const res = await deleteMenu(row.menuId as string)
    if (res.data.code !== -1) {
        message.success(res.data.msg)
        menuStore.turnOffIsLoadingDelete()
        await menuStore.getListMenuTreeServer({})
        await menuStore.getListMenuNotTreeServer()
    } else {
        message.error(res.data.msg)
        menuStore.turnOffIsLoadingDelete()
    }
}

const columns = createColumns(handleDeleteMenu)

onMounted(() => {
    menuStore.getListMenuTreeServer({})
})
</script>

<style scoped></style>
