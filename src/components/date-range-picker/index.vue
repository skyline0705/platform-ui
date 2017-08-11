<script>
/**
 * @file 日期范围选择器
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Nov 13, 2016
 */


import plDateInput from '../date-picker/date-input';
import plDayView from '../date-picker/day-view';
import plMonthView from '../date-picker/month-view';
import plButton from '../button';

import {getClosest, upperFirst} from '../common/util';
import {
    getYearOffsetDate,
    getTimeStr,
    getRealRangeDate
} from '../date-picker/util';
import {
    getDateRange,
    copyDateRange,
    generateCurrentRange,
    getMidDate
} from './util';

import {
    quickGuideConfig,
    today
} from './config';

export default {
    name: 'pl-date-range-picker',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        name: {},
        signal: {
            type: String,
            default: '至'
        },
        value: {
            type: Object,
            required: true
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
        format: {
            type: String,
            default: 'yyyy/MM/dd'
        },
        canBeInfinity: {
            type: Object,
            default() {
                return {};
            }
        },
        width: {
            type: String,
            default: '180px'
        },
        height: {
            type: String,
            default: '26px'
        },
        quickGuide: {
            type: Array,
            default() {
                return [
                    'today', 'yesterday', 'last7',
                    'lastweek', 'thismonth',
                    'lastmonth'
                ];
            }
        }
    },
    data() {
        // TODO最近脑子木，回头再看这块怎么弄，函数名特么也没想好，先这样吧= =
        return Object.assign({
            position: 'bottom-right',
            isOpen: false,
            innerValue: copyDateRange(this.value),
            dayTitle: ['一', '二', '三', '四', '五', '六', '日']
        }, generateCurrentRange(this.value, this.limit));
    },
    computed: {
        quickGuideList() {
            return this.quickGuide
                .map(key => {
                    return {
                        key: key,
                        text: quickGuideConfig[key].text
                    };
                })
                .sort((a, b) => {
                    return quickGuideConfig[a.key].order > quickGuideConfig[b.key].order;
                });
        },
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
            const begin = this.value.begin !== null
                ? getTimeStr(this.value.begin, this.format)
                : '不限';
            const end = this.value.end !== null
                ? getTimeStr(this.value.end, this.format)
                : '不限';

            return begin + ' ' + this.signal + ' ' + end;
        },
        realEndLimitStart() {
            if (this.innerValue.begin === null) {
                return this.realLimitBegin;
            }
            return this.innerValue.begin >= this.realLimitBegin
                ? getRealRangeDate(this.innerValue.begin, 'begin')
                : getRealRangeDate(this.realLimitBegin, 'begin');
        }
    },
    methods: {
        selectInfinitDate(type, isInfinity) {
            // TODO后续再继续拆分吧，头疼中，干不下去了…
            if (isInfinity) {
                this.innerValue[type] = null;
                return;
            }
            if (this.value[type]) {
                this.innerValue[type] = this.value[type];
                return;
            }
            if (!this.value.begin && !this.value.end) {
                if (this.limit.begin <= today && today <= this.limit.end) {
                    this.innerValue[type] = new Date(today);
                    return;
                }
                this.innerValue[type] = getMidDate(this.limit);
                return;
            }

            if (type === 'begin' && !this.value.begin) {
                if (this.limit.begin <= today && today <= this.innerValue.end) {
                    this.innerValue[type] = new Date(today);
                    return;
                }
                this.innerValue[type] = getMidDate({
                    begin: this.limit.begin,
                    end: this.innerValue.end
                });
            }
            if (type === 'end' && !this.value.end) {
                if (this.innerValue.begin <= today && today <= this.limit.end) {
                    this.innerValue[type] = new Date(today);
                    return;
                }
                this.innerValue[type] = getMidDate({
                    begin: this.innerValue.begin,
                    end: this.limit.end
                });
            }
        },
        changeDayList(type, {year, month}) {
            this[`current${upperFirst(type)}Year`] = year;
            this[`current${upperFirst(type)}Month`] = month;
        },
        selectDate(type, item) {
            if (!item.canSelected) {
                return;
            }
            this.innerValue[type] = item.date;
        },
        setRange(type) {
            this.innerValue = getDateRange(type, this.limit);
        },
        confirm() {
            const originStart = this.value.begin && getTimeStr(this.value.begin, this.format);
            const originEnd = this.value.end && getTimeStr(this.value.end, this.format);
            const nowStart = this.innerValue.begin && getTimeStr(this.innerValue.begin, this.format);
            const nowEnd = this.innerValue.end && getTimeStr(this.innerValue.end, this.format);
            if (originStart !== nowStart || originEnd !== nowEnd) {
                this.$emit('change', this.innerValue);
            }
            this.isOpen = false;
        },
        reset() {
            this.innerValue = copyDateRange(this.value);
            this.isOpen = false;
        },
        bodyClickHandler(event) {
            if (getClosest(event.target, this.$el)) {
                return;
            }
            this.isOpen = false;
        },
        changeEndDate() {
            this.innerValue.end = new Date();
        },
        changePosition() {
            const elRect = this.$el.getBoundingClientRect();
            const layerRect = this.getLayerRect();
            const windowHeight = window.innerHeight;
            let verticalPosition;
            let horizontalPosition;
            if (elRect.right - layerRect.width >= 0) {
                horizontalPosition = 'right';
            } else {
                horizontalPosition = 'left';
            }
            if (windowHeight - elRect.bottom >= layerRect.height) {
                verticalPosition = 'bottom';
            } else {
                verticalPosition = 'top';
            }
            this.position = verticalPosition + '-' + horizontalPosition;
        },
        getLayerRect() {
            // TODO性能maybe可能有点低……以后再想想有什么好办法来解决吧
            let copyLayer = this.$refs.layer.cloneNode(true);
            copyLayer.style.display = 'block';
            this.$el.appendChild(copyLayer);
            const height = copyLayer.offsetHeight;
            const width = copyLayer.offsetWidth;
            this.$el.removeChild(copyLayer);
            copyLayer = null;
            return {width, height};
        }
    },
    components: {
        plDateInput,
        plDayView,
        plMonthView,
        plButton
    },
    created() {
        if (!this.canBeInfinity.begin && this.innerValue.begin === null) {
            throw new Error('[platform-ui date-range-picker error]: the begin date can not be infinity');
        }
        if (!this.canBeInfinity.end && this.innerValue.end === null) {
            throw new Error('[platform-ui date-range-picker error]: the end date can not be infinity');
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
        value: {
            deep: true,
            handler() {
                this.innerValue = copyDateRange(this.value);
            }
        },
        realEndLimitStart(val) {
            if (this.innerValue.end === null) {
                return;
            }
            if (val > this.innerValue.end) {
                this.innerValue.end = val;
            }
        },
        innerValue: {
            deep: true,
            handler() {
                if (this.innerValue.begin) {
                    if (this.currentBeginYear !== this.innerValue.begin.getFullYear()) {
                        this.currentBeginYear = this.innerValue.begin.getFullYear();
                    }
                    if (this.currentBeginMonth !== this.innerValue.begin.getMonth() + 1) {
                        this.currentBeginMonth = this.innerValue.begin.getMonth() + 1;
                    }
                }
                if (this.innerValue.end) {
                    if (this.currentEndYear !== this.innerValue.end.getFullYear()) {
                        this.currentEndYear = this.innerValue.end.getFullYear();
                    }
                    if (this.currentEndMonth !== this.innerValue.end.getMonth() + 1) {
                        this.currentEndMonth = this.innerValue.end.getMonth() + 1;
                    }
                }
            }
        }
    }
};
</script>

