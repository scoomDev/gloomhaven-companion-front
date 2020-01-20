<template>
    <div class="add-hero">
        <TeamHeader />
        <div class="character-list" v-if="!editHero">
            <GameCharacter
                    v-for="(character, index) in  characters"
                    :key="index"
                    :character="character"
                    @editCharacter="editCharacter"
            />
        </div>
        <div v-if="editHero">
            <input type="hidden" name="character-id" :value="characterId">
            <div>
                <label for="hero-name">Nom du Héro</label>
                <input type="text" name="hero-name" :value="heroName">
            </div>
            <div>
                <label for="hero-gold">Or de départ</label>
                <input type="text" name="hero-gold" :value="heroGold">
            </div>
            <button type="submit">Créer</button>
            <button @click="cancelEdit">Annuler</button>
        </div>
    </div>
</template>

<style lang="scss">
    .add-hero {
        .character-list {
            width: 100%;
        }
    }
</style>

<script>
    import { mapGetters, mapActions } from 'vuex'
    import TeamHeader from "../components/TeamHeader"
    import GameCharacter from "../components/GameCharacter"

    export default {
        components: {
            TeamHeader,
            GameCharacter
        },
        data() {
            return {
                editHero: false,
                characterId: null,
                characterName: null,
                heroName: "",
                heroGold: ""
            }
        },
        computed: {
            ...mapActions(['getCharacter']),
            ...mapGetters(['characters']),
        },
        methods: {
            editCharacter(character) {
                this.editHero = true
                this.characterId = character.id
                this.characterName = character.name
                console.log(character)
            },
            cancelEdit() {
                this.heroName = ""
                this.heroGold = ""
                this.editHero = false
            }
        }
    }
</script>