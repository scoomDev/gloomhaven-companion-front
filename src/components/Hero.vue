<template>
    <div>
        <div v-if="currentHero['GameCharacter']">
            <div>
                <ul v-show="editingLevel">
                    <li v-for="(level, index) in changeLevel" :key="index" @click="updateLevel">{{ level }}</li>
                </ul>
                <span>{{ currentHero["GameCharacter"].name}}</span>
                <h1>{{ currentHero.name }}</h1>
                <div>lvl {{ currentHero.level }}<span v-show="calculateLevel" @click="editingLevel = !editingLevel">+</span> | cards: {{
                    currentHero["GameCharacter"].maxCard }}
                </div>
                <span>life : {{ life }}</span>
                <div>
                    XP : <span v-show="!editingXp" @click="editingXp = true" data-field="xp">{{ xp }}</span>
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
            </div>
            <hr>
            <div>
                <h3>Objets</h3>
                <ul>
                    <li v-for="(object, index) in objects" :key="index">
                        {{ object }} <span @click="removeObject" :data-value="object">X</span>
                    </li>
                </ul>
                <span @click="editingObject = true" data-field="object">+</span>
                <input
                        type="text"
                        v-show="editingObject"
                        v-focus="editingObject"
                        v-model="object"
                        @blur="addObject"
                        @keyup.enter="addObject"
                        @keyup.esc="cancelEdit"
                >
            </div>
            <hr>
            <div>
                <h3>Or</h3>
                <span v-show="!editingGold" @click="editingGold = true">{{ gold }}</span>
                <input
                        type="text" v-model="editGold"
                        v-show="editingGold"
                        v-focus="editingGold"
                        @blur="updateGold"
                        @keyup.enter="updateGold"
                        @keyup.esc="cancelEdit"
                >
            </div>
            <hr>
            <div>
                <h3 @click="editingNote = true">Note</h3>
                <div v-show="!editingNote" @click="editingNote = true">{{ note }}</div>
                <textarea
                        name="note"
                        v-model="editNote"
                        v-show="editingNote"
                        v-focus="editingNote"
                        @blur="updateNote"
                        @keyup.enter="updateNote"
                        @keyup.esc="cancelEdit"
                ></textarea>
            </div>
        </div>
    </div>
</template>

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
                arrLevel: {
                    level: [1,2,3,4,5,6,7,8,9],
                    xp: [0,45,80,120,210,300,450,500,600]
                }
            }
        },
        computed: {
            ...mapGetters(['currentHero', 'objects', 'gold', 'life', 'xp', 'note']),
            changeLevel() {
                const xp = this.arrLevel.xp.filter(xp => xp <= this.xp)
                return this.arrLevel.level.filter( (level) => {
                    return level > this.currentHero.level && level < this.arrLevel.level[xp.length]
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
                const value = evt.target.value
                if (value && value != this.xp) {
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
                this.editingObject = false
                evt.target.value = ""
            }
        }
    }
</script>