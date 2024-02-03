<template>
    <!--    <n-grid x-gap="12" :cols="4">-->
    <!--        <n-gi>-->
    <!--            <n-statistic label="Actived Key" class="bg-green-100 p-3 rounded-md">-->
    <!--                {{ numberWithCommas(1234) }}-->
    <!--            </n-statistic>-->
    <!--        </n-gi>-->
    <!--        <n-gi>-->
    <!--            <n-statistic label="Unactive Key" class="bg-blue-100 p-3 rounded-md">-->
    <!--                {{ numberWithCommas(123) }}-->
    <!--            </n-statistic>-->
    <!--        </n-gi>-->
    <!--        <n-gi>-->
    <!--            <n-statistic label="Key is about to expire" class="bg-amber-100 p-3 rounded-md">-->
    <!--                {{ numberWithCommas(654) }}-->
    <!--            </n-statistic>-->
    <!--        </n-gi>-->
    <!--        <n-gi>-->
    <!--            <n-statistic label="Key has expired" class="bg-rose-100 p-3 rounded-md">-->
    <!--                {{ numberWithCommas(54352) }}-->
    <!--            </n-statistic>-->
    <!--        </n-gi>-->
    <!--    </n-grid>-->
    <n-space justify="space-between" align="center">
        <h1 class="m-0">List Computer</h1>
        <n-button type="primary" @click="handleClickAdd">
            <n-icon>
                <Add />
            </n-icon>
            Add Computer
        </n-button>
    </n-space>
    <n-space class="!gap-0">
        <Header />
        <Table />
    </n-space>
    <Drawer />
</template>

<script setup lang="ts">
import Table from "@views/computerManagement/components/Table.vue"
import Header from "@views/computerManagement/components/Header.vue"
import { Add } from "@vicons/ionicons5"
import { VisibleDrawer } from "@/@types/visible.ts"
import Drawer from "@views/computerManagement/components/Drawer.vue"
import { useComputerStore } from "@stores/modules/computer"

const computerStore = useComputerStore()
const handleClickAdd = () => {
    computerStore.setVisibleDrawer(VisibleDrawer.Add)
}
</script>

<style scoped></style>
