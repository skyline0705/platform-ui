<script>
/**
 * @file 树组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 17 Apr 2017
 */

import plTreeItem from './tree-item';
import {
    changeChildrenCheckedStatus,
    changeAncestorCheckedStatus,
    translateTreeToMap
} from './util';

export default {
    name: 'pl-tree',
    props: {
        data: {
            type: Array,
            required: true
        },
        defaultExpandedKeyList: {
            type: Array,
            default() {
                return [];
            }
        },
        defaultCheckedKeyList: {
            type: Array,
            default() {
                return [];
            }
        },
        showCheckbox: {
            type: Boolean,
            default: false
        },
        filterNodeMethod: {
            type: Function
        }
    },
    data() {
        const nodeMap = translateTreeToMap({
            defaultExpandedKeyList: this.defaultExpandedKeyList,
            defaultCheckedKeyList: this.defaultCheckedKeyList,
            filterNodeMethod: this.filterNodeMethod,
            tree: this.data
        });
        const expandedKeyList = Object.keys(nodeMap)
            .map(key => {
                return nodeMap[key].isExpanded ? key : null;
            })
            .filter(key => key !== null);

        const checkedKeyList = Object.keys(nodeMap)
            .map(key => {
                return nodeMap[key].checkedStatus === 'all' ? key : null;
            })
            .filter(key => key !== null);

        return {
            filterValue: '',
            nodeMap: nodeMap,
            expandedKeyList: expandedKeyList,
            checkedKeyList: checkedKeyList
        };
    },
    methods: {
        filter(value) {
            this.filterValue = value;
        },
        fold(item) {
            const isExpanded = this.nodeMap[item.id].isExpanded;
            this.nodeMap[item.id].isExpanded = !isExpanded;
            const type = isExpanded ? 'expand' : 'collapse';

            // TODO后续再改，每次都遍历一遍效率忒低
            this.expandedKeyList = Object.keys(this.nodeMap)
            .map(key => {
                return this.nodeMap[key].isExpanded ? key : null;
            })
            .filter(key => key !== null);
            this.$emit(type, item);
        },
        changeCheckedStatus({node, checked}) {
            if (!this.showCheckbox) {
                return;
            }
            this.nodeMap[node.id].checkedStatus = checked ? 'all' : 'none';

            // TODO后续再改，每次都遍历一遍效率忒低
            changeChildrenCheckedStatus(this.nodeMap, node, this.nodeMap[node.id].checkedStatus);
            changeAncestorCheckedStatus(this.nodeMap, node);

            this.checkedKeyList = Object.keys(this.nodeMap)
            .map(key => {
                return this.nodeMap[key].checkedStatus === 'all' ? key : null;
            })
            .filter(key => key !== null);
            this.$emit('checked-change', node, checked);
        },
        getCheckedItemList() {
            if (!this.showCheckbox) {
                return [];
            }
            return this.checkedKeyList.map(key => {
                return this.nodeMap[key].node;
            });
        },
        rowClick(item) {
            this.$emit('row-click', item);
        }
    },
    components: {
        plTreeItem
    },
    watch: {
        data: {
            deep: true,
            // TODO不知道为什么每次data修改会触发两次变化，回头翻下源码再看看
            handler() {
                this.nodeMap = translateTreeToMap({
                    defaultExpandedKeyList: this.expandedKeyList,
                    defaultCheckedKeyList: this.checkedKeyList,
                    filterNodeMethod: this.filterNodeMethod,
                    filterValue: this.filterValue,
                    tree: this.data,
                    autoExpandParent: false
                });
            }
        },
        defaultExpandedKeyList(val) {
            // TODO重新生成树其实效率有点慢，回头再看怎么弄
            this.nodeMap = translateTreeToMap({
                defaultExpandedKeyList: val,
                defaultCheckedKeyList: this.checkedKeyList,
                filterNodeMethod: this.filterNodeMethod,
                filterValue: this.filterValue,
                tree: this.data
            });
            this.expandedKeyList = Object.keys(this.nodeMap)
                .map(key => {
                    return this.nodeMap[key].isExpanded ? key : null;
                })
                .filter(key => key !== null);
        },
        defaultCheckedKeyList(val) {
            // TODO重新生成树其实效率有点慢，回头再看怎么弄
            this.nodeMap = translateTreeToMap({
                defaultExpandedKeyList: this.expandedKeyList,
                defaultCheckedKeyList: val,
                filterNodeMethod: this.filterNodeMethod,
                filterValue: this.filterValue,
                tree: this.data,
                autoExpandParent: false
            });
            this.checkedKeyList = Object.keys(this.nodeMap)
                .map(key => {
                    return this.nodeMap[key].checkedStatus === 'all' ? key : null;
                })
                .filter(key => key !== null);
        },
        filterValue(val) {
            // TODO重新生成树其实效率有点慢，回头再看怎么弄
            this.nodeMap = translateTreeToMap({
                defaultExpandedKeyList: this.expandedKeyList,
                defaultCheckedKeyList: this.checkedKeyList,
                filterNodeMethod: this.filterNodeMethod,
                filterValue: val,
                tree: this.data,
                autoExpandParent: false
            });
        }
    }
};
</script>

<template>

<div>
    <ul>
        <pl-tree-item
            v-for="item in data"
            :item="item"
            :key="item.id"
            :node-map="nodeMap"
            :level="0"
            :show-checkbox="showCheckbox"
            @fold="fold"
            @checked-change="changeCheckedStatus"
            @row-click="rowClick"
            v-show="nodeMap[item.id].show"
        ></pl-tree-item>
    </ul>
</div>

</template>

<style lang="stylus" scoped>
ul
    margin 0
    padding 0
    list-style none
</style>
