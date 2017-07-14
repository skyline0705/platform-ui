/**
 * @file 工具函数
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 18 Apr 2017
 */

import {noop} from '../common/util';
function translateNodeList({
    list,
    parentId = null,
    filterNodeMethod,
    filterValue
}) {
    return list.map(node => {
        const filterResult = filterNodeMethod(filterValue, node);
        return {
            node: node,
            parentId: parentId,
            isExpanded: null,
            checkedStatus: 'none',
            // 控制filter的
            show: filterResult || typeof filterResult === 'undefined'
        };
    });
}

export function changeAncestorCheckedStatus(nodeMap, node) {
    let parent = nodeMap[nodeMap[node.id].parentId];
    while (parent) {
        const checkedNodeCount = parent.node.children.filter(item => nodeMap[item.id].checkedStatus === 'all').length;
        if (checkedNodeCount && checkedNodeCount === parent.node.children.length) {
            parent.checkedStatus = 'all';
        } else if (checkedNodeCount) {
            parent.checkedStatus = 'half';
        } else {
            parent.checkedStatus = 'none';
        }
        parent = nodeMap[parent.parentId];
    }
}

export function changeChildrenCheckedStatus(nodeMap, node, checkedStatus) {
    if (!node.children || !node.children.length) {
        return;
    }
    let nodeList = [...node.children];
    // 处理子节点选中态, TODO这里可能有重复工作量
    while (nodeList.length) {
        let node = nodeList.shift();
        if (node.children && node.children.length) {
            nodeList = [...nodeList, ...node.children];
        }
        nodeMap[node.id].checkedStatus = checkedStatus;
    }
}

export function translateTreeToMap({
    defaultExpandedKeyList,
    defaultCheckedKeyList,
    tree,
    autoExpandParent = true,
    filterValue = '',
    filterNodeMethod = noop
}) {
    let nodeList = translateNodeList({
        list: tree,
        filterNodeMethod,
        filterValue
    });
    // 生成map
    const map = {};
    const showNodeList = [];
    while (nodeList.length) {
        let item = nodeList.shift();
        map[item.node.id] = item;

        if (filterNodeMethod !== noop && item.show) {
            showNodeList.push(item);
        }

        if (Array.isArray(item.node.children) && item.node.children.length) {
            let children = translateNodeList({
                list: item.node.children,
                parentId: item.node.id,
                filterValue,
                filterNodeMethod
            });
            nodeList = [...nodeList, ...children];
        }
    }
    if (showNodeList.length && showNodeList.length !== Object.keys(map).length) {
        showNodeList.forEach(item => {
            let node = item;
            while (node.parentId !== null) {
                node = map[node.parentId];
                node.show = true;
            }
        });
    }

    defaultExpandedKeyList.forEach(key => {
        let item = map[key];
        if (!item) {
            return;
        }
        if (autoExpandParent) {
            while (item.parentId !== null) {
                item.isExpanded = true;
                item = map[item.parentId];
            }
        }
        item.isExpanded = true;
    });

    // TODO差半选逻辑
    defaultCheckedKeyList.forEach(key => {
        const item = map[key];
        if (!item) {
            return;
        }
        item.checkedStatus = 'all';

        changeAncestorCheckedStatus(map, item.node);
        changeChildrenCheckedStatus(map, item.node, 'all');
    });

    return map;
}
