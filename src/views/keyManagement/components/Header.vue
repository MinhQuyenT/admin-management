<template>
    <n-card class="mt-4 rounded-md">
        <n-form ref="formRef" :label-width="80" :model="keyStore.valueSearch">
            <div class="lg:grid md:grid-cols-8 xl:grid-cols-10 lg:gap-4">
                <n-form-item
                    class="lg:col-span-2"
                    :show-feedback="false"
                    label="Customer"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-select
                        clearable
                        :options="keyStore.listCustomer"
                        placeholder="Customer"
                        filterable
                        v-model:value="keyStore.valueSearch.customerFk"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label="Product"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-select
                        clearable
                        :options="keyStore.listProduct"
                        placeholder="Product"
                        filterable
                        v-model:value="keyStore.valueSearch.productFk"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label="Key Type"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-select
                        clearable
                        :options="keyStore.listKeyType"
                        placeholder="Key Type"
                        filterable
                        v-model:value="keyStore.valueSearch.keyTypeFk"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-3 w-full lg:mt-0 lg:col-span-2"
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
import { useKeyStore } from "@stores/modules/key"

const keyStore = useKeyStore()

const handleSearch = async () => {
    await keyStore.getKeyPage()
}
</script>

<style scoped></style>
