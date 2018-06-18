<template>
    <div>
		<!-- 商品详情页面 -->
        <router-link to="/Home">
			<div class="back">返回</div>
		</router-link>
        <div class="p_content">		
			<div class="p_info">				
				<img :src="api+food_detail_list.img_url"/>				
				<h2>{{food_detail_list.title}}</h2>				
				<p class="price">{{food_detail_list.price}}元/份</p>
			</div>
			<div class="p_detial">
				<h3>商品详情</h3>
				<div class="p_content" v-html="food_detail_list.content"> </div>
			</div>
		</div>
        <br>
        <br>
        <br>
		<!-- 底部 -->
		<footer class="pfooter">			
			<div class="cart">				
				<strong>数量:</strong>
				<div class="cart_num">
		          <div class="input_left" @click="decNum">-</div>
		          <div class="input_center">
		              <input type="text"  readonly="readonly" v-model="foodNum" name="num" id="num" />
		          </div>
		          <div class="input_right" @click="incNum">+</div>				      
		        </div>											
			</div>			
			<button class="addcart" @click="addCart">加入购物车</button>			
		</footer>
    </div>
</template>



<script>
//导入依赖
import axios from 'axios'
//导入样式
import '../assets/css/pcontent.scss';
//导入配置文件
import Config from '../modules/config.js'
import storage from '../modules/storage.js'
export default {
	data(){
		return {
			food_detail_list:[],
			api:Config.api,
			foodNum:1,
		}
	},
    mounted(){
		const id=this.$route.query.id;
		this.requestData(id);
	},
	methods:{
		//获取食品详情
		requestData(id){
			const api=this.api+'api/productcontent';
			axios.get(api, {
				params: {
					id,
				}
			})
			.then(response=>{
				console.log(response);
				this.food_detail_list=response.data.result[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		},
		//增加食品数量
		incNum(){
			this.foodNum++;
		},
		//减少食品数量
		decNum(){
			if(this.foodNum>=1)this.foodNum--;
		},
		//增加购物车
		addCart(){
			//
			const api=this.api+'api/addcart';
			const roomid=storage.get('roomid');
			axios.post(api, {
				uid:roomid,
				title:this.food_detail_list.title,
				price:this.food_detail_list.price,
				num:num,
				product_id:this.food_detail_list._id,
				img_url:this.food_detail_list.img_url
			})
			.then(response=>{
				if(response.data.success==='true'){
					this.$socket.emit('addcart','null');
					this.$router.push({path:'home'});
				}
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>
