<template>
	<div class="pb110">
		<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 我的技能'></top>
		<nodata v-if="!skillList.length"></nodata>
		<ul class="l_skill_list mb116 pb121">
			<skillItem v-for="el in skillList" :data="el"></skillItem>
		</ul>
		<!--S 底部按钮-->
		<div class="btn_wrap">
			<div class="btn_block" @click="publish">发布新技能</div>
		</div>
		<!--E 底部按钮-->
	</div>
</template>

<script>
	import skillItem from '../components/skillItem';
	import {
		fetchGetSkillList,  //获取用户技能列表
		fetchSkillTopLimit  //发布技能上限
	} from '../service/getData';
	export default{
		data(){
			return{
				skillList:[], //技能列表
			}
		},
		activated() {
			this.getSkillList();
		},
		mounted(){

		},
		methods:{
			getSkillList(){
				fetchGetSkillList().then(res => {
					if(res && res.status){
						this.skillList = res.data.list;
					}
				})
			},
			publish(){
				fetchSkillTopLimit().then(res => {
					if(res && res.status){
						if(res.data.flag){
							this.$router.push('/skillType')
						}else{
							this.$alert({
								layerImg:require('src/images/lay_bell.png'),
								content:'您发布技能数量已达上限'
							})
						}
					}
				})
			}
		},
		components:{
			skillItem
		}
	}
</script>
<style lang="less" scoped>
.c_ccc{color:#ccc;}
.c_back_gauge{
    background: #fff;
    padding-left:0.3rem;
    .c_demandDetail_li{
        padding-left:0;
    }
}
.c_demandDetail_li{
    background: #fff;
    display:flex;
    justify-content:space-between;
    padding:0 0.3rem;
    position:relative;
    height:0.92rem;
    border-bottom:1px solid #eee;
    align-items: center;
    span{
        font-size:0.28rem;
        color:#666;
    }
}
.c_pay_popup .mint-popup{
	width:100%;
}
.c_pay_list{
	position:relative;
	img{
		position:absolute;
		left:0rem;
		top:50%;
		margin-top:-0.3rem;
		width:0.6rem;
		height:0.6rem;
	}
	i{
		color:#cccccc;
		font-size:0.4rem;
	}
}
.c_pay_list span:first-child{
	padding-left:0.9rem;
}
.btn_border,.btn{
	padding:0.1rem 0.6rem;
}
</style>
