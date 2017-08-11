# 分页组件使用文档

| 属性             | 描述                                       | 可选值                      | 默认值                               | 是否必填                             |
| -------------- | ---------------------------------------- | ------------------------ | --------------------------------- | -------------------------------- |
| current-page   | 当前页码                                     | Number类型的数字              | 无                                 | 是                                |
| total-page     | 总页数                                      | Number类型的数字              | 无                                 | 是                                |
| layout         | Object类型的数值，用于描述分页组件显示部分，包含jumper:Boolean，用于设置右侧快速跳转，pageSize:Boolean，用于设置是否显示左侧每页显示条数 |                          | `{jumper: true, pageSize: false}` | 否                                |
| page-size      | 当前每页条数                                   | Number类型的数字              | 无                                 | 当设置了layout.pageSize为`true`时，必须填写 |
| page-size-list | Array类型的数组，包含当前可显示的每页条数                  | Array:Number             | `[20, 50, 100]`                   | 否                                |
| size           | String类型的描述，设置分页组件显示大小                   | `small` `medium` `large` | `medium`                          | 否                                |

| 事件                | 说明          |
| ----------------- | ----------- |
| @current-change   | 当前页码发生变化时触发 |
| @page-size-change | 每页条数发生变化时触发 |

> 其他说明：若要自定义大小，可使用style属性来覆盖原有大小信息
>
> 备注：可使用v-model来集成@input与value