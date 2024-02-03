import { AxiosResponse } from "axios"
import { axiosGet } from "@/utils/request.ts"

export const getRouteServerApi = async (): Promise<AxiosResponse<Res>> => {
    return await axiosGet("SystemMenu/lists")
}
