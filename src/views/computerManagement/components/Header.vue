<template>
    <n-card class="mt-4 rounded-md">
        <n-form
            ref="formRef"
            :label-width="80"
            :model="computerStore.valueSearch"
        >
            <n-grid x-gap="12" :span="24">
                <n-form-item-gi
                    :span="4"
                    :show-feedback="false"
                    label="Computer IP"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        clearable
                        v-model:value="computerStore.valueSearch.computerIp"
                        placeholder="Computer IP"
                    />
                </n-form-item-gi>
                <n-form-item-gi
                    :span="4"
                    :show-feedback="false"
                    label="Computer Mac"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        clearable
                        v-model:value="computerStore.valueSearch.computerMac"
                        placeholder="Computer Mac"
                    />
                </n-form-item-gi>
                <n-form-item-gi
                    :span="4"
                    :show-feedback="false"
                    label="Computer Name"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        clearable
                        v-model:value="computerStore.valueSearch.computerName"
                        placeholder="Computer Name"
                    />
                </n-form-item-gi>
                <n-form-item-gi
                    :span="4"
                    :show-feedback="false"
                    label="Computer Serial ID"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        clearable
                        v-model:value="
                            computerStore.valueSearch.computerSerialId
                        "
                        placeholder="Computer Serial ID"
                    />
                </n-form-item-gi>
                <n-gi class="flex justify-center">
                    <n-form-item :show-feedback="false" label="">
                        <n-button
                            type="info"
                            attr-type="submit"
                            @click="handleSearch"
                        >
                            <template #icon>
                                <n-icon>
                                    <Search />
                                </n-icon>
                            </template>
                            Search
                        </n-button>
                    </n-form-item>
                </n-gi>
            </n-grid>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { useComputerStore } from "@stores/modules/computer"

const computerStore = useComputerStore()

const handleSearch = async () => {
    await computerStore.getComputerPage()
}
</script>

<style scoped></style>
