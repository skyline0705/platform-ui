<script>
/**
 * @file table实现
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Aug 8, 2016
 */

import plTableHead from './head';
import plTableBody from './body';
import resize from '@/directives/resize';
const DEFAULT_COLUMN_WIDTH = 80;
export default {
    name: 'pl-table',
    props: {
        height: {
            type: Number
        },
        data: {
            type: Array,
            required: true
        },
        rowHoveredClassName: {
            type: String,
            default: 'row-hovered'
        }
    },
    data() {
        return {
            bodyHeight: null,
            columns: [],
            rowHoverIndex: NaN,
            resizeLine: {
                show: false,
                left: 0
            },
            realData: this.data.map((item, index) => {
                return {
                    hovered: index === this.rowHoverIndex,
                    item: item
                };
            })
        };
    },
    computed: {
        fixedColumns() {
            return this.columns
                .filter(instance => instance.fixed);
        },
        normalColumns() {
            return this.columns
                .filter(instance => !instance.fixed);
        },
        realColumns() {
            // TODO后续再考虑性能
            return [...this.fixedColumns, ...this.normalColumns];
        },
        fixedColumnsWidth() {
            return this.fixedColumns.reduce((width, column) => {
                width += column.width;
                return width;
            }, 0);
        },
        realColumnsWidth() {
            return this.realColumns.reduce((width, column) => {
                width += column.width;
                return width;
            }, 0);
        }
    },
    methods: {
        resizeStart({left}) {
            this.resizeLine.left = left;
            this.resizeLine.show = true;
        },
        resize({left}) {
            this.resizeLine.left = left;
        },
        resizeEnd({activeColumn, width, oldWidth}) {
            this.resizeLine.show = false;
            activeColumn.width = width;
            if (width > oldWidth) {
                return;
            }
            const realWidth = this.columns.reduce((width, column) => width + column.width, 0);
            const offset = this.$refs.table.clientWidth - realWidth;
            if (offset <= 0) {
                return;
            }
            const index = this.realColumns.findIndex(column => activeColumn === column) + 1;
            if (this.realColumns[index]) {
                this.realColumns[index].width = this.realColumns[index].width + offset;
            }
        },
        appendColumn(column) {
            this.columns.push(column);
        },
        removeColumn(column) {
            const index = this.columns.findIndex(item => item.id === column.id);
            this.columns.splice(index, 1);
        },
        updateLayout() {
            const width = this.$el.clientWidth;
            const tableWidth = this.columns.reduce((sum, column) => {
                if (column.hasDefaultWidth) {
                    return sum + column.width;
                }
                return sum + DEFAULT_COLUMN_WIDTH;
            }, 0);

            const autoWidthColumnList = this.columns
                .filter(column => !column.hasDefaultWidth);

            if (width <= tableWidth && autoWidthColumnList.length) {
                autoWidthColumnList.forEach(column => {
                    column.width = DEFAULT_COLUMN_WIDTH;
                });
                return;
            }
            if (width <= tableWidth) {
                return;
            }
            let flexWidth;
            if (autoWidthColumnList.length) {
                flexWidth = (width - tableWidth) / autoWidthColumnList.length;
                autoWidthColumnList.forEach(column => {
                    column.width = DEFAULT_COLUMN_WIDTH + flexWidth;
                });
                return;
            }
            flexWidth = (width - tableWidth) / this.columns.length;
            this.columns.forEach(column => {
                if (column.hasDefaultWidth) {
                    column.width = column.width + flexWidth;
                } else {
                    column.width = DEFAULT_COLUMN_WIDTH + flexWidth;
                }
            });
        },
        getBodyHeight() {
            if (Number.isNaN(this.height)) {
                return null;
            }
            return this.height - this.$refs.head.getBoundingClientRect().height;
        },
        scrollBody(event) {
            if (!this.fixedColumns.length) {
                return;
            }
            if (event.type !== 'wheel') {
                this.$refs.fixedBody.scrollTop = event.target.scrollTop;
                this.$refs.head.scrollLeft = event.target.scrollLeft;
                return;
            }
            // TODO这个下面可能会导致触发过快，后续看看需不需要throttle一下
            // 以及因为fixed部分只会涉及到Y坐标轴运动，估计…问题…不大吧
            this.$refs.body.scrollTop += event.deltaY;

            const {
                scrollTop,
                clientHeight,
                scrollHeight
            } = this.$refs.body;
            if (scrollTop + clientHeight < scrollHeight && scrollTop !== 0) {
                event.preventDefault();
            }
        },
        rowClick(event, obj) {
            this.$emit('row-click', event, obj);
        }
    },
    mounted() {
        this.updateLayout();
        // 因为挂载的时候columns其实还未被渲染，nextTick一下保证渲染顺序
        this.$nextTick(() => {
            this.bodyHeight = this.getBodyHeight();
        });
    },
    components: {
        plTableHead,
        plTableBody
    },
    directives: {
        resize
    },
    watch: {
        columns() {
            this.updateLayout();
        },
        data() {
            this.realData = this.data.map((item, index) => {
                return {
                    hovered: index === this.rowHoverIndex,
                    item: item
                };
            });
        },
        rowHoverIndex(index) {
            this.realData.forEach((item, i) => {
                item.hovered = index === i;
            });
        }
    }
};
</script>

