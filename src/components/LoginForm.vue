<template>
    <!-- Login Form -->
    <div :class="login_alert_variant" class="text-white text-center font-bold p-4 mb-4" v-if="login_show_alert">
        {{ login_alert_msg }}
    </div>
    <VeeForm :validation-schema="loginschema" @submit="login">
        <div class="mb-3">
            <label class="inline-block mb-2">Email</label>
            <VeeField type="email" name="email"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded"
                placeholder="Enter Email" />
            <ErrorMessage class="text-red-600" name="email" />
        </div>
        <div class="mb-3">
            <label class="inline-block mb-2">Password</label>
            <VeeField type="password" name="password" placeholder="password"
                class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition duration-500 focus:outline-none focus:border-black rounded" />
            <ErrorMessage class="text-red-600" name="password" />
        </div>
        <button type="submit" :disabled="login_in_submission"
            class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition hover:bg-purple-700">Submit</button>
    </VeeForm>

</template>

<script>
export default {
    data() {
        return {
            login_in_submission: false,
            login_show_alert: false,
            login_alert_variant: "bg-blue-500",
            login_alert_msg: "Please Wait! We are loggin you in. ",

            loginschema: {
                email: "required|email",
                password: "required|min:9|max:100"
            }
        }
    },
    methods: {
        login(value) {
            this.login_in_submissio = true;
            this.login_show_alert = true;
            this.login_alert_variant = "bg-blue-500";
            this.login_alert_msg = "Please Wait! We are loggin you in. ";

            this.login_alert_variant = "bg-green-500";
            this.login_alert_msg = "Success! you are now logged in.";
            console.log(value)
        }
    }
}
</script>