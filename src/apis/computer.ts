import {
    axiosDel,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request.ts"
import { AxiosResponse } from "axios"

export const getComputerPageServer = async (
    value: ParamSearchComputer
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams("LicenseComputer/page", value)
}

export const addComputer = async (
    value: Computer
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("LicenseComputer", value)
}

export const editComputer = async (
    value: Computer
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("LicenseComputer", value)
}

export const deleteComputer = async (
    id: string
): Promise<AxiosResponse<Res>> => {
    return await axiosDel("LicenseComputer", id)
}
