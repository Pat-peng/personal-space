/**
 * @file 路由
 */
import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter);

import Home from '../page/home/home.vue';

const routes = [{
    path: '/',
    redirect:'/signin'
}, {
    path: '/signin',
    name: 'login',
    component: () => import('../page/login/login.vue')
},  {
    path: '/signup',
    name: 'login',
    component: () => import('../page/login/login.vue')
}, {
    path: '/about',
    name: 'about',
    component: () => import('../page/about/about.vue')
}, {
    path: '/home',
    name: 'home',
    component: Home,
    children:[{
        path: '',
        name: 'homeContent',
        component: import('../page/home/homeContent.vue'),
        children:[{
            path: '',
            components: {
                askQuestion: import('../components/AskQuestionModel.vue'),
                dialogWin: import('../components/dialogWin.vue')
            }
        }]
    }]
  }];
const router = new VueRouter({
    routes
});
export default router;