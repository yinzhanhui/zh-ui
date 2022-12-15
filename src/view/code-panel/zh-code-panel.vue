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
        <zh-button circle link name="笔记" @click="handleHighlight">
          <i class="zh-icon zh-icon-edit"></i>
        </zh-button>
        <zh-button circle link name="格式化" @click="handleFormat">
          <i class="zh-icon zh-icon-finished"></i>
        </zh-button>
        <zh-button circle link name="复制" @click="handleCopy">
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
import ZhCollapseButton from '@/view/interactive-button/zh-collapse-button.vue';
import ZhCollapse from '@/view/collapse/zh-collapse.vue';
import useHighlight from './hooks/useHighlight';
import useFormat from './hooks/useFormat';

// 高亮hooks
const highlight = useHighlight();
// 格式化hooks
const format = useFormat();

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

// const highlightObj = ref(null);

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

// // css高亮api
// function highlightApi() {
//   // 获取鼠标划词的开始与结束
//   const range = document.getSelection().getRangeAt(0);
//   console.log(range);
//   const start = {
//     node: range.startContainer,
//     offset: range.startOffset,
//   };
//   const end = {
//     node: range.endContainer,
//     offset: range.endOffset,
//   };

//   const r = new Range();
//   r.setStart(start.node, start.offset);
//   r.setEnd(end.node, end.offset);

//   highlightObj.value.add(r);

//   console.log(start, end, r, highlightObj.value);
// }

// 给选中代码添加高亮样式（用于笔记）
function handleHighlight() {
  // highlightApi();
  highlight(view.value);
}

// 格式化代码
function handleFormat() {
  code.value = format(code, getCodemirrorStates().ranges);
}

// 复制所有代码到剪切板
function handleCopy() {
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

function setting() {
  console.log(view.value);
}

// css高亮api
// onMounted(() => {
//   highlightObj.value = new Highlight();
//   CSS.highlights.set('highlightText', highlightObj.value);
// });
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

// // css最新文本高亮api
// ::v-deep ::highlight(highlightText) {
//   background-color: rgb(255, 255, 0);
//   color: black;
// }
</style>

<!-- <style lang="scss">
// highlight样式
.cm-highlight {
  background-color: red;
  color: black;

  // 将highlight下所有元素的color强制改为black
  [class*='ͼ'] {
    color: black;
  }
}
</style> -->
