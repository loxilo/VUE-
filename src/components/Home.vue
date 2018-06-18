<template>
    <div id="home">
	   <!-- 顶部导航 -->
       <header class="index_header">			
			<div class="hlist" id="hotSaleFood" @click="NavCategory">
				<img src="../assets/images/rexiao.png"/>
				<p>热销榜单</p>				
			</div>			
			<div class="hlist" id="boughtFood" @click="NavCategory">
				<img src="../assets/images/caidan.png" />
				<p>点过的菜</p>				
			</div>
			<div class="hlist" id="likeFood" @click="NavCategory">				
				<img src="../assets/images/sousuo.png"/>
				<p>搜你喜欢</p>				
			</div>			
		</header>	
		<!-- 侧边菜单栏 -->
		<aside class="left_cate" :class="{left_cate_isShow:left_cate_showOrhide}">
				<ul>
					<li v-for="(item,index) in food_category_list" 
						@click="foodCategory(index)">
						{{item.title}}
					</li>					
				</ul>				
				<div id="nav_cate" class="nav_cate" 
					 @click="left_cate_showOrhide=!left_cate_showOrhide;
					 shade_isShow=!shade_isShow">
					<img src="../assets/images/nav.png"/>
					<p>菜单</p>
				</div>				
		</aside>
		<!-- 中间食品展示区域 -->
		<div class="content">
			<!-- 食品展示 -->
			<div class="item" v-for="item in food_category_list">				
				<h3 class="item_cate">{{item.title}}</h3>				
				<ul class="item_list">
					<li  v-for="food in item.list">						
						<div class="inner">
							<router-link :to="'/Pcontent?id='+food._id">
								<img :src="api+food.img_url"/>
							</router-link>
							<p class="title">{{food.title}}</p>						
							<p class="price">¥{{food.price}}</p>
						</div>								
					</li>	
				</ul>			
			</div>
		</div>
		<!-- 遮罩 -->
		<div class="bg" v-if="shade_isShow">			
		</div>
		<!-- 底部导航 -->
		<nav-footer></nav-footer>
		<!-- 购物车 -->
		<div id="footer_cart" class="footer_cart">
			<span v-if="cartNum>0">{{cartNum}}</span>
			<router-link to="/Cart">
				<img src="../assets/images/cart.png"/>
				<p>购物车</p>
			</router-link>
		</div>
    </div>
</template>

<script>
//导入样式
import '../assets/css/index.scss'
//导入组件
import NavFooter from './public/NavFooter.vue'
//导入依赖
import axios from 'axios'
//导入配置文件
import Config from '../modules/config.js'
import storage from '../modules/storage.js'
export default {
    data(){
		return{
			//侧边导航显示控制
			left_cate_showOrhide:false,
			//遮罩显示控制
			shade_isShow:false,
			//侧边食品分类列表
			food_category_list:[],
			//api
			api:Config.api,
			cartNum:44,
		}
	},
	components:{
		NavFooter,
	},
	sockets:{
		connect(){
			//console.log('socket connected');
		},
		//监听服务器推送信息
		addcart(){
			//更新本地购物车数量
			this.getCartCount();
		}
	},
	mounted(){
		this.requestData();
		this.getCartCount();
	},
	methods:{
		//顶部导航切换
		NavCategory(event){
			if(event.target.id==='hotSaleFood'){
				this.select_category='hot_sale_food';

			}else if(event.target.id==='boughtFood'){
				this.select_category='bought_food';

			}else{
				this.select_category='like_food';

			}
		},
		//初始化数据
		requestData(){
			const api=this.api+'api/productlist';
			axios.get(api, {
				// params: {
				// 	ID: 12345
				// }
			})
			.then(response=>{
				this.food_category_list=response.data.result;
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//选择食品类别,滚动条滚动到相应位置
		foodCategory(index){
			//过去类别为.item_cate的元素
			const itemCateDom=document.querySelectorAll('.item_cate');
			//设置滚动条顶部距离为相应元素距离顶部的距离
			document.documentElement.scrollTop=itemCateDom[index].offsetTop;
			//遮罩和选择菜单消失
			this.left_cate_showOrhide=!this.left_cate_showOrhide;
			this.shade_isShow=!this.shade_isShow;
		},
		//获取购物车数量
		getCartCount(){
			const roomid=storage.get('roomid');
			const api=this.api+'api/cartCount';
			axios.get(api, {
				params: {
					uid:roomid,
				}
			})
			.then(response=>{
				//this.cartNum=response.data.result;
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>
