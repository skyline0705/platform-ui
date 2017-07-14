<script>
/**
 * @file confirm组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Aug 15, 2016
 */

import modal from '../modal';
import plButton from '../button';
export default {
    name: 'pl-modal-alert',
    props: {
        width: {
            type: String,
            default: '370px'
        },
        isOld: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            msg: ''
        };
    },
    methods: {
        confirm() {
            this.$refs.modal.hide();
        },
        hide() {
            this.$refs.modal.hide();
        },
        show(msg) {
            if (msg) {
                this.msg = msg;
            }
            this.$refs.modal.show();
        },
        trigger(eventName) {
            this.$emit(eventName);
        }
    },
    components: {
        modal,
        plButton
    }
};
</script>

<template>
<div>
    <modal
        :is-old="isOld"
        :width="width"
        ref="modal"
        @before-show="trigger('before-show')"
        @after-show="trigger('after-show')"
        @before-hide="trigger('before-hide')"
        @after-hide="trigger('after-hide')"
    >
        <template slot="title">
            <slot name="title">提示</slot>
        </template>
        <div class="modal-alert">
            <slot>{{msg}}</slot>
        </div>
        <div class="modal-alert-action">
            <pl-button :is-old="isOld" type="primary" @click="confirm">确定</pl-button>
        </div>
    </modal>
</div>
</template>
<style lang="stylus" scoped>
.modal-alert
    margin-top 0
    &-action
        margin-top 20px
        text-align center
[is-old] .modal-alert-action
    text-align right
</style>
