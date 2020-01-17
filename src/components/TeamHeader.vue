<template>
    <div class="team-header">
        <picture>
            <img src="../assets/images/fog_forest.jpg" alt="">
        </picture>
        <div class="team-item-content">
            <div>
                <h2>{{ team.name }}</h2>
                <div class="nbr-of-heroes">6/17</div>
            </div>
            <div>
                <div class="reputation">{{ team.reputation }}</div>
                <div>NSC : {{ teamLevel }}</div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .team-header {
        width: 100%;
        display: flex;

        picture {
            width: 30%;
            height: 60px;
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
                left: -30px;
                width: 0;
                height: 0;
                border-style: solid;
                border-width: 0 0 60px 30px;
                border-color: transparent transparent #404040 transparent;
            }

            div {
                h2 {
                    width: 85%;
                    margin: 0;
                    padding: 0;
                    color: white;
                    font-size: 0.8rem;
                }

                .nbr-of-heroes {
                    font-size: 0.7rem;
                }
            }

            .reputation {
                width: 15%;
                font-size: 0.8rem;
                text-align: center;
            }
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
            ...mapGetters(['teamLevel'])
        },
        created() {
            const teamId = sessionStorage.getItem('current_team_id') || this.$route.params.id
            this.$store.dispatch('getTeamById', teamId)
        }
    }
</script>