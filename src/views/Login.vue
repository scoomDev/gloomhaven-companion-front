<template>
    <div>
        <h2>Login</h2>
        <form @submit="login">
            <div>
                <input type="text" placeholder="username" v-model="username">
            </div>
            <div>
                <input type="password" placeholder="password" v-model="password">
            </div>
            <div>
                <button type="submit">Login</button>
            </div>
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                username: "",
                password: ""
            }
        },

        methods: {
            login: () => {
                const username = this.username
                const password = this.password

                this.$store.dispatch('login', {username, password}).then(() => this.$router.push('/'))
            }
        }
    }
</script>