<template>
  <div class="menu">
    <router-link
      v-for="item in routes"
      :key="item.path"
      class="menu-item"
      active-class="menu-item-active"
      :to="item.path"
      >{{ item.name }}</router-link
    >
  </div>
</template>
<script setup>
import routes from '@/router/route.js';
</script>
<style lang="scss" scoped>
.menu {
  height: 100%;
  margin: 30px 10px 20px 20px;
  .menu-item {
    display: block;
    width: 150px;
    // height: 50px;
    margin: 3px 0;
    padding: 14px 4px;
    line-height: 20px;
    text-align: center;
    text-decoration: none; // 去掉下划线
    color: #353535;
    background-color: #fff;
  }

  .menu-item:hover {
    background-color: #e6f0fa;
    border-radius: 6px;
  }

  .menu-item-active {
    color: #3282fa;
  }
}
</style>
