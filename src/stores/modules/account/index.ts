import { addNewAccount, deleteAccount, filterAccounts } from "@/apis/account"
// import { addNewCustomer } from "@/apis/customer"
import { State, defaultPage, defaultPageSize } from "@/constants/constansts"
import { defineStore } from "pinia"
import { ref, reactive } from "vue"

const useAccountStore = defineStore("account", () => {
    const drawerStatus = ref(false)

    const allAccounts = ref<Account[]>([])
    const currentState = ref(-1)
    const filterObjectDefault: filterAccount = reactive({
        start: defaultPage,
        rows: defaultPageSize,
    })
    const currentAccount = ref<Account>({
        firstName: "",
        lastName: "",
        birthDay: "",
        username: "",
        password: "",
        email: "",
        enable: 0,
    })

    // //! functions
    const toggleStatus = () => {
        drawerStatus.value = !drawerStatus.value
    }
    //! pagination để set up cho table
    const pagination = reactive({
        page: defaultPage,
        pageSize: defaultPageSize,
        pageCount: 1,
        onChange: async (page: number) => {
            pagination.page = page

            await getAccounts({
                ...filterObjectDefault,
                start: pagination.page || defaultPage,
                rows: pagination.pageSize || defaultPageSize,
            })
        },
        showSizePicker: true,
        pageSizes: [10, 20, 30],
        onUpdatePageSize: async (pageSize: number) => {
            pagination.page = defaultPage
            pagination.pageSize = pageSize
            await getAccounts({
                ...filterObjectDefault,
                start: pagination.page,
                rows: pagination.pageSize,
            })
        },
    })

    const getAccounts = async (
        filterObject: filterAccount = filterObjectDefault
    ) => {
        const data = await filterAccounts(filterObject)
        // ! set lại tổng số trang
        pagination.pageCount = data.data.data.pages
        allAccounts.value = data.data.data.records.map(
            (account: Account, index: number) => {
                return {
                    no: index + 1,
                    accountId: account.accountId,
                    firstName: account.firstName,
                    lastName: account.lastName,
                    birthDay: account.birthDay,
                    username: account.username,
                    password: account.password,
                    email: account.email,
                    imageFk: account.imageFk,
                    provider: account.provider,
                    enable: account.enable,
                    createTime: account.createTime,
                    delTime: account.delTime,
                    creator: account.creator,
                    delUser: account.delUser,
                }
            }
        )
    }

    const handleState = async (account: Account) => {
        switch (currentState.value) {
            case State.ADD:
                // mở drawer
                drawerStatus.value = true
                //  tạo account mới
                await addNewAccount(account)
                // đóng drawer
                if (drawerStatus.value) {
                    toggleStatus()
                }

                // gọi API get lại danh sách account
                await getAccounts({
                    ...filterObjectDefault,
                    start: pagination.page || defaultPage,
                    rows: pagination.pageSize || defaultPageSize,
                })

                break

            case State.EDIT:
                // mở drawer
                drawerStatus.value = true
                // Thực hiện API edit
                currentAccount.value = { ...account } // lấy dữ liệu customer được click vào
                // const currentAccount = JSON.parse(JSON.stringify(account))
                console.log("currentAccount.value: ", currentAccount.value)

                break
            case State.DELETE:
                // Thực hiện API delete
                await deleteAccount(account)
                await getAccounts({
                    ...filterObjectDefault,
                    start: pagination.page || defaultPage,
                    rows: pagination.pageSize || defaultPageSize,
                })
                break
        }
    }

    return {
        allAccounts,
        getAccounts,
        handleState,
        pagination,
        toggleStatus,
        currentState,
        filterObjectDefault,
        currentAccount,
        drawerStatus,
    }
})
export default useAccountStore
