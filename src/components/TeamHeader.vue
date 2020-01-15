<template>
    <div class="team-header">
        <p>{{ team.name }} | réputation : {{ team.reputation }}</p>
    </div>
</template>

<style lang="scss">

</style>

<script>
    import { mapState } from 'vuex'

    export default {
        computed: mapState({
            team: state => state.currentTeam
        }),
        created() {
            const teamId = sessionStorage.getItem('current_team_id') || this.$route.params.id
            this.$store.dispatch('getTeamById', teamId)
        }
    }
</script>