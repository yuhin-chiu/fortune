/**
 * Created by Yuhin on 2016/1/19.
 */

import Router from 'vue-router';
import App from './components/App.vue';
import Resource from 'vue-resource';
import $ from 'jquery';

var Vue = require('vue');
Vue.use(Resource);
Vue.use(Router);
var router = new Router({hashbang: false});

router.map({
    '/vote': {
        name: 'vote',
        title: '投票页面',
        component: require('./components/VoteView.vue')
    },
    '/': {
        name: 'vote1',
        title: '投票页面',
        component: require('./components/VoteView.vue')
    },
    '/xiuxiuym': {
        name: 'index',
        title: '索引',
        component: require('./components/IndexView.vue')
    },
    '/tpjg': {
        name: 'result',
        title: '投票结果',
        component: require('./components/ResultView.vue')
    },
    '/random': {
        name: 'random',
        title: '抽奖页面',
        component: require('./components/RandomView.vue')
    },
    '/xxym': {
        name: 'xxym',
        title: '二维码',
        component: require('./components/XxymView.vue')
    }
});

router.beforeEach(({to, next}) => {
    document.title = (to.title || '投票系统');
    next();
});
router.start(App, '#app');
