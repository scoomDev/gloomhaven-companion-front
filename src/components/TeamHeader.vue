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
            this.$store.dispatch('getTeamById', this.$route.params.id)
        }
    }
</script>