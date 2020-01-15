<template>
    <div>
        <team-header />
        <h1>Heroes</h1>
        <ul>
            <li v-for="hero in heroes" :key="hero.id">
                <router-link :to="{ 'name':  'hero', 'params': { 'id': hero.id }}" v-on:click.native="storeCurrentHero(hero)">
                    <p>{{ hero.name }} | level : {{ hero.level }}</p>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    import TeamHeader from "../components/TeamHeader"

    export default {
        components: {
            TeamHeader
        },
        data() {
            return {
                heroes: {}
            }
        },
        created() {
            const teamId = this.$route.params.id || sessionStorage.getItem('current_team_id')
            return this.$store.dispatch('getHeroes', teamId).then(response => this.heroes = response)
        },
        methods: {
            storeCurrentHero: function(hero) {
                this.$store.commit('store_current_hero', hero)
            }
        }
    }
</script>