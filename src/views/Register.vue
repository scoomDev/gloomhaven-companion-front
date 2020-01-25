<template>
    <div id="registerPage">
        <h2>Viens! <br>On est bien !</h2>
        <form @submit.prevent="register" class="register">
            <input type="text" placeholder="username" v-model="username">
            <input type="password" placeholder="password" v-model="password">
            <input type="password" placeholder="Confirm password" v-model="passwordConfirmation">
            <button type="submit">I'm comiiiing !!!!</button>
        </form>
    </div>
</template>

<style lang="scss">
    #registerPage {
        h2 {
            font-family: $font_pirata;
            font-size: 4rem;
            line-height: 4rem;
            text-align: center;
        }

        .register {
            display: flex;
            width: 100%;
            flex-direction: column;
            justify-content: center;

            input {
                @extend %input;
                margin: 0.5rem auto;
            }

            button {
                @extend %button;
            }
        }
    }
</style>

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
            register: function () {
                if (this.username && this.password && this.passwordConfirmation) {
                    if (this.password === this.passwordConfirmation) {
                        let info = {
                            username: this.username,
                            password: this.password
                        }
                        this.$store.dispatch('register', info).then((response) => {
                            if (response.data.error) return response.data.error
                            else this.$router.push('/')

                        })
                    } else {
                        this.$store.commit('add_message', {
                            state: "error",
                            content: "Tu te fous de ma gueule gros :/ ? T'es pas capable de mettre deux fois le même mot de passe ???"
                        })
                    }
                } else {
                    if(!this.username) {
                        this.$store.commit('add_message', {
                            state: "error",
                            content: "Remplis ton usernameuh !!!"
                        })
                    } else if(!this.password) {
                        this.$store.commit('add_message', {
                            state: "error",
                            content: "Remplis ton mot de passeuh !!!"
                        })
                    } else if(!this.passwordConfirmation) {
                        this.$store.commit('add_message', {
                            state: "error",
                            content: "Confirme ton mot de passeuh !!!"
                        })
                    }
                }
            }

        }
    }
</script>