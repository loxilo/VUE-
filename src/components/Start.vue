<template>
    <!-- 开始入口 -->
    <div id="start">
        <div  class="start_content">			
			<header class="start_header">			
				<img src="../assets/images/canju.png"/> 
                <span>用餐人数</span>
			</header>		
			<p class="notice">请选择正确的用餐人数 ，小二马上给你送餐具</p>			
			<div class="content">
				<ul class="user_list">
					<li v-for="(item,index) in peopleNumber"
						@click="checkedNum=index+1">						
						<span :class="{active:checkedNum===index+1}">{{item}}人</span>
					</li>					
				</ul>
			</div>				
		</div>	

        <!-- 底部开始点餐按钮 -->	
		<div class="start" @click="addPeopleInfo">			
			<span>
				开始点菜
			</span>		
		</div>
    </div>
</template>

<script>
import '../assets/css/start.scss'
//导入依赖
import axios from 'axios'
//导入配置文件
import Config from '../modules/config.js'
import storage from '../modules/storage.js'
export default {
    data(){
        return{
			checkedNum:1,
			api:Config.api,
            peopleNumber:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,'>15'],
        }
    },
	mounted(){},
	created(){
		this.getPeopleInfoList();
	},
	methods:{
		addPeopleInfo(){
			const api=this.api+'api/addPeopleInfo';
			const roomid=storage.get('roomid');
			axios.post(api,{
				uid:roomid,
				p_num:this.peopleNumber,
			})
			.then(response=>{
				if(response.data.success==='true'){
					this.$router.push({path:'home'});
				}
			})
			.catch(err=>{
				console.log(err);
			});
		},
		getPeopleInfoList(){
			const api=this.api+'api/peopleInfoList';
			const roomid=storage.get('roomid');
			axios.get(api,{
				params:{
					uid:roomid,
					p_num:this.peopleNumber,
				}
			})
			.then(response=>{
				console.log(response.data.result);
				if(response.data.result.length>0){
					this.$router.push({path:'home'});
				}
			})
			.catch(err=>{
				console.log(err);
			});
		}
	}
}
</script>



