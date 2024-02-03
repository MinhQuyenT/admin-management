import { Status } from "./constansts"
import { FormItemRule } from "naive-ui"
const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/
const passwordRegex =
    /(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}/
export const accountSelectOptions = [
    {
        label: Status.Inactive,
        value: 0,
    },
    {
        label: Status.Active,
        value: 1,
    },
]

export const accountRules = {
    username: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
    },
    firstName: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
    },
    lastName: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
    },
    password: {
        required: true,
        validator(rule: FormItemRule, value: string) {
            console.log("rule: ", rule)
            if (!value) {
                return new Error("Please input your password")
            } else if (!passwordRegex.test(value)) {
                return new Error(
                    "Password must be at least 6 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character"
                )
            }
            return true
        },
        trigger: ["input", "blur"],
    },
    email: {
        required: true,
        validator(rule: FormItemRule, value: string) {
            console.log("rule: ", rule)
            if (!value) {
                return new Error("Please input your email")
            } else if (!emailRegex.test(value)) {
                return new Error("Please input valid email")
            }
            return true
        },
        trigger: ["input", "blur"],
    },
}
