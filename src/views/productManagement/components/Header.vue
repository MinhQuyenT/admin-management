<script setup lang="ts">
import { State } from "@/constants/constansts"
import useProductStore from "@/stores/modules/product"
import { AddCircle } from "@vicons/ionicons5"
import { NIcon } from "naive-ui"
import { type Component, h } from "vue"
import FormHeader from "./FormHeader.vue"

const productStore = useProductStore()

const renderIcon = (icon: Component) => {
    return h(NIcon, null, {
        default: () => h(icon),
    })
}

const handleAddClick = () => {
    console.log("click add button")

    productStore.toggleStatus()

    productStore.currentState = State.ADD
}
</script>

<template>
    <div>
        <div class="flex justify-between">
            <div>
                <p class="text-xl font-bold">List Of Products</p>
            </div>
            <div class="flex items-center gap-4">
                <n-button
                    :render-icon="() => renderIcon(AddCircle)"
                    type="primary"
                    @click="handleAddClick"
                >
                    Add new product
                </n-button>
            </div>
        </div>

        <div class="flex justify-between">
            <FormHeader />
        </div>
    </div>
</template>
