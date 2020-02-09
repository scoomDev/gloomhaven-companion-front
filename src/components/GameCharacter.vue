<template>
    <div class="character-item" @click="editCharacter" :class="isInTeam() === this.heroes.length ? '' : 'active'">
        <div class="character-avatar">
            <picture>
                <img
                        :src="require(`../assets/images/${character.name}-portrait.jpg`) || ''"
                        alt=""
                >
            </picture>
            <span class="character-icon">
                <img :src="require(`../assets/icons/characters/${character.name}.png`) || ''" alt="">
            </span>
        </div>
        <div class="character-info">
            <h2>{{ character.name }}</h2>
            <div class="character-stats">
                <span>
                    <img :src="require('../assets/icons/cards.svg')" alt="">
                    {{ character.maxCard }}
                </span>
                <span>
                    <img :src="require('../assets/icons/heal_bd.png')" alt="">
                    {{ getMaxLife }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .character-item {
        display: flex;
        width: 280px;
        align-items: center;
        margin: 1.5rem auto;

        &.active {
            opacity: 0.5;
            pointer-events: none;
        }

        .character-avatar {
            position: relative;
            z-index: 1;

            picture {
                display: flex;
                justify-content: center;
                align-items: center;
                width: 80px;
                height: 80px;
                border-radius: 50%;
                border: 4px solid $col_white;
                overflow: hidden;
                z-index: 1;

                @include objectFit(cover);
            }

            .character-icon {
                @include characterIcon(40px, 40px, null, 1, 0, -10px, -10px)
            }
        }

        .character-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 240px;
            height: 70px;
            margin-left: -40px;
            padding: 0.5rem 0 0.5rem 60px;
            border-radius: 0 5px 5px 0;
            background-color: $col_character_bg;

            h2 {
                width: 100%;
                margin: 0;
                padding: 0;
                font-size: 1.7rem;
                line-height: 1.7rem;
                font-weight: bold;
                font-family: $font_pirata;
                text-transform: capitalize;
            }

            .character-stats {
                display: flex;
                width: 100%;
                margin-top: 0.4rem;

                span + span {
                    margin-left: 0.8rem;
                }

                & > span {
                    display: flex;
                    align-items: center;
                    padding-right: 14px;

                    img {
                        max-width: 16px;
                        max-height: 18px;
                        margin-right: 5px;
                        object-fit: contain;
                    }
                }
            }
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'

    export default {
        props: ['character'],
        computed: {
            ...mapGetters(['heroes']),
            getMaxLife() {
                const arrLife = JSON.parse(this.character.life)
                return arrLife[9]
            }
        },
        methods: {
            editCharacter() {
                this.$emit('editCharacter', {id: this.character.id, name: this.character.name})
            },
            isInTeam() {
                const heroes = this.heroes.filter(hero => {
                    if (hero.isRetired) return hero
                    if (hero.GameCharacter.id !== this.character.id) return hero
                })
                return heroes.length
            }
        }
    }
</script>