import Home from '../view/home/index.vue';
import ZhButton from '../view/button/index.vue';
import ZhInteractiveButton from '../view/interactive-button/index.vue';
import ZhDialog from '../view/dialog/index.vue';
import ZhCollapse from '../view/collapse/index.vue';
import ZhList from '@/view/list/index.vue';
import ZhCodePanel from '@/view/code-panel/index.vue';

const routes = [
  { path: '/', component: Home, name: '主页 home' },
  { path: '/button', component: ZhButton, name: '按钮 button' },
  { path: '/interactiveButton', component: ZhInteractiveButton, name: '可交互按钮 interactiveButton' },
  { path: '/dialog', component: ZhDialog, name: '弹窗 dialog' },
  { path: '/collapse', component: ZhCollapse, name: '折叠面板 collapse' },
  { path: '/list', component: ZhList, name: '列表  list' },
  { path: '/codePanel', component: ZhCodePanel, name: '代码编辑器  codePanel' },
];

export default routes;
