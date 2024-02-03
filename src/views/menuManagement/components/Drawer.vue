<template>
    <n-drawer
        v-model:show="visible"
        class="!w-full md:!w-[600px]"
        placement="right"
        :on-after-leave="handleLeave"
        :close-on-esc="false"
        :mask-closable="false"
    >
        <n-drawer-content :title="title[menuStore.visibleDrawer]" closable>
            <n-form
                ref="formRef"
                :label-width="80"
                :model="menuDrawer"
                :rules="rules"
            >
                <div class="md:grid md:grid-cols-2 md:gap-4">
                    <n-form-item
                        label="Menu Name"
                        path="menuName"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            clearable
                            v-model:value="menuDrawer.menuName"
                            placeholder="Menu Name"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Menu Parent Name"
                        path="parentName"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="menuDrawer.parentId"
                            :options="optionsParent"
                            placeholder="Menu Parent Name"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Status"
                        path="enable"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="menuDrawer.enable"
                            :options="optionsStatus"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Menu Type"
                        path="menuType"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="menuDrawer.menuType"
                            :options="optionMenuType"
                            placeholder="Menu Type"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Icon"
                        path="icon"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            clearable
                            v-model:value="menuDrawer.icon"
                            :options="optionsIcon"
                            filterable
                            :render-label="renderLabel"
                            placeholder="Icon"
                        ></n-select>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Sort Number"
                        path="sn"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input-number
                            clearable
                            v-model:value="menuDrawer.sn"
                            :show-button="false"
                            class="w-full"
                            placeholder="Sort Number"
                        ></n-input-number>
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Path"
                        path="path"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="menuDrawer.path"
                            placeholder="Path"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        label="Description"
                        path="description"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="menuDrawer.description"
                            placeholder="Description"
                        />
                    </n-form-item>

                    <n-form-item class="mt-3 md:mt-0">
                        <div class="flex gap-3">
                            <n-button
                                type="info"
                                attr-type="submit"
                                @click="handleSave"
                            >
                                Save
                            </n-button>
                            <n-button
                                type="error"
                                @click="
                                    menuStore.setVisibleDrawer(
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
import { ref, watch, h, VNodeChild } from "vue"
import { useMenuStore } from "@stores/modules/menu"
import { VisibleDrawer } from "@/@types/visible.ts"
import { FormInst, NIcon, SelectOption } from "naive-ui"
import { optionsIcon } from "@/utils/icon.ts"
import { GetItemComponets, iconType } from "@/utils/iconS5.ts"
import { addMenu, editMenu } from "@apis/menu.ts"

const title = {
    [VisibleDrawer.Add]: "Add Menu",
    [VisibleDrawer.Edit]: "Edit Menu",
    [VisibleDrawer.None]: "",
}

const rules = {
    menuName: {
        required: true,
        message: "Please input menu name",
        trigger: "blur",
    },
    enable: {
        required: true,
        trigger: ["blur", "change"],
        message: "Please select status",
    },
    menuType: {
        required: true,
        trigger: ["blur", "change"],
        message: "Please select menu type",
    },
    icon: {
        required: true,
        trigger: ["blur", "change"],
        message: "Please select icon",
    },
    sn: {
        type: "number",
        required: true,
        trigger: ["blur"],
        message: "Please input sort number",
    },
    path: {
        required: true,
        message: "Please input path",
        trigger: "blur",
    },
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

const optionMenuType = [
    {
        label: "Menu",
        value: "1",
    },
    {
        label: "Sub Menu",
        value: "2",
    },
]

const menuStore = useMenuStore()

const formRef = ref<FormInst | null>(null)
const optionsParent = ref<OptionParent[]>([])
const visible = ref<boolean>(false)
const menuDrawer = ref<MenuType>({
    description: null,
    enable: null,
    icon: null,
    menuName: null,
    menuType: null,
    parentId: null,
    path: null,
    sn: null,
})

const handleLeave = () => {
    menuStore.setVisibleDrawer(VisibleDrawer.None)
    menuDrawer.value = {
        description: null,
        enable: null,
        icon: null,
        menuName: null,
        menuType: null,
        parentId: null,
        path: null,
        sn: null,
    }
}

const renderLabel = (option: SelectOption): VNodeChild => {
    return [
        h(
            NIcon,
            {
                style: {
                    verticalAlign: "-0.15em",
                    marginRight: "8px",
                },
            },
            {
                default: () => h(GetItemComponets(option.value as iconType)),
            }
        ),
        option.value as string,
    ]
}

const handleSave = async (e: Event) => {
    e.preventDefault()
    formRef.value?.validate(async errors => {
        if (!errors) {
            if (menuStore.visibleDrawer === VisibleDrawer.Add) {
                menuDrawer.value.menuType &&
                    (menuDrawer.value.menuType = parseInt(
                        menuDrawer.value.menuType as string
                    ))
                menuDrawer.value.enable &&
                    (menuDrawer.value.enable = parseInt(
                        menuDrawer.value.enable as string
                    ))
                const res = await addMenu(menuDrawer.value)
                if (res.data.code !== -1) {
                    menuStore.visibleDrawer = VisibleDrawer.None
                    await menuStore.getListMenuTreeServer({})
                    await menuStore.getListMenuNotTreeServer()
                }
            } else if (menuStore.visibleDrawer === VisibleDrawer.Edit) {
                menuDrawer.value.menuType &&
                    (menuDrawer.value.menuType = parseInt(
                        menuDrawer.value.menuType as string
                    ))
                menuDrawer.value.enable &&
                    (menuDrawer.value.enable = parseInt(
                        menuDrawer.value.enable as string
                    ))
                const res = await editMenu(menuDrawer.value)
                if (res.data.code !== -1) {
                    menuStore.visibleDrawer = VisibleDrawer.None
                    await menuStore.getListMenuTreeServer({})
                    await menuStore.getListMenuNotTreeServer()
                }
            }
        }
    })
}

watch(
    () => menuStore.visibleDrawer,
    async () => {
        visible.value = menuStore.visibleDrawer !== VisibleDrawer.None
        if (menuStore.visibleDrawer === VisibleDrawer.Edit) {
            menuDrawer.value = { ...menuStore.menuSelected }
        }
        if (menuStore.visibleDrawer !== VisibleDrawer.None) {
            await menuStore.getListMenuNotTreeServer()
            optionsParent.value = menuStore.listMenuNotTree.map(it => {
                return {
                    label: it.menuName ? it.menuName : null,
                    value: it.menuId ? it.menuId : null,
                }
            })
        }
    }
)
</script>

<style scoped></style>
