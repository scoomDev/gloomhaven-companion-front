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
            @include characterIcon(30px, 30px, null, 1, null, -4px, -6px);
        }

        picture {
            width: 80px;
            height: 80px;
            border-radius: 50%;
            overflow: hidden;
            z-index: 2;

            @include objectFit(cover);
        }

        .heroes-level {
            position: absolute;
            left: 50px;
            bottom: -6px;
            display: flex;
            align-items: center;
            justify-content: center;
            width: 30px;
            height: 30px;
            color: black;
            font-size: 1rem;
            line-height: 1.2rem;
            border-radius: 50%;
            background-color: white;
            z-index: 3;
        }

        .heroes-item-content {
            width: 280px;
            height: 60px;
            margin-left: -40px;
            padding-left: 50px;
            padding-right: 1rem;
            border-radius: 0 4px 4px 0;
            background-color: $col_mid_grey;
            z-index: 1;

            h2 {
                width: 100%;
                margin: 0.5rem 0 0.2rem 0;
                font-size: 1.5rem;
                line-height: 1.5rem;
                font-weight: bold;
                font-family: $font_pirata;
                text-transform: capitalize;
            }

            .heroes-stats {
                display: flex;
                justify-content: space-between;

                span {
                    display: flex;
                    align-items: center;
                    color: $col_white;
                    font-size: 0.8rem;

                    img {
                        max-width: 16px;
                        max-height: 18px;
                        margin-right: 5px;
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