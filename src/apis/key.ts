import {
    axiosDel,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request.ts"
import { AxiosResponse } from "axios"

export const getKeyPageServer = async (
    value: ParamSearchKey
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams("LicenseKey/page", value)
}

export const addKey = async (
    value: KeyDataType
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("LicenseKey", value)
}

export const editKey = async (
    value: KeyDataType
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("LicenseKey", value)
}

export const deleteKey = async (id: string): Promise<AxiosResponse<Res>> => {
    return await axiosDel("LicenseKey", id)
}
