<script>
/**
 * @file select
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Jun 20, 2016
 */

export default {
    name: 'pl-select',
    model: {
        prop: 'value',
        event: 'change'
    },
    props: {
        value: {
            default: '',
            required: true
        },
        name: {
            type: String
        },
        options: {
            type: Array,
            required: true
        },
        width: {
            type: String,
            default: '98px'
        },
        height: {
            type: String,
            default: '25px'
        },
        maxHeight: {
            type: String,
            default: '245px'
        },
        disabled: {
            type: Boolean,
            default: false
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            position: 'bottom',
            isListShow: false
        };
    },
    computed: {
        activeItem() {
            return this.options.find(item => item.value === this.value);
        }
    },
    methods: {
        showList() {
            if (this.disabled) {
                return;
            }
            if (!this.readonly) {
                this.isListShow = true;
            }
        },
        changeItem(item) {
            this.isListShow = false;
            this.$emit('change', item.value);
        },
        getListHeight() {
            // TODO性能maybe可能有点低……以后再想想有什么好办法来解决吧
            let copyList = this.$refs.list.cloneNode(true);
            copyList.style.display = 'block';
            this.$refs.list.parentNode.insertBefore(copyList, this.$refs.list);
            const height = copyList.offsetHeight;
            this.$refs.list.parentNode.removeChild(copyList);
            copyList = null;
            return height;
        },
        changePosition() {
            // TODO性能maybe可能有点低……
            this.position = window.innerHeight - this.$el.getBoundingClientRect().bottom > this.getListHeight()
                ? 'bottom'
                : 'top';
        },
        hideDropdown(event) {
            if (
                this.$refs.input !== event.target
                && this.$refs.icon !== event.target
            ) {
                this.isListShow = false;
            }
        }
    },
    mounted() {
        window.addEventListener('resize', this.changePosition);
        window.addEventListener('scroll', this.changePosition);
        window.addEventListener('click', this.hideDropdown);
        this.changePosition();
    },
    beforeDestroy() {
        window.removeEventListener('resize', this.changePosition);
        window.removeEventListener('scroll', this.changePosition);
        window.removeEventListener('click', this.hideDropdown);
    },
    watch: {
        isListShow(val) {
            if (!val) {
                return;
            }
            this.changePosition();
        }
    }
};
</script>

<template>

<div class="select">
    <input
        type="hidden"
        :name="name"
        :value="value"
        :disabled="disabled"
        :readonly="readonly"
    >
    <div
        class="select-now"
        :class="{
            selected: isListShow,
            'open-at-top': position === 'top' && isListShow,
            'open-at-bottom': position === 'bottom' && isListShow,
            disabled: disabled
        }"
        @click="showList"
        :style="{
            'height': height,
            'line-height': height,
            'width': width
        }"
        ref="input"
    >
        {{activeItem ? activeItem.text : ''}}
        <!-- TODO，后续这个i其实可以通过伪元素实现，就可以避免这个bug了 -->
        <i ref="icon"></i>
    </div>
    <transition :name="position === 'top' ? 'fade-bottom' : 'fade-top'">
        <ul
            ref="list"
            class="select-list"
            :class="{
                'select-list-top': position === 'top',
                'select-list-bottom': position === 'bottom'
            }"
            :style="{
                minWidth: width,
                bottom: position === 'top' && 'calc(' + height  + ' - 1px)' || 'auto',
                top: position === 'bottom' && 'calc(' + height  + ' - 1px)' || 'auto',
                maxHeight: maxHeight
            }"
            v-show="isListShow"
        >
            <li
                v-for="(item, index) in options"
                :class="{selected: item.value === value}"
                @click="changeItem(item)"
                :key="item.value"
                :title="item.text"
                :style="{
                    'height': 'calc(' + height  + ' + 3px)',
                    'line-height': 'calc(' + height  + ' + 3px)'
                }"
            >{{item.text}}</li>
        </ul>
    </transition>
</div>

</template>

<style lang="stylus" scoped>
@import '../common/transitions.styl'
@import '../common/variables.styl'

border-color = #eaeaea
hover-border-color = #e0e0e0
bg-color = #fff
disabled-bg-color = #eef1f6
select-z-index = 1000

ul
    margin 0
    padding 0
.select
    display inline-block
    position relative
    font-size font-size-small
    vertical-align middle
    &-now
        position relative
        background bg-color
        border 1px solid border-color
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        height 25px
        line-height 25px
        cursor pointer
        box-sizing border-box
        border-radius 3px
        padding 0 18px 0 5px
        color font-color-secondary
        zoom 1
        transition border-color .15s ease-in-out
        &.open-at-top
            border-top-left-radius 0
            border-top-right-radius 0
        &.open-at-bottom
            border-bottom-left-radius 0
            border-bottom-right-radius 0
        i
            position absolute
            width 3px
            height 3px
            border 1px solid #818181
            border-bottom none
            border-right none
            transform rotate(-135deg)
            top 50%
            right 5px
            margin-top -3px
        &.selected,
        &:hover
            border 1px solid hover-border-color
        &.disabled
            cursor not-allowed
            background disabled-bg-color
            &:hover
               border 1px solid border-color
    &-list
        position absolute
        left 0
        text-align left
        background bg-color
        border 1px solid hover-border-color
        overflow-y auto
        overflow-x hidden
        z-index select-z-index
        border-radius 3px
        box-sizing border-box
        &-top
            bottom 24px
            border-bottom-left-radius 0
            border-bottom-right-radius 0
            // TODO 这个属性目前因为浏览器计算transform-origin的时候不知道是什么写法引起的bug，
            // 写在transition hook中后半段会不生效，暂时先写在这里
            transform-origin center bottom
        &-bottom
            top 24px
            border-top-left-radius 0
            border-top-right-radius 0
            // TODO 同上
            transform-origin center top
        li
            padding 0 5px
            line-height 28px
            height 28px
            color font-color-secondary
            background bg-color
            cursor pointer
            overflow hidden
            border-top solid 1px #F2F2F2
            text-overflow ellipsis
            white-space nowrap
            &:first-child
                border-top none
            &.selected,
            &:hover
                background brand-primary
                color bg-color


.select[is-old]
    .select-now
        color font-color-primary
        background #fafbfc
        border-radius 0
        i
            margin-top -2px
            border 5px solid
            width 0
            height 0
            border-color #cfd8ee transparent transparent
            transform rotate(0);
        &.selected i
            margin-top -8px
            border-color transparent transparent old-brand-primary transparent
    .select-list
        li
            &.selected,
            &:hover
                background old-brand-primary
</style>
