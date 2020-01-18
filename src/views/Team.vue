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
                        <span class="heroes-level">{{ hero.level }}</span>
                        <div class="heroes-item-content">
                            <span>{{ hero.name }}</span>
                            <div class="heroes-stats">
                                <span class="heroes.gold">{{ hero.gold}}</span>
                                <span class="heroes.gold">{{ hero.objects ? hero.objects.length : 0}}</span>
                                <span class="heroes.gold">{{ hero.experience}}</span>
                            </div>
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
            margin: 0;
            padding: 0;

            li {
                display: block;
                width: 300px;
                margin: 1rem auto;
                list-style: none;

                a {
                    color: white;
                    text-decoration: none;

                    .heroes-item {
                        position: relative;
                        display: flex;
                        align-items: center;

                        picture {
                            width: 80px;
                            height: 80px;
                            border-radius: 50%;
                            overflow: hidden;
                            z-index: 2;

                            img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                            }
                        }

                        .heroes-level {
                            position: absolute;
                            left: 50px;
                            bottom: -6px;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            width: 30px;
                            height: 30px;
                            color: black;
                            font-size: 1rem;
                            line-height: 1.2rem;
                            border-radius: 50%;
                            background-color: white;
                            z-index: 3;
                        }

                        .heroes-item-content {
                            width: 280px;
                            margin-left: -50px;
                            background-color: gray;
                            height: 60px;
                            z-index: 1;

                            span {
                                display: block;
                                margin: 10px 0 0 60px;
                                font-size: 0.9rem;
                                text-transform: uppercase;
                            }

                            .heroes-stats {
                                display: flex;

                                span {
                                    font-size: 0.8rem;
                                }
                            }
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