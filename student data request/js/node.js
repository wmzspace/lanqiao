/**
 * 请完成下面的 TODO 部分，其他代码请勿改动
 */
const fs = require("fs");
const http = require("http");
const path = require("path");

/**
 * 该方法统一了服务器返回的消息格式，并返回给客户端
 * @param {*} res 响应对象 response
 * @param {*} code 状态码 默认为0代表没有错误 如果有错误固定为404
 * @param {*} msg 错误消息
 * @param {*} data 响应数据
 */
function send(res, code, msg, data) {
  const responseObj = {
    code,
    msg,
    data,
  };
  res.write(JSON.stringify(responseObj));
  res.end();
}

function handleStatic(res, pathName, part) {
  const content = fs.readFileSync(path.resolve(__dirname, pathName));
  let contentType = "text/html";
  switch (part) {
    case "css":
      contentType = "text/css";
      break;
    case "js":
      contentType = "text/js";
      break;
  }
  res.writeHead(200, "Content-Type", contentType);
  res.write(content);
  res.end();
}

const server = http.createServer((req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  if (req.url === "/") {
    handleStatic(res, "../index.html", "");
  } else if (req.url === "/css/index.css") {
    handleStatic(res, `..${req.url}`, "css");
  } else if (req.url === "/js/index.js") {
    handleStatic(res, `..${req.url}`, "js");
  }
  // TODO 待处理事项
  // 1.处理GET请求请通过fs模块获取学生数据并调用send方法，传入对应的参数将数据响应给客户端
  // 2.处理POST请求，请处理请求数据，并响应给客户端
  if (req.url === "/student" && req.method === "GET") {
    fs.readFile("./data.js", "utf-8", function (err, data) {
      if (err) {
        send(res, 404, err.message, null);
      } else {
        send(res, 0, "", data);
      }
    });
  }
  else if (req.url === "/student/add" && req.method === "POST") {
    let body = "";
    req.on('data', (chunk) => {
      body += chunk;
    });
    req.on('end', () => {
      // Get full body
      send(res, 0, "", body);
    });
  }
});

server.listen(8080);
