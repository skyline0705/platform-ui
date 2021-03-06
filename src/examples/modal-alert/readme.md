# 警告模态框使用文档

| 属性     | 描述                    | 可选值            | 默认值     | 是否必填 |
| ------ | --------------------- | -------------- | ------- | ---- |
| is-old | 是否为老UI（adpos/admin）风格 | `true` `false` | `false` | 否    |
| width  | 模态框宽度                 | 以px为单位的长度      | 370px   | 否    |

| 事件           | 说明           |
| ------------ | ------------ |
| @before-show | 模态框显示之前所触发事件 |
| @after-show  | 模态框显示之后所触发事件 |
| @before-hide | 模态框隐藏之前所触发事件 |
| @after-hide  | 模态框隐藏之后所触发事件 |

| 方法   | 说明      |
| ---- | ------- |
| show | 显示确认模态框 |
| hide | 隐藏确认模态框 |



> 其他说明：警告模态框必须使用ref来进行调用，如：
>
> ```vue
> <pl-modal ref="modal">
>     <template slot="title">
>         你好
>     </template>
>     啦啦啦啦啦啦啦啦
> </pl-modal>
> <script>
> export default {
>     mounted() {
>         this.$refs.modal.show();
>     };
> };
> </script>
> ```
>