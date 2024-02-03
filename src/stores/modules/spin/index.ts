import { defineStore } from "pinia"
import { ref } from "vue"

export const useLoading = defineStore("loading", () => {
    const isLoading = ref<boolean>(false)

    function setOn() {
        isLoading.value = true
    }

    function setOff() {
        setTimeout(() => {
            isLoading.value = false
        }, 500)
    }

    return {
        isLoading,
        setOn,
        setOff,
    }
})
