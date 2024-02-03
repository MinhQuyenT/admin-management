<template>
    <n-upload
        :max="1"
        @before-upload="beforeUpload"
        list-type="image-card"
        @preview="handlePreview"
    />
    <n-modal
        v-model:show="showModalRef"
        preset="card"
        style="width: 600px"
        title="A Cool Picture"
    >
        <img :src="previewImageUrlRef" style="width: 100%" />
    </n-modal>
</template>

<script setup lang="ts">
import { ref } from "vue"
import type { UploadFileInfo } from "naive-ui"

// variables
const showModalRef = ref(false)

const previewImageUrlRef = ref("")

// functions
function handlePreview(file: UploadFileInfo) {
    const { url } = file
    previewImageUrlRef.value = url as string
    showModalRef.value = true
}

defineProps({
    value: {
        type: Object,
    },
})

const emit = defineEmits(["update:value"])

const beforeUpload = (data: { file: UploadFileInfo }) => {
    emit("update:value", data.file)
}
</script>
