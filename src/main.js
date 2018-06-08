// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.min.css'
import jQuery from '../static/jquery/jquery.min'
import Highcharts from 'highcharts/highstock'
import App from './App'
import mockjs from '@/mockjs/mock'
import axios from 'axios'
//import Vuex from 'vuex'
import store from '@/store/index'

mockjs.mockData();

Vue.config.productionTip = false;

Vue.use(ElementUi);

Vue.prototype.$http = axios.create({
    timeout: 5000
});

var loading;

Vue.prototype.$http.interceptors.request.use(response => {
    loading = ElementUi.Loading.service(); 
    return response
}, error => { 
    loading.close();
    ElementUi.Message.error({  message: '加载超时'  });
    return Promise.reject(error)
})

Vue.prototype.$http.interceptors.response.use(response => {
    setTimeout(() => {
        loading.close();
    }, 4000); 
    return response
}, error => { 
    loading.close();
    ElementUi.Message.error({  message: '加载失败'  });
    return Promise.reject(error)
})


/* eslint-disable no-new */
let app = new Vue({
    store,
    router,
    data: {
        a: 'a'
    }
}).$mount('#app');

export default app;