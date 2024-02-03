<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { ref, toRef, watch } from "vue"
import useProductStore from "@/stores/modules/product"
import { defaultPage, defaultPageSize } from "@/constants/constansts"
import { productSelectOptions } from "@/constants/product"
import { NButton, NCard, NFormItem } from "naive-ui"

const productStore = useProductStore()

const formValue = ref({
    product: {
        name: "",
        version: "",
        description: "",
        status: 0,
    },
})

let filterObject = toRef(productStore, "filterObjectDefault")

watch(
    formValue,
    newFormValue => {
        filterObject.value.name = newFormValue.product.name
        filterObject.value.version = newFormValue.product.version
        filterObject.value.status = newFormValue.product.status
        filterObject.value.description = newFormValue.product.description
    },
    { deep: true }
)

const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    const filterObject = {
        ...formValue.value.product,
        start: defaultPage,
        rows: defaultPageSize,
    }

    productStore.getProducts(filterObject)
}
</script>
<template>
    <n-card class="mt-4 w-full">
        <n-form
            class="w-full"
            ref="formRef"
            inline
            :label-width="80"
            :model="formValue"
        >
            <div class="lg:grid md:grid-cols-6 xl:grid-cols-10 lg:gap-4 w-full">
                <n-form-item
                    class="!mr-0 lg:mt-0 lg:col-span-2 w-full"
                    :label-style="{ fontWeight: 500 }"
                    label="Name"
                    path="product.name"
                    :show-feedback="false"
                >
                    <n-input
                        placeholder="Product name"
                        v-model:value="formValue.product.name"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    label="Version"
                    path="product.version"
                    :show-feedback="false"
                >
                    <n-input
                        placeholder="Input Product version"
                        v-model:value="formValue.product.version"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    :show-feedback="false"
                    label="Description"
                    path="product.description"
                >
                    <n-input
                        placeholder="Input Description"
                        v-model:value="formValue.product.description"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    path="status"
                    label="Status"
                    :show-feedback="false"
                >
                    <n-select
                        clearable
                        v-model:value="formValue.product.status"
                        :options="productSelectOptions"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-3 w-full lg:mt-0 lg:col-span-2 h-fit"
                    :show-feedback="false"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-button type="info" @click="handleSubmit" class="w-full">
                        <NIcon class="mr-[6px]">
                            <Search />
                        </NIcon>
                        Search
                    </n-button>
                </n-form-item>
                <!-- </n-form-item> -->
            </div>
        </n-form>
    </n-card>
</template>
