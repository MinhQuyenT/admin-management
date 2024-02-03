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
    <div class="flex flex-col h-full">
        <div class="flex justify-between items-center">
            <h1 class="m-0">List Key</h1>
            <n-button type="primary" @click="handleClickAdd">
                <n-icon>
                    <Add />
                </n-icon>
                Add Key
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
import Table from "@views/keyManagement/components/Table.vue"
import Header from "@views/keyManagement/components/Header.vue"
import { Add } from "@vicons/ionicons5"
import { useKeyStore } from "@stores/modules/key"
import { VisibleDrawer } from "@/@types/visible.ts"
import Drawer from "@views/keyManagement/components/Drawer.vue"
import { onBeforeMount } from "vue"

const keyStore = useKeyStore()
const handleClickAdd = () => {
    keyStore.setVisibleDrawer(VisibleDrawer.Add)
}

onBeforeMount(async () => {
    await keyStore.getDataForKey()
})
</script>

<style scoped></style>
