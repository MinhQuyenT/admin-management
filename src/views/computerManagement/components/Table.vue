<template>
    <n-data-table
        class="mt-4 min-h-[calc(100vh-48.8px-16px*10-45px-60px)]"
        :single-line="false"
        :columns="columns"
        :data="computerStore.listComputer"
        :bordered="true"
        :pagination="computerStore.pagination"
        remote
    />
</template>

<script setup lang="ts">
import { createColumns } from "@views/computerManagement/options/table.tsx"
import { useMessage } from "naive-ui"
import { useComputerStore } from "@stores/modules/computer"
import { deleteComputer } from "@apis/computer.ts"
import { onMounted } from "vue"

const computerStore = useComputerStore()
const message = useMessage()

const handleDeleteKey = async (row: Computer) => {
    computerStore.turnOnIsLoadingDelete()
    const res = await deleteComputer(row.licenseComputerId as string)
    if (res.data.code !== -1) {
        message.success(res.data.msg)
        computerStore.turnOffIsLoadingDelete()
        await computerStore.getComputerPage()
    } else {
        message.error(res.data.msg)
        await computerStore.getComputerPage()
    }
}

const columns = createColumns(handleDeleteKey)

onMounted(async () => {
    await computerStore.getComputerPage()
})
</script>

<style scoped></style>
