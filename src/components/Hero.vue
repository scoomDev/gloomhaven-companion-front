<template>
    <div v-if="currentHero['GameCharacter']" class="hero-companion">
        <div class="hero-header">
            <div class="hero-card">
                <picture>
                    <img :src="avatarUrl" :alt="currentHero['GameCharacter'].name + 'Portrait'">
                </picture>
                <div class="hero-level">
                    <ul class="next-level" v-show="editingLevel">
                        <li v-for="(level, index) in changeLevel" :key="index" @click="updateLevel">{{ level }}</li>
                    </ul>
                    <span @click="calculateLevel ? editingLevel = !editingLevel : false ">{{ currentHero.level }}</span>
                    <span class="add-level" v-show="calculateLevel">+</span>
                </div>
            </div>
            <div class="hero-stats">
                <h2>{{ currentHero.name }}</h2>
                <div class="hero-stats-content">
                    <div>
                        <span class="hero-max-card">{{currentHero["GameCharacter"].maxCard }} \\_\</span>
                        <span class="hero-life">{{ life }} pv</span>
                    </div>
                    <div>
                        <div class="hero-xp">
                            <span v-show="!editingXp" @click="editingXp = true" data-field="xp">{{ xp }} xp</span>
                            <input
                                    type="text"
                                    v-model="editXp"
                                    v-show="editingXp"
                                    v-focus="editingXp"
                                    @blur="updateXp"
                                    @keyup.enter="updateXp"
                                    @keyup.esc="cancelEdit"
                            >
                        </div>
                        <div class="hero-gold">
                            <span v-show="!editingGold" @click="editingGold = true">{{ gold }} or</span>
                            <input
                                    type="text" v-model="editGold"
                                    v-show="editingGold"
                                    v-focus="editingGold"
                                    @blur="updateGold"
                                    @keyup.enter="updateGold"
                                    @keyup.esc="cancelEdit"
                            >
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <hr>
        <div>
            <div class="hero-objects">
                <input
                        type="text"
                        v-show="editingObject"
                        v-focus="editingObject"
                        v-model="object"
                        @blur="addObject"
                        @keyup.enter="addObject"
                        @keyup.esc="cancelEdit"
                >
                <h3 v-show="!editingObject" class="add-object-btn">Équipements</h3>
                <span @click="editingObject = true" data-field="object" class="add-object">+</span>
            </div>
            <div class="hero-objects-list">
                <span v-for="(object, index) in objects" :key="index" class="object-item">
                    {{ object }} <span @click="removeObject" :data-value="object" class="remove-object">X</span>
                </span>
            </div>
        </div>
        <hr>
        <div class="hero-note">
            <h3 @click="editingNote = true">Note</h3>
            <p v-show="!editingNote" @click="editingNote = true">{{ note }}</p>
            <textarea
                    name="note"
                    v-model="editNote"
                    v-show="editingNote"
                    v-focus="editingNote"
                    @blur="updateNote"
                    @keyup.esc="cancelEdit"
            ></textarea>
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
                    border-radius: 50%;
                    overflow: hidden;

                    img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                    }
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
            }

            .hero-stats {
                width: 100%;
                h2 {
                    margin-top: 0;
                    padding-left: 0.6rem;
                    font-size: 1.2rem;
                }

                .hero-stats-content {
                    display: flex;
                    flex-direction: column;
                    width: 100%;

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
                            width: 50%;
                            height: 30px;
                            padding: 0.4rem 0.6rem;
                            input {
                                position: absolute;
                                top: 0;
                                left: 0;
                                display: block;
                                width: 100%;
                            }
                        }
                    }
                }
            }
        }

        .hero-objects {
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 100%;

            h3 {
                height: 30px;
                margin: 0;
                padding: 0;
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
                outline: 1px solid gray;

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
                    background-color: gray;
                }
            }
        }

        .hero-note {
            p {
                width: 100%;
                white-space: pre-line;
            }

            textarea {
                width: 100%;
                height: 150px;
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
                    return level > this.currentHero.level && level <= this.arrLevel.level[xp.length]
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
                console.log(field)
                const fieldState = "editing" + field[0].toUpperCase() + field.slice(1);
                console.log(fieldState)
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
                    const objects = [...this.objects, value]
                    this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: {objects: objects}})
                }
                console.log('empty value')
                evt.target.value = ""
                this.editingObject = false
            }
        }
    }
</script>