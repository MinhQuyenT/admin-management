<script setup lang="ts"></script>

<template>
    <n-space
        class="h-[calc(100vh-48.8px-16px*5)]"
        justify="center"
        align="center"
    >
        <n-result status="404" title="404 Not Found">
            <template #footer>
                <n-button @click="() => $router.go(-1)">Back</n-button>
            </template>
        </n-result>
    </n-space>
</template>
