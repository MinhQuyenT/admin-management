<template>
    <n-data-table
        class="mt-4"
        :single-line="false"
        :columns="columns"
        :data="keyStore.listKey"
        :bordered="true"
        :pagination="keyStore.pagination"
        :scroll-x="1000"
        remote
    />
</template>

<script setup lang="ts">
import { createColumns } from "@views/keyManagement/options/table.tsx"
import { useKeyStore } from "@stores/modules/key"
import { deleteKey } from "@apis/key.ts"
import { useMessage } from "naive-ui"

const keyStore = useKeyStore()
const message = useMessage()

const handleDeleteKey = async (row: KeyDataType) => {
    keyStore.turnOnIsLoadingDelete()
    const res = await deleteKey(row.keyId as string)
    if (res.data.code !== -1) {
        message.success(res.data.msg)
        keyStore.turnOffIsLoadingDelete()
        await keyStore.getKeyPage()
    } else {
        message.error(res.data.msg)
        keyStore.turnOffIsLoadingDelete()
    }
}

const columns = createColumns(handleDeleteKey)
</script>

<style scoped></style>
