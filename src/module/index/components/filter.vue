<template>
	<div class="l_filter_box" v-if="isShow">
		<div class="clearfix" v-for="el in filter" v-if="!(!isIndex&&el.key=='serviceType')">
			<p class="pull_left f28 wid98">{{el.title}}</p>
			<ul class="pull_left">
				<li v-for="v in el.list" :class="{active:el.id == v.id}" @click="el.id=v.id">{{v.name}}</li>
			</ul>
		</div>
		<div class="l_filter_btn flex justify_center">
			<a class="btn_border gray_border mlr10" href="javascript:void(0);" @click="reset">重置</a>
			<a class="btn mlr10" href="javascript:void(0);" @click="sure">确认</a>
		</div>
	</div>
</template>

<script>
	export default{
		data(){
			return{
				isShow:false,//是否显示
				filter:[
					{
						title:'性别',
						list:[{name:'不限',id:''},{name:'男',id:'male'},{name:'女',id:'female'}],
						key:'gender',
						id:''
					},
					{
						title:'年龄',
						list:[{name:'不限',id:''},{name:'25以下',id:'0-25'},{name:'25-35',id:'25-35'},{name:'35以上',id:'35-*'}],
						key:'age',
						id:''
					},
					{
						title:'距离',
						list:[{name:'不限',id:''},{name:'5公里内',id:'5'},{name:'10公里内',id:'10'}],
						key:'dist',
						id:''
					},
					{
						title:'认证',
						list:[{name:'不限',id:''},{name:'身份认证',id:'isVerify'},{name:'技能认证',id:'isSkillCertification'}],
						key:'authType',
						id:''
					},
//					{
//						title:'媒体',
//						list:[{name:'不限',id:''},{name:'语音介绍',id:'voice'},{name:'视频介绍',id:'video'}],
//						key:'media',
//						id:''
//					},
					{
						title:'服务',
						list:[{name:'不限',id:''},{name:'线下服务',id:'offline'},{name:'线上服务',id:'online'}],//{name:'电话咨询',id:'offline'}
						key:'serviceType',
						id:''
					}
				]//筛选条件
			}
		},
		props:{
			isIndex:{//是否是首页  首页筛选条件包括服务 搜索页面不包括
				default:true
			}
		},
		activated(){
			this.close();
		},
		methods:{
			//显示
			show(){
				this.isShow = true;
			},
			//关闭
			close(){
				this.isShow = false;
			},
			//重置
			reset(){
				for(let i in this.filter){
					this.filter[i].id = '';
				}
			},
			//确定
			sure(){
				let data = {}
				for(let i in this.filter){
					if(this.filter[i].id){
						if(this.filter[i].key=='age'){
							let age = this.filter[i].id;
							data.minAge = age.slice(0,age.indexOf('-'));
							data.maxAge = age.slice(age.indexOf('-')+1);
						}else{
							data[this.filter[i].key] = this.filter[i].id;
						}
					}
				}
				this.close();
				this.$emit('filterList',data)
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.wid98{
	width: 0.98rem;
}
.l_filter_box{
	position: absolute;
	left: 0;
	right: 0;
	top:0.8rem;
	background: #fff;
	padding: 0.4rem 0.3rem;
	.border-t;
	line-height: 0.66rem;
	ul{
		width: 5.8rem;
	}
	li{
		display: block;
		float: left;
		width: 1.62rem;
		margin-right: 0.3rem;
		margin-bottom: 0.3rem;
		background: #f3f3f3;
		.border(#f3f3f3);
		.border-radius(0.04rem);
		line-height: 0.64rem;
		text-align: center;
		.c_666;
		&.active{
			border-color: #ff8280;
			background-color: #ffefef;
			.c_main;
		}
	}
}
.l_filter_btn{
	.btn_border{
		.c_999;
	}
	.btn,.btn_border{
		padding: 0.1rem 0.7rem;
	}
}
</style>