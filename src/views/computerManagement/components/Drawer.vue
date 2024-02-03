<template>
    <n-drawer
        v-model:show="visible"
        :width="600"
        placement="right"
        :on-after-leave="handleLeave"
        :close-on-esc="false"
        :mask-closable="false"
    >
        <n-drawer-content :title="title[computerStore.visibleDrawer]" closable>
            <n-form
                ref="formRef"
                :label-width="80"
                :model="computerDrawer"
                :rules="rules"
            >
                <n-grid :span="24" :x-gap="24" :y-gap="12">
                    <n-form-item-gi
                        :span="12"
                        label="Computer IP"
                        path="computerIp"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="computerDrawer.computerIp"
                            placeholder="Computer IP"
                            clearable
                        />
                    </n-form-item-gi>
                    <n-form-item-gi
                        :span="12"
                        label="Computer Mac"
                        path="computerMac"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="computerDrawer.computerMac"
                            placeholder="Computer Mac"
                            clearable
                        />
                    </n-form-item-gi>
                    <n-form-item-gi
                        :span="12"
                        label="Computer Name"
                        path="computerName"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="computerDrawer.computerName"
                            placeholder="Computer Name"
                            clearable
                        />
                    </n-form-item-gi>
                    <n-form-item-gi
                        :span="12"
                        label="Computer Serial Id"
                        path="computerSerialId"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="computerDrawer.computerSerialId"
                            placeholder="Computer Serial Id"
                            clearable
                        />
                    </n-form-item-gi>
                    <n-form-item-gi :span="12">
                        <div class="flex gap-3">
                            <n-button
                                type="info"
                                attr-type="submit"
                                @click="handleSubmit"
                            >
                                Save
                            </n-button>
                            <n-button
                                type="error"
                                @click="
                                    computerStore.setVisibleDrawer(
                                        VisibleDrawer.None
                                    )
                                "
                            >
                                Cancel
                            </n-button>
                        </div>
                    </n-form-item-gi>
                </n-grid>
            </n-form>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { FormInst, useMessage } from "naive-ui"
import { useComputerStore } from "@stores/modules/computer"
import { addComputer, editComputer } from "@apis/computer.ts"

const title = {
    [VisibleDrawer.Add]: "Add Key",
    [VisibleDrawer.Edit]: "Edit Key",
    [VisibleDrawer.None]: "",
}

const rules = {
    computerIp: {
        required: true,
        trigger: "blur",
        message: "Please select computer ip",
    },
    computerMac: {
        required: true,
        trigger: "blur",
        message: "Please select computer mac",
    },
    computerName: {
        required: true,
        trigger: "blur",
        message: "Please select computer name",
    },
    computerSerialId: {
        required: true,
        trigger: "blur",
        message: "Please select computer serial id",
    },
}

const computerStore = useComputerStore()
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const visible = ref<boolean>(false)
const computerDrawer = ref<Computer>({
    computerIp: null,
    computerMac: null,
    computerName: null,
    computerSerialId: null,
})

const handleLeave = () => {
    computerDrawer.value = {
        computerIp: null,
        computerMac: null,
        computerName: null,
        computerSerialId: null,
    }
    computerStore.setVisibleDrawer(VisibleDrawer.None)
}

const handleSubmit = (e: Event) => {
    e.preventDefault()
    formRef.value?.validate(async errors => {
        if (!errors) {
            let res: Res
            if (computerStore.visibleDrawer === VisibleDrawer.Add) {
                let resTmp = await addComputer(computerDrawer.value)
                res = resTmp.data
            } else if (computerStore.visibleDrawer === VisibleDrawer.Edit) {
                let resTmp = await editComputer(computerDrawer.value)
                res = resTmp.data
            }
            if (res && res.data.code !== -1) {
                handleLeave()
                message.success("Success")
                await computerStore.getComputerPage()
            } else {
                message.error(res.data.msg)
            }
        }
    })
}

watch(
    () => computerStore.visibleDrawer,
    () => {
        visible.value = computerStore.visibleDrawer !== VisibleDrawer.None
        if (computerStore.visibleDrawer === VisibleDrawer.Edit) {
            computerDrawer.value = { ...computerStore.computer }
        }
    }
)
</script>

<style scoped></style>
