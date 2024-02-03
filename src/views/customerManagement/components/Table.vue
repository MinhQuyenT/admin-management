<script setup lang="ts">
import useCustomerStore from "@/stores/modules/customer"
import { createColumns } from "../options/createColumns"
import { onMounted } from "vue"

const columns = createColumns()
const customerStore = useCustomerStore()

onMounted(() => {
    customerStore.getCustomers()
})
</script>

<template>
    <n-data-table
        remote
        :bordered="true"
        :single-line="false"
        :columns="columns"
        class="h-full flex-1 mt-4"
        :data="customerStore.allCustomers"
        :pagination="customerStore.pagination"
    />
</template>

<style scoped></style>
