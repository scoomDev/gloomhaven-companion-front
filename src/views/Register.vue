<template>
    <div>
        <h2>Register</h2>
        <form @submit.prevent="register">
            <div>
                <input type="text" placeholder="username" v-model="username">
            </div>
            <div>
                <input type="password" placeholder="password" v-model="password">
            </div>
            <div>
                <input type="password" placeholder="Confirm password" v-model="passwordConfirmation">
            </div>
            <div>
                <button type="submit">Register</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                password: "",
                passwordConfirmation: ""
            }
        },
        methods: {
            register: () => {
                let info = {
                    username: this.username,
                    password: this.password
                }

                this.$store.dispatch('register', info).then(() => this.$router.push('login'))
            }

        }
    }
</script>