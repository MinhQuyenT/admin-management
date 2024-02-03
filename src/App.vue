<script setup lang="ts">
import { RouterView } from "vue-router"
import { useLoading } from "@stores/modules/spin"
</script>

<template>
    <n-spin :show="useLoading().isLoading">
        <n-message-provider>
            <div id="app">
                <RouterView />
            </div>
        </n-message-provider>
    </n-spin>
</template>

<style scoped></style>
