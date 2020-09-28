import Vue from 'vue'

// element 全局引入 也可按需
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


// 请求方法 挂载
import { get, post } from '../api/index'
Vue.prototype.$post = post
Vue.prototype.$get = get

// 第三方npm 挂载
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs

