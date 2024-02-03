<template>
    <n-card class="mt-4 rounded-md">
        <n-form :form-value="keyTypeStore.valueSearch">
            <div class="lg:grid 2xl:grid-cols-12 lg:gap-4 w-full">
                <n-form-item
                    class="lg:col-span-3"
                    :show-feedback="false"
                    label="Key Type Name"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        placeholder="Key Type Name"
                        v-model:value="keyTypeStore.valueSearch.name"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-3"
                    :show-feedback="false"
                    label="Create Time"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-date-picker
                        class="w-full"
                        v-model:value="keyTypeStore.valueSearch.createTime"
                        type="daterange"
                        clearable
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-3"
                    :show-feedback="false"
                    label="Expire Time"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-date-picker class="w-full" type="daterange" clearable />
                </n-form-item>

                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label="Status"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-select
                        v-model:value="keyTypeStore.valueSearch.status"
                        :options="options"
                        placeholder="Select Status"
                    ></n-select>
                </n-form-item>

                <n-form-item
                    class="mt-3 lg:mt-0 lg:col-span-1"
                    :show-feedback="false"
                    label=""
                >
                    <n-button
                        class="w-full"
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
            </div>
        </n-form>
    </n-card>
</template>

<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { useKeyTypeStore } from "@stores/modules/keyType"

const keyTypeStore = useKeyTypeStore()

const options = [
    {
        label: "Active",
        value: "1",
    },
    {
        label: "Inactive",
        value: "0",
    },
]
const handleSearch = async () => {
    await keyTypeStore.getKeyTypePage(keyTypeStore.valueSearch)
}
</script>

<style scoped></style>
