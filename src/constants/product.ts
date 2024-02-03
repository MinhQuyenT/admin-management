import { Status } from "./constansts"

export enum productTitles {
    ADD = "Thêm sản phẩm",
    EDIT = "Chỉnh sửa sản phẩm",
}

export const productRules = {
    name: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
    },
    version: {
        required: true,
        message: "Please input your email",
        trigger: ["blur"],
    },
    description: {
        message: "Please input your description",
        trigger: ["blur"],
    },
}
export const productSelectOptions = [
    {
        label: Status.Active,
        value: 1,
    },
    {
        label: Status.Inactive,
        value: 0,
    },
]
