<template>
  <div class="demo">
    <div class="demo-row">
      {{ text1 }}
      <zh-collapse-button v-model="isExpand1" @change="handleToggle1"></zh-collapse-button>
    </div>

    <div class="demo-row">
      {{ text2 }}
      <zh-refresh-button v-model="isExpand2" @change="handleToggle2"></zh-refresh-button>
    </div>

    <div class="demo-row">
      {{ text3 }}
      <zh-addAndDel-button v-model="isExpand3" @change="handleToggle3"></zh-addAndDel-button>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref, defineProps, defineEmits } from 'vue';
import ZhCollapseButton from './zh-collapse-button.vue';
import ZhRefreshButton from './zh-refresh-button.vue';
import ZhAddAndDelButton from './zh-addAndDel-button.vue';

const isExpand1 = ref(true);
const text1 = ref('初始状态collapse');

const isExpand2 = ref(false);
const text2 = ref('初始状态refresh');

const isExpand3 = ref(false);
const text3 = ref('初始状态addAndDel');

function handleToggle1(value) {
  text1.value = value;
}
function handleToggle2(value) {
  text2.value = value;
}
function handleToggle3(value) {
  text3.value = value;
}
</script>

<style lang="scss" scoped></style>
