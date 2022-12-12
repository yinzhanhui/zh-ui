<template>
  <div>
    <zh-button link @click="handleChange">
      <i
        class="zh-icon zh-icon-plus"
        style="font-weight: bolder"
        :class="{ logoTransform: modelValue, logoTransformReturn: !modelValue }"
      ></i>
      {{ modelValue ? '删除' : '添加' }}
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
.logoTransform {
  transition: 0.5s;
  transform-origin: center;
  transform: rotateZ(45deg);
}
.logoTransformReturn {
  transition: 0.5s;
  transform-origin: center;
  transform: rotateZ(0deg);
}
</style>
