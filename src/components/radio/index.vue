<script>
/**
 * @file radio
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Apr 2017
 */

export default {
    name: 'pl-radio',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        isOld: {
            type: Boolean,
            default: false
        },
        value: {},
        name: {},
        // TODO回头考虑一下checked组件是否需要init校验
        checked: {
            required: true
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isChecked() {
            return this.checked === this.value;
        }
    },
    methods: {
        change(checked) {
            if (checked) {
                this.$emit('change', this.value);
                return;
            }
        }
    }
};
</script>

<template>

<label>
    <span
        class="radio-input"
        :class="{
            checked: isChecked,
            disabled: disabled
        }"
    ></span><span class="label"><slot></slot></span>
    <input
        ref="radio"
        class="hidden"
        :name="name"
        type="radio"
        :checked="isChecked"
        :value="value"
        :disabled="disabled"
        @change="change($event.target.checked)"
    >
</label>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/mixin.styl'
@import '../common/transitions.styl'

radioStyle(color)
    margin 0 5px
    width font-size-base + 2
    height font-size-base + 2
    border 1px solid darken(input-border-color, 20%)
    border-radius 50%
    transition background .3s ease-in-out, border .3s ease-in-out
    cursor pointer
    position relative
    &:after
        content ''
        position absolute
        top 50%
        left 50%
        margin -3px 0 0 -3px
        border-radius 50%
        width 6px
        height 6px
        background #fff
        transform rotate(45deg) scale(0)
        transition transform .3s ease-in-out
        transform-origin center
    &:hover,
    &.checked
        border-color color
    &.checked
        background color
    &.checked:after
        transform rotate(45deg) scale(1)
    &.disabled
        background font-color-disabled
        border-color font-color-disabled
        cursor not-allowed
        &:after
            background #fff

label
    display inline-block
    cursor default
    font-size font-size-base
    vertical-align top
    line-height 1
span
    display inline-block
    box-sizing border-box
    vertical-align top
    & + span
        margin-top 2px
.hidden
    hidden()
.radio-input
    radioStyle(brand-success)
</style>
