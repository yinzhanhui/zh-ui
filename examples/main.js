import { createApp } from 'vue';
import App from './App.vue';
import ZhUI from '../packages';

const Vue = createApp(App);
Vue.use(ZhUI);
Vue.mount('#app');
