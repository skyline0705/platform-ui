<script>
/**
 * @file 价格输入框示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 20 Mar 2017
 */

import plTree from '@/components/tree';
import plButton from '@/components/button';
import plInput from '@/components/input';

let id = 0;
function generateTree(deep) {
    var floor = 5;
    return Array(floor).fill(1).map(() => {
        ++id;
        const node = {
            id: id,
            text: '我是节点' + id
        };
        if (deep) {
            node.children = generateTree(deep - 1);
        }
        return node;
    });
}

export default {
    data() {
        return {
            defaultExpandedKeyList: [2],
            defaultCheckededKeyList: [2],
            data: generateTree(3, id),
            filterWord: '节点3'
        };
    },
    methods: {
        alert(item, checked) {
            console.log(item);
            console.log(checked);
        },
        showCheckedList(ref) {
            console.log(this.$refs[ref].getCheckedItemList());
        },
        filter(value, node) {
            return node.text.includes(value);
        }
    },
    watch: {
        filterWord(val) {
            this.$refs.new.filter(val);
        }
    },
    components: {
        plTree,
        plButton,
        plInput
    }
};
</script>

<template>

<div>
    <pl-input v-model="filterWord"></pl-input>
    <div>
        <pl-tree
            :data="data"
            ref="new"
            :default-expanded-key-list="defaultExpandedKeyList"
            :default-checked-key-list="defaultCheckededKeyList"
            @expand="alert"
            @collapse="alert"
            @checked-change="alert"
            @row-click="alert"
            :filter-node-method="filter"
            show-checkbox
        ></pl-tree>
        <pl-button type="primary" @click="showCheckedList('new')">查看选中项</pl-button>
    </div>
</div>

</template>
