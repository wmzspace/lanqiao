# 找回密码

## 介绍

今天小蓝在登录某平台时粗心大意忘记了密码，但在找回密码的过程中，小蓝不能清楚的知道还需要多少个步骤才能成功找回密码。因此古灵精怪的小蓝想自己实现一个找回密码的场景，用户在找回密码过程中可以清楚的知道自己处于找回密码的哪个阶段，但是小蓝学艺不精，请你帮助她完成。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── component
│   ├── account.vue
│   ├── check.vue
│   ├── modify.vue
│   ├── steps.vue
│   └── success.vue
├── css
│   ├── element-plus@2.3.7
│   │   ├── index.css
│   │   └── index.full.js
│   └── index.css
├── index.html
└── js
    ├── index.js
    ├── vue3-sfc-loader.js
    └── vue.global.js
```

其中：

* `css` 是存放页面引用样式的文件夹。
* `js` 是存放页面引用 js 文件的文件夹。
* `component` 是存放页面引用组件的文件夹。
* `index.html` 是待完善的文件。

注意：打开环境后发现缺少项目代码，请手动键入下述命令进行下载：

```Bash
wget https://labfile.oss.aliyuncs.com/courses/20535/Demo09.zip&& unzip Demo09.zip && rm Demo09.zip
```

## 目标

请在 `component` 文件夹下的各组件中补全代码，最终实现 **用户根据步骤提示找回密码，且用户可以看见当前所处步骤的功能** 。

具体需求如下：

**1. 实现账号核实功能** 在 `account` 组件中，当点击“下一步”按钮时（ `#nextStep` ），对用户名输入框（ `#userName` ）和身份证号输入框（ `#idNum` ）中输入的值的有效性做检验：

* 若用户名无效，则提示用户名不合法（ `#userNameVerify` 的文本值变为“用户名不合法”，默认文本为“用户名” ），第一步的步骤状态变为 `error`，且给提示信息添加错误高亮（即给 `#userNameVerify` 添加类名 `wrong` ）。
* 若用户名有效，则提示文本仍为默认值，但给提示信息添加正确高亮（即给 `#userNameVerify` 添加类名 `right` ）。
* 若身份证号无效，则提示身份证号不合法（ `#idNumVerify` 的文本值变为“身份证号不合法”，默认文本为“身份证号”），第一步的步骤状态变为 `error`，且给提示信息添加错误高亮（即给 `#idNumVerify` 添加类名 `wrong`）。
* 若身份证号有效，则提示文本仍为默认值，但给提示信息添加正确高亮（即给 `#idNumVerify` 添加类名 `right`）。
* 若用户名和身份证号均有效，则组件由 `account` 组件跳转至 `check` 组件，第一步的步骤状态变为 `success`，第二步的步骤状态变为 `process`，且分步导航条（即 `steps` 组件）的激活步骤在原基础上往下进行一步。

说明：

* 进入页面，默认第一步的步骤状态应为 `process`。
* 在本题实现找回密码功能共需四个步骤，即“账号核实”、“验证身份”、“修改密码”、“成功”，而上下文中出现的“第一步”、“第二步”、“第三步”、“第四步”则分别代表这四个步骤。
* 若用户名是由 3 - 5 位的字符组成（字符只能是数字、字母或下划线），则视为有效，否则无效。
* 若身份证号是由地址码 + 年份 + 月份 + 日期 + 顺序码 + 校验码组成，且满足下述条件，则视为有效，否则无效：
  * 地址码：由 6 位数字组成，第一位只能是数字 1 - 9，后 5 位是 0 - 9 的数字。
  * 年份：由 4 位数字组成，前两位是数字 19、20 或 21，后两位是 0 - 9 的数字。
  * 月份：由 2 位数字组成，若月份为 1-9 月则第一位数字补 0 （比如：月份为 9 月，则为 09）
  * 日期：由 2 位数字组成，若日期为 1-9 号则第一位数字补 0 （比如：生日为 1 号，则为 01）。
  * 顺序码：由 3 位数字组成。
  * 校验码：长 1 位，可以是数字，也可以是大写字母 X 。
* 页面中共六个组件，分别是 `app` 根组件，`steps` 组件，`account` 组件，`check` 组件，`modify` 组件，`success` 组件。在页面渲染过程中，`steps` 组件固定显示在 `app` 根组件中，而后四个组件总会作为 `app` 根组件的子组件出现，请使用 `<component></component>` 标签实现后四个组件的跳转切换效果（在默认情况下 `<component></component>` 的 `is` 属性值应为 `account` ）。
* 本题在页面中出现的步骤导航条（即 `steps` 组件）是使用 `element-plus` 中的 `Steps 步骤条` 实现的，其属性如下：

