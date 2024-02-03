import { DataTableColumns, NButton, NIcon, NPopconfirm, NSpace } from "naive-ui"
import { Pencil, Trash } from "@vicons/ionicons5"
import { VisibleDrawer } from "@/@types/visible.ts"
import { useComputerStore } from "@stores/modules/computer"

// type TypeTag = "default" | "primary" | "info" | "success" | "warning" | "error" | undefined
// const STATUS = {
//     "Inactive": "info",
//     "Active": "success",
//     "almostOverExpire": "warning",
//     "expired": "error",
// }

const computerStore = useComputerStore()

const handleEdit = (row: Computer) => {
    computerStore.setVisibleDrawer(VisibleDrawer.Edit)
    computerStore.setComputer(row)
}

export const createColumns = (
    deleteKey: (row: Computer) => void
): DataTableColumns<Computer> => {
    return [
        {
            title: "#",
            key: "no",
            width: 70,
            align: "center",
        },
        {
            title: "Computer IP",
            key: "computerIp",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Computer Mac",
            key: "computerMac",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Computer Name",
            key: "computerName",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
        },
        {
            title: "Computer Serial ID",
            key: "computerSerialId",
            width: 200,
            ellipsis: {
                tooltip: true,
            },
        },
        // {
        //     title: "Status",
        //     key: "status",
        //     width: "100",
        //     render(row: KeyDataType) {
        //         return (
        //             <NTag type={STATUS[row.status ? row.status : "Inactive"] as TypeTag} class="rounded-md">
        //                 {row.status}
        //             </NTag>
        //         )
        //     },
        // },
        {
            title: "",
            key: "actions",
            width: 250,
            render(row: KeyDataType) {
                return (
                    <NSpace>
                        <NSpace class="gap-3">
                            <NButton
                                type="warning"
                                secondary
                                onClick={() => handleEdit(row)}
                            >
                                <NIcon style="margin-right: 6px">
                                    <Pencil />
                                </NIcon>
                                Edit
                            </NButton>
                            <NPopconfirm
                                positive-text="Yes"
                                negative-text="No"
                                onPositiveClick={() => deleteKey(row)}
                                positive-button-props={{
                                    loading: computerStore.isLoadingDelete,
                                }}
                                negative-button-props={{
                                    disable: computerStore.isLoadingDelete,
                                }}
                            >
                                {{
                                    default: () =>
                                        "Do you want to delete this key type?",
                                    trigger: () => (
                                        <NButton type="error" secondary>
                                            <NIcon style="margin-right: 6px">
                                                <Trash />
                                            </NIcon>
                                            Delete
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
