<template>
    <div class="team-header">
        <div class="team-stats">
            <picture>
                <div v-if="isHeroPage && team.achievements" class="open-team close" @click="toggleTeam">i</div>
                <img src="../assets/images/fog_forest.jpg" alt="">
            </picture>
            <div class="team-item-content">
                <h2>{{ team.name }}</h2>
                <div>
                    <div>
                        <img :src="require('../assets/icons/hero_white.svg')" alt="">
                        6/17
                    </div>
                    <div>
                        <img :src="require('../assets/icons/reputation_white.svg')" alt="">
                        {{ team.reputation }}
                    </div>
                    <div>
                        <span>nsc :&nbsp;</span>
                        {{ teamLevel }}
                    </div>
                </div>
            </div>
        </div>
        <ul class="team-achievements">
            <li v-for="(achievement, index) in team.achievements" :key="index">
                {{ achievement }}
            </li>
        </ul>
    </div>
</template>

<style lang="scss">
    .team-header {
        height: 60px;
        background-color: $col_brown_dark;
        transition: height 0.5s cubic-bezier(.51,.92,.24,1.15);
        overflow: hidden;

        .team-stats {
            display: flex;
            width: 100%;
            height: 60px;
            background-color: $col_brown_dark;

            picture {
                position: relative;
                display: flex;
                align-items: center;
                width: 25%;
                height: 60px;
                overflow: hidden;
                z-index: 1;

                .open-team {
                    position: absolute;
                    display: flex;
                    justify-content: center;
                    align-content: center;
                    width: 46px;
                    height: 46px;
                    margin-left: 0.5rem;
                    color: white;
                    font-family: $font_pirata;
                    font-size: 1.6rem;
                    line-height: 46px;
                    font-weight: bold;
                    border: 2px solid rgba(255,255,255,0.7);
                    border-radius: 50%;
                    background-color: rgba(0,0,0,0.3);
                    cursor: pointer;
                    z-index: 2;
                }

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
                padding: 0 4px;
                color: white;
                z-index: $zindex_min + 1;

                &:before {
                    content: "";
                    position: absolute;
                    left: -30px;
                    width: 0;
                    height: 0;
                    border-style: solid;
                    border-width: 0 0 60px 30px;
                    border-color: transparent transparent $col_brown_dark transparent;
                }

                h2 {
                    margin: 0;
                    padding: 0;
                    font-family: $font_pirata;
                    color: white;
                    font-size: 1.2rem;
                }

                div {
                    display: flex;
                    align-items: center;
                    margin-top: 0.1rem;

                    div + div {
                        margin-left: 0.8rem;
                    }

                    & > div {
                        font-size: 0.8rem;

                        span {
                            padding-right: 0.4rem;
                        }

                        img {
                            width: 12px;
                            height: 12px;
                            margin-right: 0.4rem;
                        }
                    }
                }
            }
        }

        .team-achievements {
            margin: 0;
            padding: 1rem 0;
            color: white;

            li {
                padding: 0.3rem 0 0.3rem 1rem;
            }
        }

        &.open {
            height: 200px;
        }
    }
</style>

<script>
    import { mapState, mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapState({
              team: state => state.currentTeam
            }),
            ...mapGetters(['teamLevel']),
            isHeroPage() {
                const currentUrl = window.location.href
                return currentUrl.includes('/hero/');
            }
        },
        created() {
            const teamId = sessionStorage.getItem('current_team_id') || this.$route.params.id
            this.$store.dispatch('getTeamById', teamId)
        },
        methods: {
            toggleTeam(evt) {
                const hasOpen = evt.target.classList.contains('open')
                const teamEl = document.querySelector('.team-header')
                const teamHeight = teamEl.getBoundingClientRect().height
                const achievements = teamEl.querySelector('.team-achievements')

                if (hasOpen) {
                    teamEl.style.height = (teamHeight - achievements.getBoundingClientRect().height) + 'px'
                    evt.target.innerText = 'i'
                    evt.target.classList.add('close')
                    evt.target.classList.remove('open')
                } else {
                    teamEl.style.height = (teamHeight + achievements.getBoundingClientRect().height) + 'px'
                    evt.target.innerText = '-'
                    evt.target.classList.add('open')
                    evt.target.classList.remove('close')
                }
            }
        }
    }
</script>