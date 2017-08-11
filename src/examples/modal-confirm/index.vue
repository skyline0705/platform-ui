<script>
/**
 * @file 确认模态框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plModalConfirm from '@/components/modal-confirm';
import plButton from '@/components/button';
export default {
    methods: {
        async showModal(ref) {
            try {
                await this.$refs[ref].show();
                alert('我点击了确定');
            } catch (e) {
                alert('我点击了取消');
            }
        },
        alert(msg) {
            alert(msg);
        }
    },
    components: {
        plModalConfirm,
        plButton
    }
};
</script>

<template>

<div>
    <div>
        <pl-button type="primary" @click="showModal('modal-confirm')">modal-confirm</pl-button>
        <pl-modal-confirm ref="modal-confirm">
            <template slot="title">
                你好
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal-confirm>
    </div>
    <h2>自定义宽度+事件示例</h2>
    <div>
        <pl-button type="primary" @click="showModal('modal-confirm-width')">modal-confirm</pl-button>
        <pl-modal-confirm
            ref="modal-confirm-width"
            width="600px"
            @before-show="alert('显示之前')"
            @after-show="alert('显示之后')"
            @before-hide="alert('隐藏之前')"
            @after-hide="alert('隐藏之后')"
        >
            <template slot="title">
                你好
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal-confirm>
    </div>
</div>

</template>
