/**
 * @file 路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '../page/home/home.vue';
const routes = [{
    path: '/',
    name: 'home',
    component: Home
}, {
    path: '/about',
    name: 'about',
    component: () => import('../page/about/about.vue')
}];
const router = new VueRouter({
    routes
});
export default router;