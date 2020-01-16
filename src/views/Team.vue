<template>
    <div class="team">
        <team-header/>
        <ul class="heroes-list">
            <li v-for="hero in heroes" :key="hero.id">
                <router-link :to="{ 'name':  'hero', 'params': { 'id': hero.id }}"
                             v-on:click.native="storeCurrentHero(hero)">
                    <div class="heroes-item">
                        <picture>
                            <img :src="require('../assets/images/' + hero.GameCharacter.name + '-portrait.jpg')" alt="">
                        </picture>
                        <div class="heroes-item-content">
                            {{ hero.name }} | level : {{ hero.level }}
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .team {
        width: 100%;

        .heroes-list {
            margin: 0 3rem;
            padding: 0;

            li {
                margin: 1rem 0;
                list-style: none;

                a {
                    color: white;
                    text-decoration: none;

                    .heroes-item {
                        display: flex;
                        align-items: center;

                        picture {
                            width: 100px;
                            height: 100px;
                            border-radius: 50%;
                            overflow: hidden;
                            z-index: 2;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }

                        .heroes-item-content {
                            width: 100%;
                            margin-left: -50px;
                            background-color: gray;
                            height: 70px;
                            z-index: 1;
                        }
                    }
                }
            }
        }
    }
</style>

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
            storeCurrentHero: function (hero) {
                this.$store.commit('store_current_hero', hero)
            }
        }
    }
</script>