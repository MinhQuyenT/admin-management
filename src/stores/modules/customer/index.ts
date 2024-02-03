import { defineStore } from "pinia"
import { ref, reactive } from "vue"

import {
    addNewCustomer,
    deleteCustomer,
    filterCustomer,
    // editCustomer,
    // getCustomersWithPagination,
} from "@/apis/customer"
import { State } from "@/constants/constansts"
import { defaultPage, defaultPageSize } from "@/constants/constansts"
// import { defaultPage } from "@/constants/constansts"
//! object default

const useCustomerStore = defineStore("customer", () => {
    //! variables

    const drawerStatus = ref(false)

    const allCustomers = ref<Customer[]>([])

    const currentState = ref(-1)

    const filterObjectDefault: filterCustomer = reactive({
        email: "",
        name: "",
        description: "",
        address: "",
        mobil: "",
        status: 0,
        start: defaultPage,
        rows: defaultPageSize,
    })

    const currentCustomer = ref<Customer>({
        name: "",
        email: "",
        mobil: "",
        address: "",
        description: "",
        status: 0,
    })

    //! functions
    const toggleStatus = () => {
        drawerStatus.value = !drawerStatus.value
    }
    const getCustomers = async (
        filterObject: filterCustomer = filterObjectDefault
    ) => {
        const data = await filterCustomer(filterObject)
        console.log("data: ", data)
        //! set lại tổng số trang
        pagination.pageCount = data.data.data.pages

        allCustomers.value = data.data.data.records.map(
            (customer: Customer, index: number) => {
                return {
                    no: index + 1,
                    customerId: customer.customerId,
                    name: customer.name,
                    email: customer.email,
                    mobil: customer.mobil,
                    address: customer.address,
                    description: customer.description,
                    status: customer.status,
                }
            }
        )
    }
    // pagination để set up cho table
    const pagination = reactive({
        page: defaultPage,
        pageSize: defaultPageSize,
        pageCount: 1,
        onChange: async (page: number) => {
            pagination.page = page

            console.log("filterObjectDefault: ", filterObjectDefault)

            await getCustomers({
                ...filterObjectDefault,
                start: pagination.page || defaultPage,
                rows: pagination.pageSize || defaultPageSize,
            })
        },
        showSizePicker: true,
        pageSizes: [3, 5, 7],
        onUpdatePageSize: async (pageSize: number) => {
            pagination.page = defaultPage
            pagination.pageSize = pageSize
            await getCustomers({
                ...filterObjectDefault,
                start: pagination.page,
                rows: pagination.pageSize,
            })
        },
    })
    // dùng cho add,edit, change password, delete buttons
    const handleState = async (customer: Customer) => {
        switch (currentState.value) {
            case State.ADD:
                // mở drawer
                drawerStatus.value = true
                //  tạo customer mới
                await addNewCustomer(customer)
                // đóng drawer
                if (drawerStatus.value) {
                    toggleStatus()
                }
                // gọi API get lại danh sách customer
                await getCustomers({
                    ...filterObjectDefault,
                    start: pagination.page || defaultPage,
                    rows: pagination.pageSize || defaultPageSize,
                })

                break

            case State.CHANGE_PASSWORD:
                console.log("Đang thực hiện API change password")
                // Thực hiện API change_password
                break

            case State.EDIT:
                // mở drawer
                drawerStatus.value = true
                // Thực hiện API edit
                currentCustomer.value = { ...customer } // lấy dữ liệu customer được click vào

                console.log("day")

                break
            case State.DELETE:
                // Thực hiện API delete
                await deleteCustomer(customer)
                await getCustomers({
                    ...filterObjectDefault,
                    start: pagination.page || defaultPage,
                    rows: pagination.pageSize || defaultPageSize,
                })
                break
        }
    }

    return {
        getCustomers,
        allCustomers,
        drawerStatus,
        toggleStatus,
        handleState,
        pagination,
        currentCustomer,
        currentState,
        filterObjectDefault,
    }
})
export default useCustomerStore
