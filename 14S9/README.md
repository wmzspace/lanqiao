# Markdown 文档解析

## 介绍

Markdown 因为其简洁的语法大受欢迎，已经成为大家写博客或文档时必备的技能点，众多博客平台都提倡用户使用 Markdown 语法进行文章书写，然后再发布后，实时的将其转化为常规的 HTML 页面渲染。

本题需要在已提供的基础项目中，使用 Nodejs 实现简易的 Markdown 文档解析器。

## 准备

开始答题前，需要先打开本题的项目代码文件夹，目录结构如下：

```txt
├── docs.md
├── images
│   └── md.jpg
├── index.html
└── js
    ├── index.js
    └── parse.js
```

其中：

* `index.html` 是主页面。
* `images` 是图片文件夹。
* `docs.md` 是需要解析的 Markdown 文件。
* `js/index.js` 是提供的工具脚本，用于快速验证代码结果。
* `js/parse.js` 是需要补充的脚本文件。

注意：打开环境后发现缺少项目代码，请手动键入下述命令进行下载：

```bash
cd /home/project
wget https://labfile.oss.aliyuncs.com/courses/18213/07.zip && unzip 07.zip && rm 07.zip
```

## 目标

在 `js/parse.js` 中实现几种特定的 Markdown 语法解析，目前初始文件中已实现标题解析（即从 `#` 前缀转换为 `<hn>` 标签），请你继续完善该文件 TODO 部分，完成剩余语法解析操作，具体需求如下：

1. 对分隔符进行解析，Markdown 中使用 `---` （三条及以上的短横线） 作为分隔符，将其解析成为 `<hr>` 标签：

```html
<!-- Markdown -->
----

<!-- 对应 HTML  -->
<hr>
```

2. 对引用区块进行解析，Markdown 中使用 `>` 作为前缀，将其解析成为 `<blockquote>` 标签：

```html
<!-- Markdown  -->
> 引用区块1

> 多级引用区块2
> 多级引用区块2

<!-- 对应 HTML  -->
<blockquote>
  <p>引用区块1</p>
</blockquote>

<blockquote>
  <p>多级引用区块2</p>
  <p>多级引用区块2</p>
</blockquote>
```

3. 对无序列表进行解析，Markdown 中使用 `*` 或者 `-` 作为前缀，将其解析成为 `<ul>` 标签：

```html
<!-- Markdown  -->
* 无序列表
* 无序列表
* 无序列表

或者：
- 无序列表
- 无序列表
- 无序列表

<!-- 对应 HTML  -->
<ul>
  <li>无序列表</li>
  <li>无序列表</li>
  <li>无序列表</li>
</ul>
```

4. 对图片进行解析，Markdown 中使用 `![alt](link)` 表示，将其解析成为 `<img>` 标签：

```html
<!-- Markdown  -->
![图片](./images/md.jpg)

<!-- 对应 HTML  -->
<img src="./images/md.jpg" alt="图片">
```

5. 对文字效果进行解析，比如粗体效果，和行内代码块，将其分别解析成 `<b>` 和 `code` 标签：

```html
<!-- Markdown  -->
这是**粗体**的效果文字，这是内嵌的`代码行`

<!-- 对应 HTML  -->
这是<b>粗体</b>的效果文字，这是内嵌的<code>代码行</code>
```

在验证代码效果时，你可以在终端运行：

```bash
node ./js/index.js
```

程序会将解析的结果输出到 `index.html` 文件中，然后通过浏览器查看输出的 `index.html` 是否符合解析要求（注意：程序不会实时的将结果更新到 `index.html` 文件中，在你的代码变更后，请重新执行上述命令）。

在题目所提供的数据的情况下，完成后的效果如下：

![完成效果](https://doc.shiyanlou.com/courses/14311/1723100/8f7fb6e2dc7fc925c457c6527573f159-0)

## 规定

* 请勿修改 `js/parse.js` 文件外的任何内容。
* 请严格按照考试步骤操作，切勿修改考试默认提供项目中的文件名称、文件夹路径、class 名、id 名、图片名等，以免造成无法判题通过。

## 判分标准

* 完成对分隔符的解析，得 5 分。
* 完成对引用区块的解析，得 5 分。
* 完成对图片，和文字效果的解析，得 5 分。
* 完成对无序列表的解析，得 10 分。
