# 下拉框使用文档

| 属性        | 描述                                | 可选值            | 默认值     | 是否必填 |
| --------- | --------------------------------- | -------------- | ------- | ---- |
| is-old    | 是否为老UI（adpos/admin）风格             | `true` `false` | `false` | 否    |
| value     | 当前value值                          |                |         | 是    |
| options   | 选项值，要求是一组以`text` `value`为key组成的数组 |                |         | 是    |
| int       | 是否只可输入整数                          | `true` `false` | `false` | 否    |
| readonly  | 是否只读                              | `true` `false` | `false` | 否    |
| disabled  | 是否禁用                              | `true` `false` | `true`  | 否    |
| width     | 宽                                 | 以px单位的长度值      | `98px`  | 否    |
| height    | 高                                 | 以px单位的长度值      | `25px`  | 否    |
| maxHeight | 下拉框最长高度                           | 以px单位的长度值      | `245px` | 否    |

| 事件      | 说明    |
| ------- | ----- |
| @change | 值更改事件 |

> 备注：可使用v-model来集成@change与value