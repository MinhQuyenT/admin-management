import { defineStore } from "pinia"
import { ref } from "vue"

const useDrawerStore = defineStore("drawer", () => {
    const active = ref<boolean>(false)

    const isEditing = ref<boolean>(false)
    const isChangePassword = ref<boolean>(false)
    const user = ref({} as Customer)

    function toggle() {
        active.value = !active.value
    }

    return {
        toggle,
        active,
        isEditing,
        isChangePassword,
        user,
    }
})
export default useDrawerStore
