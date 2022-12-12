<template>
  <div>
    <div
      ref="div"
      :style="{
        '--expandHeight': expandHeight,
        '--collapseHeight': collapseHeight,
        '--collapseOverflow': collapseOverflow,
        width,
      }"
      class="original"
      :class="isInit ? '' : modelValue ? 'expand' : 'collapse'"
    >
      <div ref="content" :style="{ width }" class="content">
        <slot></slot>
      </div>
    </div>

    <!-- <div v-show="isVisible" class="showMore">
      <zh-collapse-button v-model="modelValue" @change="showMore"></zh-collapse-button>
    </div> -->
  </div>
</template>
<script setup>
import { ref, onMounted, defineProps, toRef, computed, watch, onBeforeUnmount, nextTick } from 'vue';
import ZhCollapseButton from '@/view/interactive-button/zh-collapse-button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  width: {
    type: String,
    default: '',
  },
  collapseHeight: {
    type: String,
    default: '0px',
  },
  collapseOverflow: {
    type: String,
    default: 'auto',
  },
});
const emit = defineEmits(['update:modelValue']);
// 参数
const expandHeight = ref('');
const collapseHeight = toRef(props, 'collapseHeight');
const isVisible = ref(true);
// 判断是否为第一次加载，若不设置该参数会导致初次加载组件就具有动画
const isInit = ref(true);
// ref组件
const div = ref();
const content = ref();
// 收起后高度值
const collapseHeightNumber = computed(() => Number(collapseHeight.value.match(/^\d+/g)[0]));

// 初始化 展开后高度
function initHeight() {
  // expandHeight为「content元素高度」和「收起后高度」中的较大值（适配props.collapseHeigh大于实际元素高度的情况）
  expandHeight.value = `${Math.max(content.value.offsetHeight, collapseHeightNumber.value)}px`;
}

// 点击“展开/收起”按钮
function toggle() {
  // 动画开始前，设置expandHeight
  div.value.onanimationstart = function () {
    initHeight();
  };
  // 动画结束前，还原expandHeight
  div.value.onanimationend = function () {
    // expandHeight设置为空，是为了让div高度随content高度自动变化
    expandHeight.value = '';
  };
  // // 更新modelValue
  // emit('update:modelValue', !props.modelValue);
  // isInit.value = false;
}

watch(
  () => props.modelValue,
  (value) => {
    console.log('collapse:', value);
    toggle();
    // 更新初始化状态
    isInit.value = false;
  }
);

onMounted(() => {
  initHeight();
});
</script>

<style scoped lang="scss">
.original {
  overflow: hidden;
  min-height: var(--collapseHeight);
  background-color: gray;
  box-sizing: border-box;
}
// 消除边距折叠
.content:after {
  content: '';
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.showMore {
  // position: absolute;
  height: 30px;
  padding: 3px;
  text-align: center;
}
.collapse {
  overflow: var(--collapseOverflow);
  height: var(--collapseHeight);
  animation-name: exampleAcitve;
  animation-duration: 1s;
}
.expand {
  height: var(--expandHeight);
  animation-name: exampleAcitve2;
  animation-duration: 1s;
}

@keyframes exampleAcitve {
  from {
    height: var(--expandHeight);
  }
  to {
    height: var(--collapseHeight);
  }
}
@keyframes exampleAcitve2 {
  from {
    height: var(--collapseHeight);
  }
  to {
    height: var(--expandHeight);
  }
}
</style>
