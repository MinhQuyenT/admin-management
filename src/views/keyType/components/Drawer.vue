<template>
    <n-drawer
        v-model:show="visible"
        class="!w-full md:!w-[600px]"
        placement="right"
        :on-after-leave="handleLeave"
        :close-on-esc="false"
        :mask-closable="false"
    >
        <n-drawer-content :title="title[keyTypeStore.visibleDrawer]" closable>
            <n-form
                ref="formRef"
                :label-width="80"
                :model="keyTypeDrawer"
                :rules="rules"
            >
                <div class="md:grid md:grid-cols-2 md:gap-4">
                    <n-form-item
                        label="Key Type Name"
                        path="name"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            clearable
                            placeholder="Key Type Name"
                            v-model:value="keyTypeDrawer.name"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Expire Time"
                        path="expDate"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-date-picker
                            :actions="['now']"
                            class="w-full"
                            v-model:value="keyTypeDrawer.expDate"
                            format="dd-MM-yyyy"
                            type="date"
                            clearable
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Status"
                        path="status"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="keyTypeDrawer.status"
                            :options="optionsStatus"
                        ></n-select>
                    </n-form-item>
                    <n-form-item class="hidden md:block" />
                    <n-form-item class="mt-3 md:mt-0">
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
                                    keyTypeStore.setVisibleDrawer(
                                        VisibleDrawer.None
                                    )
                                "
                            >
                                Cancel
                            </n-button>
                        </div>
                    </n-form-item>
                </div>
            </n-form>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import { ref, watch } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { FormInst, useMessage } from "naive-ui"
import { useKeyTypeStore } from "@stores/modules/keyType"
import { addKeyType, editKeyType } from "@apis/keyType.ts"
import moment from "moment/moment"

const title = {
    [VisibleDrawer.Add]: "Add Key Type",
    [VisibleDrawer.Edit]: "Edit Key",
    [VisibleDrawer.None]: "",
}

const optionsStatus = [
    {
        label: "Active",
        value: "1",
    },
    {
        label: "Inactive",
        value: "0",
    },
]

const rules = {
    name: {
        required: true,
        trigger: "blur",
        message: "Please input key type name",
    },
    status: {
        required: true,
        trigger: ["blur", "change"],
        message: "Please select status",
    },
    expDate: {
        type: "number",
        required: true,
        trigger: ["blur", "change"],
        message: "Please select expire date",
    },
}

const keyTypeStore = useKeyTypeStore()
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const visible = ref<boolean>(false)
const keyTypeDrawer = ref<KeyTypeData>({
    name: null,
    status: null,
    expDate: null,
})

const handleLeave = () => {
    keyTypeDrawer.value = {
        name: null,
        status: null,
        expDate: null,
    }
    keyTypeStore.setVisibleDrawer(VisibleDrawer.None)
}

const handleSubmit = (e: Event) => {
    e.preventDefault()
    formRef.value?.validate(async errors => {
        if (!errors) {
            const params = {
                ...keyTypeDrawer.value,
                expDate: moment(keyTypeDrawer.value.expDate).format(
                    "yyyy-MM-DD"
                ),
                status: parseInt(keyTypeDrawer.value.status as string),
            }
            let res: Res
            if (keyTypeStore.visibleDrawer === VisibleDrawer.Add) {
                let resTmp = await addKeyType(params)
                res = resTmp.data
            } else if (keyTypeStore.visibleDrawer === VisibleDrawer.Edit) {
                let resTmp = await editKeyType(params)
                res = resTmp.data
            }
            if (res && res.data.code !== -1) {
                handleLeave()
                message.success("Success")
                await keyTypeStore.getKeyTypePage()
            } else {
                message.error(res.data.msg)
            }
        }
    })
}

watch(
    () => keyTypeStore.visibleDrawer,
    () => {
        visible.value = keyTypeStore.visibleDrawer !== VisibleDrawer.None
        if (keyTypeStore.visibleDrawer === VisibleDrawer.Edit) {
            keyTypeDrawer.value = {
                ...keyTypeStore.keyTypeSelected,
            } as KeyTypeData
        }
    }
)
</script>

<style scoped></style>
