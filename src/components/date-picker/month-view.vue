<script>
/**
 * @file 年/月选择
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 11 Apr 2017
 */
import {
    generateArrayByRange,
    getAvailableMonthRange
} from './util';
import plSelect from '../select';

export default {
    props: {
        isOld: {
            type: Boolean,
            default: false
        },
        currentYear: {
            required: true,
            type: Number
        },
        currentMonth: {
            required: true,
            type: Number
        },
        realRangeBegin: {
            required: true,
            type: Date
        },
        realRangeEnd: {
            required: true,
            type: Date
        }
    },
    computed: {
        canPrev() {
            return new Date(this.currentYear, this.currentMonth - 1, 1) > this.realRangeBegin;
        },
        canNext() {
            return new Date(this.currentYear, this.currentMonth, 0) < this.realRangeEnd;
        },
        yearList() {
            return generateArrayByRange(
                this.realRangeBegin.getFullYear(),
                this.realRangeEnd.getFullYear()
            ).map(year => {
                return {
                    text: year,
                    value: year
                };
            });
        },
        monthList() {
            return getAvailableMonthRange(
                this.currentYear,
                this.realRangeBegin,
                this.realRangeEnd
            ).map(month => {
                return {
                    text: month,
                    value: month
                };
            });
        }
    },
    methods: {
        prev() {
            if (this.currentMonth > 1) {
                this.$emit('change', {
                    year: this.currentYear,
                    month: this.currentMonth - 1
                });
            } else {
                this.$emit('change', {
                    year: this.currentYear - 1,
                    month: 12
                });
            }
        },
        next() {
            if (this.currentMonth < 12) {
                this.$emit('change', {
                    year: this.currentYear,
                    month: this.currentMonth + 1
                });
            } else {
                this.$emit('change', {
                    year: this.currentYear + 1,
                    month: 1
                });
            }
        },
        changeYear(year) {
            this.$emit('change', {
                year: year,
                month: this.currentMonth
            });
        },
        changeMonth(month) {
            this.$emit('change', {
                year: this.currentYear,
                month: month
            });
        }
    },
    components: {
        plSelect
    },
    watch: {
        currentYear() {
            if (this.monthList.some(item => item.value === this.currentMonth)) {
                return;
            }
            this.$emit('change', {
                year: this.currentYear,
                month: this.monthList[0].value
            });
        }
    }
};
</script>

<template>

<div class="options">
    <span
        class="options-arrow options-arrow-pre"
        @click="prev"
        v-if="canPrev"
    ></span>
    <span
        class="options-arrow options-arrow-pre options-arrow-disabled"
        v-else
    ></span>
    <pl-select
        :is-old="isOld"
        class="options-year"
        :value="currentYear"
        @change="changeYear"
        :options="yearList"
        width="58px"
        height="20px"
        max-height="145px"
    ></pl-select>
    <pl-select
        :is-old="isOld"
        class="options-month"
        :value="currentMonth"
        @change="changeMonth"
        :options="monthList"
        width="48px"
        height="20px"
        max-height="145px"
    ></pl-select>
    <span
        class="options-arrow options-arrow-next"
        @click="next"
        v-if="canNext"
    ></span>
    <span
        class="options-arrow options-arrow-next options-arrow-disabled"
        v-else
    ></span>
</div>

</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/mixin.styl'
.options
    clearfix()
    padding 3px 0
    text-align center
    &-year,
    &-month
        // TODO 莫名其妙的箭头抖动，暂时这么搞一下
        float left
    &-year
        margin 0 5px
    &-arrow
        position relative
        margin-top 2px
        width 13px
        height 13px
        border 2px solid #c1c8d0
        border-radius 999px
        cursor pointer
        &:before
            content ''
            position absolute
            top 50%
            left 50%
            margin -4px 0 0 -3px
            height 5px
            width 5px
            border-left 2px solid #c1c8d0
            border-top 2px solid #c1c8d0
        &-pre
            float left
            margin-left 3px
            &:before
                transform rotate(-45deg)
        &-next
            float right
            margin-right 3px
            &:before
                margin-left -5px
                transform rotate(135deg)
        &-disabled
            visibility hidden

[is-old] .options-arrow
    border-color #cfd8ee
    background #cfd8ee
    &:before
        border-color #fff
</style>
