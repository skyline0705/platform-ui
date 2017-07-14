<script>
/**
 * @file 导航面包屑
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Apr 18, 2017
 */

export default {
    name: 'pl-breadcrumb',
    props: {
        separator: {
            type: String,
            default: '/'
        }
    }
};
</script>

<template>

<nav>
    <ul>
        <slot></slot>
    </ul>
</nav>

</template>

<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/variables.styl'
ul
    padding 0
    margin 0
li
    list-style none
ul
    clearfix()
    li
        float left
</style>
