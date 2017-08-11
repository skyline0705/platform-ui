<script>
/**
 * @file 日历插件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Aug 11, 2016
 */

// TODO 整个控件后续要开源的化，需要继续优化一下才行
// 以及有一个遗留问题，在于overflow hidden的话怎么避免…如果有overflow的情况就需要把layer扔到body下面去才行…
import {
    getTimeStr,
    getYearOffsetDate,
    getRealRangeDate
} from './util';

import {
    getClosest
} from '../common/util';

import plDateInput from './date-input';
import plDayView from './day-view';
import plMonthView from './month-view';
export default {
    name: 'pl-date-picker',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        name: {
            type: String,
            default: ''
        },
        value: {
            type: Date,
            default() {
                return new Date();
            }
        },
        format: {
            type: String,
            default: 'yyyy/MM/dd'
        },
        range: {
            type: Object,
            default() {
                return {
                    begin: getYearOffsetDate(new Date(), -30),
                    end: getYearOffsetDate(new Date(), 5)
                };
            }
        },
        limit: {
            type: Object,
            default() {
                return {
                    begin: getYearOffsetDate(new Date(), -30),
                    end: getYearOffsetDate(new Date(), 5)
                };
            }
        },
        width: {
            type: String,
            default: '162px'
        },
        height: {
            type: String,
            default: '26px'
        }
    },
    data() {
        return {
            position: 'bottom',
            isOpen: false,
            currentYear: this.value.getFullYear(),
            currentMonth: this.value.getMonth() + 1,
            dayTitle: ['一', '二', '三', '四', '五', '六', '日']
        };
    },
    computed: {
        realRangeBegin() {
            return getRealRangeDate(this.range.begin, 'begin');
        },
        realRangeEnd() {
            return getRealRangeDate(this.range.end, 'end');
        },
        realLimitBegin() {
            return getRealRangeDate(this.limit.begin, 'begin');
        },
        realLimitEnd() {
            return getRealRangeDate(this.limit.end, 'end');
        },
        showDate() {
            return getTimeStr(this.value, this.format);
        }
    },
    created() {
        this.checkProps();
    },
    methods: {
        changeDayList({year, month}) {
            this.currentYear = year;
            this.currentMonth = month;
        },
        selectDate(item) {
            if (!item.canSelected) {
                return;
            }
            this.isOpen = false;
            this.$emit('change', new Date(item.date));
        },
        bodyClickHandler(event) {
            if (getClosest(event.target, this.$el)) {
                return;
            }
            this.isOpen = false;
        },
        checkProps() {
            // TODO还差属性校验逻辑
        },
        changePosition() {
            this.position = window.innerHeight - this.$el.getBoundingClientRect().bottom > this.getLayerHeight()
                ? 'bottom'
                : 'top';
        },
        getLayerHeight() {
            // TODO性能maybe可能有点低……以后再想想有什么好办法来解决吧
            let copyLayer = this.$refs.layer.cloneNode(true);
            copyLayer.style.display = 'block';
            this.$el.appendChild(copyLayer);
            const height = copyLayer.offsetHeight;
            this.$el.removeChild(copyLayer);
            copyLayer = null;
            return height;
        }
    },
    mounted() {
        this.changePosition();
        window.addEventListener('click', this.bodyClickHandler);
        window.addEventListener('resize', this.changePosition);
        window.addEventListener('scroll', this.changePosition);

    },
    beforeDestroy() {
        window.removeEventListener('click', this.bodyClickHandler);
        window.removeEventListener('resize', this.changePosition);
        window.removeEventListener('scroll', this.changePosition);
    },
    watch: {
        value(val) {
            this.currentYear = val.getFullYear();
            this.currentMonth = val.getMonth() + 1;
        }
    },
    components: {
        plDateInput,
        plDayView,
        plMonthView
    }
};
</script>

<template>
<div
    class="pl-date-picker"
    :open="isOpen"
    :style="{
        width: width
    }"
>
    <pl-date-input
        :width="width"
        :height="height"
        :name="name"
        :value="showDate"
        :is-open="isOpen"
        @show-layer="isOpen = true"
    ></pl-date-input>
    <transition :name="position === 'bottom' ? 'fade-top' : 'fade-bottom'">
        <div
            ref="layer"
            class="pl-date-picker-main"
            :class="{
                'pl-date-picker-bottom': position === 'bottom',
                'pl-date-picker-top': position === 'top'
            }"
            v-show="isOpen"
            :style="{
                top: position === 'bottom' && 'calc(' + height + ' + 4px)' || 'auto',
                bottom: position === 'top' && 'calc(' + height + ' + 4px)' || 'auto'
            }"
        >
            <pl-month-view
                :current-year="currentYear"
                :current-month="currentMonth"
                :real-range-begin="realRangeBegin"
                :real-range-end="realRangeEnd"
                @change="changeDayList"
            ></pl-month-view>
            <pl-day-view
                :day-title="dayTitle"
                :current-date="value"
                :current-month="currentMonth"
                :current-year="currentYear"
                :begin-date="realLimitBegin"
                :end-date="realLimitEnd"
                @change="selectDate"
            ></pl-day-view>
        </div>
    </transition>
</div>
</template>

<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/transitions.styl'
@import '../common/mixin.styl'
.pl-date-picker
    position relative
    display inline-block
    vertical-align middle
    font-size 12px
    // TODO因为目前transition里写transform-origin会有抖动，暂时先扔这里
    // 具体原因猜测原因是因为生效实际，回头再来测试下看看
    &-bottom
        right 0
        transform-origin center top
    &-top
        right 0
        transform-origin center bottom
    &-main
        position absolute
        border 1px solid #e0e0e0
        border-top-left-radius 5px
        border-top-right-radius 5px
        background #fff
        z-index 1
</style>
