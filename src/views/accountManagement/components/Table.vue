<script setup lang="ts">
import { createColumns } from "../options/table"
import { onMounted } from "vue"
import useAccountStore from "@/stores/modules/account"

const columns = createColumns()
const accountStore = useAccountStore()

onMounted(() => {
    accountStore.getAccounts()
})
</script>

<template>
    <n-data-table
        remote
        :bordered="true"
        :single-line="false"
        class="h-full flex-1 mt-4"
        :data="accountStore.allAccounts"
        :columns="columns"
        :pagination="accountStore.pagination"
    />
</template>
