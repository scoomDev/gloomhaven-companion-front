<template>
    <div class="heroes-item">
        <span class="heroes-icon">
            <img :src="require(`../assets/icons/characters/${hero.GameCharacter.name}.png`) || ''" alt="">
        </span>
        <picture>
            <img :src="require('../assets/images/' + hero.GameCharacter.name + '-portrait.jpg') || ''" alt="">
        </picture>
        <span class="heroes-level">{{ hero.level }}</span>
        <div class="heroes-item-content">
            <h2>{{ hero.name }}</h2>
            <div class="heroes-stats">
                <span>
                    <img src="../assets/icons/loot_bd.png" alt="">
                    {{ hero.gold}}
                </span>
                <span>
                    <img src="../assets/icons/item_bd.png" alt="">
                    {{ hero.objects ? hero.objects.length : 0}}
                </span>
                <span>
                    <img src="../assets/icons/heal_bd.png" alt="">
                    {{ JSON.parse(hero.GameCharacter.life)[hero.level] }}
                </span>
                <span>
                    <img src="../assets/icons/xp_bd.png" alt="">
                    {{ hero.experience || 0 }}
                </span>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
    .heroes-item {
        position: relative;
        display: flex;
        align-items: center;

        .heroes-icon {
            @include characterIcon(35px, 35px, null, 1, null, -6px, -10px);
        }

        picture {
            position: absolute;
            width: 80px;
            height: 80px;
            border-radius: 50%;
            border: 4px solid $col_white;
            overflow: hidden;
            z-index: 2;

            @include objectFit(cover);
        }

        .heroes-level {
            @include characterIcon(35px, 35px, 1, 1, -14px, 44px);
        }

        .heroes-item-content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            width: 280px;
            height: 70px;
            margin-left: 20px;
            padding-left: 70px;
            padding-right: 1rem;
            border-radius: 0 4px 4px 0;
            background-color: $col_character_bg;
            z-index: 1;

            h2 {
                width: 100%;
                margin: 0.5rem 0 0.2rem 0;
                font-size: 1.4rem;
                line-height: 1.2rem;
                font-weight: bold;
                font-family: $font_pirata;
                text-transform: capitalize;
            }

            .heroes-stats {
                display: flex;
                margin-top: 0.2rem;

                span + span {
                    margin-left: 1rem;
                }

                & > span {
                    display: flex;
                    align-items: center;
                    color: $col_brown_dark;
                    font-size: 0.8rem;
                    font-weight: bold;

                    img {
                        max-width: 16px;
                        max-height: 18px;
                        margin-right: 0.4rem;
                    }
                }
            }
        }
    }
</style>

<script>
    export default {
        props: ['hero']
    }
</script>