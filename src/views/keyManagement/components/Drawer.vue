<template>
    <n-drawer
        v-model:show="visible"
        placement="right"
        :on-after-leave="handleLeave"
        :close-on-esc="false"
        :mask-closable="false"
        class="!w-full md:!w-[600px]"
    >
        <n-drawer-content :title="title[keyStore.visibleDrawer]" closable>
            <n-form
                ref="formRef"
                :label-width="80"
                :model="keyDrawer"
                :rules="rules"
            >
                <div class="md:grid md:grid-cols-2 md:gap-4">
                    <n-form-item
                        label="Customer"
                        path="customerFk"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="keyDrawer.customerFk"
                            :options="keyStore.listCustomer"
                            placeholder="Customer"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Product"
                        path="productFk"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="keyDrawer.productFk"
                            :options="keyStore.listProduct"
                            placeholder="Product"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Key Type"
                        path="keyTypeFk"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="keyDrawer.keyTypeFk"
                            :options="keyStore.listKeyType"
                            placeholder="Key Type"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Quantity"
                        path="quatity"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input-number
                            class="w-full"
                            v-model:value="keyDrawer.quatity"
                            clearable
                            placeholder="Quantity"
                        />
                    </n-form-item>
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
                                    keyStore.setVisibleDrawer(
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
import { useKeyStore } from "@stores/modules/key"
import { VisibleDrawer } from "@/@types/visible.ts"
import { FormInst, useMessage } from "naive-ui"
import { addKey, editKey } from "@apis/key.ts"

const title = {
    [VisibleDrawer.Add]: "Add Key",
    [VisibleDrawer.Edit]: "Edit Key",
    [VisibleDrawer.None]: "",
}

const rules = {
    productFk: {
        required: true,
        trigger: ["blur", "change"],
        message: "Please select product",
    },
    keyTypeFk: {
        required: true,
        trigger: ["blur", "change"],
        message: "Please select key type",
    },
    quatity: {
        type: "number",
        required: true,
        trigger: ["blur"],
        message: "Please input quantity",
    },
}

const keyStore = useKeyStore()
const message = useMessage()

const formRef = ref<FormInst | null>(null)
const visible = ref<boolean>(false)
const keyDrawer = ref<KeyDataType>({
    customerFk: null,
    keyTypeFk: null,
    productFk: null,
    quatity: null,
})

const handleLeave = () => {
    keyDrawer.value = {
        customerFk: null,
        keyTypeFk: null,
        productFk: null,
        quatity: null,
    }
    keyStore.setVisibleDrawer(VisibleDrawer.None)
}

const handleSubmit = (e: Event) => {
    e.preventDefault()
    formRef.value?.validate(async errors => {
        if (!errors) {
            let res: Res
            if (keyStore.visibleDrawer === VisibleDrawer.Add) {
                let resTmp = await addKey(keyDrawer.value)
                res = resTmp.data
            } else if (keyStore.visibleDrawer === VisibleDrawer.Edit) {
                let resTmp = await editKey(keyDrawer.value)
                res = resTmp.data
            }
            if (res && res.data.code !== -1) {
                handleLeave()
                message.success("Success")
                await keyStore.getKeyPage()
            } else {
                message.error(res.data.msg)
            }
        }
    })
}

watch(
    () => keyStore.visibleDrawer,
    () => {
        visible.value = keyStore.visibleDrawer !== VisibleDrawer.None
        if (keyStore.visibleDrawer === VisibleDrawer.Edit) {
            keyDrawer.value = { ...keyStore.key }
        }
    }
)
</script>

<style scoped></style>
