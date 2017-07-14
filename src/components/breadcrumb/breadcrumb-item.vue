<script>
/**
 * @file 导航面包屑
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Nov 18, 2016
 */


function json2UrlParams(obj) {
    if (!obj) {
        return '';
    }
    return Object.keys(obj).map(key => {
        if (!Array.isArray(obj[key])) {
            return `${key}=${encodeURIComponent(JSON.stringify(obj[key]))}`;
        }
        return obj[key].map(item => {
            return `${key}=${encodeURIComponent(JSON.stringify(item))}`;
        }).join('&');
    }).join('&');
}

function extend(target, ...args) {
    args.forEach(obj => {
        Object.keys(obj).forEach(key => {
            target[key] = obj[key];
        });
    });
    return target;
}

export default {
    name: 'pl-breadcrumb-item',
    props: {
        to: {
            type: [String, Object],
            default: ''
        },
        replace: {
            type: Boolean,
            default: false
        }
    },
    created() {
        if (this.isUseVueRouter) {
            return;
        }
        if (typeof this.to !== 'string' && !this.path) {
            throw new Error([
                '[platform-ui pl-breadcrumb-item error]: ',
                'when not using vue-router, the "path" property is necessary'
            ].join(''));
        }
    },
    methods: {
        link() {
            if (this.isUseVueRouter && this.to) {
                if (this.replace) {
                    this.$router.replace(this.to);
                } else {
                    this.$router.push(this.to);
                }
                return;
            }
            if (!this.isUseVueRouter && this.to) {
                if (this.replace) {
                    window.location.href = this.linkAddress;
                } else {
                    window.location.replace(this.linkAddress);
                }
                return;
            }
        }
    },
    computed: {
        isUseVueRouter() {
            return this.$router;
        },
        separator() {
            return this.$parent.separator;
        },
        linkAddress() {
            if (typeof this.to === 'string') {
                return this.to;
            }
            const [path, query] = this.to.path.split('?');
            const [search, hash] = query.split('#');
            const params = search.split('&').reduce((params, item) => {
                const [key, val] = item.split('=');
                params[key] = val;
                return params;
            }, {});

            let urlParams = json2UrlParams(extend({}, params, this.to.query));
            let result = path;
            if (urlParams) {
                result += `?${urlParams}`;
            }
            if (hash) {
                result += `#${hash}`;
            }
            return result;
        },
        isOld() {
            return this.$parent.isOld;
        }
    }
};
</script>

<template>

<li class="breadcrumb-item" :is-old="isOld">
    <span class="link" @click="link"><slot></slot></span><span class="separator">{{separator}}</span>
</li>

</template>

<style lang="stylus" scoped>
@import '../common/mixin.styl'
@import '../common/variables.styl'
span
    font-size font-size-base
    color font-color-secondary
    line-height line-height-base
.link
    cursor pointer
    &:hover
        color brand-primary
li:last-child
    .link
        color brand-primary
        cursor default
    .separator
        display none
.separator
    margin 0 5px
    color lighten(font-color-secondary, 50%)
    cursor default

[is-old]
    .link:hover
        color old-brand-primary
    li:last-child .link
        color old-brand-primary
</style>
