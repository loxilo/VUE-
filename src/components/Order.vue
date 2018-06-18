<template>
    <div>
        <div class="order_content">			
		 	<div class="order_info">	       		
	       		<div class="order_top">
	       			<img src="../assets/images/timer.png" />	       		       		      			
	       			<div class="order_info_right">
	       				<h2>118号桌待门店接单</h2>
	       				<p>请及时联系服务员确认一点菜品信息!</p>
	       			</div>	 
	       		</div>       			
       			<h3>已点菜品{{orderList.total_num}}份,合计 : <span class="price">{{total_price}}元</span> </h3>	       		       	
	       </div>	       
	       <!--订单列表-->	       
	       <div class="order_list">	       	
	       		<h3>菜品详情:</h3>
	       		<ul class="list">
	       			<li v-for="item in orderList.items">
	       				<div class="title">
	       					{{item.title}}
	       				</div>	       					
       					<div class="num">       						
       						{{item.num}}份
       					</div>       					       					
       					<div class="price">       						
       						{{item.price}}元
       					</div>       			
	       			</li>	       				       			
	       		</ul>	       
	       </div>       				
		</div>
		<nav-footer></nav-footer>
		<router-link to="/home">
			<div class="footer_book"> 
				<img src="../assets/images/menu.png"/>
				<p>菜单</p>
			</div>
		</router-link>
    </div>
</template>



<script>
//导入组件
import NavFooter from './public/NavFooter.vue'
import '../assets/css/order.scss';
//导入依赖
import axios from 'axios'
//导入配置文件
import Config from '../modules/config.js'

import storage from '../modules/storage.js'
export default {
	data(){
		return {
			api:Config.api,
			orderList:[],
		}
	},
    components:{
		NavFooter,
	},
	mounted(){
		this.getOrder();
	},
	methods:{
		getOrder(){
			const roomid=storage.get('roomid');
			const api=this.api+'api/getOrder';
			axios.get(api, {
				params: {
					uid:roomid
				}
			})
			.then(response=>{
				this.orderList=response.data.result[0];
			})
			.catch(function (error) {
				console.log(error);
			});
		}
	}
}
</script>

