<template>
    <div class="character-item" @click="editCharacter" :class="isInTeam().length === 1 ? 'active' : ''">
        <picture>
            <img
                    :src="require(`../assets/images/${character.name}-portrait.jpg`) || ''"
                    alt=""
            >
        </picture>
        <div class="character-info">
            <span class="character-name">{{ character.name }}</span>
            <span class="character-max-card">{{ character.maxCard }} cards</span> |
            <span>maxLife {{ getMaxLife }}</span>
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
            background-color: #6e6e6e;

            .character-name {
                width: 100%;
                font-size: 2rem;
                line-height: 2rem;
                font-weight: bold;
                font-family: 'Pirata One', cursive;
                text-transform: capitalize;
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
                return  this.heroes.filter(hero => hero.GameCharacter.id != this.character.id)
            }
        }
    }
</script>