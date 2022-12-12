<template>
  <div class="demo">
    <div class="demo-row">
      <zh-list>
        <div v-for="(item, index) in items" :key="item" class="item">
          <div class="item-content">{{ item }}</div>
          <zh-button @click="handleAdd(index)" class="btn" type="primary">添加</zh-button>
          <zh-button @click="handleDel(index)" class="btn" type="danger">删除</zh-button>
          <zh-button @click="handleRandom" class="btn" type="warning">打乱</zh-button>
        </div>
      </zh-list>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue';
import ZhList from '@/view/list/zh-list.vue';

const items = reactive([1, 2, 3]);

function handleAdd(index) {
  items.splice(index, 0, items.length + 1);
}
function handleDel(index) {
  items.splice(index, 1);
}
function handleRandom() {
  items.sort(() => (Math.random() > 0.5 ? -1 : 1));
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
