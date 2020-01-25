<template>
    <div id="login">
        <h2>Viens ! Connecte toi !</h2>
        <transition name="slide-fade">
            <div v-if="errors.state" :class="{ 'alert-error': errors.state = 'error' }">
                {{ errors.message }}
            </div>
        </transition>
        <form class="login-form" @submit.prevent="login">
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
        <div class="register-link">
            <router-link v-if="!isLoggedIn" to="/register">J'ai pas de compte gros !</router-link>
        </div>
    </div>
</template>

<style lang="scss">
    #login {
        display: flex;
        flex-direction: column;
        height: calc(100vh - 40px);

        h2 {
            font-family: $font_pirata;
            font-size: 4rem;
            line-height: 4rem;
            text-align: center;
        }

        .login-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            width: 100%;

            input {
                @extend %input;
                margin: 0.5rem auto;
            }

            button {
                @extend %button;
            }
        }

        .register-link {
            margin-top: auto;
            margin-bottom: 56px;
            text-align: center;

            a {
                color: black;
            }
        }

        .alert-error {
            position: absolute;
            top: 0;
            right: 0;
            display: block;
            margin: 2rem 0;
            padding: 0.8rem 1.2rem;
            color: #5b0000;
            background-color: rgba(255, 119, 111, 0.71);
            z-ijsonndex: 1;
        }
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