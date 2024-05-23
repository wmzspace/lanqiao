/**
 * 请完成下面的 TODO 部分，其他代码请勿改动
 */
function $(selector) {
  return document.querySelector(selector);
}
const submitBtn = $("button[type=submit]"); //提交按钮
const nameDom = $("input#name");
const ageDom = $("input#age");
const phoneDom = $("input#tel");
const ul = $(".bottom ul");
const showAddTbody = $("main.container .bottom table>tbody");
const showAllTbody = $("section.container table>tbody");

function parseRes(data) {
  const invaild = [
    "object",
    "null",
    "undefined",
    "array",
    "function",
    "number",
    "string",
  ];
  if (typeof data !== "string") {
    return;
  }
  for (const item of invaild) {
    if (data.includes(item)) {
      return;
    }
  }
  if (data.startsWith("[") && data.endsWith("]")) {
    // 解析数组
    return eval(data);
  }
  if (data.startsWith("{") && data.endsWith("}")) {
    // 解析对象
    return JSON.parse(data);
  }
}

init();

async function init() {
  // 在这里需要获取学生数据并展示到页面中
  let res;
  // TODO 请求服务器拿到数据，并完成界面渲染，请求学生数据时需要调用上面提供的方法解析响应体中的data数据，调用渲染方法，注意render函数需要传入数组
  const serverRes = await fetch("/student");
  if (serverRes.ok) {
    const resData = await serverRes.json();
    res = parseRes(resData.data);
    render(res)
  }
  submitBtn.addEventListener("click", handleAddStudent);
}

async function handleAddStudent(e) {
  e.preventDefault();
  // TODO 你需要将表单中所有的文本框的值获取到，然后向服务器请求，拿到服务器数据调用渲染方法，注意render函数需要传入数组
  let data;
  console.log(1)
}

/**
 * 将数组渲染到页面上
 * @param {Array} datas 数组
 * @returns
 */
function render(datas) {
  if (!datas || !Array.isArray(datas)) return;
  const innerHTML = datas
    .map(
      (i) =>
        `<tr key="${i.id}"><td>${i.name}</td><td>${i.age}</td><td>${i.phone}</td></tr>`
    )
    .reduce((prev, cur) => prev + cur, "");
  if (datas.length === 1) {
    showAddTbody.innerHTML = innerHTML;
  } else {
    showAllTbody.innerHTML = innerHTML;
  }
}
