<template>
    <n-card class="mt-4 rounded-md">
        <n-form ref="formRef" :label-width="80" :model="menuSearch">
            <div
                class="lg:grid md:grid-cols-10 xl:grid-cols-10 2xl:grid-cols-12 lg:gap-4"
            >
                <n-form-item
                    class="lg:col-span-2"
                    :show-feedback="false"
                    label="Menu Name"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        placeholder="Menu Name"
                        clearable
                        v-model:value="menuSearch.menuName"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label="Path"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        placeholder="Path"
                        clearable
                        v-model:value="menuSearch.path"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label="Description"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-input
                        placeholder="Description"
                        clearable
                        v-model:value="menuSearch.description"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label="Status"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-select
                        :options="[
                            {
                                label: 'Active',
                                value: 1,
                            },
                            {
                                label: 'Inactive',
                                value: 0,
                            },
                        ]"
                        placeholder="Select customer"
                        clearable
                        v-model:value="menuSearch.enable"
                    ></n-select>
                </n-form-item>
                <n-form-item
                    class="mt-3 lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    label=""
                >
                    <n-button
                        type="info"
                        attr-type="submit"
                        @click="handleSearch"
                        class="w-full"
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
import { ref } from "vue"
import { useMenuStore } from "@stores/modules/menu"
import { queryParamsV1 } from "@/utils/stringUtil.ts"

const menuSearch = ref<MenuParamsSearch>({
    menuName: null,
    description: null,
    path: null,
    enable: null,
})

const menuStore = useMenuStore()

const handleSearch = () => {
    menuStore.getListMenuTreeServer(queryParamsV1(menuSearch.value, ["enable"]))
}
</script>

<style scoped></style>