| 名称           |                        说明                        |                           类型                           |    默认    |
| :------------- | :-------------------------------------------------: | :-------------------------------------------------------: | :--------: |
| space          | 每个 step 的间距，不填写将自适应间距。 支持百分比。 |    每个 step 的间距，不填写将自适应间距。 支持百分比。    |     ""     |
| direction      |                      显示方向                      |             enum（"vertical"、"horizontal"）             | horizontal |
| active         |                  设置当前激活步骤                  |                          number                          |     0     |
| process-status |                 设置当前步骤的状态                 | enum（ "wait" 、"process"、"finish"、"error"、"success"） |  process  |
| finish-status  |                 设置结束步骤的状态                 | enum（ "wait" 、"process"、"finish"、"error"、"success"） |   finish   |
| align-center   |                    进行居中对齐                    |                          boolean                          |    ---    |
| simple         |                       simple                       |                          boolean                          |    ---    |

使用示例：

```js
<template>
  <el-steps :active="active" finish-status="success">
    <el-step title="Step 1" />
    <el-step title="Step 2" />
    <el-step title="Step 3" />
  </el-steps>

  <el-button style="margin-top: 12px" @click="next">Next step</el-button>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

const active = ref(0)

const next = () => {
  if (active.value++ > 2) active.value = 0
}
</script>
```

最终完成效果如下： ![图片描述](https://doc.shiyanlou.com/courses/uid2120129-20230711-1689053546165)

**2. 实现验证身份的功能**

在 `check` 组件中，点击复选框（ `.robot input` ）且复选框为选中状态时，元素 `.check` 进入加载状态（加载状态的表现请参考下方完成效果），且加载文本为 `验证中...` 。在进入加载状态的 1.5 秒后，组件由 `check` 组件跳转至 `modify` 组件，第二步的步骤状态变为 `success`，第三步的步骤状态变为 `process`，且分步导航条（即 `steps` 组件）所处步骤在原基础上往下进行一步。

说明：

* 在 `check` 组件中出现的加载效果是使用 `element-plus` 中的 `Loading 加载` 实现的，其指令如下：

| 名称                       |                       说明                       |       类型       |
| :------------------------- | :----------------------------------------------: | :---------------: |
| v-loading                  |                   是否显示动画                   | boolean / Options |
| element-loading-text       |           显示在加载图标下方的加载文案           |      string      |
| active                     |                 设置当前激活步骤                 |      number      |
| element-loading-spinner    |                  自定义加载图标                  |      string      |
| string                     | 自定义加载图标 (与 element-loading-spinner 相同) |      string      |
| element-loading-background |                  背景遮罩的颜色                  |      string      |

使用示例：

```js
// 给一个表格增加加载动画
<el-table v-loading="loading" :data="tableData" style="width: 100%">
  <el-table-column prop="date" label="Date" width="180" />
  <el-table-column prop="name" label="Name" width="180" />
  <el-table-column prop="address" label="Address" />
</el-table>
```

最终完成效果如下： ![图片描述](https://doc.shiyanlou.com/courses/uid2120129-20230711-1689053573941)

**3. 实现修改密码的功能**

在 `modify` 组件中，当点击“修改”按钮时（ `#alter` ），对密码输入框（ `#passwordOne` ）中输入密码的合法性以及密码确认框（ `#passwordTwo` ）中输入值（以下简称“密码确认值”）的正确性做检验：

* 若密码不合法，则提示密码不合法（ `#passwordOneVerify` 的文本值变为“您输入的密码不合法”，默认文本为“请输入密码”），第三步的步骤状态变为 `error`，且给提示信息添加错误高亮（即给 `#passwordOneVerify` 添加类名 `wrong` ）。
* 若密码合法，则提示文本仍为默认值，但给提示信息添加正确高亮（即给 `#passwordOneVerify` 添加类名 `right` ）。
* 若密码确认值不正确，则提示密码确认值不正确（ `#passwordTwoVerify` 的文本值变为“两次输入的密码不一致”，默认文本为“请再次输入密码”），第三步的步骤状态变为 `error`，且给提示信息添加错误高亮（即给 `#passwordTwoVerify` 添加类名 `wrong` ）。
* 若密码确认值正确，则提示文本仍为默认值，但给提示信息添加正确高亮（即给 `#passwordTwoVerify` 添加类名 `right`）。
* 若密码合法且密码确认值正确，则组件由 `modify` 组件跳转至 `success` 组件，第三步和第四步的步骤状态均变为 `success`。

说明：

* 若密码为 6 - 12 位字符，且包含大小写字母、数字、下划线以及特殊字符（ `@$!%*?&` ），则视为合法，否则不合法。
* 若密码确认值与输入的密码值完全相同，则视为正确，否则视为不正确。

最终完成效果如下： ![图片描述](https://doc.shiyanlou.com/courses/uid2120129-20230713-1689255536601)

## 规定

* 请勿修改除 `component` 文件夹下文件外的任何文件，以免影响检测通过。
* 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径等。

## 判分标准

* 完成目标 1 ，得 8 分。
* 完成目标 2 ，得 9 分。
* 完成目标 3 ，得 8 分。
