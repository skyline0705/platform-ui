<script>
/**
 * @file 文本域
 *
 * @author 李德超(lidechao@autohome.com.cn)
 * 2016年8月17日
 */
export default {
    name: 'pl-textarea',
    props: {
        value: {
            required: true
        },
        autoSize: {
            default: null
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
    },
    methods: {
        calcHeight() {
            // TODO图省事的办法，因为涉及多次修改dom效率较低
            // 后续通过设置隐藏textarea来解决此问题…
            if (this.autoSize === null || this.autoSize === false) {
                return;
            }
            const {
                scrollHeight,
                clientHeight
            } = this.$el;
            if (scrollHeight > clientHeight) {
                this.$el.style.height = scrollHeight + this.borderWidth + 'px';
                return;
            }
            /* eslint-disable no-constant-condition */
            while (true) {
                const {
                    scrollHeight,
                    clientHeight
                } = this.$el;
                this.$el.style.height = clientHeight - this.lineHeight + 'px';
                if (scrollHeight > clientHeight) {
                    this.$el.style.height = scrollHeight + this.borderWidth + 'px';
                    return;
                }
            }
        }
    },
    mounted() {
        const {
            lineHeight,
            borderTopWidth,
            borderBottomWidth
        } = getComputedStyle(this.$el);
        this.lineHeight = parseFloat(lineHeight);
        this.borderWidth = parseFloat(borderTopWidth) + parseFloat(borderBottomWidth);
        this.calcHeight();
    },
    watch: {
        value() {
            this.calcHeight();
        }
    }
};
</script>

<template>

<textarea v-model="computedValue"></textarea>

</template>
<style lang="stylus" scoped>
@import '../common/variables'

textarea
    display inline-block
    padding 3px 5px
    font-size 14px
    line-height line-height-base
    color font-color-primary
    background input-bg-color
    border 1px solid input-border-color
    transition border-color ease-in-out 0.15s
    box-sizing border-box
    width 350px
    height 80px
    overflow auto
    outline none
    resize none
    &:hover
        border-color darken(input-border-color, 10%)
    &:focus
        border-color brand-primary
    &-large
        height 150px
</style>
