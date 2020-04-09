<!--头部-->
<template>
    <div class="apply_box">
    	<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 任务中心'></top>
    	<div class="task_con">
    		<div class="apply_task">
    			<div class="task_title text_center task_bg">
    				<h3>今日任务</h3>
    				<p class="f26 c_999">完成任务后即可获得金币奖励</p>
    			</div>
    	        <ul class="apply_list">
    	        	<li v-for="item in todayTask">
    	        		<img class="apply_img" :src="item.icon|imgUrl">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">{{item.name}}<span class="f22 ml10 c_orange">{{item.reward+item.rewardTypeText}}</span></p>
    	        			<p class="f24 mb5 c_888">{{item.memo}}</p>
    	        		</div>
    	        		<router-link :to="item.taskUrlWx" class="apply_btn">{{item.btnName}}</router-link>
    	        	</li>
    	        </ul>
    		</div>
    		<div class="apply_task bg_fff">
    			<div class="task_title text_center">
    				<h3>常规任务</h3>
    				<p class="f26 c_999">奖励金请在完成后3天内领取，逾期作废</p>
    			</div>
    	        <ul class="apply_list">
    	        	<li v-for="item in commonTask">
    	        		<img class="apply_img" :src="item.icon|imgUrl">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">{{item.name}}<span class="f22 ml10 c_orange">{{item.reward+item.rewardTypeText}}</span></p>
    	        			<p class="f24 mb5 c_888">{{item.memo}}</p>
    	        		</div>
    	        		<router-link :to="item.taskUrlWx" class="apply_btn">{{item.btnName}}</router-link>
    	        	</li>
    	        </ul>
    		</div>
    	</div>
	</div>
</template>

<script>
	import {
	    fetchtaskList,//任务列表
    } from '../service/getData'; 
    
    export default {
    	data(){
            return{
            	todayTask:[], //今日任务列表
            	commonTask:[],//常规任务列表
            }
        },
        components:{
        	
        },
        mounted(){
        	this.taskListFun(1);//今日任务列表
        	this.taskListFun(2);//常规任务列表
        },
        deactivated(){
        	
       	},
       	methods: {
       		taskListFun(type){//任务列表
       			fetchtaskList(type).then(res=>{
       				let list = res.data.list;
       				if(type==1){
       					this.todayTask = list;//今日任务列表
       				}else{
       					this.commonTask = list;//常规任务列表
       				}
       			})
       		}
        }
    }
</script>

<style lang="less" scoped="scoped">
	@import (reference) "~src/style/all.less";
	i{
		vertical-align: middle;
	}
	.apply_box{
		min-height:100%;
		background:@bg_color;
	}
	.task_con{
		position: relative;
		min-height: 4.62rem;
		padding:2.84rem 0.3rem 0.2rem;
		background: url(../images/task_banner.jpg) no-repeat;
		background-size:100%;
	}
	.apply_task{
		.border-radius(0.1rem);
		padding:0.4rem 0.25rem 0 0.2rem;
		margin-bottom: 0.2rem;
		overflow: hidden;
	}
	.task_title{
		padding-bottom:0.4rem;
		&.task_bg{
			position: relative;
			width:100%;
			height:1.41rem;
			padding-top:0.34rem;
			margin-bottom:0.4rem;
			background:url(../images/task_title.png) no-repeat;
			background-size:100%;
		}
		& h3{
			font-size:0.4rem;
			margin-bottom:0.1rem;
			font-weight: bold;
		}
	}
	.apply_list{
		& li{
			.flex;
			.flex_center;
			.justify_between;
			margin-bottom: 0.4rem;
		}
		& .apply_img{
			flex-shrink:0;
			width:1rem;
			height:1rem;
			margin-right:0.2rem;
		}
		& .apply_text{
			flex-shrink:0;
			width:3.34rem;
			margin-right: 0.2rem;
		}
	}
	.task_total{
		display:inline-block;
		width:1.6rem;
		height:0.18rem;
		.border-radius(0.2rem);
		background:#ffe7e8;
	}
	.task_time{
		display:inline-block;
		width:1rem;
		height:0.18rem;
		.border-radius(0.2rem);
		background:@color;
		vertical-align: top;
	}
	.apply_btn{
		display: block;
		width:1.46rem;
		height:0.64rem;
		line-height:0.64rem;
		color:#fff;
		.gradient_v(#fd6955,#ff4c49);
		.border-radius(0.3rem);
		.box_shadow(1px 1px 0.07rem #f4bebe);
		margin-top:0.1rem;
		text-align: center;
	}
	.mb5{margin-bottom:0.05rem;}
</style>
