//引入依赖
import Vue from 'vue'
import App from './App.vue'
import VueSocketio from 'vue-socket.io'
import storage from './modules/storage.js'

//获取桌号
const roomid = window.location.hash.split('=')[1];

storage.set('roomid', roomid);

//使用socket
Vue.use(VueSocketio, 'http://a.itying.com/roomid='+roomid);
//引入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)

//引入组件
import Cart from './components/Cart.vue'
import Home from './components/Home.vue'
import Hot from './components/Hot.vue'
import Order from './components/Order.vue'
import Pcontent from './components/Pcontent.vue'
import Search from './components/Search.vue'
import Start from './components/Start.vue'
import Order_pay from './components/Order_pay.vue'

//配置路由

const routes=[
  {path:'/Start',component:Start},
  {path:'/Home',component:Home},
  {path:'/Hot',component:Hot},
  {path:'/Order',component:Order},
  {path:'/Search',component:Search},
  {path:'/Pcontent',component:Pcontent},
  {path:'/Cart',component: Cart},
  {path:'/Order_pay',component:Order_pay},
  {path:'*',redirect:'/start'}
]

//实例化路由
const router=new VueRouter({
  //mode:history,
  routes
});

new Vue({
  el: '#app',
  sockets:{
    connect(){
      //console.log('socket connected');
    }
  },
  methods:{
    clickButton(){
      //this.$socket.emit('emit_mrthod','val');
    }
  },
  router,
  render: h => h(App)
})
