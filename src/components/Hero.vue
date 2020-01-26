<template>
    <div v-if="currentHero['GameCharacter']" class="hero-companion">
        <div class="hero-header">
            <div class="hero-card">
                <picture>
                    <img :src="avatarUrl" :alt="currentHero['GameCharacter'].name + 'Portrait'">
                </picture>
                <div class="hero-level">
                    <transition name="fade-to-top">
                        <ul class="next-level" v-show="editingLevel">
                            <li v-for="(level, index) in changeLevel" :key="index" @click="updateLevel">{{ level }}</li>
                        </ul>
                    </transition>
                    <span @click="calculateLevel ? editingLevel = !editingLevel : false ">{{ currentHero.level }}</span>
                    <span class="add-level" v-show="calculateLevel">+</span>
                </div>
                <div class="hero-icon">
                    <img :src="require(`../assets/icons/characters/${currentHero.GameCharacter.name}.png`)" alt="">
                </div>
            </div>
            <div class="hero-stats">
                <h2>{{ currentHero.name }}</h2>
                <div class="hero-stats-content">
                    <div>
                        <span class="hero-max-card stat-container">{{currentHero["GameCharacter"].maxCard }} \\_\</span>
                        <span class="hero-life stat-container">
                            <img class="stats-icon" src="../assets/icons/heal_bd.png" alt="">
                            {{ life }}
                        </span>
                    </div>
                    <div>
                        <div class="hero-xp">
                            <transition name="fade">
                                <span v-show="!editingXp" @click="editingXp = true" data-field="xp" class="stat-container">
                                    <img class="stats-icon" src="../assets/icons/xp_bd.png" alt="">
                                    {{ xp }}
                                </span>
                            </transition>
                            <transition name="fade">
                                <input
                                        type="number"
                                        v-model="editXp"
                                        v-show="editingXp"
                                        v-focus="editingXp"
                                        @blur="updateXp"
                                        @keyup.enter="updateXp"
                                        @keyup.esc="cancelEdit"
                                >
                            </transition>
                        </div>
                        <div class="hero-gold">
                            <transition name="fade">
                                <span v-show="!editingGold" @click="editingGold = true" class="stat-container">
                                    <img class="stats-icon" src="../assets/icons/loot_bd.png" alt="">
                                    {{ gold }}
                                </span>
                            </transition>
                            <transition name="fade">
                                <input
                                        type="number" v-model="editGold"
                                        v-show="editingGold"
                                        v-focus="editingGold"
                                        @blur="updateGold"
                                        @keyup.enter="updateGold"
                                        @keyup.esc="cancelEdit"
                                >
                            </transition>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div class="hero-perks">
            <transition name="fade-to-top">
                <form @submit.prevent="checkForm" class="perks-list" v-if="editingPerks">
                    <input type="hidden" :value="currentHero.id" name="hero">
                    <input type="hidden" :value="currentHero.GameCharacter.id" name="character">

                    <ul>
                        <li v-for="(perks, index) in currentHero.GameCharacter.perks" :key="index">
                            <div v-html="addPerksCheckbox(perks.quantity, perks.id)"></div>
                            {{ perks.content }}
                        </li>
                    </ul>

                    <div class="btn-group">
                        <button @click="editingPerks = false">annuler</button>
                        <button type="submit">Valider</button>
                    </div>
                </form>
            </transition>
            <button class="perks-btn" @click="editingPerks = true">
                Bénéfices <img src="../assets/icons/check_bd.png" alt="" class="icon-perks">
            </button>
        </div>
        <hr>
        <div>
            <div class="hero-objects">
                <transition name="fade">
                    <input
                            type="text"
                            v-show="editingObject"
                            v-focus="editingObject"
                            v-model="object"
                            @blur="addObject"
                            @keyup.enter="addObject"
                            @keyup.esc="cancelEdit"
                    >
                </transition>
                <transition name="fade">
                    <h3 v-show="!editingObject" class="add-object-btn">Équipements</h3>
                </transition>
                <span v-if="!editingObject" @click="editingObject = true" data-field="object" class="add-object">+</span>
            </div>
            <transition-group name="fade-to-top" tag="div" class="hero-objects-list">
                <span v-for="(object) in objects" :key="object" class="object-item">
                        {{ object }} <span @click="removeObject" :data-value="object" class="remove-object">X</span>
                </span>
            </transition-group>
        </div>
        <hr>
        <div class="hero-note">
            <h3 @click="editingNote = true">Note</h3>
            <transition name="fade">
                <p v-show="!editingNote" @click="editingNote = true">{{ note }}</p>
            </transition>
            <transition name="fade">
                <textarea
                        name="note"
                        v-model="editNote"
                        v-show="editingNote"
                        v-focus="editingNote"
                        @blur="updateNote"
                        @keyup.esc="cancelEdit"
                ></textarea>
            </transition>
        </div>
    </div>
