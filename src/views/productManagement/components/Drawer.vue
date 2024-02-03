<script setup lang="ts">
import useProductStore from "@/stores/modules/product"
import {
    productRules,
    productSelectOptions,
    productTitles,
} from "@/constants/product"
import { ref } from "vue"
import { FormInst, NSelect } from "naive-ui"
import { toRef } from "vue"
import { State, defaultPage, defaultPageSize } from "@/constants/constansts"
import { editProduct } from "@/apis/product"

const productStore = useProductStore()

const selectOptions = productSelectOptions
let product = toRef(productStore, "currentProduct")

const formRef = ref<FormInst | null>(null)

const rules = productRules
const resetCurrentCustomer = () => {
    productStore.currentProduct = {
        name: "",
        version: "",
        description: "",
        status: 0,
    }
}

const handleSubmit = async () => {
    const formData = { ...productStore.currentProduct }

    formRef.value?.validate(async errors => {
        if (!errors) {
            switch (productStore.currentState) {
                case State.ADD:
                    productStore.handleState(formData)
                    break
                case State.EDIT: {
                    const ProductEdited: Product = {
                        licenseProductId: product.value.licenseProductId,
                        name: formData.name,
                        version: formData.version,
                        description: formData.description,
                        status: formData.status,
                    }
                    // gọi API edit
                    await editProduct(ProductEdited)
                    // sau đó load lại product
                    await productStore.getProducts({
                        ...productStore.filterObjectDefault,
                        start: productStore.pagination.page || defaultPage,
                        rows:
                            productStore.pagination.pageSize || defaultPageSize,
                    })
                    //cuối cùng đóng drawer
                    productStore.drawerStatus = false
                    break
                }
                default:
                    break
            }
        } else {
            console.log(errors)
            console.log("lỗi")
        }
    })
    resetCurrentCustomer()
}
</script>
<template>
    <n-drawer
        :width="502"
        placement="right"
        :mask-closable="false"
        v-model:show="productStore.drawerStatus"
    >
        <n-drawer-content
            closable
            :title="
                productStore.currentState == State.ADD
                    ? productTitles.ADD
                    : productTitles.EDIT
            "
        >
            <div class="flex flex-col">
                <div class="px-8 py-4">
                    <n-form ref="formRef" :rules="rules" :model="product">
                        <n-form-item path="user.profilePic" label="Avatar">
                            <p>upload profile pic</p>
                            <!-- <UploadProfilePic /> -->
                        </n-form-item>

                        <n-grid x-gap="10" :cols="2">
                            <n-gi>
                                <n-form-item path="name" label="Product Name">
                                    <n-input
                                        placeholder="Input your name"
                                        v-model:value="product.name"
                                    />
                                </n-form-item>
                            </n-gi>

                            <n-gi>
                                <n-form-item path="version" label="Version">
                                    <n-input
                                        placeholder="Input your version"
                                        v-model:value="product.version"
                                    />
                                </n-form-item>
                            </n-gi>

                            <n-gi>
                                <n-form-item
                                    path="description"
                                    label="Description"
                                >
                                    <n-input
                                        placeholder="Input your description"
                                        v-model:value="product.description"
                                    />
                                </n-form-item>
                            </n-gi>

                            <n-gi>
                                <n-form-item path="status" label="Status">
                                    <n-select
                                        v-model:value="product.status"
                                        :options="selectOptions"
                                    />
                                </n-form-item>
                            </n-gi>
                        </n-grid>
                    </n-form>
                </div>
            </div>

            <div class="flex gap-3 px-8">
                <n-button @click="handleSubmit" type="primary">Save</n-button>
                <n-button
                    @click="
                        () => {
                            resetCurrentCustomer()
                            productStore.toggleStatus()
                        }
                    "
                    type="error"
                >
                    Cancel
                </n-button>
            </div>
        </n-drawer-content>
    </n-drawer>
</template>
