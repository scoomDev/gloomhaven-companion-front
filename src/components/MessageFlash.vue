<template>
    <div class="messages-flash">
        <transition-group name="slide-fade" tag="p">
            <p
                    v-read
                    v-for="(message) in getMessages"
                    :key="message.uuid"
                    :id="message.uuid"
                    class="message-item"
                    :class="'alert alert-' + message.state"
            >
                {{ message.content }}
            </p>
        </transition-group>
    </div>
</template>

<style lang="scss">
    .messages-flash {
        position: absolute;
        top: 0;
        right: 0;
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 260px;
        z-index: 10;
        pointer-events: none;

        .alert {
            font-weight: 600;
            margin: 0.5rem 0;
            padding: 0.4rem 0.6rem;
            border-radius: 4px 0 0 4px;
            box-shadow: 0 0 10px rgba(0,0,0,0.2);
            transition: all 0.3s ease-in-out;

            &.alert-error {
                color: #5b0000;
                background-color: #ff776f;
            }

            &.alert-warning {
                color: #5b2600;
                background-color: #ffab65;
            }

            &.alert-success {
                color: #1d5b40;
                background-color: #A4CBAD;
            }
        }

        .slide-fade-enter-active {
            transition: all .3s ease;
        }
        .slide-fade-leave-active {
            transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
        }
        .slide-fade-enter, .slide-fade-leave-to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
</style>

<script>
    import { mapGetters } from 'vuex'

    export default {
        computed: {
            ...mapGetters(['getMessages'])
        },
        directives: {
            read(el,binding, vnode) {
                const messageId = el.getAttribute('id')

                setTimeout(() => {
                    el.style.transform = 'translateX(100%)'

                    el.addEventListener('transitionend', () => {
                        vnode.context.$store.commit('remove_message', messageId)
                    })
                }, 2500)
            }
        }
    }
</script>