import { NButton, DataTableColumns, NTag, NIcon } from "naive-ui"
import { Pencil, KeySharp, Trash } from "@vicons/ionicons5"
import {
    State,
    Status,
    // defaultPage
} from "@/constants/constansts"
import useAccountStore from "@/stores/modules/account"

const accountStore = useAccountStore()

const handleEditClick = async (row: Account) => {
    accountStore.currentState = State.EDIT
    await accountStore.handleState(row)
}

const handleChangPasswordClick = (row: Account) => {
    console.log("rowID", row.accountId)
}
const handlePositiveClick = async (row: Account) => {
    accountStore.currentState = State.DELETE
    await accountStore.handleState(row)
}
const handleNegativeClick = (row: Account) => {
    console.log("negative delete: ", row)
}

export const createColumns = (): DataTableColumns<Account> => {
    return [
        {
            title: "No.",
            key: "no",
            align: "center",
            width: 70,
        },
        {
            title: "Username",
            key: "username",
            width: 200,
        },
        {
            title: "First Name",
            key: "firstName",
            width: 200,
        },
        {
            title: "Last Name",
            key: "lastName",
            width: 200,
        },
        {
            title: "Email",
            key: "email",
            width: 200,
        },
        {
            title: "Birthday",
            key: "birthDay",
            width: 200,
        },
        {
            title: "Status",
            key: "status",
            render(row) {
                return (
                    <div class="flex gap-4 justify-center">
                        <NTag
                            size="small"
                            type={row.enable == 1 ? "success" : "error"}
                            class="capitalize"
                        >
                            {row.enable == 1 ? Status.Active : Status.Inactive}
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
                        <NButton
                            onClick={() => {
                                handleChangPasswordClick(row)
                            }}
                            type="info"
                            secondary
                        >
                            <NIcon class="lg:mr-[6px]">
                                <KeySharp />
                            </NIcon>
                            <span class="hidden lg:inline">
                                Change Password
                            </span>
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
                        </n-popconfirm>
                    </div>
                )
            },
        },
    ]
}
