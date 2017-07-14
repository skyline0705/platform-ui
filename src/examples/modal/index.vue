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
    <h1>DSP内部使用风格</h1>
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
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-button is-old type="primary" @click="showModal('old-modal')">modal</pl-button>
        <pl-modal is-old ref="old-modal">
            <template slot="title">
                我是老的
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal>
    </div>
    <h2>自定义宽度</h2>
    <div>
        <pl-button is-old type="primary" @click="showModal('old-modal-width')">modal</pl-button>
        <pl-modal
            is-old
            ref="old-modal-width"
            width="900px"
            @before-show="alert('显示之前')"
            @after-show="alert('显示之后')"
            @before-hide="alert('隐藏之前')"
            @after-hide="alert('隐藏之后')"
        >
            <template slot="title">
                我是老的
            </template>
            啦啦啦啦啦啦啦啦
        </pl-modal>
    </div>
</div>

</template>
