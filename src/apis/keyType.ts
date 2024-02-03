import {
    axiosDel,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request.ts"
import { AxiosResponse } from "axios"

export const getKeyTypePageServer = async (
    value: paramSearch
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams("LicenseKeyType/page", value)
}

export const addKeyType = async (
    value: KeyTypeData
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("LicenseKeyType", value)
}

export const editKeyType = async (
    value: KeyTypeData
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("LicenseKeyType", value)
}

export const deleteKeyType = async (
    id: string
): Promise<AxiosResponse<Res>> => {
    return await axiosDel("LicenseKeyType", id)
}

export const getAllKeyType = async (): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams("LicenseKeyType")
}
