<template>
  <div>
    <zh-button link @click="handleChange">
      <i
        class="zh-icon zh-icon-arrow-down"
        style="font-weight: bolder"
        :class="{ arrowTransform: modelValue, arrowTransformReturn: !modelValue }"
      ></i>
      {{ modelValue ? '收起' : '展开' }}
    </zh-button>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits, toRef } from 'vue';
import ZhButton from '@/view/button/zh-button.vue';

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(['update:modelValue', 'change']);

function handleChange() {
  // 调用change方法，入参为当前是否折叠状态的值
  emit('change', !props.modelValue);
  emit('update:modelValue', !props.modelValue);
}
</script>

<style lang="scss" scoped>
// 展开/收起 尖头动画效果
.arrowTransform {
  transition: 0.5s;
  transform-origin: center;
  transform: rotateZ(180deg);
}
.arrowTransformReturn {
  transition: 0.5s;
  transform-origin: center;
  transform: rotateZ(0deg);
}
</style>
