<script>
/**
 * @file pager组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Jun 21, 2016
 */

import plInput from '../input';

export default {
    name: 'plPagination',
    props: {
        currentPage: {
            type: Number,
            required: true
        },
        totalPage: {
            type: Number,
            required: true
        },
        layout: {
            type: Object,
            default() {
                return {
                    jumper: true,
                    pageSize: false
                };
            }
        },
        pageSizeList: {
            type: Array,
            default() {
                return [20, 50, 100];
            }
        },
        pageSize: {
            type: Number,
            default: NaN
        },
        size: {
            type: String
        }
    },
    data() {
        return {
            goPage: this.currentPage
        };
    },
    computed: {
        innerSize() {
            if (this.size === 'small') {
                return 3;
            }
            if (this.size === 'large') {
                return 7;
            }
            return 5;
        },
        midSize() {
            return Math.ceil(this.innerSize / 2);
        },
        minSideSize() {
            // 最小的时候也得保证左右是4以上
            return this.innerSize < 4
                ? 4
                : this.innerSize;
        }
    },
    methods: {
        jumpTo(page) {
            this.$emit('current-change', page);
        },
        changePageSize(size) {
            if (size === this.pageSize) {
                return;
            }
            this.$emit('page-size-change', size);
        },
        quickJumpTo() {
            if (this.goPage > this.totalPage) {
                this.goPage = this.totalPage;
            } else if (this.goPage < 1) {
                this.goPage = 1;
            }
            this.jumpTo(+this.goPage);
        }
    },
    created() {
        if (isNaN(this.pageSize) && this.layout.pageSize) {
            throw new Error([
                '[platform-ui date-range-picker error]: ',
                'Missing required prop: ',
                '"pageSize"(when layout.pageSize is true)'
            ].join(''));
        }
    },
    watch: {
        totalPage(val) {
            if (this.currentPage > val && val > 0) {
                this.$emit('current-change', 1);
            }
        }
    },
    components: {
        plInput
    }
};
</script>

<template>
<div class="pl-pagination">
    <div class="pl-pagination-size" v-if="layout.pageSize">
        <span>显示条数</span>
        <ul>
            <li
                v-for="size in pageSizeList"
                class="list-item"
                :class="{selected: size === pageSize}"
                @click="changePageSize(size)"
            >
                {{size}}
            </li>
        </ul>
    </div>
    <div :class="{right: layout.pageSize}">
        <!-- TODO其实下面这货的结构是不符合语义化的，后续再改 -->
        <ul>
            <li
                v-if="currentPage > 1"
                href="javascript:void(0);"
                class="prev list-item"
                @click="jumpTo(currentPage - 1)"
            >
                <i></i>
            </li>
            <li
                v-else
                href="javascript:void(0);"
                class="prev disabled list-item"
            >
                <i></i>
            </li>
            <template v-if="totalPage <= 6">
                <template v-for="i in totalPage">
                    <li
                        v-if="i === currentPage"
                        class="selected list-item"
                    >
                        {{i}}
                    </li>
                    <li class="list-item" v-else @click="jumpTo(i)">
                        {{i}}
                    </li>
                </template>
            </template>
            <template v-else>
                <template v-if="currentPage <= totalPage / 2 && currentPage < minSideSize">
                    <template v-for="i in minSideSize">
                        <li
                            v-if="i === currentPage"
                            class="selected list-item"
                        >
                            {{i}}
                        </li>
                        <li class="list-item" v-else @click="jumpTo(i)">
                            {{i}}
                        </li>
                    </template>
                    <li class="ellipsis list-item">
                        …
                    </li>
                    <li class="list-item" @click="jumpTo(totalPage)">
                        {{totalPage}}
                    </li>
                </template>
                <template v-if="currentPage > totalPage / 2 && currentPage > totalPage - minSideSize + 1">
                    <li class="list-item" @click="jumpTo(1)">
                        1
                    </li>
                    <li class="ellipsis list-item">
                        …
                    </li>
                    <template v-for="i in minSideSize">
                        <li
                            v-if="totalPage - minSideSize + i === currentPage"
                            class="selected list-item"
                        >
                            {{totalPage - minSideSize + i}}
                        </li>
                        <li class="list-item" v-else @click="jumpTo(totalPage - minSideSize + i)">
                            {{totalPage - minSideSize + i}}
                        </li>
                    </template>
                </template>
                <template v-if="totalPage - minSideSize + 1 >= currentPage && currentPage >= minSideSize">
                    <li class="list-item" @click="jumpTo(1)">
                        1
                    </li>
                    <li class="ellipsis list-item">
                        …
                    </li>
                    <template v-for="i in innerSize">
                        <li
                            v-if="currentPage - midSize + i === currentPage"
                            class="selected list-item"
                        >
                            {{currentPage - midSize + i}}
                        </li>
                        <li class="list-item" v-else @click="jumpTo(currentPage - midSize + i)">
                            {{currentPage - midSize + i}}
                        </li>
                    </template>
                    <li class="ellipsis list-item">
                        …
                    </li>
                    <li class="list-item" @click="jumpTo(totalPage)">
                        {{totalPage}}
                    </li>
                </template>
            </template>
            <li
                v-if="currentPage < totalPage"
                href="javascript:void(0);"
                class="next list-item"
                @click="jumpTo(currentPage + 1)"
            >
                <i></i>
            </li>
            <li
                v-else
                href="javascript:void(0);"
                class="disabled next list-item"
            >
                <i></i>
            </li>
        </ul>
        <span v-if="layout.jumper" class="jumper">
            前往
            <pl-input
                v-model="goPage"
                style="width: 35px;height: 28px;text-align: center;"
                @keyup.native.enter="quickJumpTo"
            >
            </pl-input>
            页
        </span>
    </div>
</div>
</template>

<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/variables.styl'
.pl-pagination
    clearfix()
    .right
        float right
    ul
        user-select none
        margin 0
        padding 0
        display inline-block
        clearfix()
    &-size
        float left
        font-size font-size-small
        color font-color-secondary
        clearfix()
        span,
        ul
            float left
        span
            line-height 26px
        ul
            margin-left 15px
    li
        list-style none
.list-item
    font-size font-size-small
    line-height 26px
    height 26px
    float left
    color font-color-secondary
    text-align center
    padding 0 3px
    min-width 23px
    cursor pointer
    border solid 1px #e6e6e6
    border-right none
    background #fff
    &:last-child
        border-right 1px solid #e6e6e6
    &.prev,
    &.next
        position relative
    &.prev
        border-top-left-radius 3px
        border-bottom-left-radius 3px
    &.next
        border-top-right-radius 3px
        border-bottom-right-radius 3px
    &:hover,
    &.selected
        background brand-primary
        color #fff
        i
            border-color #fff
    &.ellipsis
        cursor default
        background #fff
        color font-color-secondary
    &.seleted
        cursor default
    &.disabled,
    &.disabled:hover
        color #e9e9e9
        background #fff
        cursor not-allowed
        i
            border-color #e9e9e9
    i
        // TODO这种箭头其实后续可以考虑直接抽象成mixin()
        position absolute
        top 50%
        left 50%
        border 1px solid #bbb
        border-right none
        border-bottom none
        width 5px
        height 5px
        margin-top -3px
    &.prev i
        transform rotate(-45deg)
        margin-left -2px
    &.next i
        transform rotate(135deg)
        margin-left -5px

.jumper
    display inline-block
    vertical-align top
</style>
