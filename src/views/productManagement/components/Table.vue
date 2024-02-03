<script setup lang="ts">
import { createColumns } from "../options/createColumns"
import useProductStore from "@/stores/modules/product"
import { onMounted } from "vue"

// ! variables
const columns = createColumns()
const productStore = useProductStore()
//! vừa vào trang thì lấy dữ liệu
onMounted(() => {
    productStore.getProducts()
})
</script>

<template>
    <n-data-table
        remote
        :bordered="true"
        :single-line="false"
        class="h-full flex-1"
        :data="productStore.allProducts"
        :columns="columns"
        :pagination="productStore.pagination"
    />
</template>

<style scoped></style>
