<script>
/**
 * @file 确认模态框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plModalAlert from '@/components/modal-alert';
import plButton from '@/components/button';
export default {
    methods: {
        showModal(ref) {
            this.$refs[ref].show();
        },
        alert(msg) {
            alert(msg);
        }
    },
    components: {
        plModalAlert,
        plButton
    }
};
</script>

<template>

<div>
    <div>
        <pl-button type="primary" @click="showModal('modal-alert')">modal-alert</pl-button>
        <pl-modal-alert ref="modal-alert">
            <template slot="title">
                你好
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal-alert>
    </div>
    <h2>自定义宽度+事件示例</h2>
    <div>
        <pl-button type="primary" @click="showModal('modal-alert-width')">modal-alert</pl-button>
        <pl-modal-alert
            ref="modal-alert-width"
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
        </pl-modal-alert>
    </div>
</div>

</template>
