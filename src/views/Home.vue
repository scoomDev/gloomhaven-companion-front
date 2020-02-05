<template>
    <div class="home">
        <ul class="team-list">
            <li v-for="team in teams" :key="team.id">
                <router-link
                        :to="{ 'name': 'team', 'params': { 'id': team.id} }"
                        v-on:click.native="storeCurrentTeam(team)"
                        class="team-item"
                >
                    <picture>
                        <img src="../assets/images/fog_forest.jpg" alt="">
                    </picture>
                    <div class="team-item-content">
                        <h2>{{ team.name }}</h2>
                        <div class="team-stats">
                            <div>
                                <img :src="require('../assets/icons/hero_white.svg')" alt="" class="team-icon">
                                {{ team.heroes.length }}/17
                            </div>
                            <div>
                                <img :src="require('../assets/icons/reputation_white.svg')" alt="" class="team-icon">
                                {{ team.reputation }}
                            </div>
                        </div>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .home {
        width: 100%;

        .team-list {
            margin: 0;
            padding: 0;

            li {
                height: 70px;
                list-style: none;

                .team-item {
                    display: flex;
                    color: black;
                    text-decoration: none;

                    picture {
                        width: 25%;
                        height: 70px;
                        overflow: hidden;
                        z-index: 1;

                        img {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }
                    }

                    .team-item-content {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        justify-content: center;
                        width: 75%;
                        height: 70px;
                        padding-left: 0.2rem;
                        color: white;
                        background-color: $col_brown_dark;
                        z-index: 2;

                        &:before {
                            content: "";
                            position: absolute;
                            left: -60px;
                            width: 0;
                            height: 0;
                            border-style: solid;
                            border-width: 0 0 70px 60px;
                            border-color: transparent transparent $col_brown_dark transparent;
                        }

                        h2 {
                            width: 100%;
                            margin: 0.4rem 0 0.2rem 0;
                            padding: 0;
                            color: white;
                            font-family: $font_pirata;
                            font-size: 1.4rem;
                            line-height: 1.8rem;
                        }

                        .team-stats {
                            display: flex;
                            align-items: center;
                            font-size: 0.9rem;

                            div + div {
                                margin-left: 1rem;
                            }

                            & > div {
                                display: flex;
                                align-items: center;
                            }

                            img {
                                &.team-icon {
                                    width: 14px;
                                    height: 14px;
                                    margin-right: 0.5rem;
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
    export default {
        name: 'home',
        data() {
            return {
                teams: null
            }
        },
        created() {
            this.$store.commit('clear_current_hero')
            this.$store.dispatch('getTeam').then(response => this.teams = response)
        },
        methods: {
            storeCurrentTeam: function(team) {
                this.$store.commit('store_current_team', team)
            }
        }
    }
</script>
