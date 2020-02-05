<template>
    <div id="app">
        <Header />
        <MessageFlash />
        <router-view/>
        <div class="background"></div>
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
        background-color: transparent;

        overflow-x: hidden;
        overflow-y: auto;

        .background {
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100vh;
            background: $col_bg url("assets/images/background_light.jpg") no-repeat;
            z-index: -1;
        }

        ul {
            li {
                list-style: none;
            }
        }

        textarea {
            padding: 0.4rem 0.6rem;
            border: 1px solid $col_default_light;
            background-color: $col_default_dark;

            &:focus {
                border: 1px solid $col_brown_dark;
                outline: none;
            }
        }

        hr {
            width: 100%;
            height: 1px;
            margin-top: 0.8rem;
            background-color: $col_brown_dark;
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
