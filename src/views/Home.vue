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
                        <div>
                            <h2>{{ team.name }}</h2>
                            <div>6/17</div>
                        </div>
                        <div>{{ team.reputation }}</div>
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
                height: 100px;
                list-style: none;

                .team-item {
                    display: flex;
                    color: black;
                    text-decoration: none;

                    picture {
                        width: 200px;
                        height: 100px;
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
                        width: 100%;
                        justify-content: space-around;
                        align-items: center;
                        color: white;
                        background-color: #404040;
                        z-index: 2;

                        &:before {
                            content: "";
                            position: absolute;
                            left: -60px;
                            width: 0;
                            height: 0;
                            border-style: solid;
                            border-width: 0 0 100px 60px;
                            border-color: transparent transparent #404040 transparent;
                        }

                        h2 {
                            margin: 0;
                            padding: 0;
                            color: white;
                            font-size: 1.4rem;
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
