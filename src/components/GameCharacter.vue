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
            <span class="character-name">{{ character.name }}</span>
            <div class="character-stats">
                <span class="character-max-card">cards {{ character.maxCard }}</span>
                <span>
                    <img src="../assets/icons/heal_bd.png" alt="">
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
        margin: 1rem auto;

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
                overflow: hidden;
                z-index: 1;

                @include objectFit(cover);
            }

            .character-icon {
                @include characterIcon(30px, 30px, null, null, 0, 0, -4px)
            }
        }

        .character-info {
            display: flex;
            flex-wrap: wrap;
            width: 240px;
            margin-left: -40px;
            padding: 0.5rem 0 0.5rem 60px;
            border-radius: 0 5px 5px 0;
            background-color: $col_mid_grey;

            .character-name {
                width: 100%;
                font-size: 1.7rem;
                line-height: 2.2rem;
                font-weight: bold;
                font-family: $font_pirata;
                text-transform: capitalize;
            }

            .character-stats {
                display: flex;
                width: 100%;

                span {
                    display: flex;
                    align-items: center;
                    padding-right: 14px;

                    &:last-of-type {
                        padding-right: 0;
                    }

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
                const heroes = this.heroes.filter(hero => hero.GameCharacter.id !== this.character.id)
                return heroes.length
            }
        }
    }
</script>