<template>

<div
    class="pl-date-range"
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
    <transition :name="position.indexOf('bottom') !== -1 ? 'fade-top' : 'fade-bottom'">
        <div
            ref="layer"
            class="pl-date-range-picker"
            :class="{
                'pl-date-range-picker-bottom': position.indexOf('bottom') !== -1,
                'pl-date-range-picker-top': position.indexOf('top') !== -1
            }"
            v-show="isOpen"
            :style="{
                top: position.indexOf('bottom') !== -1 ? 'calc(' + height + ' + 4px)' : 'auto',
                right: position.indexOf('right') !== -1 ? 0 : 'auto',
                bottom: position.indexOf('top') !== -1 ? 'calc(' + height + ' + 4px)' : 'auto',
                left: position.indexOf('left') !== -1 ? 0 : 'auto'
            }"
        >
            <p class="pl-date-range-quick-search" v-if="quickGuideList.length">
                <template v-for="item in quickGuideList">
                    <a
                        v-if="innerValue.begin === null || innerValue.end === null"
                        href="javascript:void(0)"
                        style="cursor: not-allowed; text-decoration: none;"
                    >{{item.text}}</a>
                    <a
                        v-else
                        href="javascript:void(0)"
                        @click="setRange(item.key)"
                    >{{item.text}}</a>
                </template>
            </p>
            <div class="pl-date-range-main">
                <div>
                    <p>
                        开始日期
                        <template v-if="canBeInfinity.begin">
                            <input
                                type="checkbox"
                                :checked="innerValue.begin === null"
                                @click="event => selectInfinitDate('begin', event.target.checked)"
                            >&nbsp;不限
                        </template>
                    </p>
                    <div
                        class="date-picker-view"
                        :class="{
                            'date-infinity': innerValue.begin === null
                        }"
                    >
                        <pl-month-view
                            :current-year="currentBeginYear"
                            :current-month="currentBeginMonth"
                            :real-range-begin="realRangeBegin"
                            :real-range-end="realRangeEnd"
                            @change="value => changeDayList('begin', value)"
                        ></pl-month-view>
                        <pl-day-view
                            class="day-view"
                            :day-title="dayTitle"
                            :current-date="innerValue.begin || new Date('100', '0', '1')"
                            :current-month="currentBeginMonth"
                            :current-year="currentBeginYear"
                            :begin-date="realLimitBegin"
                            :end-date="realLimitEnd"
                            @change="value => selectDate('begin', value)"
                        ></pl-day-view>
                    </div>
                </div>
                <div>
                    <p>
                        结束日期
                        <template v-if="canBeInfinity.end">
                            <input
                                type="checkbox"
                                :checked="innerValue.end === null"
                                @click="event => selectInfinitDate('end', event.target.checked)"
                            >&nbsp;不限
                        </template>
                    </p>
                    <div class="date-picker-view" :class="{'date-infinity': innerValue.end === null}">
                        <pl-month-view
                            :current-year="currentEndYear"
                            :current-month="currentEndMonth"
                            :real-range-begin="realRangeBegin"
                            :real-range-end="realRangeEnd"
                            @change="value => changeDayList('end', value)"
                        ></pl-month-view>
                        <pl-day-view
                            class="day-view"
                            :day-title="dayTitle"
                            :current-date="innerValue.end || new Date('9999', '11', '31')"
                            :current-month="currentEndMonth"
                            :current-year="currentEndYear"
                            :begin-date="realEndLimitStart"
                            :end-date="realLimitEnd"
                            @change="value => selectDate('end', value)"
                        ></pl-day-view>
                    </div>
                </div>
            </div>
            <p class="pl-date-range-actions">
                <pl-button type="primary" size="small" @click="confirm">确定</pl-button>
                <pl-button size="small" @click="reset">取消</pl-button>
            </p>
        </div>
    </transition>
