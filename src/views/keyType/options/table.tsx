import {
    DataTableColumns,
    NButton,
    NIcon,
    NSpace,
    NTag,
    NPopconfirm,
} from "naive-ui"
import { Pencil, Trash } from "@vicons/ionicons5"
import moment from "moment"
import { VisibleDrawer } from "@/@types/visible.ts"
import { useKeyTypeStore } from "@stores/modules/keyType"

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

const keyTypeStore = useKeyTypeStore()

const handleEdit = (row: KeyTypeData) => {
    const rowTmp = {
        ...row,
        status: row.status?.toString(),
        expDate: moment(row.expDate).unix() * 1000,
    }
    keyTypeStore.setKeyTypeSelected(rowTmp)
    keyTypeStore.visibleDrawer = VisibleDrawer.Edit
}

export const createColumns = (
    deleteKeyType: (row: KeyTypeData) => void
): DataTableColumns<KeyTypeData> => {
    return [
        {
            title: "#",
            key: "no",
            width: "70",
            align: "center",
        },
        {
            title: "Key Type Name",
            key: "name",
            align: "left",
            width: 300,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Create time",
            key: "createTime",
            align: "center",
            width: 200,
            render(row: KeyTypeData) {
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
            title: "Expire Time",
            key: "expDate",
            align: "center",
            width: 200,
            render(row: KeyTypeData) {
                return (
                    <span>
                        {row.expDate
                            ? moment(row.expDate).format("DD-MM-YYYY")
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
            render(row: KeyTypeData) {
                return (
                    <NTag
                        type={
                            STATUS[
                                row.status !== undefined && row.status !== null
                                    ? (row.status.toString() as keyof typeof STATUS)
                                    : "0"
                            ] as TypeTag
                        }
                        class="rounded-md"
                    >
                        {
                            STATUS_LABEL[
                                row.status !== undefined && row.status !== null
                                    ? (row.status as keyof typeof STATUS_LABEL)
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
            render(row: KeyTypeData) {
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
                                onPositiveClick={() => deleteKeyType(row)}
                                positive-button-props={{
                                    loading: keyTypeStore.isLoadingDelete,
                                }}
                                negative-button-props={{
                                    disable: keyTypeStore.isLoadingDelete,
                                }}
                            >
                                {{
                                    default: () =>
                                        "Do you want to delete this key type?",
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
