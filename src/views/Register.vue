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
            register: function () {
                if (this.username && this.password) {
                    let info = {
                        username: this.username,
                        password: this.password
                    }

                    this.$store.dispatch('register', info).then((response) => {
                        if (response.data.error) console.error(response.data.error) // todo: add message flash
                        else {
                            console.log(response)
                            this.$router.push('login')
                        }

                    })
                } else {
                    // todo: add error message flash
                    console.error('veuillez remplir les champs requis')
                }
            }

        }
    }
</script>