import { DropdownOption } from "naive-ui"
import { h, VNodeChild } from "vue"
import { RouterLink } from "vue-router"

export const renderDropdownLabel = (option: DropdownOption) => {
    if (option.key === "logout") {
        return h(
            "span",
            {
                onClick: () => {
                    console.log("logout")
                },
            },
            {
                default: () => option.label as VNodeChild,
            }
        )
    }
    return h(
        RouterLink,
        {
            to: option.key as string,
        },
        {
            default: () => option.label as VNodeChild,
        }
    )
}
