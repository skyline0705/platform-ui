<script>
/**
 * @file checkbox
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Apr 2017
 */

export default {
    name: 'pl-checkbox',
    model: {
        prop: 'checked',
        event: 'change'
    },
    props: {
        value: {},
        name: {},
        // TODO回头考虑一下checked组件是否需要init校验
        checked: {
            required: true
        },
        indeterminate: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isChecked() {
            if (this.isMulti) {
                return this.checked.includes(this.value);
            }
            return this.checked;
        },
        isIndeterminate() {
            return this.indeterminate && !this.isChecked;
        },
        isMulti() {
            return Array.isArray(this.checked);
        }
    },
    watch: {
        isIndeterminate(val) {
            this.$refs.checkbox.indeterminate = val;
        }
    },
    methods: {
        change(checked) {
            if (checked) {
                let result = this.isMulti
                    ? [...this.checked, this.value]
                    : true;
                this.$emit('change', result);
                return;
            }
            if (this.isMulti) {
                let result = this.checked.filter(item => item !== this.value);
                this.$emit('change', result);
                return;
            }
            this.$emit('change', false);
        }
    }
};
</script>

<template>

<label>
    <span
        class="checkbox-input"
        :class="{
            checked: isChecked,
            indeterminate: isIndeterminate,
            disabled: disabled
        }"
    ></span><span class="label"><slot></slot></span>
    <input
        ref="checkbox"
        class="hidden"
        :name="name"
        type="checkbox"
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

checkboxStyle(color)
    margin 0 5px
    width font-size-base + 2
    height font-size-base + 2
    border 1px solid darken(input-border-color, 20%)
    border-radius 4px
    transition background .3s ease-in-out, border .3s ease-in-out
    cursor pointer
    position relative
    &:after
        content ''
        border 2px solid #fff
        border-left 0
        border-top 0
        height 8px
        left 4px
        position absolute
        top 1px
        transform rotate(45deg) scale(0)
        width 4px
        transition transform .3s ease-in-out
        transform-origin center
    &:hover,
    &.checked,
    &.indeterminate
        border-color color
    &.checked,
    &.indeterminate
        background color
    &.checked:after
        transform rotate(45deg) scale(1)
    &.indeterminate
        &:after
            display none
        &:before
            content ''
            position absolute
            border 1px solid #fff
            margin-top -1px
            left 3px
            right 3px
            top 50%
            transform none
    &.disabled
        background font-color-disabled
        border-color font-color-disabled
        cursor not-allowed
        &.checked:after
            background font-color-disabled

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
.checkbox-input
    checkboxStyle(brand-success)
</style>
