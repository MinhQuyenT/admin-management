import { DataTableColumns, NButton, NIcon, NPopconfirm, NSpace } from "naive-ui"
import { Pencil, Trash } from "@vicons/ionicons5"
import { useKeyStore } from "@stores/modules/key"
import { VisibleDrawer } from "@/@types/visible.ts"

// type TypeTag = "default" | "primary" | "info" | "success" | "warning" | "error" | undefined
// const STATUS = {
//     "Inactive": "info",
//     "Active": "success",
//     "almostOverExpire": "warning",
//     "expired": "error",
// }

const keyStore = useKeyStore()

const handleEdit = (row: KeyDataType) => {
    keyStore.setVisibleDrawer(VisibleDrawer.Edit)
    keyStore.setKey(row)
}

export const createColumns = (
    deleteKey: (row: KeyDataType) => void
): DataTableColumns<KeyDataType> => {
    return [
        {
            title: "#",
            key: "no",
            width: 70,
            align: "center",
        },
        {
            title: "Customer",
            key: "customerFk",
            width: 250,
            ellipsis: {
                tooltip: true,
            },
            render(row: KeyDataType) {
                return (
                    <div>
                        {
                            keyStore.listCustomer.find(
                                (it: CustomerForKey) =>
                                    it.customerId === row.customerFk
                            )?.name
                        }
                    </div>
                )
            },
        },
        {
            title: "Product",
            key: "productFk",
            width: 250,
            ellipsis: {
                tooltip: true,
            },
            render(row: KeyDataType) {
                return (
                    <div>
                        {
                            keyStore.listProduct.find(
                                (it: ProductForKey) =>
                                    it.licenseProductId === row.productFk
                            )?.name
                        }
                    </div>
                )
            },
        },
        {
            title: "key Type",
            key: "keyTypeFk",
            width: 250,
            ellipsis: {
                tooltip: true,
            },
            render(row: KeyDataType) {
                return (
                    <div>
                        {
                            keyStore.listKeyType.find(
                                (it: KeyTypeDataForKey) =>
                                    it.licenseKeyTypeId === row.keyTypeFk
                            )?.name
                        }
                    </div>
                )
            },
        },
        {
            title: "Quantity",
            key: "quatity",
            width: 150,
            align: "center",
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
            fixed: "right",
            className: "w-[120px] lg:w-[200px]",
            render(row: KeyDataType) {
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
                                onPositiveClick={() => deleteKey(row)}
                                positive-button-props={{
                                    loading: keyStore.isLoadingDelete,
                                }}
                                negative-button-props={{
                                    disable: keyStore.isLoadingDelete,
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