</div>

</template>

<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/transitions.styl'

day-view-border-color = #f2f2f2

p
    margin 0
.pl-date-range
    display inline-block
    position relative
    &-picker
        position absolute
        background #fff
        top 30px
        left -85px
        border 1px solid #e0e0e0
        border-radius 5px
        padding 4px
        width 348px
        z-index 10
        // TODO因为目前transition里写transform-origin会有抖动，暂时先扔这里
        // 具体原因猜测原因是因为生效实际，回头再来测试下看看
        &-bottom
            right 0
            transform-origin center top
        &-top
            right 0
            transform-origin center bottom
    &-quick-search
        margin 10px 0 0
        clearfix()
        a
            float left
            text-decoration none
            font-size 12px
            color #9d9d9d
            margin-left 5px
            padding-right 5px
            border-right 1px solid #9d9d9d
            &:last-child
                border-right 0
            &:hover
                text-decoration underline
    &-main
        margin-top 10px
        clearfix()
        > div
            float left
            font-size 12px
            color #9d9d9d
            & + div
                margin-left 24px
            p
                padding-left 5px
    &-actions
        margin 10px 5px 10px 0
        text-align right
.date-infinity
    // TODO这货我记得不兼容IE9，后面看看要不要改一下
    pointer-events none
    opacity .4
.day-view
    border 1px solid day-view-border-color
</style>
