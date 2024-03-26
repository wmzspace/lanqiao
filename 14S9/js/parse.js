class Parser {
  constructor() {
    this.heading = /^(#{1,6}\s+)/;
    this.blockQuote = /^(\>\s+)/;
    this.unorderedList = /^((\*|-){1}\s+)/;
    this.image = /\!\[(.*?)\]\((.*?)\)/g;
    this.strongText = /\*{2}(.*?)\*{2}/g;
    this.codeLine = /\`{1}(.*?)\`{1}/g;
    // TODO: 补充分割符正则
    this.hr = /^-{3,}/;
  }

  // 获取单行内容
  parseLineText(lineText) {
    this.lineText = lineText;
  }

  // 是否是空行
  isEmptyLine() {
    return this.lineText === "";
  }

  // 是否为符合标题规范
  isHeading() {
    return this.heading.test(this.lineText);
  }

  // 解析标题
  parseHeading() {
    const temp = this.lineText.split(" ");
    const headingLevel = temp[0].length;
    const title = temp[1].trim();
    return `<h${headingLevel}>${title}</h${headingLevel}>`;
  }

  /**
   * TODO: 请完成剩余各种语法的解析
   *   1. 完成对分隔符的解析
   *   2. 完成对引用区块的解析
   *   3. 完成对图片，和文字效果的解析
   *   4. 完成对无序列表的解析
   */

  // 是否为分隔符
  isDivider() {
    return this.hr.test(this.lineText);
  }

  // 解析分隔符
  parseDivider() {
    return `<hr/>`;
  }

  // 是否为引用区块
  isBlockQuote(lineText) {
    return this.blockQuote.test(lineText);
  }

  // 是否为无序列表
  isUnorderedList(lineText) {
    return this.unorderedList.test(lineText);
  }
}

class Reader {
  constructor(text) {
    //获取全部原始文本
    this.text = text;
    this.lines = this.getLines();
    this.parser = new Parser();
  }

  runParser() {
    let currentLine = 0;
    let hasParsed = [];

    while (!this.reachToEndLine(currentLine)) {
      // 获取行文本
      this.parser.parseLineText(this.getLineText(currentLine));

      // 判断空白行
      if (this.parser.isEmptyLine()) {
        currentLine++;
        continue;
      }

      if (this.parser.isHeading()) {
        hasParsed.push(this.parser.parseHeading());
        currentLine++;
        continue;
      }
      // TODO: 请完成剩余各种语法的解析

      if (this.parser.isDivider()) {
        hasParsed.push(this.parser.parseDivider());
        currentLine++;
        continue;
      }

      if (this.parser.isBlockQuote(this.getLineText(currentLine))) {
        const currentLineText = this.getLineText(currentLine);
        const preLineText =
          currentLine >= 1 ? this.getLineText(currentLine - 1) : undefined;
        const nextLineText = !this.reachToEndLine(currentLine + 1)
          ? this.getLineText(currentLine + 1)
          : undefined;
        if (this.parser.isBlockQuote(preLineText)) {
          // 如果前一行是blockQuote
        } else {
          // 如果前一行不是blockQuote
          hasParsed.push(`<blockquote>`);
        }

        hasParsed.push(`<p>${currentLineText.replace(">", "")}</p>`);

        if (this.parser.isBlockQuote(nextLineText)) {
          // 如果后一行是blockQuote
        } else {
          // 如果后一行不是blockQuote
          hasParsed.push(`</blockquote>`);
        }
        // hasParsed.push(this.parser.parseBlockQuote());
        currentLine++;
        continue;
      }

      if (this.parser.isUnorderedList(this.getLineText(currentLine))) {
        const currentLineText = this.getLineText(currentLine);
        const preLineText =
          currentLine >= 1 ? this.getLineText(currentLine - 1) : undefined;
        const nextLineText = !this.reachToEndLine(currentLine + 1)
          ? this.getLineText(currentLine + 1)
          : undefined;
        if (!this.parser.isUnorderedList(preLineText)) {
          // 如果前一行不是 unorderedList
          hasParsed.push(`<ul>`);
        }

        hasParsed.push(
          `<li>${currentLineText.replace(/^((\*|-){1})/, "")}</li>`
        );

        if (!this.parser.isUnorderedList(nextLineText)) {
          // 如果后一行不是 unorderedList
          hasParsed.push(`</ul>`);
        }
        // hasParsed.push(this.parser.parseBlockQuote());
        currentLine++;
        continue;
      }

      hasParsed.push(this.getLineText(currentLine));
      currentLine++;
    }
    return hasParsed.join("");
  }

  getLineText(lineNum) {
    return this.lines[lineNum];
  }

  getLines() {
    this.lines = this.text.split("\n");
    return this.lines;
  }

  reachToEndLine(line) {
    return line >= this.lines.length;
  }
}

module.exports = function parseMarkdown(markdownContent) {
  return new Reader(markdownContent).runParser();
};
