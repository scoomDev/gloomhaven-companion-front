<template>
    <div class="header">
        <router-link :to="{ 'name': 'home' }" class="header-logo"><img :src="require('../assets/gloomhaven-logo.png')" alt=""></router-link>
        <span v-if="isLoggedIn" class="logout-btn">
            <a @click="logout">Logout</a>
        </span>
    </div>
</template>

<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
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