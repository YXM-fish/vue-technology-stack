import Vue from 'vue'
import Router from 'vue-router'
import ElementUi from 'element-ui'

/*
import App from '@/App'
import Editor from '@/components/editor/editor'
import Form from '@/components/form/form'
import Header from '@/components/header/header'
import Index from '@/components/index/index'
import Table from '@/components/table/table'
*/

//懒加载...
const App = () =>
    import ('@/App');
const Editor = () =>
    import ('@/components/editor/editor');
const Form = () =>
    import ('@/components/form/form');
const Index = () =>
    import ('@/components/index/index');
const Table = () =>
    import ('@/components/table/table');

Vue.use(Router)

let routes = [{
    path: '/',
    name: 'home',
    component: App,
    redirect: 'index',
    children: [{
        path: '/index',
        name: 'index',
        component: Index,
        class: 'fa-line-chart'
    }, {
        path: '/table',
        name: 'table',
        component: Table,
        class: 'fa-table'
    }, {
        path: '/form',
        name: 'form',
        component: Form,
        class: 'fa-newspaper-o'
    }, {
        path: '/editor',
        name: 'editor',
        component: Editor,
        class: 'fa-plug'
    }]
}]

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
    //ElementUi.Message({ message: `即将离开${from.name}页面`, duration: 500 });
    if (from.name !== null && to.name !== from.name) {
        ElementUi.MessageBox({ message: `请确认是否跳转至${to.name}页面`, showCancelButton: true })
            .then(function(resolve) {
                var loading = ElementUi.Loading.service({
                    text: `正在跳转至${to.name}页面`,
                    background: 'rgba(0, 0, 0, 0.8)',
                    spinner: 'el-icon-loading'
                });
                setTimeout(() => {
                    next();
                    loading.close();
                }, 1000);
            }).catch(function(reject) {
                next(false);
            })
    } else {
        next();
    }
})

router.afterEach((to, from) => {
    if (from.name !== null && to.name !== from.name) {
        ElementUi.Message(`成功跳转至${to.name}页面`);
    }
})

export default router;