<template>
    <n-drawer
        v-model:show="customerStore.drawerStatus"
        class="!w-full md:!w-[600px]"
        placement="right"
        :mask-closable="false"
    >
        <n-drawer-content
            :title="
                customerStore.currentState == State.ADD
                    ? 'Add Customer'
                    : 'Edit Customer'
            "
            closable
        >
            <div class="flex flex-col">
                <n-form
                    ref="formRef"
                    :rules="rules"
                    :model="customer"
                    class="md:grid md:grid-cols-2 md:gap-4"
                >
                    <!--                        <n-form-item path="user.profilePic" label="Avatar">-->
                    <!--                            <p>upload profile pic</p>-->
                    <!--                            &lt;!&ndash; <UploadProfilePic /> &ndash;&gt;-->
                    <!--                        </n-form-item>-->
                    <n-form-item
                        path="email"
                        label="Email"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="customer.email"
                            placeholder="Input your email"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="name"
                        label="Name"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="customer.name"
                            placeholder="Input your name"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="address"
                        label="Address"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="customer.address"
                            placeholder="Input your address"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="description"
                        label="Description"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="customer.description"
                            placeholder="Input your description"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="mobil"
                        label="Mobile"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-input
                            v-model:value="customer.mobil"
                            placeholder="Input your mobile"
                        />
                    </n-form-item>
                    <n-form-item
                        class="mt-3 md:mt-0"
                        path="status"
                        label="Status"
                        :label-style="{ fontWeight: 500 }"
                    >
                        <n-select
                            v-model:value="customer.status"
                            :options="selectOptions"
                        />
                    </n-form-item>
                </n-form>
            </div>
            <n-form-item class="mt-3 md:mt-0">
                <div class="flex gap-3">
                    <n-button @click="handleSubmit" type="info">Save</n-button>
                    <n-button
                        @click="
                            () => {
                                resetCurrentCustomer()
                                customerStore.toggleStatus()
                            }
                        "
                        type="error"
                    >
                        Cancel
                    </n-button>
                </div>
            </n-form-item>
        </n-drawer-content>
    </n-drawer>
</template>

<script setup lang="ts">
import useCustomerStore from "@/stores/modules/customer"
// import UploadProfilePic from "./UploadProfilePic.vue"
import { ref } from "vue"
import { FormInst, NSelect } from "naive-ui"
import { customerSelectOptions } from "@/constants/customer"
import { State } from "@/constants/constansts"
import { toRef } from "vue"
import { editCustomer } from "@/apis/customer"
import { defaultPage, defaultPageSize } from "@/constants/constansts"
// import { filterObjectDefault } from "@/stores/modules/customer/index"
// :on-after-leave="handleLeaving"
const customerStore = useCustomerStore()
// const selectValues = ref(0)

const selectOptions = customerSelectOptions
let customer = toRef(customerStore, "currentCustomer")

const formRef = ref<FormInst | null>(null)

const rules = {
    name: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
    },
    email: {
        required: true,
        message: "Please input your email",
        trigger: ["blur"],
    },
    address: {
        required: true,
        message: "Please input your address",
        trigger: ["blur"],
    },
    description: {
        required: true,
        message: "Please input your description",
        trigger: ["blur"],
    },
    mobil: {
        required: true,
        message: "Please input your mobil",
        trigger: ["blur"],
    },
}
const resetCurrentCustomer = () => {
    customerStore.currentCustomer = {
        name: "",
        email: "",
        mobil: "",
        address: "",
        description: "",
        status: 0,
    }
}
const handleSubmit = async () => {
    const formData = { ...customerStore.currentCustomer }
    console.log("customer: ", customer.value)
    console.log("formRef: ", formRef)

    //! validate
    //  :rules="rules"

    formRef.value?.validate(async errors => {
        if (!errors) {
            switch (customerStore.currentState) {
                case State.ADD:
                    customerStore.handleState(formData)
                    break
                case State.EDIT: {
                    // tạo object mới để gọi API
                    const CustomerEdited = {
                        customerId: customer.value.customerId,
                        name: formData.name,
                        email: formData.email,
                        address: formData.address,
                        description: formData.description,
                        mobil: formData.mobil,
                        status: formData.status,
                    }
                    // gọi API edit
                    await editCustomer(CustomerEdited)
                    // sau đó load lại customers
                    await customerStore.getCustomers({
                        ...customerStore.filterObjectDefault,
                        start: customerStore.pagination.page || defaultPage,
                        rows:
                            customerStore.pagination.pageSize ||
                            defaultPageSize,
                    })
                    //cuối cùng đóng drawer
                    customerStore.drawerStatus = false
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
</script>
