<template>
    <div>
        <team-header/>
        <div class="team">
            <router-link class="add-hero" :to="{ 'name': 'team-add-hero' }">Créer un nouveau héro</router-link>
            <ul class="heroes-list">
                <li v-for="hero in heroes" :key="hero.id">
                    <router-link :to="{ 'name':  'hero', 'params': { 'id': hero.id }}"
                                 v-on:click.native="storeCurrentHero(hero)">
                        <HeroListItem :hero="hero" />
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss">
    .team {
        width: 100%;

        .add-hero {
            display: block;
            max-width: 290px;
            margin: 1rem auto;
            padding: 0.6rem 0.8rem;
            color: white;
            text-align: center;
            text-decoration: none;
            border-radius: 4px;
            background-color: #747465;
        }

        .heroes-list {
            margin: 0;
            padding: 0;

            li {
                display: block;
                width: 300px;
                margin: 1rem auto;
                list-style: none;

                a {
                    color: $col_black;
                    text-decoration: none;
                }
            }
        }
    }
</style>

<script>
    import TeamHeader from "../components/TeamHeader"
    import HeroListItem from "../components/HeroListItem"

    export default {
        components: {
            TeamHeader,
            HeroListItem
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
            storeCurrentHero: function (hero) {
                this.$store.commit('store_current_hero', hero)
            }
        }
    }
</script>