import { Status } from "@/constants/constansts"
import { Pencil, Trash } from "@vicons/ionicons5"
import { DataTableColumns, NTag, NButton, NIcon } from "naive-ui"
import { State } from "@/constants/constansts"
import useProductStore from "@/stores/modules/product"

const productStore = useProductStore()

const handleEditClick = (row: Product) => {
    console.log("edit", row)

    productStore.currentState = State.EDIT
    productStore.handleState(row)
}

const handlePositiveClick = (row: Product) => {
    productStore.currentState = State.DELETE
    productStore.handleState(row)
}
const handleNegativeClick = (row: Product) => {
    console.log("negative delete: ", row)
}

export const createColumns = (): DataTableColumns<Product> => {
    return [
        {
            title: "No.",
            key: "no",
            align: "left",
            width: 70,
        },
        {
            title: "Name",
            key: "name",
            width: 200,
        },
        {
            title: "Version",
            key: "version",
            width: 100,
        },
        {
            title: "Description",
            key: "description",
            width: 300,
        },
        {
            title: "Status",
            key: "status",
            render(row) {
                return (
                    <div class="flex gap-4">
                        <NTag
                            size="small"
                            type={row.status == 1 ? "success" : "error"}
                            class="capitalize"
                        >
                            {row.status == 1 ? Status.Active : Status.Inactive}
                        </NTag>
                    </div>
                )
            },
        },
        {
            title: "Action",
            key: "actions",
            align: "center",
            className: "w-[120px] lg:w-[200px]",
            fixed: "right",
            render(row) {
                return (
                    <div class="flex gap-4 justify-center ">
                        <NButton
                            size="small"
                            onClick={() => {
                                handleEditClick(row)
                            }}
                            type="warning"
                            secondary
                        >
                            <NIcon class="lg:mr-[6px]">
                                <Pencil />
                            </NIcon>
                            <span class="hidden md:block">Edit</span>
                        </NButton>
                        <n-popconfirm
                            onPositiveClick={() => {
                                return handlePositiveClick(row)
                            }}
                            onNegativeClick={handleNegativeClick}
                        >
                            {{
                                default: () => "Delete ? ",
                                trigger: () => (
                                    <NButton
                                        size="small"
                                        type="error"
                                        secondary
                                    >
                                        <NIcon class="lg:mr-[6px]">
                                            <Trash />
                                        </NIcon>
                                        <span class="hidden md:block">
                                            Delete
                                        </span>
                                    </NButton>
                                ),
                            }}
                        </n-popconfirm>
                    </div>
                )
            },
        },
    ]
}
