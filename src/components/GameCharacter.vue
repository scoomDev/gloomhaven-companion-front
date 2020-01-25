<template>
    <div class="character-item" @click="editCharacter" :class="isInTeam() === this.heroes.length ? '' : 'active'">
        <picture>
            <img
                    :src="require(`../assets/images/${character.name}-portrait.jpg`) || ''"
                    alt=""
            >
        </picture>
        <div class="character-info">
            <span class="character-name">{{ character.name }}</span>
            <span class="character-max-card">{{ character.maxCard }} cards</span> |
            <span>
                <img src="../assets/icons/heal.png" alt="">
                {{ getMaxLife }}
            </span>
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

        picture {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            z-index: 1;

            img {
                width: 100%;
                height: 100%;
                object-fit: cover;
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
                font-size: 1.8rem;
                line-height: 1.8rem;
                font-weight: bold;
                font-family: $font_pirata;
                text-transform: capitalize;
            }

            span {
                display: flex;
                align-items: center;
                img {
                    max-width: 16px;
                    max-height: 18px;
                    margin-right: 5px;
                    object-fit: contain;
                }
            }

            .character-max-card {
                display: block;
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