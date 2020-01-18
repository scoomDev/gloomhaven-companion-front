<template>
    <div class="header">
        <span><router-link :to="{ 'name': 'home' }">Gloomhaven</router-link></span>
        <span v-if="isLoggedIn" class="logout-btn">
            <a @click="logout">Logout</a>
        </span>
    </div>
</template>

<style lang="scss">
    .header {
        display: flex;
        justify-content: space-between;
        width: 100%;
        padding: 1rem;
        color: white;
        background-color: #918072;

        .logout-btn {
            cursor: pointer;
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