</template>

<style lang="scss">
    .hero-companion {
        display: block;
        width: 90%;
        margin: 0 auto;

        .hero-header {
            display: flex;
            align-items: center;
            margin: 1rem auto;

            .hero-card {
                position: relative;

                picture {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 120px;
                    height: 120px;
                    margin-right: 1rem;
                    border: 4px solid white;
                    border-radius: 50%;
                    overflow: hidden;
                    box-shadow: $shadow_material;

                    @include objectFit(cover)
                }

                .hero-level {
                    position: absolute;
                    top: 0;
                    right: 10px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 40px;
                    height: 40px;
                    color: black;
                    font-size: 1.2rem;
                    line-height: 1.4rem;
                    background-color: white;
                    border-radius: 50%;
                    z-index: 5;

                    .next-level {
                        position: absolute;
                        padding: 0.5rem;
                        top: 30px;
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        width: 40px;
                        border-radius: 20px 20px 20px 20px;
                        background-color: white;

                        li {
                            margin: 0.5rem 0;
                            list-style: none;
                        }
                    }

                    .add-level {
                        position: absolute;
                        top: -6px;
                        left: -6px;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                        width: 20px;
                        height: 20px;
                        color: white;
                        font-size: 0.8rem;
                        line-height: 1rem;
                        background-color: #80776f;
                        border-radius: 50%;
                    }
                }

                .hero-icon {
                    @include characterIcon(40px, 40px, null, 1);
                }
            }

            .hero-stats {
                width: 100%;
                h2 {
                    margin-top: 0;
                    padding-left: 0.6rem;
                    font-family: 'Pirata One', cursive;
                    font-size: 2rem;
                    line-height: 2rem;
                }

                .hero-stats-content {
                    display: flex;
                    flex-direction: column;
                    width: 100%;

                    .stat-container {
                        display: flex;
                        align-items: center;
                        height: 30px;
                        line-height: 30px;

                        .stats-icon {
                            margin-right: 6px;
                            max-width: 16px;
                            max-height: 18px;
                            vertical-align: middle;
                        }
                    }

                    & > div {
                        display: flex;
                        justify-content: flex-start;
                        width: 100%;
                        margin: 0.2rem 0;

                        .hero-max-card, .hero-life {
                            width: 50%;
                            height: 30px;
                            padding: 0.4rem 0.6rem;
                        }

                        .hero-xp, .hero-gold {
                            position: relative;
                            display: flex;
                            align-items: center;
                            width: 50%;
                            height: 30px;
                            padding: 0.4rem 0.6rem;
                            input {
                                @extend %input;
                                position: absolute;
                                left: 0;
                            }
                        }
                    }
                }
            }
        }

        .hero-perks {
            width: 100%;

            .perks-list {
                position: absolute;
                top: 3%;
                left: 3%;
                right: 3%;
                bottom: 3%;
                padding: 10px;
                background-color: $col_white;
                overflow-x: hidden;
                overflow-y: auto;
                z-index: 99;

                .btn-group {
                    display: flex;

                    button {
                        @extend %button;
                    }
                }

                ul {
                    margin: 0;
                    padding: 0;
                    li {
                        font-size: 14px;
                        padding: 10px 0;
                    }
                }
            }

            .perks-btn {
                @extend %button;

                .icon-perks {
                    max-width: 16px;
                    max-height: 18px;
                }
            }
        }

        .hero-objects {
            position: relative;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;
            height: 30px;

            h3 {
                height: 30px;
                margin: 0;
                padding: 0;
            }

            .add-object {
                position: absolute;
                bottom: -50%;
                right: 0;
                width: 40px;
                height: 40px;
                color: white;
                font-size: 26px;
                text-align: center;
                line-height: 40px;
                border-radius: 50%;
                background-color: $col_mid_grey;
                box-shadow: $shadow_material;
            }

            input {
                @extend %input;
                position: absolute;
            }
        }

        .hero-objects-list {
            display: flex;
            flex-wrap: wrap;
            margin-top: 0.8rem;

            .object-item {
                position: relative;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 0.5rem;
                margin-bottom: 0.5rem;
                padding: 0 34px 0 0.2rem;
                height: 20px;
                font-size: 0.9rem;
                outline: 1px solid #1f1f1f;

                .remove-object {
                    position: absolute;
                    top: 0;
                    right: 0;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 20px;
                    height: 20px;
                    padding: 0 0.2rem;
                    color: white;
                    font-size: 0.8rem;
                    line-height: 1rem;
                    background-color: #1f1f1f;
                }
            }
        }

        .hero-note {
            position: relative;
            width: 100%;
            p {
                width: 100%;
                white-space: pre-line;
            }

            textarea {
                position: absolute;
                top: 40px;
                width: 100%;
                height: 150px;
                margin-bottom: 30px;
            }
        }
    }
