<template>
    <div>
        <div class="cart_content">
			<!-- 头部区域 -->
			<div class="cart_info">				
				<h2>购物车</h2>								
				<div class="p_number">
					<div class="p_number_left">
	       				<p>用餐人数:2人</p>
	       				<p>备注:无</p>
	       			</div>	       			
	       			<div class="p_number_right">
	       				<img src="../assets/images/edit.png"/>
	       				<p>修改</p>
	       			</div>										
				</div>				
				<div class="cart_p_num">					
					<p>购物车中总共有{{totalNum}}个菜</p>	       			
	       			<p>合计：<span class="price">¥{{totalPrice}}</span></p>
				</div>
			</div>
			<!-- 订单列表 -->
			<div class="cart_list">				
				<ul>
					<li class="item" v-for="(item,index) in cartList" v-if="item.num!=null">
						<div class="left_food">
							<img :src="api+item.img_url"/>       						
							<div class="food_info">
								<p>{{item.title}}</p>
								<p class="price">¥{{item.price}}</p>
							</div>	       							
						</div>	       						
						<div class="right_cart">
							<div class="cart_num">
								<div class="input_left" @click="decNum(item,index)">-</div>
								<div class="input_center">
									<input type="text"  readonly="readonly" 
										   v-model="item.num" name="num" id="num" />
								</div>
								<div class="input_right" @click="incNum(item)">+</div>				      
							</div>	
						</div>							
					</li>				
				</ul>
			</div>			
		</div>
		<!-- 底部推荐 -->
        <div class="hot_food">				
				<h3>本店顾客最长点的菜</h3>				
				<div class="item_list_outer">
					<ul class="item_list">
						<li>	
							<div class="inner">
								<img src="../../static/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>						
						<li>
							<div class="inner">
								<img src="../../static/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>												
						</li>						
						<li>	
							<div class="inner">
								<img src="../../static/images/1.jpg" />
								<p class="title">大蒜腊肉</p>						
								<p class="price">¥26</p>
							</div>		
						</li>						
						<li>
							<div class="inner">
								<img src="../../static/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>												
						</li>						
						<li>
							<div class="inner">
								<img src="../../static/images/2.jpg" />
								
								<p class="title">家乡扣肉</p>
								
								<p class="price">¥26</p>	
							</div>												
						</li>												
					</ul>					
				</div>				
			</div>				
		<!-- 底部导航组件 -->
		<nav-footer></nav-footer>		
		<router-link to="/home">
			<div class="footer_book" style="left:50%">
				<img src="../assets/images/menu.png"/>
				<p>菜单</p>
			</div>
		</router-link>						
		<div class="footer_cart" @click="placeOrder">
			<img src="../assets/images/doorder.png"/>
			<p>下单</p>
		</div>
    </div>
</template>



<script>
//导入样式
import '../assets/css/cart.scss'
//导入组件
import NavFooter from './public/NavFooter.vue'
//导入依赖
import axios from 'axios'
//导入配置文件
import Config from '../modules/config.js'

import storage from '../modules/storage.js'
export default {
	data(){
		return {
			api:Config.api,
			cartList:[],
			peopleNum:0,
		}
	},
	mounted(){
		this.getCartData();
		this.getPeopleInfo();
	},
    components:{
		NavFooter,
	},
	computed:{
		//计算菜品数量
		totalNum(){
			return this.cartList.reduce((total,val)=>{
				return val.num==null?total:(total+val.num);
			},0);
		},
		//计算菜品总价
		totalPrice(){
			return this.cartList.reduce((total,val)=>{
				return val.num==null?total:(total+val.price*val.num);
			},0);
		}
	},
	sockets:{
		connect(){
			console.log('socket connected');
		},
		//监听服务器推送信息
		addcart(){
			//更新本地购物车数量
			this.getCartData();
		}
	},
	methods:{
		//获取人数信息，未完！！！！！！！！！！！！
		getPeopleInfo(){
			const roomid=storage.get('roomid');
			const api=this.api+'api/peopleInfoList';
			axios.get(api,{
				params:{
					uid:roomid,
				}
			})
			.then(response=>{
				this.peopleNum=response.data.result.p_num;
			})
			.catch(err=>{
				console.log(err);
			});
		},
		//获取购物车数据
		getCartData(){
			const roomid=storage.get('roomid');
			const api=this.api+'api/cartlist';
			axios.get(api, {
				params: {
					uid:roomid
				}
			})
			.then(response=>{
				this.cartList=response.data.result;
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//增加数量
		incNum(item){
			//更新服务器
			const roomid=storage.get('roomid');
			const api=this.api+'api/incCart';
			const product_id=item.product_id;
			const num=item.num;
			axios.get(api, {
				params: {
					uid:roomid,
					product_id,
					num,
				}
			})
			.then(response=>{
				//通知服务器广播数据
				this.$socket.emit('addcart','null');
				item.num++;
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//减少数量
		decNum(item,index){
			//更新服务器
			const roomid=storage.get('roomid');
			const api=this.api+'api/decCart';
			const product_id=item.product_id;
			const num=item.num;
			axios.get(api, {
				params: {
					uid:roomid,
					product_id,
					num,
				}
			})
			.then(response=>{
				//通知服务器广播数据
				this.$socket.emit('addcart','null');
				item.num>1?item.num--:this.cartList.splice(index,1);
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//下单
		placeOrder(){
			const uid=storage.get('roomid');
			const p_num=this.peopleNum;
			const p_mark=null;
			const total_price=this.totalPrice;
			const total_num=this.totalNum;
			const order=JSON.stringify(this.cartList);

			const api=this.api+'api/addOrder';
			axios.post(api, {
				uid,
				p_num,
				p_mark,
				total_price,
				total_num,
				order,
			})
			.then(response=>{
				if(response.data.success==='true'){
					//this.$socket.emit('addcart','null');
					this.$router.push({path:'order'});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>
