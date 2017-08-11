<script>
/**
 * @file tab选项框
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 13 Apr 2017
 */

export default {
    name: 'pl-tab-panel',
    props: {
        active: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isActive() {
            /* eslint-disable no-underscore-dangle */
            return this.$parent.nowActive === this._uid;
        },
        index() {
            /* eslint-disable no-underscore-dangle */
            const parent = this.$parent;
            return parent.$children.findIndex(item => item._uid === this._uid);
        }
    },
    methods: {
        updateActive() {
            if (this.isDisabled) {
                return;
            }
            this.$parent.updateActive(this._uid);
        }
    },
    mounted() {
        this.$parent.appendTab(this);
        if (this.active) {
            this.updateActive();
        }
    },
    beforeDestroy() {
        this.$parent.removeTab(this);
    }
};
</script>

<template>

<div>
    <div v-show="isActive">
        <slot></slot>
    </div>
    <li
        ref="tab"
        :class="{
            active: isActive,
            disabled: disabled
        }"
        @click="updateActive"
    >
        <slot name="tab"></slot>
    </li>
</div>

</template>
<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/mixin.styl'
li
    list-style none
    float left
    padding 0 20px
    min-width 60px
    line-height 50px
    cursor pointer
    text-align center
    color font-color-primary
    transition all .3s ease-in-out
    &:hover
        color brand-primary
    &.active
        cursor default
        color brand-primary
    &.disabled
        color font-color-secondary
        cursor not-allowed
</style>
