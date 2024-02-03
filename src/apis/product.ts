import { queryParamsV1 } from "@/utils/stringUtil"
import { AxiosResponse } from "axios"
import {
    axiosDel,
    axiosGet,
    axiosGetWithParams,
    axiosPost,
    axiosPut,
} from "@/utils/request"

export const addNewProduct = async (
    newProduct: Product
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("LicenseProduct", newProduct)
}

export const deleteProduct = async (
    product: Product
): Promise<AxiosResponse<Res>> => {
    return await axiosDel("LicenseProduct", product.licenseProductId as string)
}

export const editProduct = async (
    product: Product
): Promise<AxiosResponse<Res>> => {
    return await axiosPut("LicenseProduct", product)
}

export const filterProduct = async (
    filterObject: filterProduct
): Promise<AxiosResponse<Res>> => {
    return await axiosGetWithParams(
        "LicenseProduct/page",
        queryParamsV1(filterObject, ["start", "rows", "status"])
    )
}

export const getAllProduct = async (): Promise<AxiosResponse<Res>> => {
    return await axiosGet("LicenseProduct")
}
