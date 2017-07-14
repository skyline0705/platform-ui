<script>
/**
 * @file button
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Nov 13, 2016
 */

export default {
    name: 'pl-button',
    props: {
        type: {
            type: String,
            default: 'default'
        },
        size: {
            type: String,
            default: 'medium'
        },
        nativeType: {
            type: String,
            default: 'button'
        }
    },
    methods: {
        click(event) {
            this.$emit('click', event);
        }
    }
};
</script>

<template>

<button
    :type="nativeType"
    @click="click($event)"
    :class="['btn', 'btn-' + type, 'btn-' + size]"
>
    <slot></slot>
</button>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'

btn-font-weight = normal

// button大小控制
btn-large-padding-horizontal = 25px
btn-large-padding-vertical = 12px

btn-medium-padding-horizontal = 15px
btn-medium-padding-vertical = 8px

btn-small-padding-horizontal = 10px
btn-small-padding-vertical = 4px

btn-default-color = #989fa8
btn-default-bg = brand-default
btn-default-border = #c1c8d1

btn-disabled-color = font-color-disabled
btn-disabled-bg = brand-disabled
btn-disabled-border = darken(btn-disabled-bg, 10%)

btn-primary-color = #fff
btn-primary-bg = brand-primary
btn-primary-border = darken(btn-primary-bg, 5%)

btn-secondary-color = #fff
btn-secondary-bg = brand-secondary
btn-secondary-border = darken(btn-secondary-bg, 5%)

btn-success-color = #fff
btn-success-bg = brand-success
btn-success-border = darken(btn-success-bg, 5%)

btn-info-color = #fff
btn-info-bg = brand-info
btn-info-border = darken(btn-info-bg, 5%)

btn-warning-color = #fff
btn-warning-bg = brand-warning
btn-warning-border = darken(btn-warning-bg, 5%)

btn-danger-color = #fff
btn-danger-bg = brand-danger
btn-danger-border = darken(btn-danger-bg, 5%)

// button mixin
// Button颜色
button-variant(color, background, border)
    color color
    background-color background
    border-color border

// Button大小
button-size(padding-vertical, padding-horizontal, font-size)
    padding padding-vertical padding-horizontal
    font-size font-size
    line-height 1


.btn
    display inline-block
    margin-bottom 0
    font-weight btn-font-weight
    text-align center
    vertical-align middle
    cursor pointer
    background-image none
    border 1px solid transparent
    white-space nowrap
    box-sizing content-box

    button-size(btn-medium-padding-vertical, btn-medium-padding-horizontal, font-size-small)
    border-radius 4px

    &:hover
        text-decoration none


    &:hover,
    &:focus
        transition background-position .1s linear
        outline none


    // Active state
    &.active,
    &:active
        box-shadow inset 0 2px 4px rgba(0, 0, 0, .15), 0 1px 2px rgba(0, 0, 0, .05)



.btn-primary
    button-variant(btn-primary-color, btn-primary-bg, btn-primary-border)
    &:hover,
    &:focus
        background lighten(btn-primary-bg, 10%)
        border-color lighten(btn-primary-border, 10%)

.btn-secondary
    button-variant(btn-secondary-color, btn-secondary-bg, btn-secondary-border)
    &:hover,
    &:focus
        background lighten(btn-secondary-bg, 10%)
        border-color lighten(btn-secondary-border, 10%)

.btn-default
    button-variant(btn-default-color, btn-default-bg, btn-default-border)
    &:hover,
    &:focus
        background lighten(btn-default-bg, 10%)
        border-color lighten(btn-default-border, 10%)

.btn-success
    button-variant(btn-success-color, btn-success-bg, btn-success-border)
    &:hover,
    &:focus
        background lighten(btn-success-bg, 10%)
        border-color lighten(btn-success-border, 10%)

.btn-info
    button-variant(btn-info-color, btn-info-bg, btn-info-border)
    &:hover,
    &:focus
        background lighten(btn-info-bg, 10%)
        border-color lighten(btn-info-border, 10%)

.btn-warning
    button-variant(btn-warning-color, btn-warning-bg, btn-warning-border)
    &:hover,
    &:focus
        background lighten(btn-warning-bg, 10%)
        border-color lighten(btn-warning-border, 10%)

.btn-danger
    button-variant(btn-danger-color, btn-danger-bg, btn-danger-border)
    &:hover,
    &:focus
        background lighten(btn-danger-bg, 10%)
        border-color lighten(btn-danger-border, 10%)

// Disabled state
.btn[disabled]
    cursor not-allowed
    box-shadow none
    button-variant(btn-disabled-color, btn-disabled-bg, btn-disabled-border)

    &:hover,
    &:focus
        button-variant(btn-disabled-color, btn-disabled-bg, btn-disabled-border)

    &:active
        box-shadow none

.btn-large
    button-size(btn-large-padding-vertical, btn-large-padding-horizontal, font-size-large)

