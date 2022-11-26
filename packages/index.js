/** 整个包的入口 */
import Button from './button/zh-button.vue';
import './fonts/font.scss';

// 存储组件列表
const components = [Button];

// 定义install方法，接受Vue作为参数，如果使用use注册plugin，则所有组件都将被注册
function install(Vue) {
  // 注册所有组件
  components.forEach((item) => {
    console.log(Button);
    Vue.component(item.__name, item);
  });
  console.log(Vue);
}

export default install;
