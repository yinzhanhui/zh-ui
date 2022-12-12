<template>
  <div class="container">
    <zh-code-panel></zh-code-panel>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue';
import ZhCodePanel from './zh-code-panel.vue';
</script>

<style lang="scss" scoped>
.container {
  padding: 30px;
}
</style>
