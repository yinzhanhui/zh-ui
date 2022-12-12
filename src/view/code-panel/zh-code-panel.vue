<template>
  <div class="code-panel-container">
    <div class="tooltip">
      <div>
        <zh-collapse-button v-model="isExpand" @change="handleToggleExpand"></zh-collapse-button>
      </div>
      <div>
        <zh-button circle link name="测试" @click="setting">
          <i class="zh-icon zh-icon-setting"></i>
        </zh-button>
        <zh-button circle link name="笔记" @click="note">
          <i class="zh-icon zh-icon-edit"></i>
        </zh-button>
        <zh-button circle link name="格式化" @click="format">
          <i class="zh-icon zh-icon-finished"></i>
        </zh-button>
        <zh-button circle link name="复制" @click="copy">
          <i class="zh-icon zh-icon-copy-document"></i>
        </zh-button>
      </div>
    </div>

    <zh-collapse v-model="isExpand" class="panel">
      <codemirror
        v-model="code"
        placeholder="请输入代码..."
        :style="{ height }"
        :autofocus="true"
        :indent-with-tab="true"
        :tab-size="2"
        :extensions="extensions"
        :options="customOptions"
        @ready="handleReady"
        @change="log('change', $event)"
        @focus="log('focus', $event)"
        @blur="log('blur', $event)"
      />
    </zh-collapse>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits, shallowRef, onMounted } from 'vue';
import { Codemirror } from 'vue-codemirror';
import { javascript } from '@codemirror/lang-javascript';
import { oneDark } from '@codemirror/theme-one-dark';
import beautify from 'js-beautify';
import ZhCollapseButton from '@/view/interactive-button/zh-collapse-button.vue';
import ZhCollapse from '@/view/collapse/zh-collapse.vue';

const props = defineProps({
  height: {
    type: String,
    default: '300px',
  },
});

const isExpand = ref(true); // 面板展开/收起状态

const code = ref('console.log("Hello, world!")');

const extensions = [javascript(), oneDark];

// Codemirror EditorView instance ref
const view = shallowRef();

// 自定义配置
const customOptions = {
  theme: 'monokai',
  mode: '',
  readOnly: false,
  tabSize: 4, // 制表符
  indentUnit: 2, // 缩进位数
  lineNumbers: true,
  ineWiseCopyCut: true,
  viewportMargin: 1000,
  autofocus: true,
  autocorrect: true,
  spellcheck: true,
  extraKeys: {
    Tab: (cm) => {
      if (cm.somethingSelected()) {
        // 存在文本选择
        cm.indentSelection('add'); // 正向缩进文本
      } else {
        // 无文本选择
        cm.replaceSelection(Array(cm.getOption('indentUnit') + 1).join(' '), 'end', '+input'); // 光标处插入 indentUnit 个空格
      }
    },
  },
  lint: false,
  // 代码折叠
  gutters: ['CodeMirror-lint-markers', 'CodeMirror-linenumbers', 'CodeMirror-foldgutter'],
  lineWrapping: false,
  foldGutter: true, // 启用行槽中的代码折叠
  autoCloseBrackets: true, // 自动闭合符号
  autoCloseTags: true,
  matchTags: { bothTags: true },
  matchBrackets: true, // 在光标点击紧挨{、]括号左、右侧时，自动突出显示匹配的括号 }、]
  styleSelectedText: true,
  styleActiveLine: true,
  autoRefresh: true,
  highlightSelectionMatches: {
    minChars: 2,
    trim: true,
    style: 'matchhighlight',
    showToken: false,
  },
  hintOptions: {
    completeSingle: false,
  },
};

const highlightObj = ref(null);

function handleReady(payload) {
  view.value = payload.view;
}

// Status is available at all times via Codemirror EditorView
function getCodemirrorStates() {
  const { state } = view.value;
  const { ranges } = state.selection;
  const selected = ranges.reduce((r, range) => r + range.to - range.from, 0);
  const cursor = ranges[0].anchor;
  const { length, lines } = state.doc;
  // more state info ...
  // return ...
  return { state, ranges, selected };
}

function log(...rest) {
  console.log(rest);
}

// css高亮api
function highlightApi() {
  // 获取鼠标划词的开始与结束
  const range = window.getSelection().getRangeAt(0);
  console.log(range);
  const start = {
    node: range.startContainer,
    offset: range.startOffset,
  };
  const end = {
    node: range.endContainer,
    offset: range.endOffset,
  };

  const r = new Range();
  r.setStart(start.node, start.offset);
  r.setEnd(end.node, end.offset);

  highlightObj.value.add(r);

  console.log(start, end, r, highlightObj.value);
}

// 给选中代码添加高亮样式（用于笔记）
function note() {
  // getCodemirrorStates().ranges.forEach((item) => {
  //   // 获取选中的代码
  //   const selectedCode = primaryCode.slice(item.from, item.to);
  // });
  highlightApi();
}

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
function codeBeautify(code) {
  let res = code;
  console.log('code类型：', getCodeType(code));
  switch (getCodeType(code)) {
    case 'html':
      res = beautify.html_beautify(code);
      break;
    case 'css':
      res = beautify.css_beautify(code);
      break;
    case 'js':
      res = beautify.js_beautify(code);
      break;
    default:
      break;
  }
  return res;
}

function setting() {
  highlightObj.value.forEach((item) => console.log(item));
}

// 格式化代码
function format() {
  // 获取选中的代码
  let finalCode = '';
  let start = 0;
  let end = 0;
  const primaryCode = code.value;
  getCodemirrorStates().ranges.forEach((item) => {
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
  // 赋值
  code.value = finalCode;
}

// 复制所有代码到剪切板
function copy() {
  navigator.clipboard
    .writeText(code.value)
    .then(() => {
      console.log('复制成功');
    })
    .catch(() => {
      console.log('复制失败');
    });
}

// 面板展开/收起
function handleToggleExpand() {
  isExpand.value = !isExpand.value;
}

onMounted(() => {
  highlightObj.value = new Highlight();
  CSS.highlights.set('highlightText', highlightObj.value);
});
</script>

<style lang="scss" scoped>
.code-panel-container {
  border-radius: 5px;
  overflow: hidden;
  .tooltip {
    height: 30px;
    background-color: rgb(60, 70, 80);
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .panel {
    background-color: #282c34;
  }
}

// 取消自带的focus边框样式
::v-deep .ͼ1.cm-editor.cm-focused {
  outline: none;
}

// css最新文本高亮api
::v-deep ::highlight(highlightText) {
  background-color: rgb(255, 255, 0);
  color: black;
}
</style>
