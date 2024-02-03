import {
    DataTableColumns,
    NButton,
    NIcon,
    NSpace,
    NTag,
    NPopconfirm,
} from "naive-ui"
import { Pencil, Trash } from "@vicons/ionicons5"
import { h } from "vue"
import { GetItemComponets, iconType } from "@/utils/iconS5.ts"
import moment from "moment"
import { useMenuStore } from "@stores/modules/menu"
import { VisibleDrawer } from "@/@types/visible.ts"

type TypeTag =
    | "default"
    | "primary"
    | "info"
    | "success"
    | "warning"
    | "error"
    | undefined
const STATUS = {
    "0": "error",
    "1": "success",
}

const STATUS_LABEL = {
    0: "Inactive",
    1: "Active",
}

const menuStore = useMenuStore()

const handleEdit = (row: MenuType) => {
    const rowTmp = {
        ...row,
        enable: row.enable?.toString(),
        menuType: row.menuType?.toString(),
    }
    menuStore.setMenuSelected(rowTmp)
    menuStore.visibleDrawer = VisibleDrawer.Edit
}

export const createColumns = (
    deleteMenu: (row: MenuType) => void
): DataTableColumns<MenuType> => {
    return [
        {
            title: "#",
            key: "no",
            width: "70",
            align: "center",
        },
        {
            title: "Path",
            key: "path",
            align: "left",
            width: 300,
        },
        {
            title: "Menu Name",
            key: "menuName",
            width: 250,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Description",
            key: "description",
            width: 250,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Parent Name",
            key: "parentName",
            width: 250,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Icon",
            key: "icon",
            width: 80,
            align: "center",
            ellipsis: {
                tooltip: true,
            },
            render(row: MenuType) {
                return h(NIcon, null, {
                    default: () => h(GetItemComponets(row.icon as iconType)),
                })
            },
        },
        {
            title: "Sort Number",
            key: "sn",
            align: "center",
            width: 120,
        },

        {
            title: "Create time",
            key: "createTime",
            align: "center",
            width: 200,
            render(row: MenuType) {
                return (
                    <span>
                        {row.createTime
                            ? moment(row.createTime).format("DD-MM-YYYY")
                            : ""}
                    </span>
                )
            },
        },
        {
            title: "Status",
            key: "status",
            width: "100",
            align: "center",
            render(row: MenuType) {
                return (
                    <NTag
                        type={
                            STATUS[
                                row.enable !== undefined && row.enable !== null
                                    ? (row.enable.toString() as keyof typeof STATUS)
                                    : "0"
                            ] as TypeTag
                        }
                        class="rounded-md"
                    >
                        {
                            STATUS_LABEL[
                                row.enable !== undefined && row.enable !== null
                                    ? (row.enable as keyof typeof STATUS_LABEL)
                                    : 0
                            ]
                        }
                    </NTag>
                )
            },
        },
        {
            title: "Action",
            key: "actions",
            className: "w-[120px] lg:w-[200px]",
            fixed: "right",
            render(row: MenuType) {
                return (
                    <NSpace>
                        <NSpace class="gap-3">
                            <NButton
                                type="warning"
                                secondary
                                onClick={() => handleEdit(row)}
                            >
                                <NIcon class="lg:mr-[6px]">
                                    <Pencil />
                                </NIcon>
                                <span class="hidden lg:inline">Edit</span>
                            </NButton>
                            <NPopconfirm
                                positive-text="Yes"
                                negative-text="No"
                                onPositiveClick={() => deleteMenu(row)}
                                positive-button-props={{
                                    loading: menuStore.isLoadingDelete,
                                }}
                            >
                                {{
                                    default: () =>
                                        "Do you want to delete this menu?",
                                    trigger: () => (
                                        <NButton type="error" secondary>
                                            <NIcon class="lg:mr-[6px]">
                                                <Trash />
                                            </NIcon>
                                            <span class="hidden lg:inline">
                                                Delete
                                            </span>
                                        </NButton>
                                    ),
                                }}
                            </NPopconfirm>
                        </NSpace>
                    </NSpace>
                )
            },
        },
    ]
}
