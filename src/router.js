//引入vue-router路由
import VueRouter from 'vue-router';

//引入路由匹配对应的组件
import home from './components/home.vue';
import member from './components/member.vue';
import search from './components/search.vue';
import shopcar from './components/shopcar.vue';
import newslist from './components/news/newslist.vue';

//定义路由匹配
var router = new VueRouter({
    routes:[
        {path:"/",redirect:'/home'},
        {path:"/home",component:home},
        {path:"/member",component:member},
        {path:"/shopcar",component:shopcar},
        {path:"/search",component:search},
        {path:"/home/newslist",component:newslist}
    ],
    //修改路由匹配的默认类
    'linkActiveClass':"mui-active"
});

//暴露
export default router;