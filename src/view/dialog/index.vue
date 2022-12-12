<template>
  <div class="demo">
    <div class="demo-row">
      <zh-button type="primary" @click="visible1 = true">title属性传入字符串</zh-button>
      <zh-dialog v-model="visible1" title="title属性"></zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible2 = true" width="200px" top="20px">title插槽</zh-button>
      <zh-dialog v-model="visible2">
        <template #title>
          <h1>title插槽</h1>
        </template>
        <div>这是弹窗的内容</div>
        <template #footer>
          <zh-button @click="visible2 = false">取消</zh-button>
          <zh-button type="primary" @click="visible2 = false">确定</zh-button>
        </template>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible3 = true">拖拽</zh-button>
      <zh-dialog v-model="visible3" title="拖拽弹窗" draggable>
        <div>具有拖拽效果</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible4 = true">伸缩</zh-button>
      <zh-dialog v-model="visible4" title="伸缩弹窗" resizable>
        <div>具有伸缩效果</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible5 = true">拖拽和伸缩</zh-button>
      <zh-dialog v-model="visible5" title="拖拽和伸缩弹窗" draggable resizable>
        <div>具有拖拽和伸缩效果</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible6 = true">保留尺寸和位置</zh-button>
      <zh-dialog v-model="visible6" title="保留尺寸和位置" draggable resizable keepSizeAndPosition>
        <div>拖拽和伸缩后，可以保留尺寸和位置</div>
      </zh-dialog>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="visible7 = true">容纳任意元素</zh-button>
      <zh-dialog v-model="visible7" title="容纳任意元素" draggable resizable keepSizeAndPosition>
        <zh-collapse-demo></zh-collapse-demo>
        <!-- <zh-collapse v-model="isExpand" width="600px" collapseHeight="100px">
          <zh-list>
            <div v-for="(item, index) in items" :key="item" class="item">
              <div class="item-content">{{ item }}</div>
              <zh-button @click="handleAdd(index)" class="btn" type="primary">添加</zh-button>
              <zh-button @click="handleDel(index)" class="btn" type="danger">删除</zh-button>
              <zh-button @click="handleRandom" class="btn" type="warning">打乱</zh-button>
            </div>
          </zh-list>
        </zh-collapse> -->
      </zh-dialog>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue';
import ZhCollapse from '../collapse/zh-collapse.vue';
import ZhCollapseDemo from '../collapse/index.vue';
import ZhList from '../list/zh-list.vue';

const visible1 = ref(false);
const visible2 = ref(false);
const visible3 = ref(false);
const visible4 = ref(false);
const visible5 = ref(false);
const visible6 = ref(false);
const visible7 = ref(false);
</script>

<style lang="scss" scoped>
.demo {
  .demo-row {
    .zh-button {
      margin-right: 10px;
    }
  }
}
</style>
