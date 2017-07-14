<script>
/**
 * @file 日历显示input框
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 11 Apr 2017
 */

import plInput from '../input';
export default {
    props: {
        isOld: {
            type: Boolean,
            default: false
        },
        width: {
            type: String
        },
        height: {
            type: String
        },
        name: {},
        value: {
            required: true,
            type: String
        },
        isOpen: {
            required: true,
            type: Boolean
        }
    },
    methods: {
        showLayer() {
            this.$emit('show-layer', true);
        }
    },
    components: {
        plInput
    }
};
</script>

<template>

<span :open="isOpen" :is-old="isOld">
    <i @click="showLayer()"></i>
    <pl-input
        :is-old="isOld"
        type="text"
        class="pl-date-picker-input"
        readonly
        :value="value"
        :name="name"
        @click.native="showLayer()"
        :style="{
            width: width,
            height: height
        }"
    />
</span>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'
span
    display inline-block
    position relative
i
    position absolute
    right 5px
    top 50%
    margin-top -9px
    width 18px
    height 18px
    background url('./calendar.png') no-repeat
    cursor pointer

.pl-date-picker-input
    cursor pointer
.pl-date-picker:hover
    // TODO 后续看看是否可以增加带图标的input框
    i + &-input
        border-color darken(input-border-color, 10%)
[open]
    .pl-date-picker-input
        &,
        &:focus
            border-color brand-primary
    i
        background-position 0 -19px

[is-old]
    i
        background-image url('./calendar-old.png')
    &[open]
        .pl-date-picker-input
            border-color old-brand-primary
        i
            background-position 0 -18px
</style>
