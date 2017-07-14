<script>
/**
 * @file 分页组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * 12 Apr 2017
 */

import plPagination from '@/components/pagination';

export default {
    data() {
        return {
            currentPage: 1,
            totalPage: 10,
            layout: {
                total: true,
                jumper: true,
                pageSize: true
            },
            pageSize: 20,
            size: 'small'
        };
    },
    methods: {
        changeCurrent(page) {
            this.currentPage = page;
        },
        changePageSize(size) {
            this.pageSize = size;
        }
    },
    components: {
        plPagination
    }
};
</script>

<template>

<div>
    <h1>DSP内部使用风格</h1>
    <div>
        <pl-pagination
            :current-page="currentPage"
            :totalPage="totalPage"
            :layout="layout"
            :pageSize="pageSize"
            :size="size"
            @current-change="changeCurrent"
            @page-size-change="changePageSize"
        ></pl-pagination>
        <p>{{currentPage}}</p>
        <p>{{pageSize}}</p>
    </div>
    <h1>admin/adpos内部使用风格</h1>
    <div>
        <pl-pagination
            is-old
            :current-page="currentPage"
            :total-page="totalPage"
            :layout="layout"
            :page-size="pageSize"
            :size="size"
            @current-change="changeCurrent"
            @page-size-change="changePageSize"
        ></pl-pagination>
        <p>{{currentPage}}</p>
        <p>{{pageSize}}</p>
    </div>
</div>

</template>
