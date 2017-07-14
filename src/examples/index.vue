<script>
export default {
    data() {
        return {
            rule: /abc/
        };
    }
};
</script>
<template>
<div>
    <h1>表单类：</h1>
    <ul>
        <li>
            <router-link to="/button">按钮</router-link>
        </li>
        <li>
            <router-link to="/input">输入框</router-link>
        </li>
        <li>
            <router-link to="/number-input">数字输入框</router-link>
        </li>
        <li>
            <router-link to="/price-input">价格输入框</router-link>
        </li>
        <li>
            <router-link to="/radio">单选框</router-link>
        </li>
        <li>
            <router-link to="/checkbox">多选框</router-link>
        </li>
        <li>
            <router-link to="/textarea">文本域</router-link>
        </li>
        <li>
            <router-link to="/select">下拉框</router-link>
        </li>
        <li>
            <router-link to="/upload">文件上传</router-link>
        </li>
        <li>
            <router-link to="/date-picker">日期选择器</router-link>
        </li>
        <li>
            <router-link to="/date-range-picker">日期范围选择器</router-link>
        </li>
    </ul>
    <h1>数据类：</h1>
    <ul>
        <li>
            <router-link to="/table">表格</router-link>
        </li>
        <li>
            <router-link to="/tree">树型组件</router-link>
        </li>
    </ul>
    <h1>模态框类：</h1>
    <ul>
        <li>
            <router-link to="/modal">基础模态框</router-link>
        </li>
        <li>
            <router-link to="/modal-alert">警告模态框</router-link>
        </li>
        <li>
            <router-link to="/modal-confirm">确认模态框</router-link>
        </li>
    </ul>
    <h1>导航类：</h1>
    <ul>
        <li>
            <router-link to="/tabs">标签</router-link>
        </li>
        <li>
            <router-link to="/steps">步骤条</router-link>
        </li>
        <li>
            <router-link to="/breadcrumb">面包屑</router-link>
        </li>
        <li>
            <router-link to="/pagination">分页</router-link>
        </li>
    </ul>
    <h1>其他：</h1>
    <ul>
        <li>
            <router-link to="/tooltip">提示浮层</router-link>
        </li>
        <li>
            <router-link to="/popover">popover浮层</router-link>
        </li>
        <li>
            <router-link to="/loading">加载框</router-link>
        </li>
    </ul>
</div>

</template>
