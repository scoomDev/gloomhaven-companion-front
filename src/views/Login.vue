<template>
    <div>
        <h2>Login</h2>
        <form class="login" @submit.prevent="login">
            <div>
                <input type="text" placeholder="username" v-model="username">
            </div>http://localhost:8080/characters
            <div>http://localhost:8080/characters
                <input type="password" placeholder="password" v-model="password">
            </div>
            <div>
                <button v-on:click="login" type="submit">Login</button>
            </div>
        </form>http://localhost:8080/characters
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
            login() {
                const username = this.username
                const password = this.password

                this.$store.dispatch('login', {username, password})
                    .then(() => this.$router.push('/'))
                    .catch(error => console.log(error))
            }
        }
    }
</script>