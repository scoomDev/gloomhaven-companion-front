<template>
    <div>
        <team-header />
        <h1>Heroes</h1>
        <ul>
            <li v-for="hero in heroes" :key="hero.id">{{ hero.name }}</li>
        </ul>
    </div>
</template>

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
            return this.$store.dispatch('getHeroes', this.$route.params.id).then(response => this.heroes = response)
        }
    }
</script>