</style>

<script>
    import {mapGetters} from 'vuex'

    export default {
        data() {
            return {
                editingGold: false,
                editingObject: false,
                editingXp: false,
                editingNote: false,
                editingLevel: false,
                editingPerks: false,
                editGold: '',
                editXp: '',
                editNote: '',
                object: '',
                avatarUrl: '',
                arrLevel: {
                    level: [1,2,3,4,5,6,7,8,9],
                    xp: [0,45,95,150,210,275,345,420,500]
                }
            }
        },
        computed: {
            ...mapGetters(['currentHero', 'objects', 'gold', 'life', 'xp', 'note']),
            changeLevel() {
                const xp = this.arrLevel.xp.filter(xp => xp <= this.xp)
                return this.arrLevel.level.filter( (level) => {
                    return level > this.currentHero.level && level <= this.arrLevel.level[xp.length - 1]
                })
            },
            calculateLevel() {
                return this.changeLevel.length > 0
            }
        },
        created() {
            const id = this.$route.params.id || sessionStorage.getItem('current_hero_id')
            this.$store.dispatch('getHeroById', id).then(response => {
                this.editGold = this.gold
                this.editXp = this.currentHero.experience
                this.editNote = this.currentHero.note
                this.avatarUrl = require('../assets/images/' + this.currentHero['GameCharacter'].name + '-portrait.jpg')

                return response
            })
        },
        directives: {
            focus(el, {value}, {context}) {
                if (value) {
                    context.$nextTick(() => {
                        el.focus()
                    })
                }
            }
        },
        methods: {
            cancelEdit(e) {
                const field = e.target.getAttribute('data-field')
                const fieldState = "editing" + field[0].toUpperCase() + field.slice(1);
                e.target.value = this.currentHero[field]
                this[fieldState] = false
            },
            updateGold(evt) {
                const value = evt.target.value
                if (value && value != this.gold) {
                    const data = {gold: value}
                    this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
                }
                this.editingGold = false
            },
            updateXp(evt) {
                let value = evt.target.value
                if (value && value != this.xp) {
                    if (value > 500) value = "500"
                    const data = {experience: value}
                    this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
                }
                this.editingXp = false
                this.editingLevel = false
            },
            updateNote(evt) {
                const value = evt.target.value
                if (value != this.note) {
                    const data = {note: value}
                    this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
                }
                this.editingNote = false
            },
            updateLevel(evt) {
                const value = evt.target.innerText
                if (value != this.level) {
                    const data = {level: value}
                    this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
                }
                this.editingLevel = false
            },
            removeObject(evt) {
                const object = evt.target.getAttribute('data-value')
                let objects = this.$store.getters.objects
                objects = objects.filter(el => el !== object)
                const data = {objects: objects}
                this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
            },
            addObject(evt) {
                const value = evt.target.value
                if (value) {
                    let objects = [];
                    if (this.objects) objects = [...this.objects, value]
                    else objects.push(value)
                    this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: {objects: objects}})
                }
                this.object = ""
                this.editingObject = false
            },
            addPerksCheckbox(quantity, perkId) {
                let div = document.createElement('div')
                for (let i = 0; i < quantity; i++) {
                    let checkBox = document.createElement('input')
                    checkBox.setAttribute('type', 'checkbox')
                    checkBox.setAttribute('id', 'check-' + (i + 1) + '-' + perkId)
                    checkBox.setAttribute('v-model', 'checked')
                    div.appendChild(checkBox)
                }

                return div.innerHTML
            },
            checkForm(evt) {
                const form = evt.target
                const hiddenInput = form.querySelectorAll('input[type=hidden]')
                const checkbox = form.querySelectorAll('input[type=checkbox]')
                console.log(hiddenInput)
                console.log(checkbox)
            }
        }
    }
</script>