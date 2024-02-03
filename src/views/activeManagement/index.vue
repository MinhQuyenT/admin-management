<template>
    <n-space justify="space-between" align="center">
        <h1 class="m-0">List Active License</h1>
    </n-space>
    <n-space class="!gap-0 flex h-full">
        <Table />
    </n-space>
</template>

<script setup lang="ts">
import Table from "@views/activeManagement/components/Table.vue"
</script>

<style scoped></style>
