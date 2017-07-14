<script>
/**
 * @file 上传组件
 *
 * @author 天翔Skyline(skyline0705@gmail.com)
 * Aug 12, 2016
 */
import {translateFilePath} from 'common/filters';
import {getGuid} from 'common/util';
export default {
    props: {
        auditFile: {
            type: String,
            default: ''
        },
        uploadPath: {
            type: String,
            required: true
        },
        name: {
            type: String,
            required: true
        }
    },
    methods: {
        translateFilePath: translateFilePath,
        fileChange() {
            const guid = getGuid();
            let iframe = document.createElement('iframe');
            let form = this.$refs.form;
            form.target = guid;
            iframe.name = guid;
            iframe.style.cssText = 'position: absolute; top: -999999px; left: -999999px';
            document.body.appendChild(iframe);
            iframe.onload = () => {
                this.$emit('status-change', 'uploaded');
                const result = JSON.parse(iframe.contentDocument.body.innerHTML);
                this.$emit('file-change', result);
                this.$refs.file.value = '';
                document.body.removeChild(iframe);
            };
            form.submit();
            this.$emit('status-change', 'uploading');
        }
    }
};
</script>

<template>

<form enctype="multipart/form-data" method="post" :action="uploadPath" ref="form">
    <label>
        <span class="btn btn-secondary">
            上传
        </span>
        <input ref="file" type="file" :name="name" @change="fileChange">
    </label>
</form>

</template>

<style lang="stylus" scoped>
@import '../button/index.styl'
form,
label
    display inline-block
.btn:before
    content ''
    display inline-block
    background url('./upload.png') no-repeat
    margin-left -5px
    width 18px
    height 18px
    vertical-align middle
input[type="file"]
    // TODO这里有一个很神奇的现象，如果是absolute之类的，在chrome里会阻塞渲染
    display none
</style>