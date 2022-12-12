<template>
  <TransitionGroup name="zh-list">
    <slot></slot>
  </TransitionGroup>
</template>

<script setup></script>

<style lang="scss">
.zh-list-move, /* 对移动中的元素应用的过渡 */
.zh-list-enter-active,
.zh-list-leave-active {
  transition: all 0.5s ease;
}

.zh-list-enter-from,
.zh-list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.zh-list-leave-active {
  position: absolute;
}
</style>
