<script>

/**
 * @file loading组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Jul 7, 2016
 */

export default {
    props: {
        show: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        // TODO这块抽成指令最合适…
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

<div class="loading" v-show="show">
    <div class="loading-content">
        <slot>加载中，请稍候...</slot>
    </div>
</div>

</template>

<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/variables.styl'

@keyframes loading-before
    0%,
    100%
        transform scale(1)
    50%
        transform scale(.5)
@keyframes loading-after
    0%,
    100%
        transform scale(.3)
    50%
        transform scale(1)

.loading
    mask()
    &-content
        position absolute
        top 50%
        left 50%
        box-sizing border-box
        margin -20px 0 0 -110px
        padding 10px 10px 10px 60px
        border 1px solid #a8ada6
        width 220px
        border-radius 5px
        background #fff
        color #666
        font-size 14px
        &:before,
        &:after
            content ''
            position absolute
            top 13px
            border-radius 100%
            width 13px
            height 13px
            background brand-primary
        &:before
            left 12px
            animation loading-before .89s infinite ease-in-out both
        &:after
            left 28px
            animation loading-after .89s infinite ease-in-out both
</style>
