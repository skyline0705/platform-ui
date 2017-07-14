# 日期选择器使用文档

| 属性             | 描述                    | 可选值                                      | 默认值                                      | 是否必填 |
| -------------- | --------------------- | ---------------------------------------- | ---------------------------------------- | ---- |
| is-old         | 是否为老UI（adpos/admin）风格 | `true` `false`                           | `false`                                  | 否    |
| signal         | 日期范围中间连接符             | String类型的任何值                             | `至`                                      | 否    |
| format         | 日期显示格式                | 由`yyyy` `MM` `dd`组成的字符串                  | `yyyy/MM/dd`                             | 否    |
| range          | 日期选择器显示范围             | 由`start` `end` 两个Date类型组成的Object         | `start`：当前日期向前推30年 `end`：当前日期向后推5年       | 否    |
| limit          | 日期选择器可选范围             | 由`start` `end` 两个Date类型组成的Object         | `start`：当前日期向前推30年 `end`：当前日期向后推5年       | 否    |
| width          | 显示框的长度                | 以px为单位的长度                                | `162px`                                  | 否    |
| height         | 显示框的宽度                | 以px为单位的长度                                | `26px`                                   | 否    |
| quickGuideList | 快捷导航栏设置               | 由字符串`today` `yesterday` `last7` `lastweek` `thismonth` `lastmonth`6个值组合成的Array，弱传空数组则不显示快捷导航栏 | `['today', 'yesterday', 'last7', 'lastweek', 'thismonth', 'lastmonth']` | 否    |
| canBeInfinity  | 开始/结束日期是否可以设置为无限      | 一个包含begin:Boolean与end:Boolean的Object值，分别描述起始时间、结束时间是否可以为无限 | {begin: false, end: false}               | 否    |
| value          | 初始选中范围                | 一个包含begin:Date \| null与end:Date \| null的Object值 |                                          | 是    |

| 事件      | 说明       |
| ------- | -------- |
| @change | 日期范围发生变化 |

> 备注：可使用v-model来集成@change与value