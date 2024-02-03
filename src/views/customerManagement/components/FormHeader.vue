<script setup lang="ts">
import { Search } from "@vicons/ionicons5"
import { ref, toRef, watch } from "vue"
import useCustomerStore from "@/stores/modules/customer"
import { defaultPage, defaultPageSize } from "@/constants/constansts"
import { customerSelectOptions } from "@/constants/customer"
import { NCard, NFormItem } from "naive-ui"

const customerStore = useCustomerStore()

const formValue = ref({
    customer: {
        address: "",
        description: "",
        name: "",
        email: "",
        mobil: "",
        status: 0,
    },
})

let filterObject = toRef(customerStore, "filterObjectDefault")

watch(
    formValue,
    newFormValue => {
        filterObject.value.name = newFormValue.customer.name
        filterObject.value.email = newFormValue.customer.email
        filterObject.value.address = newFormValue.customer.address
        filterObject.value.description = newFormValue.customer.description
        filterObject.value.mobil = newFormValue.customer.mobil
        filterObject.value.status = newFormValue.customer.status
    },
    { deep: true }
)

const handleSubmit = async (e: MouseEvent) => {
    e.preventDefault()
    console.log("here")
    const filterObject = {
        ...formValue.value.customer,
        start: defaultPage,
        rows: defaultPageSize,
    }

    customerStore.getCustomers(filterObject)
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
                    label="Email"
                    path="customer.email"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.customer.email"
                        placeholder="Email"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    label="Name"
                    path="customer.name"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.customer.name"
                        placeholder="Input Name"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    label="Address"
                    path="customer.address"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.customer.address"
                        placeholder="Input Address"
                    />
                </n-form-item>

                <!--                <n-form-item class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"-->
                <!--                             :label-style="{ fontWeight: 500 }"-->
                <!--                             label="Description"-->
                <!--                             path="customer.description"-->
                <!--                             :show-feedback="false"-->
                <!--                >-->
                <!--                    <n-input-->
                <!--                        v-model:value="formValue.customer.description"-->
                <!--                        placeholder="Input description"-->
                <!--                    />-->
                <!--                </n-form-item>-->

                <n-form-item
                    class="mt-5 !mr-0 lg:mt-0 lg:col-span-2"
                    :label-style="{ fontWeight: 500 }"
                    label="Mobile"
                    path="customer.mobil"
                    :show-feedback="false"
                >
                    <n-input
                        v-model:value="formValue.customer.mobil"
                        placeholder="Input description"
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
                        v-model:value="formValue.customer.status"
                        :options="customerSelectOptions"
                    />
                </n-form-item>

                <n-form-item
                    class="mt-3 w-full lg:mt-0 lg:col-span-2"
                    :show-feedback="false"
                    :label-style="{ fontWeight: 500 }"
                >
                    <n-button type="info" class="w-full" @click="handleSubmit">
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
