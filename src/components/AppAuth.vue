<template>
    <!-- Auth Modal -->
    <div class="fixed z-10 inset-0 overflow-y-auto" id="modal" :class="hiddenClass">
        <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div class="fixed inset-0 transition-opacity">
                <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
            </div>
            <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>
            <div
                class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                <div class="py-4 text-left px-6">
                    <!-- Title -->
                    <div class="flex justify-between items-center pb-4">
                        <p class="text-2xl font-bold">Your Account</p>
                        <div class="modal-close cursor-pointer z-50" @click="modalVisibility = false">
                            <i class="fas fa-times"></i>
                        </div>
                    </div>
                    <!-- Tabs -->
                    <ul class="flex flex-wrap mb-4">
                        <li class="flex-auto text-center">
                            <a class="block rounded py-3 px-4 transition" :class="{
                                'hover:text-white text-white bg-blue-600': tab === 'login',
                                'hover:text-blue-600': tab === 'Register'
                            }" @click.prevent="tab = 'login'" href="#">Login</a>
                        </li>
                        <li class="flex-auto text-center">
                            <a class="block rounded py-3 px-4 transition" :class="{
                                'hover:text-white text-white bg-blue-600': tab === 'Register',
                                'hover:text-blue-600': tab === 'login'
                            }" @click.prevent="tab = 'Register'" href="#">Register</a>
                        </li>
                    </ul>
                    <!-- Login Form -->
                    <VeeForm v-show="tab === 'login'">
                        <div class="mb-3">
                            <label class="inline-block mb-2">Email</label>
                            <input type="email"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Enter Email" />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Password</label>
                            <!-- <VeeField type="password" :bails="false" v-slot="{ field, errors }">
                                <input
                                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                    placeholder="Password" v-bind="field" />
                                <div class="text-red-600" v-for="errors in errors" :key="errors">
                                    {{ errors }}
                                </div>
                            </VeeField> -->
                            <!-- <ErrorMessage class="text-red-600" name="password" /> -->
                        </div>
                        <button type="submit"
                            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">Submit</button>
                    </VeeForm>
                    <!-- Registration Form -->
                    <div class="text-white text-center font-bold p-3 rounded mb-4" v-if="reg_show_alert"
                        :class="reg_alert_variant">
                        {{ reg_alert_msg }}
                    </div>
                    <VeeForm v-show="tab === 'Register'" :validation-schema="schema" @submit="register"
                        :initial-values="userData">
                        <div class="mb-3">
                            <label class="inline-block mb-2">Name</label>
                            <VeeField type="text" name="name"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Enter Name" />
                            <ErrorMessage class="text-red-600" name="name" />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Email</label>
                            <VeeField type="email" name="email"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Enter Email" />
                            <ErrorMessage class="text-red-600" name="email" />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Age</label>
                            <VeeField type="number" name="age"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
                            <ErrorMessage class="text-red-600" name="age" />

                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Password</label>
                            <VeeField type="password" name="password" :bails="false" v-slot="{ field, errors }">
                                <input
                                    class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                    placeholder="Password" v-bind="field" />
                                <div class="text-red-600" v-for="errors in errors" :key="errors">
                                    {{ errors }}
                                </div>
                            </VeeField>
                            <ErrorMessage class="text-red-600" name="password" />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Confirm Password</label>
                            <VeeField type="password" name="confirm_password"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                                placeholder="Confirm Password" />
                            <ErrorMessage class="text-red-600" name="confirm_password" />
                        </div>
                        <div class="mb-3">
                            <label class="inline-block mb-2">Country</label>
                            <VeeField as="select" name="country"
                                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded">
                                <option value="USA">USA</option>
                                <option value="Mexico">Mexico</option>
                                <option value="Germany">Germany</option>
                                <option value="Antarctica">Antarctica</option>
                            </VeeField>
                            <ErrorMessage class="text-red-600" name="country" />
                        </div>
                        <div class="mb-3 pl-6">
                            <VeeField name="tos" value="1" type="checkbox"
                                class="w-4 h-4 float-left -ml-6 mt-1 rounded" />
                            <label class="inline-block">Accept terms of service</label>
                            <ErrorMessage class="text-red-600" name="tos" />
                        </div>
                        <button type="submit" :disabled="reg_in_submission"
                            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">Submit</button>
                    </VeeForm>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapWritableState } from 'pinia';
import useModalStore from "@/stores/modal";
export default {
    computed: {
        ...mapState(useModalStore, ['hiddenClass']),
        ...mapWritableState(useModalStore, {
            modalVisibility: 'isOpen'
        })
    },
    methods: {
        register(values) {
            console.log(values)
        }
    },
    data() {
        return {
            tab: "login",
            schema: {
                name: "required|min:4|max:13|alpha_spaces",
                email: "required|min:3|max:100|email",
                age: "required|min_value:18|max_value:100",
                password: "required|min:9|max:100|excluded:password",
                confirm_password: "passwords_mismatch:@password",
                country: "required|excluded:Antarctica",
                tos: "tos"
            },
            userData: {
                country: 'USA'
            },
            reg_in_submission: false,
            reg_show_alert: false,
            reg_alert_variant: "bg-blue-500",
            reg_alert_msg: "Please wait! Your account is being created. "
        }
    }
}
</script>
