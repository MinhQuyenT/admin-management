import { AxiosResponse } from "axios"
import {
    axiosDel,
    axiosGet,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request.ts"

export const getMenuNotTree = async (): Promise<AxiosResponse<Res>> => {
    return await axiosGet("SystemMenu/lists")
}

export const getMenuTree = async (
    value: MenuParamsSearch
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams("SystemMenu/tree", value)
}

export const addMenu = async (value: MenuType): Promise<AxiosResponse<Res>> => {
    return await axiosPost("SystemMenu", value)
}

export const editMenu = async (
    value: MenuType
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("SystemMenu", value)
}

export const deleteMenu = async (id: string): Promise<AxiosResponse<Res>> => {
    return await axiosDel("SystemMenu", id)
}
