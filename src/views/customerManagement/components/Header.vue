<script setup lang="ts">
import { AddCircle } from "@vicons/ionicons5"
import { NIcon } from "naive-ui"
import { type Component, h } from "vue"
import FormHeader from "./FormHeader.vue"
import useCustomerStore from "@/stores/modules/customer"
import { State } from "@/constants/constansts"

const customerStore = useCustomerStore()

const renderIcon = (icon: Component) => {
    return h(NIcon, null, {
        default: () => h(icon),
    })
}

const handleAddClick = () => {
    console.log("click add button")
    customerStore.toggleStatus()

    customerStore.currentState = State.ADD
}
</script>

<template>
    <div>
        <div class="flex justify-between">
            <div>
                <h1 class="m-0">List Of Customers</h1>
            </div>
            <div class="flex items-center gap-4">
                <n-button
                    :render-icon="() => renderIcon(AddCircle)"
                    type="primary"
                    @click="handleAddClick"
                >
                    Add New Customer
                </n-button>
            </div>
        </div>

        <div class="flex justify-between">
            <FormHeader />
        </div>
    </div>
</template>