<template>
<div
    ref="table"
    class="pl-table"
    :class="{
        'can-not-select': resizeLine.show
    }"
    v-resize="updateLayout"
>
    <div class="hidden-columns"><slot></slot></div>
    <div class="pl-table-head" ref="head">
        <pl-table-head
            class="pl-table-container"
            type="real"
            :fixed-columns="fixedColumns"
            :real-columns="realColumns"
            :style="{
                width: realColumnsWidth + 'px'
            }"
            @column-resize-start="resizeStart"
            @column-resize="resize"
            @column-resize-end="resizeEnd"
        ></pl-table-head>
    </div>
    <div
        class="pl-table-body"
        :style="{
            height: bodyHeight + 'px'
        }"
        ref="body"
        @scroll="scrollBody($event)"
    >
        <pl-table-body
            class="pl-table-container"
            type="real"
            :data="realData"
            :fixed-columns="fixedColumns"
            :real-columns="realColumns"
            :style="{width: realColumnsWidth + 'px'}"
            @change-hover-line="(index) => rowHoverIndex = index"
            @row-click="rowClick"
        ></pl-table-body>
    </div>
    <div
        class="pl-table-fixed-head"
        v-if="fixedColumns.length"
    >
        <pl-table-head
            class="pl-table-container"
            type="fixed"
            :fixed-columns="fixedColumns"
            :real-columns="realColumns"
            :style="{
                width: fixedColumnsWidth + 'px'
            }"
            @column-resize-start="resizeStart"
            @column-resize="resize"
            @column-resize-end="resizeEnd"
        ></pl-table-head>
    </div>
    <div
        class="pl-table-fixed-body"
        v-if="fixedColumns.length"
        :style="{
            height: bodyHeight + 'px'
        }"
        ref="fixedBody"
        @wheel="scrollBody($event)"
    >
        <pl-table-body
            class="pl-table-container"
            type="fixed"
            :data="realData"
            :fixed-columns="fixedColumns"
            :real-columns="realColumns"
            :style="{width: fixedColumnsWidth + 'px'}"
            @change-hover-line="(index) => rowHoverIndex = index"
            @row-click="rowClick"
        ></pl-table-body>
    </div>
    <div
        class="resize-line"
        v-show="resizeLine.show"
        :style="{left: resizeLine.left + 'px'}"
    ></div>
</div>
</template>

<style lang="stylus" scoped>
.can-not-select
    user-select none
.pl-table
    box-sizing border-box
    border 1px solid #e0e0e0
    border-top none
    width 100%
    overflow hidden
    position relative
    &-container
        border-collapse separate
        border-spacing 0
        table-layout fixed
        background #fff
    &-fixed-head,
    &-fixed-body
        left 0
        position absolute
    &-fixed-head
        top 0
        z-index 2
        border-bottom 1px solid #e0e0e0
    &-fixed-body
        top 29px
        overflow hidden
        z-index 1
    &-head
        width 100%
        overflow hidden
        position relative
        z-index 1
        border-bottom 1px solid #e0e0e0
    &-body
        margin-top -1px
        overflow auto
        width 100%
.hidden-columns
    display none
.resize-line
    position absolute
    z-index 3
    top 0
    bottom 0
    width 1px
    background #e0e0e0
</style>
