<script>
/**
 * @file day-view组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 2 Apr 2017
 */
import {
    generateDateList
} from './util';

export default {
    props: {
        dayTitle: {
            type: Array,
            default: ['一', '二', '三', '四', '五', '六', '日']
        },
        currentDate: {
            required: true,
            type: Date
        },
        currentMonth: {
            required: true,
            type: Number
        },
        currentYear: {
            required: true,
            type: Number
        },
        beginDate: {
            required: true,
            type: Date
        },
        endDate: {
            required: true,
            type: Date
        }
    },
    methods: {
        selectDate(item) {
            this.$emit('change', item);
        }
    },
    computed: {
        dateList() {
            return generateDateList({
                currentDate: this.currentDate,
                currentMonth: this.currentMonth,
                currentYear: this.currentYear,
                beginDate: this.beginDate,
                endDate: this.endDate
            });
        }
    }
};
</script>

<template>

<div>
    <ul class="title">
        <li
            class="cell cell-title"
            :class="{'no-right': index % 7 === 6}"
            v-for="(title, index) in dayTitle"
        >
            <span>{{title}}</span>
        </li>
    </ul>
    <ul class="day-list">
        <li
            class="cell cell-date"
            :class="{
                'no-right': index % 7 === 6,
                'not-in-month': !item.inMonth,
                'selected': item.isChecked,
                'disabled': !item.canSelected
            }"
            v-for="(item, index) in dateList"
            @click="selectDate(item)"
        >
            <span>{{item.value}}</span>
        </li>
    </ul>
</div>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/mixin.styl'
day-view-border-color = #f2f2f2
day-view-cell-color = #9d9d9d

ul
    margin 0
    padding 0
li
    list-style none
ul
    width 160px
    clearfix()
    &.title
        border-bottom none

.cell
    float left
    text-align center
    border-top 1px solid day-view-border-color
    border-right 1px solid day-view-border-color
    cursor pointer
    span
        display inline-block
        width 22px
        line-height 1
        padding 5px 0
        color day-view-cell-color
    &-title
        background day-view-border-color
        border-color day-view-border-color
    &-date:hover span
        background brand-primary
        color #fff
    &.no-right
        border-right none
.selected span
    background brand-primary
    color #fff
    transform scale(1.1)
.not-in-month span,
.disabled span
    color #ccc
.disabled
    cursor not-allowed
    span
        background #fff
    &:hover span
        color #ccc
        background #fff

old-day-view-cell-color = #666
old-day-view-cell-disabled-color = #d3d3d3

[is-old]
    ul,
    .cell
        border-color day-view-border-color
        span
            color old-day-view-cell-color
        &-date:hover span
            color #fff
            background old-brand-primary
    .selected span
        background old-brand-primary
        color #fff
        transform scale(1)
    .disabled:hover span
        color old-day-view-cell-disabled-color
        background #fff
    .title .cell
        border-color day-view-border-color
    .day-list li:nth-child(-n + 7)
        border-top-color day-view-border-color
    .not-in-month span,
    .disabled span
        color old-day-view-cell-disabled-color
</style>
