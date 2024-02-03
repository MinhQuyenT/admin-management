import { defineStore } from "pinia"
import { ref, reactive } from "vue"

import { State, defaultPage, defaultPageSize } from "@/constants/constansts"
import { addNewProduct, deleteProduct, filterProduct } from "@/apis/product"
//! object default

const useProductStore = defineStore("product", () => {
    //! variables

    const drawerStatus = ref(false)

    const allProducts = ref<Product[]>([])

    const currentState = ref(-1)

    const filterObjectDefault: filterProduct = reactive({
        start: defaultPage,
        rows: defaultPageSize,
    })

    const currentProduct = ref<Product>({
        name: "",
        version: "",
        description: "",
        status: 0,
    })

    // //! functions

    const toggleStatus = () => {
        drawerStatus.value = !drawerStatus.value
    }

    const getProducts = async (
        filterObject: filterProduct = filterObjectDefault
    ) => {
        const data = await filterProduct(filterObject)
        console.log("data: ", data)
        // ! set lại tổng số trang
        pagination.pageCount = data.data.data.pages
        allProducts.value = data.data.data.records.map(
            (product: Product, index: number) => {
                return {
                    no: index + 1,
                    licenseProductId: product.licenseProductId,
                    name: product.name,
                    version: product.version,
                    description: product.description,
                    status: product.status,
                }
            }
        )
    }
    //! pagination để set up cho table
    const pagination = reactive({
        page: defaultPage,
        pageSize: defaultPageSize,
        pageCount: 1,
        onChange: async (page: number) => {
            pagination.page = page

            await getProducts({
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
            await getProducts({
                ...filterObjectDefault,
                start: pagination.page,
                rows: pagination.pageSize,
            })
        },
    })
    // dùng cho add,edit, change password, delete buttons
    const handleState = async (product: Product) => {
        switch (currentState.value) {
            case State.ADD:
                // mở drawer
                drawerStatus.value = true
                //  tạo customer mới
                await addNewProduct(product)
                // đóng drawer
                if (drawerStatus.value) {
                    toggleStatus()
                }

                // gọi API get lại danh sách customer
                await getProducts({
                    ...filterObjectDefault,
                    start: pagination.page || defaultPage,
                    rows: pagination.pageSize || defaultPageSize,
                })

                break

            case State.EDIT:
                // mở drawer
                drawerStatus.value = true
                // Thực hiện API edit
                currentProduct.value = { ...product } // lấy dữ liệu customer được click vào

                break
            case State.DELETE:
                // Thực hiện API delete
                await deleteProduct(product)
                await getProducts({
                    ...filterObjectDefault,
                    start: pagination.page || defaultPage,
                    rows: pagination.pageSize || defaultPageSize,
                })
                break
        }
    }

    return {
        getProducts,
        allProducts,
        drawerStatus,
        handleState,
        pagination,
        currentState,

        filterObjectDefault,
        currentProduct,
        toggleStatus,
    }
})
export default useProductStore
