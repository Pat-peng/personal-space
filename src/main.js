import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import Meta from 'vue-meta';
import 'element-ui/lib/theme-chalk/index.css';
import ElementUI from 'element-ui';
import axios from 'axios';

Vue.prototype.$axios = axios;

Vue.use(Meta);
Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
    router,
    store,
    render: h => h(App),
}).$mount('#app')
