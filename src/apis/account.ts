import { AxiosResponse } from "axios"
import {
    axiosDel,
    // axiosGet,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request.ts"
import { queryParamsV1 } from "@/utils/stringUtil"

export const addNewAccount = async (
    newAccount: Account
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("SystemAccount", newAccount)
}

export const deleteAccount = async (
    // id: string
    account: Account
): Promise<AxiosResponse<Res>> => {
    return await axiosDel("SystemAccount", account.accountId as string)
}

export const editAccount = async (
    newAccount: Account
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("SystemAccount", newAccount)
}

export const filterAccounts = async (
    filterObject: filterAccount
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams(
        "SystemAccount/page",
        queryParamsV1(filterObject, ["start", "rows", "enable"])
    )
}
