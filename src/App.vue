<template>
    <div id="app">
        <Header />
        <MessageFlash />
        <router-view/>
    </div>
</template>

<style lang="scss">
    * {
        box-sizing: border-box;
    }

    html, body {
        margin: 0;
        padding: 0;
    }

    body {
        font-family: 'Open Sans', sans-serif;
    }

    #app {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        max-width: 768px;
        min-height: 100vh;
        margin: 0 auto;

        background-color: #b9a78b;
        overflow-x: none;
        overflow-y: auto;


        input {
            height: 30px;
            margin: 0;
            padding: 0.4rem 0.6rem;
            background-color: #9f9f9f;
            border: 1px solid;

            &:focus {
                border: 1px solid gray;
                outline: none;
            }
        }

        textarea {
            padding: 0.4rem 0.6rem;
            background-color: #9f9f9f;

            &:focus {
                border: 1px solid gray;
                outline: none;
            }
        }

        hr {
            width: 100%;
            height: 1px;
            background-color: #222222;
            outline: none;
            border: none;
        }

        // ANIMATIONS
        // =============================================================================================================
        .fade-to-top-enter-active {
            transition: all .3s ease;
        }
        .fade-to-top-leave-active {
            transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .fade-to-top-enter, .fade-to-top-leave-to {
            transform: translateY(-20px);
            opacity: 0;
        }
        .fade-enter-active {
            transition: opacity .3s ease-in-out;
        }
        .fade-leave-active {
            transition: opacity .3s ease-in-out;
        }
        .fade-enter, .fade-leave-to {
            opacity: 0;
        }
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
    import MessageFlash from "./components/MessageFlash"

    export default {
        components: {
            Header,
            MessageFlash
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
        }
    }
</script>
