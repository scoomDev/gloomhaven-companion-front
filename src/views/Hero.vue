<template>
    <div>
        <team-header></team-header>
        <div v-if="currentHero['GameCharacter']">
            <div>
                <span>{{ currentHero["GameCharacter"].name}}</span>
                <h1>{{ currentHero.name }} | lvl {{ currentHero.level }} | cards: {{
                    currentHero["GameCharacter"].maxCard }}</h1>
                <span>{{ getLife() }}</span>
            </div>
            <hr>
            <div>
                <h3>Objets</h3>
                <ul>
                    <li v-for="(object, index) in getObjects" :key="index">{{ object }} <span @click="removeObject" :data-value="object">X</span></li>
                </ul>
                <span>+</span>
            </div>
            <hr>
            <div>
                <h3>Or</h3>
                <p @click="editingGold = true">{{ currentHero.gold }}</p>
                <input
                        type="text" v-model="currentHero.gold"
                        v-show="editingGold"
                        v-focus="editingGold"
                        data-field="gold"
                        @blur="updateHero"
                        @keyup.enter="updateHero"
                        @keyup.esc="cancelEdit"
                >
            </div>
        </div>
    </div>
</template>

<script>
    import TeamHeader from "../components/TeamHeader"
    import {mapGetters} from "vuex"

    export default {
        data() {
            return {
                editingGold: false,
                editingObjects: false,
                objects: []
            }
        },
        components: {
            TeamHeader
        },
        computed: {
            ...mapGetters(['currentHero']),
            getObjects() {
                return this.$store.getters.objects
            },
        },
        created() {
            if (!this.$store.getters.currentHero.id) {
                const id = this.$route.params.id || sessionStorage.getItem('current_hero_id')
                return this.$store.dispatch('getHeroById', id).then(response => response)
            }
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
            getLife() {
                const life = JSON.parse(this.currentHero["GameCharacter"].life)
                return life[this.currentHero.level]
            },
            cancelEdit(e) {
                const field = e.target.getAttribute('data-field')
                console.log(field)
                const fieldState = "editing" + field[0].toUpperCase() + field.slice(1);
                console.log(fieldState)
                e.target.value = this.currentHero[field]
                this[fieldState] = false
            },
            updateHero(evt) {
                const el = evt.target
                const field = el.getAttribute('data-field')
                const value = el.value
                let data = {}
                data[field] = value
                this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
                this.editingGold = false
            },
            removeObject(evt) {
                const object = evt.target.getAttribute('data-value')
                let objects = this.$store.getters.objects
                objects = objects.filter( el => el !== object)
                const data = {objects: objects}
                this.$store.dispatch('updateHero', {heroId: this.currentHero.id, data: data})
            }
        }
    }
</script>