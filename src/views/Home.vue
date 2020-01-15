<template>
    <div class="home">
        <ul>
            <li v-for="team in teams" :key="team.id">
                <router-link :to="{ 'name': 'team', 'params': { 'id': team.id} }" v-on:click.native="storeCurrentTeam(team)">
                    {{ team.name }}
                    <p>réputation : {{ team.reputation }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    li {
        list-style: none;
    }
</style>

<script>
    export default {
        name: 'home',
        data() {
            return {
                teams: null
            }
        },
        created() {
            return this.$store.dispatch('getTeam').then(response => this.teams = response)
        },
        methods: {
            storeCurrentTeam: function(team) {
                this.$store.commit('store_current_team', team)
            }
        }
    }
</script>
