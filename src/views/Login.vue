<template>
    <div>
        <h2>Viens ! Connecte toi !</h2>
        <transition name="slide-fade">
            <div v-if="errors.state" :class="{ 'alert-error': errors.state = 'error' }">
                {{ errors.message }}
            </div>
        </transition>
        <form class="login" @submit.prevent="login">
            <div>
                <input type="text" placeholder="username" v-model="username" @focus="resetErrors">
            </div>
            <div>
                <input type="password" placeholder="password" v-model="password" @focus="resetErrors">
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
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        margin: 2rem 0;
        padding: 0.8rem 1.2rem;
        color: #5b0000;
        background-color: rgba(255, 119, 111, 0.71);
        z-index: 1;
    }

    .slide-fade-enter-active {
        transition: all .3s ease;
    }
    .slide-fade-leave-active {
        transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
    }
    .slide-fade-enter, .slide-fade-leave-to
    /* .slide-fade-leave-active below version 2.1.8 */ {
        transform: translateX(10px);
        opacity: 0;
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
            resetErrors() {
                this.errors = {}
            },
            login() {
                const username = this.username
                const password = this.password

                if(username && password) {
                    this.$store.dispatch('login', {username, password})
                        .then(() => this.$router.push('/'))
                        .catch( () => this.errors = this.$store.getters.authStatus)
                } else {
                    this.errors = {
                        state: "error",
                        message: "Faut remplir les champs mec !"
                    }
                }

            }
        }
    }
</script>