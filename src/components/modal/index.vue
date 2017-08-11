<script>
let count = 0;
let bodyOverflow = null;
export default {
    name: 'pl-modal',
    props: {
        width: {
            type: String,
            default: '600px'
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        hide() {
            if (!this.isShow) {
                return;
            }
            this.isShow = false;
            count--;
            if (!count) {
                document.body.style.overflow = bodyOverflow;
                bodyOverflow = null;
            }
        },
        show() {
            if (this.isShow) {
                return;
            }
            this.isShow = true;
            // 每次显示都扔在最后面，保证z-index一定在最上面;
            document.body.appendChild(this.$el);
            count++;
            bodyOverflow = bodyOverflow === null
                ? document.body.style.overflow
                : bodyOverflow;
            document.body.style.overflow = 'hidden';
        },
        trigger(eventName) {
            this.$emit(eventName);
        }
    },
    mounted() {
        this.nextSibling = this.$el.nextSibling;
        this.parentElement = this.$el.parentElement;
        // 局部写modal，但是怕受到translate/rotate的影响
        document.body.appendChild(this.$el);
    },
    beforeDestroy() {
        if (this.nextSibling) {
            this.parentElement.insertBefore(this.$el, this.nextSibling);
        } else {
            this.parentElement.appendChild(this.$el);
        }
        this.nextSibling = null;
        this.parentElement = null;
    }
};
</script>

<template>
<transition
    name="modal"
    @before-enter="trigger('before-show')"
    @after-enter="trigger('after-show')"
    @before-leave="trigger('before-hide')"
    @after-leave="trigger('after-hide')"
>
    <div class="modal" v-show="isShow">
        <div
            class="modal-dialog"
            :style="{
                width: width
            }"
        >
            <header>
                <!-- TODO 等到老模块下线了，内容就可以清空了 -->
                <a href="javascript:void(0);" class="close" @click="hide">×</a>
                <h4 class="modal-title">
                    <slot name="title">
                        标题
                    </slot>
                </h4>
            </header>
            <div class="modal-body">
                <slot></slot>
            </div>
        </div>
    </div>
</transition>
</template>

<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/variables.styl'

modal-backdrop-bg-hide = rgba(0, 0, 0, 0)
modal-backdrop-bg-show = rgba(0, 0, 0, .5)
modal-content-bg = #fff
modal-header-color = modal-content-bg;
modal-content-border-color = rgba(0, 0, 0, .2)
modal-content-fallback-border-color = #999

.modal
    mask()
    overflow auto
    outline 0

.modal-dialog
    position relative
    margin 100px auto
    background-color modal-content-bg
    border 1px solid modal-content-border-color
    box-shadow 0 3px 9px rgba(0, 0, 0, .5)
    outline 0
    opacity 1
    border-radius 5px

header
    padding 0 20px
    color modal-header-color
    clearfix()
.close
    margin-top 15px
    margin-right -8px
    padding 5px
    width 7px
    height 7px
    background modal-content-bg url('./close.png') no-repeat 5px
    text-align center
    float right
    cursor pointer
    border-radius 2px
    text-decoration none
    border 1px solid #ddd
    border-radius 50%
    text-indent -99999px

.modal-title
    margin 12px 0
    font-weight normal
    font-size font-size-large
    line-height line-height-base
    color lighten(font-color-primary, 25%)

.modal-body
    position relative
    padding 20px

.modal-enter-active,
.modal-leave-active
    transition all .3s ease-out
    .modal-dialog
        transition all .3s ease-out

.modal-enter,
.modal-leave-active
    background modal-backdrop-bg-hide
    .modal-dialog
        transform translateY(-25%)
        opacity 0
</style>
