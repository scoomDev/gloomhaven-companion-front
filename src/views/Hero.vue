<template>
    <div>
        <team-header></team-header>
        <h1>{{ currentHero.name }}</h1>
    </div>
</template>

<script>
    import TeamHeader from "../components/TeamHeader"
    import {mapState} from "vuex"

    export default {
        components: {
            TeamHeader
        },
        computed: mapState(['currentHero']),
        created() {
            if (!this.$store.getters.currentHero.id) {
                const id = this.$route.params.id || sessionStorage.getItem('current_hero_id')
                return this.$store.dispatch('getHeroById', id).then(response => response)
            }
        }
    }
</script>