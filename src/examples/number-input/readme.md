# 数字文本框使用文档

| 属性          | 描述                    | 可选值            | 默认值     | 是否必填 |
| ----------- | --------------------- | -------------- | ------- | ---- |
| value       | 当前value值              |                | 无       | 是    |
| int         | 是否只可输入整数              | `true` `false` | `false` |      |
| readonly    | native属性，是否只读         |                |         |      |
| disabled    | native属性，是否禁用         |                |         |      |
| placeholder | native属性，placeholder  |                |         |      |

| 事件     | 说明   |
| ------ | ---- |
| @input | 输入事件 |

> 其他说明：若要自定义大小，可使用style属性来覆盖原有大小信息
>
> 备注：可使用v-model来集成@input与value