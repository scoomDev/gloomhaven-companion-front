<template>
    <div class="header">
        <router-link :to="{ 'name': 'home' }" class="header-logo"><img :src="require('../assets/gloomhaven-logo.png')" alt=""></router-link>
        <div class="header-buttons">
            <span class="info-btn">i</span>
            <span v-if="isLoggedIn" class="logout-btn">
                <a @click="logout"><img :src="require('../assets/icons/logout.svg') || ''" alt=""></a>
            </span>
        </div>
    </div>
</template>

<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        height: $dim_header;
        padding: 0.5rem;
        color: white;
        background-color: #918072;

        .header-logo {
            display: flex;
            align-items: center;
            width: 160px;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }

        .logout-btn {
            cursor: pointer;
        }
    }
</style>

<style lang="scss">
    .header {
        .header-logo {
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

            .info-btn {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 35px;
                height: 35px;
                margin-right: 0.5rem;
                color: $col_black;
                font-size: 1.5rem;
                font-family: $font_pirata;
                border-radius: 50%;
                background-color: $col_white;
            }

            .logout-btn {
                a {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 35px;
                    height: 35px;
                    border-radius: 50%;
                    background-color: $col_white;
                    box-shadow: $shadow_material;

                    img {
                        width: 18px;
                        height: 18px;
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