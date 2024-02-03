// import { defaultPage, defaultPageSize } from "@/constants/constansts"
import {
    axiosDel,
    axiosGet,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request"
import { queryParamsV1 } from "@/utils/stringUtil"
import { AxiosResponse } from "axios"

export const addNewCustomer = async (
    newCustomer: Customer
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("licenseCustomer", newCustomer)
}

export const deleteCustomer = async (
    customer: Customer
): Promise<AxiosResponse<Res>> => {
    return await axiosDel("licenseCustomer", customer.customerId as string)
}

export const editCustomer = async (
    customer: Customer
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("licenseCustomer", customer)
}

export const filterCustomer = async (
    filterObject: filterCustomer
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams(
        "licenseCustomer/page",
        queryParamsV1(filterObject, ["start", "rows", "status"])
    )
}

export const getAllCustomer = async (): Promise<AxiosResponse<Res>> => {
    return await axiosGet("licenseCustomer/lists")
}
