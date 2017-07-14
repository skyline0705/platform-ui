<script>
/**
 * @file 标签页
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 13 Apr 2017
 */

export default {
    name: 'pl-tabs',
    props: {
        isOld: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            nowActive: null,
            tabList: []
        };
    },
    computed: {
        activeIndex() {
            if (!this.nowActive) {
                return null;
            }
            /* eslint-disable no-underscore-dangle */
            return this.$children.findIndex(item => item._uid === this.nowActive);
        },
        currentRectInfo() {
            // TODO后续考虑这个东西要不要缓存起来
            return this.activeIndex !== null
                && this.$refs.tabs.children[this.activeIndex].getBoundingClientRect();
        },
        offsetLeft() {
            return this.activeIndex !== null
                && this.$refs.tabs.children[this.activeIndex].offsetLeft;
        }
    },
    methods: {
        updateActive(uid) {
            this.nowActive = uid;
        },
        appendTab(tab) {
            if (this.nowActive === null) {
                /* eslint-disable no-underscore-dangle */
                this.updateActive(tab._uid);
            }
            /* eslint-disable no-underscore-dangle */
            this.tabList.push(tab._uid);
            this.$refs.tabs.appendChild(tab.$refs.tab);
        },
        removeTab(tab) {
            tab.$el.appendChild(tab.$refs.tab);
            /* eslint-disable no-underscore-dangle */
            const index = this.tabList.indexOf(tab._uid);
            this.tabList.splice(index, 1);
        }
    },
    watch: {
        nowActive(newVal, oldVal) {
            if (oldVal !== null) {
                /* eslint-disable no-underscore-dangle */
                const tabPanel = this.$children.find(item => item._uid === newVal);
                this.$emit('tab-change', tabPanel);
            }
        }
    }
};
</script>
<template>
<div :is-old="isOld">
    <div class="tabs-header">
        <ul ref="tabs" class="tabs"></ul>
        <div
            class="slide"
            :style="{
                width: currentRectInfo.width + 'px',
                transform: 'translateX(' + offsetLeft + 'px)'
            }"
        ></div>
    </div>
    <div>
        <slot></slot>
    </div>
</div>
</template>
<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/variables.styl'

.tabs
    clearfix()
    border-bottom 1px solid #e6e6e6
    padding-left 0
    &-header
        position relative
.slide
    position absolute
    height 3px
    background brand-primary
    bottom 0
    left 0
    transition transform .3s ease-in-out
.empty
    display none

[is-old] .slide
    display none
</style>
