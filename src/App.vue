<template>
<div id="app">
    <router-view></router-view>
</div>
</template>

<script>
export default {
    name: 'app'
};
</script>

<style lang="stylus">
body
    font-family 'Avenir', Helvetica, Arial, sans-serif
#app
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    color #2c3e50
    margin-top 60px
</style>
