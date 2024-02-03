import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { useLoading } from "@stores/modules/spin"
import { queryParamsV1 } from "@/utils/stringUtil.ts"
import { getComputerPageServer } from "@apis/computer.ts"

export const useComputerStore = defineStore("computer", () => {
    const visibleDrawer = ref<VisibleDrawer>(VisibleDrawer.None)
    const listComputer = ref<Computer[]>([])
    const computer = ref<Computer | null>(null)
    const isLoadingDelete = ref<boolean>(false)
    const valueSearch = ref<ParamSearchComputer>({})

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
            await getComputerPage()
        },
        onUpdatePageSize: async (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            await getComputerPage()
        },
    })

    const setVisibleDrawer = (value: VisibleDrawer) => {
        visibleDrawer.value = value
    }

    const setComputer = (value: Computer) => {
        computer.value = { ...value }
    }

    const getComputerPage = async () => {
        useLoading().setOn()
        valueSearch.value.start = pagination.page
        valueSearch.value.rows = pagination.pageSize
        const params = queryParamsV1(valueSearch.value, ["start", "rows"])
        const res = await getComputerPageServer(params)
        if (res.data.code !== -1) {
            listComputer.value = res.data.data.records.map(
                (it: Computer, index: number) => {
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

    return {
        listComputer,
        computer,
        visibleDrawer,
        isLoadingDelete,
        valueSearch,
        pagination,
        setVisibleDrawer,
        setComputer,
        getComputerPage,
        turnOnIsLoadingDelete,
        turnOffIsLoadingDelete,
    }
})