.btn-small
    button-size(btn-small-padding-vertical, btn-small-padding-horizontal, font-size-small)


.btn-block
    display block
    width 100%
.btn + .btn
    margin-left 10px

.btn-block + .btn-block
    margin-top 5px








// button大小控制
old-btn-large-padding-horizontal = 25px
old-btn-large-padding-vertical = 8px

old-btn-medium-padding-horizontal = 20px
old-btn-medium-padding-vertical = 7px

old-btn-small-padding-horizontal = 17px
old-btn-small-padding-vertical = 6px

old-btn-default-color = #fff
old-btn-default-bg = old-brand-default
old-btn-default-border = darken(old-btn-default-bg, 5%)

old-btn-disabled-color = #fff
old-btn-disabled-bg = old-brand-default
old-btn-disabled-border = old-btn-default-border

old-btn-primary-color = #fff
old-btn-primary-bg = old-brand-primary
old-btn-primary-border = darken(old-btn-primary-bg, 5%)

old-btn-secondary-color = #fff
old-btn-secondary-bg = old-brand-secondary
old-btn-secondary-border = darken(old-btn-secondary-bg, 5%)

old-btn-success-color = #fff
old-btn-success-bg = old-brand-success
old-btn-success-border = darken(old-btn-success-bg, 5%)

old-btn-info-color = #fff
old-btn-info-bg = old-brand-info
old-btn-info-border = darken(old-btn-info-bg, 5%)

old-btn-warning-color = #fff
old-btn-warning-bg = old-brand-warning
old-btn-warning-border = darken(old-btn-warning-bg, 5%)

old-btn-danger-color = #fff
old-btn-danger-bg = old-brand-danger
old-btn-danger-border = darken(old-btn-danger-bg, 5%)


.btn[is-old]
    display inline-block
    margin-bottom 0
    font-weight btn-font-weight
    text-align center
    vertical-align middle
    cursor pointer
    background-image none
    border 1px solid transparent
    white-space nowrap
    box-sizing content-box

    button-size(old-btn-medium-padding-vertical, old-btn-medium-padding-horizontal, font-size-small)
    border-radius 4px

    &:hover
        text-decoration none


    &:hover,
    &:focus
        transition background-position .1s linear
        outline none


    // Active state
    &.active,
    &:active
        box-shadow inset 0 2px 4px rgba(0, 0, 0, .15), 0 1px 2px rgba(0, 0, 0, .05)

.btn-primary[is-old]
    button-variant(old-btn-primary-color, old-btn-primary-bg, old-btn-primary-border)
    &:hover,
    &:focus
        background lighten(old-btn-primary-bg, 10%)
        border-color lighten(old-btn-primary-border, 10%)

.btn-secondary[is-old]
    button-variant(old-btn-secondary-color, old-btn-secondary-bg, old-btn-secondary-border)
    &:hover,
    &:focus
        background lighten(old-btn-secondary-bg, 10%)
        border-color lighten(old-btn-secondary-border, 10%)

.btn-default[is-old]
    button-variant(old-btn-default-color, old-btn-default-bg, old-btn-default-border)
    &:hover,
    &:focus
        background lighten(old-btn-default-bg, 10%)
        border-color lighten(old-btn-default-border, 10%)

.btn-success[is-old]
    button-variant(old-btn-success-color, old-btn-success-bg, old-btn-success-border)
    &:hover,
    &:focus
        background lighten(old-btn-success-bg, 10%)
        border-color lighten(old-btn-success-border, 10%)

.btn-info[is-old]
    button-variant(old-btn-info-color, old-btn-info-bg, old-btn-info-border)
    &:hover,
    &:focus
        background lighten(old-btn-info-bg, 10%)
        border-color lighten(old-btn-info-border, 10%)

.btn-warning[is-old]
    button-variant(old-btn-warning-color, old-btn-warning-bg, old-btn-warning-border)
    &:hover,
    &:focus
        background lighten(old-btn-warning-bg, 10%)
        border-color lighten(old-btn-warning-border, 10%)

.btn-danger[is-old]
    button-variant(old-btn-danger-color, old-btn-danger-bg, old-btn-danger-border)
    &:hover,
    &:focus
        background lighten(old-btn-danger-bg, 10%)
        border-color lighten(old-btn-danger-border, 10%)

// Disabled state
.btn[disabled][is-old]
    cursor not-allowed
    box-shadow none
    button-variant(old-btn-disabled-color, old-btn-disabled-bg, old-btn-disabled-border)

    &:hover,
    &:focus
        button-variant(old-btn-disabled-color, old-btn-disabled-bg, old-btn-disabled-border)

    &:active
        box-shadow none
.btn-large[is-old]
    button-size(old-btn-large-padding-vertical, old-btn-large-padding-horizontal, font-size-large)

.btn-small[is-old]
    button-size(old-btn-small-padding-vertical, old-btn-small-padding-horizontal, font-size-small)
</style>
