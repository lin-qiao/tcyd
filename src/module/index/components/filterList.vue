<template>
	<div class="l_filter_list" v-if="isShow">
		<ul v-if="type=='sort'">
			<li @click="sure('sort',el.id)" v-for="el in sortList" :class="{active:sort==el.id}">{{el.name}}</li>
		</ul>
		<ul v-if="type=='serviceType'">
			<li @click="sure('serviceType',el.id)" v-for="el in serviceTypeList" :class="{active:serviceType==el.id}">{{el.name}}</li>
		</ul>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,//是否显示
				sortList:[
					{id:0,name:'智能排序'},{id:1,name:'最新发布'},{id:3,name:'距离最近'},{id:2,name:'人气最高'}
				],//排序列表
				sort:0,//排序id
				serviceTypeList:[
					{id:'',name:'全部服务'},{id:'offline',name:'线下服务'},{id:'online',name:'线上服务'}
				],//服务列表
				serviceType:''//服务id
			}
		},
		props:{
			type:{
				//sort--代表排序  serviceType--代表服务
			}
		},
		activated(){
			this.close();
		},
		methods:{
			//展示
			show(){
				this.isShow = true;
			},
			//确定
			sure(type,id){
				this[type] = id;
				this.$emit('filterList',type,id);
				this.close();
			},
			//关闭
			close(){
				this.isShow = false;
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.l_filter_list{
	position: absolute;
	left: 0;
	right: 0;
	top:0.81rem;
	background: #fff;
	li{
		padding: 0 0.56rem;
		height: 0.8rem;
		.border-b(#e8e8e8);
		line-height: 0.79rem;
		font-size:0.26rem;
		&.active{
			.c_main;
		}
	}
}
</style>