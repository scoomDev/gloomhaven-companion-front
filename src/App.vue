<template>
    <div id="app">
        <Header />
        <router-view/>
    </div>
</template>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    #app {
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        max-width: 1200px;

        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;

        background-color: #cdcdcd;
    }

    #nav {
        padding: 30px;

        a {
            font-weight: bold;
            color: #2c3e50;

            &.router-link-exact-active {
                color: #42b983;
            }
        }
    }
</style>

<script>
    import Header from "./components/Header"

    export default {
        components: {
            Header
        },
        created: function () {
            this.$http.interceptors.response.use(undefined, function (err) {
                return new Promise(() => {
                    if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
                        this.$store.dispatch('logout')
                    }
                    throw err
                })
            })
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => this.$router.push('login'))
            }
        }
    }
</script>
