<template>
	<div class="pb121">
		<experience ref="experience" title="一键体验找人服务" des="可选5个您感兴趣的技能<br>同城将为您推荐最合适的服务者" listname="猜你喜欢"></experience>
		<div class="l_fixed">
			<!--<to-other class="btn_border l_public_btn"></to-other>-->
			<a class="btn_block" href="javascript:void(0);" @click="publicSkill">一键发布</a>
		</div>
	</div>
</template>

<script>
	/*import toOther from '../components/toOther'//查看其它*/
	import experience from '../components/experience'//公共头部+列表
	import {
		fetchPublishDemandMutiple//一键发布
	} from '../service/getData'
	export default{
		components:{
			experience,
			/*toOther*/
		},
		activated(){
			if(!sessionStorage.experienceService){//已一键发布需求
				this.$router.replace('/index');
				if(sessionStorage.backUrl){
					this.$router.replace(sessionStorage.backUrl);
				}else{
					this.$router.replace('/index');
				}
			}else{
				this.$router.replace('/experienceService');
			}
		},
		methods:{
			//一键发布
			publicSkill(){
				//组件内校验
				if(!this.$refs.experience.publicSkill()){
					return;
				}
				//调接口发布
				fetchPublishDemandMutiple(this.$refs.experience.selectList.join(',')).then(res=>{
					if(res.status){
						sessionStorage.removeItem('experienceService');
						alertTip(res.msg,()=>{
							this.$router.replace('/index');
						})
					}
				})
			}
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.l_fixed{
	.flex;
	.flex_center;
	.justify_center;
	width: 7.5rem;
	position: fixed;
	height: 1.2rem;
	left: 50%;
	bottom: 0;
	margin-left: -3.75rem;
	.box_shadow(0px 0px 0.3rem rgba(0,0,0,0.14));
	.l_public_btn{
		width: 3rem;
		margin: 0 0.2rem;
		padding-top: 0.12rem;
		padding-bottom: 0.12rem;
	}
	.btn{
		border: 1px solid @color;
	}
}
</style>