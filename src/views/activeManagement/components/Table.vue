<template>
    <n-data-table
        class="mt-4 min-h-[calc(100vh-48.8px-16px*10-45px-60px)]"
        :single-line="false"
        :columns="columns"
        :data="activeStore.listActive"
        :bordered="true"
        :pagination="activeStore.pagination"
        remote
    />
</template>

<script setup lang="ts">
import { createColumns } from "@views/activeManagement/options/table.tsx"
import { onMounted } from "vue"
import { useActiveStore } from "@stores/modules/active"

const activeStore = useActiveStore()

const columns = createColumns()

onMounted(async () => {
    await activeStore.getActivePage()
})
</script>

<style scoped></style>
