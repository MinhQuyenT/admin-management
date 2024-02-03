<script lang="ts" setup>
import { AddCircle } from "@vicons/ionicons5"
import { NIcon } from "naive-ui"
import { h, type Component } from "vue"
import FormHeader from "./FormHeader.vue"
import useAccountStore from "@/stores/modules/account"
import { State } from "@/constants/constansts"
// import useDrawerStore from "../../../stores/modules/drawer"

const accountStore = useAccountStore()

//! hàm
const renderIcon = (icon: Component) => {
    return h(NIcon, null, {
        default: () => h(icon),
    })
}

const handleAddClick = () => {
    accountStore.toggleStatus()

    accountStore.currentState = State.ADD
}
</script>

<template>
    <div>
        <div class="flex justify-between">
            <div>
                <h1 class="m-0">List Accounts</h1>
            </div>
            <div class="flex items-center gap-4">
                <n-button
                    type="primary"
                    :render-icon="() => renderIcon(AddCircle)"
                    @click="handleAddClick"
                >
                    Add New Account
                </n-button>
            </div>
        </div>

        <div class="flex justify-between">
            <FormHeader />
        </div>
    </div>
</template>
