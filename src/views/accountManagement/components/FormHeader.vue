<script setup lang="ts">
import { ref, toRef, watch } from "vue"
import { NForm, NFormItem, NInput, NButton, NCard } from "naive-ui"
// import useUserStore from "@/stores/modules/user"
import { Search } from "@vicons/ionicons5"
import { defaultPage, defaultPageSize } from "@/constants/constansts"
import useAccountStore from "@/stores/modules/account"
import { accountSelectOptions } from "@/constants/account"

// const userStore = useUserStore()

const accountStore = useAccountStore()

const formValue = ref({
    account: {
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        enable: 0,
    },
})

let filterObject = toRef(accountStore, "filterObjectDefault")

watch(
    formValue,
    newFormValue => {
        filterObject.value.firstName = newFormValue.account.firstName
        filterObject.value.lastName = newFormValue.account.lastName
        filterObject.value.username = newFormValue.account.username
        filterObject.value.email = newFormValue.account.email
    },
    { deep: true }
)

const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()

    const filterObject = {
        ...formValue.value.account,
        start: defaultPage,
        rows: defaultPageSize,
    }

    await accountStore.getAccounts(filterObject)
}
</script>

<template>
    <n-card class="mt-4 w-full">
        <n-form
            class="w-full"
            ref="formRef"
            inline
            :label-width="80"
            :model="formValue"
        >
            <div class="lg:grid md:grid-cols-6 xl:grid-cols-12 lg:gap-4 w-full">
                <n-form-item
                    class="!mr-0 lg:mt-0 lg:col-span-2 w-full"
                    :label-style="{ fontWeight: 500 }"
                    label="Username"
                    path="account.username"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.account.username"
                        placeholder="Username"
                        class="w-full"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    label="First Name"
                    path="account.firstName"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.account.firstName"
                        placeholder="First Name"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    label="Last Name"
                    path="account.lastName"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.account.lastName"
                        placeholder=" Last Name"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    :show-feedback="false"
                    label="Email"
                    path="account.email"
                >
                    <n-input
                        v-model:value="formValue.account.username"
                        placeholder="Email"
                    />
                </n-form-item>
                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    :show-feedback="false"
                    path="status"
                    label="Status"
                >
                    <n-select
                        clearable
                        v-model:value="formValue.account.enable"
                        :options="accountSelectOptions"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-3 w-full lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-button type="info" @click="handleSubmit" class="w-full">
                        <NIcon class="mr-[6px]">
                            <Search />
                        </NIcon>
                        Search
                    </n-button>
                </n-form-item>
            </div>
        </n-form>
    </n-card>
</template>
