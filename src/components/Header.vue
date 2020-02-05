<template>
    <div class="header-container">
        <div class="header">
            <router-link :to="{ 'name': 'home' }" class="header-logo"><img :src="require('../assets/gloomhaven-logo.png')" alt=""></router-link>
            <div class="header-buttons">
                <span class="info-btn">
                    <img :src="require('../assets/icons/rules_white.svg')" alt="">
                </span>
                <span v-if="isLoggedIn" class="logout-btn">
                    <a @click="logout"><img :src="require('../assets/icons/logout_white.svg') || ''" alt=""></a>
                </span>
            </div>
        </div>
        <div class="header-placeholder"></div>
    </div>
</template>

<style lang="scss">
    .header-container {
        .header-placeholder {
            width: 100%;
            height: $dim_header;
        }

        .header {
            position: fixed;
            top: 0;
            left: 0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: $dim_header;
            padding: 0.5rem;
            color: white;
            background: center/cover no-repeat url("../assets/images/header_bg.jpg");
            z-index: $zindex_header;

            .header-logo {
                display: flex;
                align-items: center;
                width: 140px;
                overflow: hidden;

                img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }
            }

            .header-buttons {
                display: flex;

                span + span {
                    margin-left: 1rem;
                }

                & > span {

                    img {
                        width: 25px;
                        height: 25px;
                    }
                }
            }
        }
    }
</style>

<script>

    export default {
        computed: {
            isLoggedIn: function () {
                return this.$store.getters.isLoggedIn
            }
        },
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => this.$router.push('/login'))
            }
        }
    }
</script>