import { AxiosResponse } from "axios"
import { axiosPost } from "@/utils/request.ts"

export const login = async (value: AuthReq): Promise<AxiosResponse<Res>> => {
    return await axiosPost("SystemAuthentication/auth", value)
}
export const getTokenServer = async (
    value: RefreshTokenReq
): Promise<AxiosResponse<Res>> => {
    return await axiosPost("SystemAuthentication/refreshToken", value)
}
