<script>
/**
 * @file 模态框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */
import plModal from '@/components/modal';
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
        plModal,
        plButton
    }
};
</script>

<template>

<div>
    <div>
        <pl-button type="primary" @click="showModal('modal')">modal</pl-button>
        <pl-modal ref="modal">
            <template slot="title">
                你好
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal>
    </div>
    <h2>自定义宽度+事件示例</h2>
    <div>
        <pl-button type="primary" @click="showModal('modal-width')">modal</pl-button>
        <pl-modal
            ref="modal-width"
            width="900px"
            @before-show="alert('显示之前')"
            @after-show="alert('显示之后')"
            @before-hide="alert('隐藏之前')"
            @after-hide="alert('隐藏之后')"
        >
            <template slot="title">
                你好
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal>
    </div>
</div>

</template>
