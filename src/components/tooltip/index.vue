<script>
/**
 * @file tooltip
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * April 30,2016
 */

import Vue from 'vue';

function getOffset(el) {
    return el.getBoundingClientRect();
}
function getToolTipSize(tooltip) {
    let copyTooltip = tooltip.cloneNode(true);
    document.body.appendChild(copyTooltip);
    copyTooltip.style.top = '-99999px';
    copyTooltip.style.position = 'fixed';
    copyTooltip.style.display = 'block';
    copyTooltip.style.width = '';
    let width = copyTooltip.offsetWidth;
    let height = copyTooltip.offsetHeight;
    document.body.removeChild(copyTooltip);
    return {width, height};
}

function calculatePosition() {
    const tooltip = this.$refs.tooltip;
    const trigger = this.$slots.default[0].elm;
    if (!tooltip || !trigger) {
        return;
    }
    const {width, height} = getToolTipSize(tooltip);
    tooltip.style.width = Math.ceil(width) + 'px';

    const offset = getOffset(trigger);
    switch (this.placement) {
        case 'top':
            this.positionInfo.left = offset.left - width / 2 + offset.width / 2;
            this.positionInfo.top = offset.top - height;
            break;
        case 'left':
            this.positionInfo.left = offset.left - width;
            this.positionInfo.top = offset.top + trigger.offsetHeight / 2 - height / 2;
            break;
        case 'right':
            this.positionInfo.left = offset.left + trigger.offsetWidth;
            this.positionInfo.top = offset.top + trigger.offsetHeight / 2 - height / 2;
            break;
        case 'bottom':
            this.positionInfo.left = offset.left - width / 2 + offset.width / 2;
            this.positionInfo.top = offset.top + trigger.offsetHeight;
            break;
    }
}
export default {
    name: 'pl-tooltip',
    props: {
        content: {
            type: String
        },
        placement: {
            type: String,
            default: 'right'
        },
        maxWidth: {
            type: Number,
            default: 200
        },
        delay: {
            type: Number,
            default: 0
        }
    },
    computed: {
        mode() {
            return this.delay > 0 ? 'delay' : 'normal';
        }
    },
    data() {
        return {
            positionInfo: {
                top: 0,
                left: 0
            },
            show: false
        };
    },
    methods: {
        triggerShow() {
            if (this._timer) {
                clearTimeout(this._timer);
                this._timer = null;
                return;
            }
            this.createTooltip();
            calculatePosition.call(this);
            this.show = true;
        },
        triggerHide() {
            if (this.mode === 'delay') {
                this._timer = setTimeout(() => {
                    this.show = false;
                }, this.delayTime);
                return;
            }
            this.show = false;
        },
        destroyTooltip() {
            // TODO后续再看这块流程怎么处理
            try {
                document.body.removeChild(this.$refs.tooltip);
            } catch (e) {}
        },
        createTooltip() {
            document.body.appendChild(this.$refs.tooltip);
        }
    },
    mounted() {
        calculatePosition.call(this);
    },
    beforeCreate() {
        this.tooltip = new Vue({
            data() {
                return {
                    node: ''
                };
            },
            render() {
                return this.node;
            }
        }).$mount();
    },
    beforeDestroy() {
        this.destroyTooltip();
        this.tooltip.$destroy();
        this.tooltip = null;
        this._timer = null;
    },
    render() {
        /* eslint-disable no-extra-parens */
        this.tooltip.node = (
            <transition
                name="scale"
                on-after-leave={this.destroyTooltip}
            >
                <div
                    class={['tooltip', this.placement]}
                    ref="tooltip"
                    v-show={this.show}
                    style={{
                        top: this.positionInfo.top + 'px',
                        left: this.positionInfo.left + 'px'
                    }}
                >
                    <div class="tooltip-arrow"></div>
                    <div
                        class="tooltip-content"
                        style={{
                            'max-width': this.maxWidth + 'px'
                        }}
                        on-mouseenter={this.triggerShow}
                        on-mouseleave={this.triggerHide}
                    >
                        {this.$slots.content ? this.$slots.content : this.content}
                    </div>
                </div>
            </transition>
        );
        this.tooltip.hasInited = true;
        const vnode = this.$slots.default[0];
        if (!vnode.tag) {
            throw new Error([
                '[platform-ui pl-tooltip error]: ',
                'trigger element should not be a text node.'
            ].join(''));
        }
        vnode.data = vnode.data || {};
        vnode.data.on = vnode.data.on || {};
        // TODO后面再拆util吧
        vnode.data.on.mouseenter = Array.isArray(vnode.data.on.mouseenter)
            ? vnode.data.on.mouseenter
            : [];
        vnode.data.on.mouseleave = Array.isArray(vnode.data.on.mouseleave)
            ? vnode.data.on.mouseleave
            : [];
        vnode.data.on.mouseenter = [...vnode.data.on.mouseenter, this.triggerShow];
        vnode.data.on.mouseleave = [...vnode.data.on.mouseleave, this.triggerHide];
        return vnode;
    }
};
</script>

<style lang="stylus" scoped>
@import '../common/variables.styl'
@import '../common/transitions.styl'
// TODO 后续所有全局浮层要统一管理才可以
tooltip-color = #fff
tooltip-bg = #000
tooltip-opacity = .9
tooltip-arrow-width = 5px
tooltip-arrow-color = #000

.tooltip
    position fixed
    z-index global-zindex
    display block
    box-sizing border-box
    font-size 12px
    line-height 1.5
    &.in
        opacity tooltip-opacity
    &.top
        margin-top -3px
        padding tooltip-arrow-width 0

    &.right
        margin-left 3px
        padding 0 tooltip-arrow-width
    &.bottom
        margin-top 3px
        padding tooltip-arrow-width 0
    &.left
        margin-left -3px
        padding: 0 tooltip-arrow-width

    &-content
        padding 3px 8px
        color tooltip-color
        text-align center
        background-color tooltip-bg
        border-radius 4px

    // Arrows
    &-arrow
        position absolute
        width 0
        height 0
        border-color transparent
        border-style solid
    &.top &-arrow
        bottom 0
        left 50%
        margin-left -(tooltip-arrow-width)
        border-width tooltip-arrow-width tooltip-arrow-width 0
        border-top-color tooltip-arrow-color
    &.right &-arrow
        top 50%
        left 0
        margin-top -(tooltip-arrow-width)
        border-width tooltip-arrow-width tooltip-arrow-width tooltip-arrow-width 0
        border-right-color tooltip-arrow-color
    &.left &-arrow
        top 50%
        right 0
        margin-top -(tooltip-arrow-width)
        border-width tooltip-arrow-width 0 tooltip-arrow-width tooltip-arrow-width
        border-left-color tooltip-arrow-color
    &.bottom &-arrow
        top 0
        left 50%
        margin-left -(tooltip-arrow-width)
        border-width 0 tooltip-arrow-width tooltip-arrow-width
        border-bottom-color tooltip-arrow-color
i
    display inline-block
    width 18px
    height 18px
    vertical-align middle
    &:hover
        background-position 0 -18px
</style>
