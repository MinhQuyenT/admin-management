import { defineStore } from "pinia"
import { ref } from "vue"
import { VisibleDrawer } from "@/@types/visible.ts"
import { getMenuNotTree, getMenuTree } from "@apis/menu.ts"
import { useLoading } from "@stores/modules/spin"
import { compare } from "@/utils/arrayUtil.ts"

export const useMenuStore = defineStore("menu", () => {
    const visibleDrawer = ref<VisibleDrawer>(VisibleDrawer.None)
    const listMenuNotTree = ref<MenuType[]>([])
    const listMenuTree = ref<MenuType[]>([])
    const menuSelected = ref<MenuType | null>(null)
    const isLoadingDelete = ref<boolean>(false)

    const setVisibleDrawer = (value: VisibleDrawer) => {
        visibleDrawer.value = value
    }

    const setMenuSelected = (value: MenuType) => {
        menuSelected.value = { ...value }
    }

    const getListMenuNotTreeServer = async () => {
        const res = await getMenuNotTree()
        if (res.data.code !== -1) {
            listMenuNotTree.value = [...res.data.data]
        }
    }

    const getListMenuTreeServer = async (value: MenuParamsSearch) => {
        useLoading().setOn()
        const res = await getMenuTree(value)
        if (res.data.code !== -1) {
            listMenuTree.value = [...res.data.data].sort((a, b) =>
                compare(a, b, "sn")
            )
            listMenuTree.value = listMenuTree.value.map((it, index: number) => {
                return {
                    ...it,
                    no: index + 1,
                }
            })
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
        visibleDrawer,
        listMenuNotTree,
        listMenuTree,
        menuSelected,
        isLoadingDelete,
        setVisibleDrawer,
        getListMenuNotTreeServer,
        getListMenuTreeServer,
        setMenuSelected,
        turnOnIsLoadingDelete,
        turnOffIsLoadingDelete,
    }
})
