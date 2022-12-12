<template>
  <div class="demo">
    <h1>Button 按钮</h1>
    简单按钮，没有特别的地方
    <h2>基础用法</h2>
    <div class="demo-row">
      <zh-button>Default</zh-button>
      <zh-button type="primary">Primary</zh-button>
      <zh-button type="success">Success</zh-button>
      <zh-button type="info">Info</zh-button>
      <zh-button type="warning">Warning</zh-button>
      <zh-button type="danger">Danger</zh-button>
    </div>
    <div class="demo-row">
      <zh-button>Default</zh-button>
      <zh-button plain type="primary">Primary</zh-button>
      <zh-button plain type="success">Success</zh-button>
      <zh-button plain type="info">Info</zh-button>
      <zh-button plain type="warning">Warning</zh-button>
      <zh-button plain type="danger">Danger</zh-button>
    </div>
    <div class="demo-row">
      <zh-button round>Default</zh-button>
      <zh-button round type="primary">Primary</zh-button>
      <zh-button round type="success">Success</zh-button>
      <zh-button round type="info">Info</zh-button>
      <zh-button round type="warning">Warning</zh-button>
      <zh-button round type="danger">Danger</zh-button>
    </div>

    <div class="demo-row">
      <zh-button disabled>Default</zh-button>
      <zh-button disabled type="primary">Primary</zh-button>
      <zh-button disabled type="success">Success</zh-button>
      <zh-button disabled type="info">Info</zh-button>
      <zh-button disabled type="warning">Warning</zh-button>
      <zh-button disabled type="danger">Danger</zh-button>
    </div>

    <div class="demo-row">
      <zh-button circle>
        <i class="zh-icon zh-icon-delete"></i>
      </zh-button>
      <zh-button circle type="primary"><i class="zh-icon zh-icon-star-on"></i></zh-button>
      <zh-button circle type="success"><i class="zh-icon zh-icon-phone"></i></zh-button>
      <zh-button circle type="info"><i class="zh-icon zh-icon-user"></i></zh-button>
      <zh-button circle type="warning"><i class="zh-icon zh-icon-setting"></i></zh-button>
      <zh-button circle type="danger"><i class="zh-icon zh-icon-loading"></i></zh-button>
    </div>

    <div class="demo-row">
      <zh-button circle text>
        <i class="zh-icon zh-icon-close"></i>
      </zh-button>
      <zh-button text>
        <i class="zh-icon zh-icon-loading"></i>
        加载中
      </zh-button>
      <zh-button text>
        <i class="zh-icon zh-icon-refresh"></i>
        刷新
      </zh-button>
    </div>

    <div class="demo-row">
      <zh-button link>Default</zh-button>
      <zh-button link type="primary">Primary</zh-button>
      <zh-button link type="success">Success</zh-button>
      <zh-button link type="info">Info</zh-button>
      <zh-button link type="warning">Warning</zh-button>
      <zh-button link type="danger">Danger</zh-button>
      <zh-button circle link>
        <i class="zh-icon zh-icon-close"></i>
      </zh-button>
      <zh-button link type="warning">
        <i class="zh-icon zh-icon-loading"></i>
        warning
      </zh-button>
      <zh-button link type="danger">
        <i class="zh-icon zh-icon-refresh"></i>
        danger
      </zh-button>
    </div>

    <div class="demo-row">
      <zh-button type="primary" @click="fn">点击触发事件</zh-button>
    </div>
  </div>
</template>

<script setup>
// import ZhButton from './zh-button.vue';
function fn() {
  alert('触发事件');
}
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
