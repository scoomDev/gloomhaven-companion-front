<template>
    <div>
        <h2>Bloublou</h2>
        <ul>
            <li v-for="character in characters" :key="character.id">
                {{ character.name }} : {{ character.life }}
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        data() {
          return {
              characters: null
          }
        },
        mounted() {
            this.$store.dispatch('getCharacter').then(response => this.characters = response)
        }
    }
</script>