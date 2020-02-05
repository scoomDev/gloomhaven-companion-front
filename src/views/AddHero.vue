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
        <div v-if="editHero" class="add-hero-form">
            <h2>
                {{ characterName }}
                <span class="character-icon">
                    <img :src="require(`../assets/icons/characters/${characterName}.png`) || ''" alt="">
                </span>
            </h2>
            <div class="input-group">
                <label for="hero-name">Nom du Héro</label>
                <input type="text" name="hero-name" v-model="heroName">
            </div>
            <div class="input-group">
                <label for="hero-level">Level de départ</label>
                <input type="text" name="hero-level" v-model="heroLevel">
            </div>
            <div class="input-group">
                <label for="hero-gold">Or de départ</label>
                <input type="text" name="hero-gold" v-model="heroGold">
            </div>
            <div class="button-group">
                <button type="submit" @click="addCharacter">Créer</button>
                <button @click="cancelEdit">Annuler</button>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .add-hero {
        .character-list {
            width: 100%;
        }

        .add-hero-form {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin: 1rem 0;

            h2 {
                margin: 0 0 1rem 0;
                font-family: $font_pirata;
                font-size: 3rem;
                line-height: 3rem;
                text-transform: capitalize;

                .character-icon {
                    display: inline-block;
                    width: 40px;
                    height: 40px;
                    margin-left: 10px;
                    line-height: 40px;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: contain;
                    }
                }
            }

            .input-group {
                margin: 0.5rem 0;

                label {
                    display: block;
                    font-family: $font_pirata;
                    font-size: 1.4rem;
                    line-height: 1.8rem;
                }

                input {
                    @extend %input;
                }
            }

            .button-group {
                margin: 1rem 0;
                button {
                    @extend %button;
                    display: block;
                    margin: 0.5rem 0;
                }
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'
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
                heroName: null,
                heroLevel: 1,
                heroGold: 30
            }
        },
        created() {
            this.$store.dispatch('getCharacter')
        },
        computed: {
            ...mapGetters(['characters']),
        },
        methods: {
            editCharacter(character) {
                this.editHero = true
                this.characterId = character.id
                this.characterName = character.name
            },
            addCharacter() {
                if (this.characterId && this.heroName) {
                    const data = {
                        name: this.heroName,
                        level: this.heroLevel.toString(),
                        gold: this.heroGold.toString(),
                        GameCharacter: `/api/game_characters/${this.characterId}`,
                        team: '/api/teams/1'
                    }
                    this.$store.dispatch('addNewHero', data)
                        .then(() => {
                            const teamId = sessionStorage.getItem('current_team_id')
                            this.$router.push(`/team/${teamId}`)
                        })
                } else {
                    if (!this.heroName) {
                        this.$store.commit('add_message', {
                            state: "error",
                            content: "Tu ne donnerais pas un p'tit nom à ton Héro ? Si, hein ?"
                        })
                    } else {
                        this.$store.commit('add_message', {
                            state: "error",
                            content: "Y'a comme une couille dans le pâté on dirait :/"
                        })
                    }
                }
            },
            cancelEdit() {
                this.heroName = ""
                this.heroLevel = 1
                this.heroGold = 30
                this.editHero = false
            }
        }
    }
</script>