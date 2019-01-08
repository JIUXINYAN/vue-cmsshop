//引入vue框架
import Vue from 'vue';


//引入vue-resource模块，用来发送ajax请求
import vueResource from 'vue-resource';
Vue.use(vueResource); 


//全局设置ajax请求的根域名
Vue.http.options.root = "http://127.0.0.1:3000/";


//全局设置post请求体，默认post表单传递数据
Vue.http.options.emulateJSON = true


//引入vue-router路由
import VueRouter from 'vue-router';
//安装到vue
Vue.use(VueRouter);


//引入moment模块
import moment from "moment";
//定义全局过滤器
Vue.filter('dateFormat',function(dataStr,pattern='YYYY-MM-DD HH:mm:ss') {
    return moment(dataStr).format(pattern);
})


//引入路由模块
import router from './router.js'


//引入mintui组件(css一般按需引入，js一般全局引入)
import { Header,Button } from 'mint-ui';
import 'mint-ui/lib/style.css';
Vue.component(Header.name, Header);
Vue.component(Button.name, Button);

//按需导入轮播图所需的两个组件
import { Swipe, SwipeItem,Lazyload } from 'mint-ui';
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);

Vue.use(Lazyload);


//引入vant-ui组件
import { Tab, Tabs } from 'vant';
import 'vant/lib/index.css';
Vue.use(Tab).use(Tabs);


//引入mui的css样式
import './lib/mui/css/mui.min.css';
//引入mui扩展的字体文件
import './lib/mui/css/icons-extra.css';


//导入app.vue根组件
import app from './app.vue'

new Vue({
    el:"#app",
    data:{
        
    },
    render:c=>c(app),
    //等价于
    // render:function(createElement){
    //     return createElement(app);
    // }
    router

})