<script setup lang="ts">
import LeftScreen from "./LeftScreen.vue"
import RightScreen from "./RightScreen.vue"
</script>

<template>
    <div class="flex h-screen">
        <div class="grow md:basis-1/2">
            <LeftScreen />
        </div>
        <div class="basis-1/2 hidden md:block">
            <RightScreen />
        </div>
    </div>
</template>

<style lang="css" scoped></style>
