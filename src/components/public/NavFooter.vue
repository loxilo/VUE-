<template>
    <div id="navfooter">
        <!-- 底部导航 -->
		<div class="footer_nav" 
			 @click="footer_nav_isShow=!footer_nav_isShow">
			<img src="../../assets/images/navigation.png"/>
			<p>导航</p>
		</div>
        <!-- 导航弹出层	 -->
	 	<div class="footer_nav_show" v-if="footer_nav_isShow">           
            <ul class="list">                                   
                <li>                   
                    <router-link to="/home">
                        <img src="../../assets/images/menu.png"/>
                        <p>菜单</p>
                    </router-link>                  
                </li>                
                <li>                   
                    <router-link to="/cart">
                        <img src="../../assets/images/cart.png"/>
                        <p>购物车</p>
                    </router-link>                   
                </li>                
                <li>	                    
                    <router-link to="/order">
                        <img src="../../assets/images/order.png"/>
                        <p>订单</p>
                    </router-link>                  
                </li>				                
                <li>	                 
                    <router-link to="/order_pay">
                        <img src="../../assets/images/wallet.png"/>
                        <p>结账</p>
                    </router-link>                    
                </li>                
                <li @click="footer_nav_isShow=!footer_nav_isShow">
                    <img src="../../assets/images/close.png"/>
                    <p>返回</p>
                </li>
            </ul>            
        </div>
    </div>
</template>
<script>
import '../../assets/css/navfooter.scss'
export default {
    data(){
        return {
            //底部导航显示控制
			footer_nav_isShow:false,
        }
    }
}
</script>
