# 单选框使用文档

| 属性            | 描述                    | 可选值            | 默认值     | 是否必填 |
| ------------- | --------------------- | -------------- | ------- | ---- |
| is-old        | 是否为老UI（adpos/admin）风格 | `true` `false` | `false` | 否    |
| value         | 按钮值                   |                |         | 否    |
| checked       | 当前选中值                 |                |         | 是    |
| indeterminate | 按钮是否为半选中              | `true` `false` | `false` | 否    |
| disabled      | 是否不可点击选中              | `true` `false` | `false` | 否    |

| 事件      | 说明        |
| ------- | --------- |
| @change | 当值发生改变时触发 |

> 其他说明：可以使用v-model来集成checked与@change。