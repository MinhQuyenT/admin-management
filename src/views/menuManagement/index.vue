<template>
    <div class="flex flex-col h-full">
        <div class="flex justify-between items-center">
            <h1 class="m-0">List Menu</h1>
            <n-button type="primary" @click="handleClickAdd">
                <n-icon>
                    <Add />
                </n-icon>
                Add Menu
            </n-button>
        </div>
        <div class="!gap-0 flex flex-col flex-1 h-full">
            <Header />
            <Table />
        </div>
    </div>
    <Drawer />
</template>

<script setup lang="ts">
import { Add } from "@vicons/ionicons5"
import Header from "@views/menuManagement/components/Header.vue"
import Table from "@views/menuManagement/components/Table.vue"
import Drawer from "@views/menuManagement/components/Drawer.vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { useMenuStore } from "@stores/modules/menu"

const menuStore = useMenuStore()

const handleClickAdd = () => {
    menuStore.setVisibleDrawer(VisibleDrawer.Add)
}
</script>

<style scoped></style>
