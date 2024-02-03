import { Status } from "@/constants/constansts"
import useCustomerStore from "@/stores/modules/customer"
import { Pencil, Trash } from "@vicons/ionicons5"
import { DataTableColumns, NTag, NButton, NIcon } from "naive-ui"
import { State } from "@/constants/constansts"

const customerStore = useCustomerStore()

const handleEditClick = (row: Customer) => {
    customerStore.currentState = State.EDIT
    customerStore.handleState(row)
}

const handlePositiveClick = (row: Customer) => {
    customerStore.currentState = State.DELETE
    customerStore.handleState(row)
}
const handleNegativeClick = (row: Customer) => {
    console.log("rowID", row.customerId)
}

export const createColumns = (): DataTableColumns<Customer> => {
    return [
        {
            title: "No.",
            key: "no",
            align: "center",
            width: 70,
        },
        {
            title: "Email",
            key: "email",
            width: 200,
        },
        {
            title: "Name",
            key: "name",
            width: 200,
        },
        {
            title: "Address",
            key: "address",
            width: 200,
        },
        {
            title: "Description",
            key: "description",
            width: 200,
        },
        {
            title: "Mobile",
            key: "mobil",
            width: 200,
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
                    <div class="flex gap-3 justify-center ">
                        <NButton
                            onClick={() => {
                                handleEditClick(row)
                            }}
                            type="warning"
                            secondary
                        >
                            <NIcon class="lg:mr-[6px]">
                                <Pencil />
                            </NIcon>
                            <span class="hidden lg:inline">Edit</span>
                        </NButton>

                        {/*<NButton*/}

                        {/*    onClick={() => {*/}
                        {/*        handleChangPasswordClick(row)*/}
                        {/*    }}*/}
                        {/*    type="info"*/}
                        {/*    secondary*/}
                        {/*>*/}
                        {/*    <NIcon class="lg:mr-[6px]">*/}
                        {/*        <KeySharp />*/}
                        {/*    </NIcon>*/}
                        {/*    <span class="hidden md:block">Change Password</span>*/}
                        {/*</NButton>*/}
                        <n-popconfirm
                            onPositiveClick={() => {
                                return handlePositiveClick(row)
                            }}
                            onNegativeClick={handleNegativeClick}
                        >
                            {{
                                default: () => "Delete ? ",
                                trigger: () => (
                                    <NButton type="error" secondary>
                                        <NIcon class="lg:mr-[6px]">
                                            <Trash />
                                        </NIcon>
                                        <span class="hidden md:block">
                                            <span class="hidden lg:inline">
                                                Delete
                                            </span>
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
