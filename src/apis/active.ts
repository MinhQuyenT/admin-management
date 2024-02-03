import {
    axiosDel,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request.ts"
import { AxiosResponse } from "axios"

export const getActivePageServer = async (
    value: ParamSearchActive
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams("LicenseActive/page", value)
}

export const addActive = async (value: Active): Promise<AxiosResponse<Res>> => {
    return await axiosPost("LicenseActive", value)
}

export const editActive = async (
    value: Active
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("LicenseActive", value)
}

export const deleteActive = async (id: string): Promise<AxiosResponse<Res>> => {
    return await axiosDel("LicenseActive", id)
}
