<script setup lang="ts">
import { FormInst } from "naive-ui"
import { ref } from "vue"
import { MailOutline, LockClosedSharp } from "@vicons/ionicons5"
import { useAuthStore } from "@stores/modules/auth"
import { useMessage } from "naive-ui"
const authStore = useAuthStore()
const message = useMessage()
const formRef = ref<FormInst | null>(null)

const formValue = ref({ username: "", password: "" })

const rules = {
    username: {
        required: true,
        message: "Please input your name",
        trigger: "blur",
    },
    password: {
        required: true,
        message: "Please input your password",
        trigger: ["input", "blur"],
    },
}

const handleSubmit = async (event: MouseEvent) => {
    event.preventDefault()
    //! validation

    formRef.value?.validate(async errors => {
        if (!errors) {
            const data = await authStore.signIn({
                username: formValue.value.username,
                password: formValue.value.password,
            })
            if (data.code == -1) {
                message.error("Sai tên tài khoản hoặc mật khẩu")
            } else {
                message.success("Chào mừng bạn đến với hệ thống")
            }
        } else {
            message.error("Vui lòng nhập đầy đủ thông tin")
        }
    })
}
</script>

<template>
    <div class="flex flex-col justify-center items-center h-full">
        <p class="text-4xl font-extrabold dark:text-white m-0 p-0">
            Hello Again
        </p>

        <p class="text-gray-500 m-0 p-0">Welcome back, you've been missed</p>

        <n-form
            class="flex flex-col pt-10 w-full md:w-1/3"
            ref="formRef"
            :model="formValue"
            :rules="rules"
            :label-width="80"
        >
            <n-form-item :show-label="false" label="Name" path="username">
                <n-input
                    v-model:value="formValue.username"
                    placeholder="Username"
                >
                    <template #prefix>
                        <n-icon :component="MailOutline" />
                    </template>
                </n-input>
            </n-form-item>

            <n-form-item :show-label="false" label="Password" path="password">
                <n-input
                    v-model:value="formValue.password"
                    type="password"
                    show-password-on="mousedown"
                    placeholder="Password"
                    :maxlength="8"
                >
                    <template #prefix>
                        <n-icon :component="LockClosedSharp" />
                    </template>
                </n-input>
            </n-form-item>

            <n-button
                type="primary"
                @click="handleSubmit"
                class="my-4"
                attr-type="submit"
            >
                Login
            </n-button>
        </n-form>
    </div>
</template>

<style lang="css" scoped></style>
