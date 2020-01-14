<template>
    <div>
        <team-header />
        <h1>Heroes</h1>
    </div>
</template>

<script>
    import TeamHeader from "../components/TeamHeader"

    export default {
        components: {
            TeamHeader
        },
        created() {
            return this.heroes = this
        }
    }
</script>