# 学生数据请求

## 介绍

在日常开发中，使用 nodejs 搭建一个小型服务器是比较常见的，可以处理一些简单的请求，接下来就让我们通过完善代码来探索下通过搭建服务器来实现获取数据功能的效果吧～

本题需要在已提供的基础项目中使用 nodejs 、fetch 知识完善代码，最终实现需求中的具体功能。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── effect.gif
├── index.html
├── css
└── js
    ├── data.js
    ├── index.js
    └── node.js
```

其中：

* `effect.gif` 是最终实现的效果图。
* `index.html` 是主页面。
* `css` 是样式文件夹。
* `js/data.js` 是学生列表数据文件。
* `js/index.js` 是需要补充代码的 js 文件。
* `js/node.js` 是需要补充代码的 js 文件。

在浏览器中预览 `index.html` 页面，显示如下所示：

![图片描述](https://doc.shiyanlou.com/courses/23796/1723100/d18fde128b5d35dbe1da057737b63d1e-0)

## 目标

请在 `js/node.js` 和 `js/index.js` 文件中补全代码，最终实现以下需求：

1. 请在 `js/node.js` 文件中补全代码，实现**服务器业务**功能。

* 代码中已经搭建了一个 **本地服务器** ，端口固定为 8080，直接在终端运行 `node js/node.js` 命令即可启动服务。
* 处理服务器的 **请求** ，本题仅需处理 **GET** 和 **POST** 请求，**GET** 请求的接口是 `/student` ，**POST** 请求的接口是 `/student/add` 。当服务器收到 **GET** 请求时，需要将 `js/data.js` 中的学生数据响应给客户端。当收到 **POST** 请求时，服务器需要处理 **请求体** ，并将**响应体**返回给客户端，状态码 `code` 值为 `0` 。（**无需考虑**数据**错误**的情况）响应体的格式如下（调用封装的 `send` 方法即可，参数可参见注释）：

```js
{
    code:0,// 服务器响应的状态码（消息码）code为0表示服务器正常响应
    msg:'',// 服务器响应的错误消息，只有当code为0时无错误消息
    data:array||object// 服务器响应给客户端的数据，数据类型为数组或对象
}
```

2. 请在 `js/index.js` 文件中补全代码，实现**获取学生数据并渲染到页面**功能。

* 在页面加载完毕后，向**服务器**请求 **学生数据** ，请求地址为 `/student` ，获取到响应后需调用已实现的 `parseRes` 方法解析响应数据。
* 将**学生数据**渲染到**页面**上，直接调用已经实现的 `render` 函数即可。效果如下：

![图片描述](https://doc.shiyanlou.com/courses/23796/1723100/f7ed8ba0bdc526b0f8029f5d5cd296ad-0)

3. 请在 `js/index.js` 文件中补全代码，实现**添加学生并将响应数据渲染到页面**功能。

* 处理 **表单提交** ，提交时需要**自行验证**表单是否填写完毕， **验证要求** ：**所有**表单项保证 **有值** 。前端可以**不进行**验证， **不会影响检测结果** 。如 **未验证** ，服务器**自动**进行 **验证** ，验证 **不通过** （某表单项为空），服务器会自动响应 `404`  **错误** ，前端应该做好处理错误的准备，本题 **不需要考虑** 。本需求检测是否通过在于**客户端**是否能够**正确**拿到服务器**响应**的表单**数据**并完成页面的 **渲染** 。请求地址为：`/student/add` ，请求体格式为：

```js
{
    name:string,// 学生姓名，为页面上input#name元素
    age:string,// 学生年龄，为页面上input#age元素
    phone:string// 学生手机号，为页面上input#phone元素
}
```

* 获取 **响应数据** ，调用已实现的 `parseRes` 方法解析响应数据，将**响应数据**渲染到**页面**上，直接调用已经实现的 `render` 函数即可。效果如下：

![图片描述](https://doc.shiyanlou.com/courses/23796/1723100/c00dd4d9c67b77d054c46bc7683a00ef-0)

## 规定

* 请不要在服务器未完成相应功能前请求对应的接口，否则可能检测 **超时** 。
* 由于服务器启动的是对外的 8080 端口，因此无需启动 live server ，仅需启动搭建好的 nodejs 服务器，每次改动服务器代码后请**重新启动**服务器再进行检测。
* `nodejs` 服务器处理请求时请控制代码的处理时间，减少异步的时间，响应时长 **不得超过两秒钟** ，否则可能检测不通过。页面**数据必须**是通过 `http` 请求**异步获取**的，其他方式 **不予以通过** 。
* 请勿修改 `js/index.js` 和 `js/node.js` 文件外的任何内容，仅需完成 TODO 部分。
* 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

* 实现服务器 GET 请求，得 3 分。
* 实现服务器 POST 请求，得 4 分。
* 在 GET 请求实现的基础上，实现获取数据并渲染界面功能，得 3 分。
* 在 POST 请求实现的基础上，实现添加学生并渲染页面功能，得 5 分。
