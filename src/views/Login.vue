<template>
    <div>
        <h2>Viens ! Connecte toi !</h2>
        <div v-if="errors.state" :class="{ 'alert-error': errors.state = 'error' }">
            {{ errors.message }}
        </div>
        <form class="login" @submit.prevent="login">
            <div>
                <input type="text" placeholder="username" v-model="username">
            </div>
            <div>
                <input type="password" placeholder="password" v-model="password">
            </div>
            <div>
                <button type="submit">Ça va ! J'arrive !</button>
            </div>
        </form>
        <div>
            <router-link v-if="!isLoggedIn" to="/register">J'ai pas de compte gros !</router-link>
        </div>
    </div>
</template>

<style lang="scss">
    .alert-error {
        display: inline-block;
        padding: 0.8rem 1.2rem;
        color: #5b0000;
        background-color: rgba(255, 119, 111, 0.71);
    }
</style>

<script>
    export default {
        data() {
            return {
                username: "",
                password: "",
                isLoggedIn: this.$store.getters.isLoggedIn,
                errors: {}
            }
        },

        methods: {
            login() {
                const username = this.username
                const password = this.password

                this.$store.dispatch('login', {username, password})
                    .then(() => this.$router.push('/'))
                    .catch( () => this.errors = this.$store.getters.authStatus)
            }
        }
    }
</script>