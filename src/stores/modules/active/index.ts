import { defineStore } from "pinia"
import { reactive, ref } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { useLoading } from "@stores/modules/spin"
import { queryParamsV1 } from "@/utils/stringUtil.ts"
import { getActivePageServer } from "@apis/active.ts"

export const useActiveStore = defineStore("active", () => {
    const visibleDrawer = ref<VisibleDrawer>(VisibleDrawer.None)
    const listActive = ref<Active[]>([])
    const valueSearch = ref<ParamSearchActive>({})

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
            await getActivePage()
        },
        onUpdatePageSize: async (pageSize: number) => {
            pagination.pageSize = pageSize
            pagination.page = 1
            await getActivePage()
        },
    })

    const getActivePage = async () => {
        useLoading().setOn()
        valueSearch.value.start = pagination.page
        valueSearch.value.rows = pagination.pageSize
        const params = queryParamsV1(valueSearch.value, ["start", "rows"])
        const res = await getActivePageServer(params)
        if (res.data.code !== -1) {
            listActive.value = res.data.data.records.map(
                (it: Active, index: number) => {
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

    return {
        listActive,
        visibleDrawer,
        valueSearch,
        pagination,
        getActivePage,
    }
})
