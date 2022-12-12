<template>
  <zh-button link circle @click="handleChange">
    <i class="zh-icon zh-icon-refresh" style="font-weight: bolder" :class="{ 'zh-icon-refreshing': modelValue }"></i>
  </zh-button>
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
.zh-icon-refreshing {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  0% {
    transform: rotateZ(0deg);
  }
  100% {
    transform: rotateZ(360deg);
  }
}
</style>
