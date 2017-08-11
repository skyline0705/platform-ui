<script>
/**
 * @file 表格示例
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 8 Apr 2017
 */

import plTable from '@/components/table';
import plTableColumn from '@/components/table/table-column';

function genetateRowData(rowCount, columns) {
    const rowData = () => {
        return columns
            .map(column => column.id)
            .reduce((obj, id) => {
                obj[id] = (Math.random() * 10000).toFixed(2);
                return obj;
            }, {});
    };
    return Array(rowCount).fill('').map(() => {
        return Object.assign({}, rowData());
    });
}

export default {
    data() {
        const columns = [{
            id: 'action',
            text: '',
            fixed: true,
            width: 30
        }, {
            id: 'selection',
            text: ''
        }, {
            id: 'name',
            text: '广告单元'
        }, {
            id: 'name2',
            text: '广告单元',
            width: 450
        }, {
            id: 'name3',
            text: '广告单元',
            width: 550
        }];
        return {
            columns: columns,
            data: genetateRowData(200, columns)
        };
    },
    methods: {
        alert(event, {index}) {
            alert(index);
        }
    },
    components: {
        plTable,
        plTableColumn
    }
};
</script>

<template>

<div style="width: 900px;">
    <pl-table
        :data="data"
        :height="300"
        @row-click="alert"
    >
        <pl-table-column
            v-for="column in columns"
            :fixed="column.fixed"
            :id="column.id"
            resizable
            :width="column.width"
            :key="column.id"
        >
            <template slot="column" scope="scope">
                {{scope.$index}}
                {{column.text}}
            </template>
            <template slot="cell" scope="scope">
                {{scope.row[column.id]}}
            </template>
        </pl-table-column>
    </pl-table>
</div>

</template>
