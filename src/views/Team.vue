<template>
    <div>
        <team-header/>
        <div class="team">
            <router-link class="add-hero" :to="{ 'name': 'team-add-hero' }">Créer un nouveau héro</router-link>
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
                                <h2>{{ hero.name }}</h2>
                                <div class="heroes-stats">
                                    <span class="heroes.gold">{{ hero.gold}} or</span>
                                    <span class="heroes.gold">{{ hero.objects ? hero.objects.length : 0}} objs</span>
                                    <span class="heroes.gold">{{ hero.experience}} xp</span>
                                </div>
                            </div>
                        </div>
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
                            height: 60px;
                            margin-left: -40px;
                            padding-left: 50px;
                            padding-right: 1rem;
                            border-radius: 0 4px 4px 0;
                            background-color: $col_mid_grey;
                            z-index: 1;

                            h2 {
                                width: 100%;
                                margin: 0.5rem 0 0.2rem 0;
                                font-size: 1.6rem;
                                line-height: 1.6rem;
                                font-weight: bold;
                                font-family: $font_pirata;
                                text-transform: capitalize;
                            }

                            .heroes-stats {
                                display: flex;
                                justify-content: space-between;

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