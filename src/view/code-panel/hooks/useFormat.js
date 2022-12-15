import beautify from 'js-beautify';

const useFormat = () => {
  // 判断代码段类型
  function getCodeType(input) {
    // 判定一段代码是否为html代码
    function isHtml(input) {
      return /<[a-z]+\d?(\s+[\w-]+=("[^"]*"|'[^']*'))*\s*\/?>|&#?\w+;/i.test(input);
    }
    // 判断一段代码是否为css代码
    function isCss(input) {
      return /^[\.\#]?\w+[^{]+\{[^}]*\}/i.test(input);
    }
    if (isHtml(input)) return 'html';
    if (isCss(input)) return 'css';
    return 'js';
  }

  // 格式化代码
  function codeBeautify(input) {
    let res = input;
    console.log('code类型：', getCodeType(input));
    switch (getCodeType(input)) {
      case 'html':
        res = beautify.html_beautify(input);
        break;
      case 'css':
        res = beautify.css_beautify(input);
        break;
      case 'js':
        res = beautify.js_beautify(input);
        break;
      default:
        break;
    }
    return res;
  }

  // 格式化代码
  function format(code, selectedArr) {
    // 获取选中的代码
    let finalCode = '';
    let start = 0;
    let end = 0;
    const primaryCode = code.value;
    selectedArr.forEach((item) => {
      const { from, to } = item;
      // 获取未被选中的代码
      end = from;
      const noSelectedCode = primaryCode.slice(start, end);
      start = to;
      // 获取选中的代码
      const selectedCode = primaryCode.slice(from, to);
      // 格式化代码
      const formattedCode = codeBeautify(selectedCode);
      // 用格式化后的代码替换原代码
      finalCode += noSelectedCode + formattedCode;
    });
    finalCode += primaryCode.slice(start, primaryCode.length);
    // // 赋值
    // code.value = finalCode;
    return finalCode;
  }

  return format;
};

export default useFormat;
