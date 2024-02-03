<template>
    <n-data-table
        remote
        class="mt-4 min-h-[calc(100vh-48.8px-16px*10-45px-60px)]"
        flex-height
        :single-line="false"
        :columns="columns"
        :data="keyTypeStore.listKeyType"
        :bordered="true"
        :pagination="keyTypeStore.pagination"
    />
</template>

<script setup lang="ts">
import { createColumns } from "@views/keyType/options/table.tsx"
import { onMounted } from "vue"
import { useKeyTypeStore } from "@stores/modules/keyType"
import { deleteKeyType } from "@apis/keyType.ts"
import { useMessage } from "naive-ui"

const keyTypeStore = useKeyTypeStore()
const message = useMessage()

const handleDeleteKeyType = async (row: KeyTypeData) => {
    keyTypeStore.turnOnIsLoadingDelete()
    const res = await deleteKeyType(row.licenseKeyTypeId as string)
    if (res.data.code !== -1) {
        message.success(res.data.msg)
        keyTypeStore.turnOffIsLoadingDelete()
        await keyTypeStore.getKeyTypePage()
    } else {
        message.error(res.data.msg)
        keyTypeStore.turnOffIsLoadingDelete()
    }
}

const columns = createColumns(handleDeleteKeyType)

onMounted(async () => {
    await keyTypeStore.getKeyTypePage(keyTypeStore.valueSearch)
})
</script>

<style scoped></style>
