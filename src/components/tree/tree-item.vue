<script>
/**
 * @file 树组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 17 Apr 2017
 */

import plCheckbox from '../checkbox';
export default {
    name: 'pl-tree-item',
    props: {
        nodeMap: {
            type: Object,
            required: true
        },
        item: {
            type: Object,
            required: true
        },
        level: {
            type: Number,
            required: true
        },
        showCheckbox: {
            type: Boolean,
            default: false
        }
    },
    computed: {
        isIndeterminate() {
            return this.nodeMap[this.item.id].checkedStatus === 'half';
        },
        isChecked() {
            return this.nodeMap[this.item.id].checkedStatus === 'all';
        },
        isExpanded() {
            return this.nodeMap[this.item.id].isExpanded;
        }
    },
    methods: {
        fold(item, el, fromDom) {
            if (fromDom) {
                this.rowClick(item);
            }
            while (el.tagName !== 'DIV') {
                if (el && el.getAttribute('data-stop')) {
                    return;
                }
                el = el.parentNode;
            }
            this.$emit('fold', item, el);
        },
        rowClick(item) {
            this.$emit('row-click', item);
        },
        changeCheckStatus({node, checked}) {
            this.$emit('checked-change', {node, checked});
        }
    },
    mounted() {
        if (this.$refs.checkbox && !this.isChecked) {
            this.$refs.checkbox.indeterminate = this.isIndeterminate;
        }
    },
    watch: {
        isIndeterminate(val) {
            if (this.$refs.checkbox) {
                this.$refs.checkbox.indeterminate = val;
            }
        }
    },
    components: {
        plCheckbox
    }
};
</script>

<template>

<li>
    <div
        class="tree-item"
        @click="fold(item, $event.target, true)"
        :style="{
            'padding-left': level * 12 + 5 + 'px'
        }"
    >
        <span
            class="expand"
            v-if="item.children && item.children.length"
            :class="{open: isExpanded}"
        ></span>
        <span class="expand placeholder" v-else data-stop="true"></span>
        <span class="checkbox" v-if="showCheckbox" data-stop="true">
            <pl-checkbox
                :checked="isChecked"
                :indeterminate="isIndeterminate"
                @change="isChecked => {
                    changeCheckStatus({
                        node: item,
                        checked: isChecked
                    })
                }"
            >
            </pl-checkbox>
        </span>
        <span>
            {{item.text}}
        </span>
    </div>
    <transition name="fade-top">
        <ul
            v-if="item.children
                && item.children.length
                && isExpanded
            "
        >
            <pl-tree-item
                v-for="item in item.children"
                :item="item"
                :key="item.id"
                :node-map="nodeMap"
                @fold="fold"
                @row-click="rowClick"
                @checked-change="changeCheckStatus"
                :level="level + 1"
                :show-checkbox="showCheckbox"
                v-show="nodeMap[item.id].show"
            ></pl-tree-item>
        </ul>
    </transition>
</li>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/transitions.styl'
ul
    margin 0
    padding 0
    list-style none
li
    list-style none
    color font-color-primary
    line-height line-height-base
span
    display inline-block
    line-height 1
    vertical-align middle
input
    cursor pointer
.tree-item
    cursor default
    padding 10px 5px
    line-height 1
    &:hover
        background brand-primary
        color #fff
        .expand
            border-color #fff
            &.placeholder
                border-color transparent
.checkbox
    line-height 1
.expand
    margin-top -1px
    width 5px
    height 5px
    border-left 1px solid lighten(font-color-primary, 20%)
    border-bottom 1px solid lighten(font-color-primary, 20%)
    transform rotate(-135deg)
    transition transform .3s ease-in-out
    cursor pointer
    &.placeholder
        border-color transparent
    &.open
        transform rotate(-45deg)
</style>
