<script>
/**
 * @file confirm组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Aug 15, 2016
 */

import plModal from '../modal';
import plButton from '../button';
export default {
    name: 'pl-modal-confirm',
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
            isShow: false,
            msg: ''
        };
    },
    methods: {
        confirm() {
            this.nowConfirm.resolve();
            this.nowConfirm = null;
            this.$refs.modal.hide();
        },
        cancel() {
            this.nowConfirm.reject();
            this.nowConfirm = null;
            this.$refs.modal.hide();
        },
        show(msg) {
            this.msg = msg;
            // TODO不知道回不回有内存泄露…
            return new Promise((resolve, reject) => {
                this.nowConfirm = {resolve, reject};
                this.$refs.modal.show();
            });
        },
        hide() {
            this.$refs.modal.hide();
        },
        trigger(eventName) {
            this.$emit(eventName);
        }
    },
    beforeDestroy() {
        this.nowConfirm = null;
    },
    components: {
        plModal,
        plButton
    }
};
</script>

<template>
<div>
    <pl-modal
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
        <div class="modal-confirm">
            <slot>{{msg}}</slot>
        </div>
        <div class="modal-confirm-action">
            <pl-button :is-old="isOld" type="primary" @click="confirm">确定</pl-button>
            <pl-button :is-old="isOld" @click="cancel">取消</pl-button>
        </div>
    </pl-modal>
</div>
</template>

<style lang="stylus" scoped>
.modal-confirm
    margin-top 0
    &-action
        margin-top 20px
        text-align center

[is-old] .modal-confirm-action
    text-align right
</style>
