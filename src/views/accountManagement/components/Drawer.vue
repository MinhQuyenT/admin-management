<script setup lang="ts">
import useAccountStore from "@/stores/modules/account"
import { accountRules, accountSelectOptions } from "@/constants/account"
import { ref, toRef, watch } from "vue"
import { FormInst } from "naive-ui"
import {
    editAccount,
    //  updateAccount
} from "@/apis/account"
import { State, defaultPage, defaultPageSize } from "@/constants/constansts"

const accountStore = useAccountStore()

let account = toRef(accountStore, "currentAccount")

const formRef = ref<FormInst | null>(null)

const rules = accountRules

const resetCurrentAccount = () => {
    if (accountStore.drawerStatus) {
        accountStore.currentAccount = {
            firstName: "",
            lastName: "",
            birthDay: new Date().toISOString().split("T")[0], // Set birthDay to current date,
            username: "",
            password: "",
            email: "",
            enable: 0,
        }
    }
}
let birthDayTimestamp = ref(new Date().getTime())
const handleSubmit = async () => {
    const formData = {
        ...accountStore.currentAccount,
        birthDay: birthDayTimestamp.value,
    }
    let date = new Date(birthDayTimestamp.value)
    let dateString = date.toLocaleDateString("en-CA")

    formRef.value?.validate(async errors => {
        if (!errors) {
            switch (accountStore.currentState) {
                case State.ADD:
                    // console.log("date: ", date)
                    // console.log("dateString: ", dateString)
                    console.log("formData: ", formData)

                    // date = new Date(formData.birthDay)
                    // dateString = date.toLocaleDateString("en-CA")

                    await accountStore.handleState({
                        ...formData,
                        birthDay: dateString,
                    })

                    //cuối cùng đóng drawer
                    resetCurrentAccount()
                    accountStore.drawerStatus = false
                    break
                case State.EDIT: {
                    // console.log("formData.birthDay: ", formData.birthDay)
                    // console.log("birthDayTimestamp: ", birthDayTimestamp)

                    date = new Date(birthDayTimestamp.value)
                    dateString = date.toLocaleDateString("en-CA")
                    console.log("dateString: ", dateString)

                    // .split("T")[0]

                    // tạo object mới để gọi API
                    const AccountEdited: Account = {
                        accountId: account.value.accountId,
                        firstName: formData.firstName,
                        lastName: formData.lastName,
                        birthDay: dateString,
                        username: formData.username,
                        email: formData.email,
                        enable: formData.enable,
                    }
                    // gọi API edit
                    await editAccount(AccountEdited)

                    console.log("AccountEdited: ", AccountEdited)

                    // sau đó load lại product
                    await accountStore.getAccounts({
                        ...accountStore.filterObjectDefault,
                        start: accountStore.pagination.page || defaultPage,
                        rows:
                            accountStore.pagination.pageSize || defaultPageSize,
                    })
                    //cuối cùng đóng drawer
                    accountStore.drawerStatus = false
                    resetCurrentAccount()
                    break
                }
                default:
                    break
            }
        } else {
            console.log(errors)
            console.log("lỗi")
        }
    })
}

const convertDateToTimeStamp = (dateStr: string) => {
    const timestamp = Date.parse(dateStr)
    return timestamp
}

watch(
    () => account.value.birthDay,
    newBirthDay => {
        birthDayTimestamp.value = convertDateToTimeStamp(newBirthDay as string)
    }
)
</script>

<template>
    <n-drawer
        class="!w-full md:!w-[600px]"
        placement="right"
        :mask-closable="false"
        v-model:show="accountStore.drawerStatus"
    >
        <n-drawer-content
            closable
            :title="
                accountStore.currentState == State.ADD
                    ? 'Add Account'
                    : 'Edit account'
            "
        >
            <div class="flex flex-col">
                <n-form
                    ref="formRef"
                    :rules="rules"
                    :model="account"
                    class="md:grid md:grid-cols-2 md:gap-4"
                >
                    <n-form-item
                        path="username"
                        label="User name"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="account.username"
                            placeholder="Input username"
                        />
                    </n-form-item>

                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="firstName"
                        label="First name"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="account.firstName"
                            placeholder="Input Name"
                        />
                    </n-form-item>

                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="lastName"
                        label="Last name"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="account.lastName"
                            placeholder="Input Fullname"
                        />
                    </n-form-item>

                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="email"
                        label="Email"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="account.email"
                            placeholder="Input Email"
                        />
                    </n-form-item>

                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="status"
                        label="Status"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            v-model:value="account.enable"
                            :options="accountSelectOptions"
                        />
                    </n-form-item>

                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="birthDay"
                        label="Birthday"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-date-picker
                            class="w-full"
                            v-model:value="birthDayTimestamp"
                            type="date"
                            format="dd/MM/yyyy"
                        />
                    </n-form-item>

                    <template v-if="accountStore.currentState == State.ADD">
                        <n-form-item
                            class="mt-3 md:mt-0"
                            path="password"
                            label="Password"
                        >
                            <n-input
                                v-model:value="account.password"
                                placeholder="Input password"
                            />
                        </n-form-item>
                    </template>
                    <n-form-item class="hidden md:block" />
                    <n-form-item class="mt-3 md:mt-0">
                        <div class="flex gap-3">
                            <n-button @click="handleSubmit" type="info">
                                Save
                            </n-button>
                            <n-button
                                @click="
                                    () => {
                                        resetCurrentAccount()
                                        accountStore.drawerStatus = false
                                    }
                                "
                                type="error"
                            >
                                Cancel
                            </n-button>
                        </div>
                    </n-form-item>
                </n-form>
            </div>

            <!-- <div v-if="accountStore.currentState == State.CHANGE_PASSWORD">
                <n-form-item label="Password" path="password">
                    <n-input placeholder="Input Password" />
                </n-form-item>
                <n-form-item label="Re-enter password" path="re-password">
                    <n-input placeholder="Input Password" />
                </n-form-item>
            </div> -->
        </n-drawer-content>
    </n-drawer>
</template>
