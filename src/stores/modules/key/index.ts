import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { getAllCustomer } from "@apis/customer.ts"
import { getAllProduct } from "@apis/product.ts"
import { getAllKeyType } from "@apis/keyType.ts"
import { useLoading } from "@stores/modules/spin"
import { getKeyPageServer } from "@apis/key.ts"
import { queryParamsV1 } from "@/utils/stringUtil.ts"

export const useKeyStore = defineStore("key", () => {
    const visibleDrawer = ref<VisibleDrawer>(VisibleDrawer.None)
    const listCustomer = ref<CustomerForKey[]>([])
    const listProduct = ref<Product[]>([])
    const listKeyType = ref<KeyTypeData[]>([])
    const listKey = ref<KeyDataType[]>([])
    const key = ref<KeyDataType | null>(null)
    const isLoadingDelete = ref<boolean>(false)
    const valueSearch = ref<ParamSearchKey>({})

    const defaultPageSize = 10

    const pagination = reactive({
        page: 1,
        pageSize: defaultPageSize,
        pageCount: 1,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [10, 20, 30],
        onChange: async (page: number) => {
            pagination.page = page
            await getKeyPage()
        },
        onUpdatePageSize: async (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            await getKeyPage()
        },
    })

    const setVisibleDrawer = (value: VisibleDrawer) => {
        visibleDrawer.value = value
    }

    const setKey = (value: KeyDataType) => {
        key.value = { ...value }
    }

    const getListCustomer = async () => {
        const res = await getAllCustomer()
        if (res.data.code !== -1) {
            listCustomer.value = res.data.data.map((it: CustomerForKey) => {
                return {
                    ...it,
                    label: it.name,
                    value: it.customerId,
                }
            })
        } else {
            useLoading().setOff()
        }
    }

    const getListProduct = async () => {
        const res = await getAllProduct()
        if (res.data.code !== -1) {
            listProduct.value = res.data.data.map((it: ProductForKey) => {
                return {
                    ...it,
                    label: it.name,
                    value: it.licenseProductId,
                }
            })
        } else {
            useLoading().setOff()
        }
    }

    const getListKeyType = async () => {
        const res = await getAllKeyType()
        if (res.data.code !== -1) {
            listKeyType.value = res.data.data.map((it: KeyTypeDataForKey) => {
                return {
                    ...it,
                    label: it.name,
                    value: it.licenseKeyTypeId,
                }
            })
        } else {
            useLoading().setOff()
        }
    }

    const getKeyPage = async () => {
        valueSearch.value.start = pagination.page
        valueSearch.value.rows = pagination.pageSize
        const params = queryParamsV1(valueSearch.value, ["start", "rows"])
        const res = await getKeyPageServer(params)
        if (res.data.code !== -1) {
            listKey.value = res.data.data.records.map(
                (it: KeyDataType, index: number) => {
                    return {
                        ...it,
                        no: index + 1,
                    }
                }
            )
            pagination.page = res.data.data.current
            pagination.pageCount = res.data.data.pages
            pagination.itemCount = res.data.data.total
        } else {
            useLoading().setOff()
        }
    }

    const getDataForKey = async () => {
        useLoading().setOn()
        await getListCustomer()
        await getListProduct()
        await getListKeyType()
        await getKeyPage()
        useLoading().setOff()
    }

    const turnOnIsLoadingDelete = () => {
        isLoadingDelete.value = true
    }

    const turnOffIsLoadingDelete = () => {
        setTimeout(() => {
            isLoadingDelete.value = false
        }, 500)
    }

    return {
        listCustomer,
        listProduct,
        visibleDrawer,
        listKeyType,
        listKey,
        key,
        isLoadingDelete,
        valueSearch,
        pagination,
        setVisibleDrawer,
        setKey,
        getListCustomer,
        getListProduct,
        getListKeyType,
        getDataForKey,
        getKeyPage,
        turnOnIsLoadingDelete,
        turnOffIsLoadingDelete,
    }
})
