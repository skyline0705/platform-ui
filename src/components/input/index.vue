<script>
/**
 * @file input控件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Nov 10, 2016
 */
export default {
    name: 'pl-input',
    props: {
        value: {
            required: true
        }
    },
    computed: {
        computedValue: {
            get() {
                return this.value;
            },
            set(val) {
                this.$emit('input', val);
            }
        }
    }
};
</script>

<template>

<input
    type="text"
    v-model="computedValue"
>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl';

input
    outline none
    padding 4px 5px 5px
    font-size 12px
    min-height 14px
    border-radius 3px
    line-height 1
    color font-color-primary
    background input-bg-color
    border 1px solid input-border-color
    box-sizing border-box
    transition border-color ease-in-out .15s
    &:hover
        border-color darken(input-border-color, 10%)
    &:focus
        border-color brand-primary
    &[readonly]
        &:focus
            border-color input-border-color
    &[disabled]
        cursor not-allowed
        background input-disabled-bg-color


input[is-old]
    background #fafbfc
    color font-color-primary
    &:focus
        border-color old-brand-primary
</style>
