<template>
  <div class="demo">
    <div class="demo-row">
      <zh-collapse v-model="isExpand" width="400px" collapseHeight="100px">
        <zh-list>
          <div v-for="(item, index) in items" :key="item" class="item">
            <div class="item-content">{{ item }}</div>
            <zh-button @click="handleAdd(index)" class="btn" type="primary">添加</zh-button>
            <zh-button @click="handleDel(index)" class="btn" type="danger">删除</zh-button>
            <zh-button @click="handleRandom" class="btn" type="warning">打乱</zh-button>
          </div>
        </zh-list>
      </zh-collapse>

      <zh-collapse-button v-model="isExpand" @click="toggle"></zh-collapse-button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ZhList from '@/view/list/zh-list.vue';
import ZhCollapse from '@/view/collapse/zh-collapse.vue';
import ZhCollapseButton from '@/view/interactive-button/zh-collapse-button.vue';

const items = reactive([1, 2, 3]);
// zh-collapse是否展开
const isExpand = ref(true);

function handleAdd(index) {
  items.splice(index, 0, items.length + 1);
}
function handleDel(index) {
  items.splice(index, 1);
}
function handleRandom() {
  items.sort(() => (Math.random() > 0.5 ? -1 : 1));
}

function toggle() {
  // isExpand.value = !isExpand.value;
  console.log('isExpand:', isExpand.value);
}
</script>

<style lang="scss" scoped>
.demo {
  .demo-row {
    flex-direction: column;
    align-items: center;
    .item {
      display: flex;
      align-items: center;
      .item-content {
        background-color: lightblue;
        width: 300px;
        height: 100px;
        margin: 10px;
        text-align: center;
        line-height: 100px;
        border-radius: 5px;
      }
      .btn {
        margin-left: 10px;
      }
    }
  }
}
</style>
