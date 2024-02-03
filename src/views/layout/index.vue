<template>
    <n-space vertical class="h-[100vh]">
        <n-layout has-sider class="h-full">
            <Sidebar />
            <n-layout class="h-full pl-4 bg-gray-200 flex flex-col">
                <n-layout-header class="sticky top-0 z-10 rounded-bl-md">
                    <Header />
                </n-layout-header>
                <n-layout-content class="mt-4 flex-1 p-4 rounded-tl-md">
                    <RouterView />
                </n-layout-content>
            </n-layout>
        </n-layout>
    </n-space>
</template>

<script setup lang="ts">
import Header from "@components/header/index.vue"
import Sidebar from "@components/sidebar/index.vue"
</script>

<style lang="css">
.n-layout-scroll-container {
    display: flex;
    flex-direction: column;
    height: 100%;
}
</style>
