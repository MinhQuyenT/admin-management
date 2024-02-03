import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { useLoading } from "@stores/modules/spin"
import { getKeyTypePageServer } from "@apis/keyType.ts"
import { queryParamsV1 } from "@/utils/stringUtil.ts"
import moment from "moment"

export const useKeyTypeStore = defineStore("keyType", () => {
    const visibleDrawer = ref<VisibleDrawer>(VisibleDrawer.None)
    const listKeyType = ref<KeyTypeData[]>([])
    const isLoadingDelete = ref<boolean>(false)
    const keyTypeSelected = ref<KeyTypeData | null>(null)
    const valueSearch = ref<paramSearch>({})

    const defaultPageSize = 10

    const pagination = reactive({
        page: 1,
        pageSize: defaultPageSize,
        pageCount: 1,
        itemCount: 0,
        showSizePicker: true,
        pageSizes: [10, 30, 50],
        onChange: async (page: number) => {
            pagination.page = page
            await getKeyTypePage(valueSearch.value)
        },
        onUpdatePageSize: async (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            await getKeyTypePage(valueSearch.value)
        },
    })

    const setVisibleDrawer = (value: VisibleDrawer) => {
        visibleDrawer.value = value
    }

    const setKeyTypeSelected = (value: KeyTypeData) => {
        keyTypeSelected.value = { ...value }
    }

    const getKeyTypePage = async (value?: paramSearch) => {
        useLoading().setOn()
        const vTmp = { ...pagination }
        const valueTmp = { ...value }
        valueTmp.start = vTmp.page
        valueTmp.rows = vTmp.pageSize
        valueTmp.createTime &&
            (valueTmp.createTime = `['${moment(valueTmp.createTime[0]).format(
                "yyyy-MM-DD"
            )} 00:00:00', '${moment(valueTmp.createTime[1]).format(
                "yyyy-MM-DD"
            )} 23:59:59']`)
        valueTmp.expDate &&
            (valueTmp.expDate = `['${moment(valueTmp.expDate[0]).format(
                "yyyy-MM-DD"
            )} 00:00:00', '${moment(valueTmp.expDate[1]).format(
                "yyyy-MM-DD"
            )} 23:59:59']`)
        if (
            valueTmp.status !== "" &&
            valueTmp.status !== null &&
            valueTmp.status !== undefined
        ) {
            valueTmp.status = parseInt(valueTmp.status as string)
        }
        const params = queryParamsV1(valueTmp, [
            "start",
            "rows",
            "status",
            "createTime",
            "expDate",
        ])
        const res = await getKeyTypePageServer(params as paramSearch)
        if (res.data.code !== -1) {
            listKeyType.value = res.data.data.records.map(
                (it: KeyTypeData, index: number) => {
                    return {
                        ...it,
                        no: index + 1,
                    }
                }
            )
            pagination.page = res.data.data.current
            pagination.pageCount = res.data.data.pages
            pagination.itemCount = res.data.data.total
            useLoading().setOff()
        } else {
            useLoading().setOff()
        }
    }

    const turnOnIsLoadingDelete = () => {
        isLoadingDelete.value = true
    }

    const turnOffIsLoadingDelete = () => {
        setTimeout(() => {
            isLoadingDelete.value = false
        }, 500)
    }

    const setValueSearch = (value: paramSearch) => {
        valueSearch.value = { ...value }
    }

    return {
        visibleDrawer,
        isLoadingDelete,
        listKeyType,
        keyTypeSelected,
        valueSearch,
        pagination,
        setVisibleDrawer,
        getKeyTypePage,
        turnOnIsLoadingDelete,
        turnOffIsLoadingDelete,
        setKeyTypeSelected,
        setValueSearch,
    }
})
