<!--已获得奖品-->
<template lang="html">
	<div class="shade">
		<div class="panel">
			<div class="panel_head">
				<img src="../../../images/lottery_panel_tit.png" class="head_bg"/>
				<img src="../../../images/lottery_tit_prize.png" alt="" class="head" />
			</div>
			<div class="panel_body">
				<div class="prize_none" v-show="!prizeList.length">暂无奖品</div>
				<div class="prize_list" v-show="prizeList.length">
					<div class="prize" v-for="v in prizeList">
						<span class="c_main">{{v.addDate}}</span>
						<span>通过大转盘抽到</span>
						<span class="c_main">{{v.prizeName}}</span>
					</div>
				</div>
				<div class="pagination" v-show="totalPage>1">
					<div class="btn btn_prev" :class="{btn_gray:!prevFlag}" @click="prev">上一页</div>
					<div class="btn btn_next" :class="{btn_gray:!nextFlag}" @click="next">下一页</div>
				</div>
			</div>
		</div>
		<div class="btn_close" @click="closeLotteryPrize">
			<i class="iconfont icon-close2"></i>
		</div>
	</div>
</template>

<script>
import {
	fetchMyLotterySuccessList,//获取我的中奖信息列表
} from '../service/getData'
export default {
	data(){
		return {
			prizeList:[1,9,6,4,8,7],//奖品列表
			page:1,//页码
			size:6,//每页展示条数
			totalPage:0,//总页数
			prevFlag:false,//上一页是否可点击
			nextFlag:false,//下一页是否可点击
		}
	},
    props:{
    	
    },
    mounted(){
    	this.getMyPrizeList();
	},
    methods:{
    	//获取我的中奖信息列表
    	getMyPrizeList(){
    		fetchMyLotterySuccessList(this.page,this.size).then(res=>{
    			if(res.data){
    				this.totalPage=res.data.totalPage;
		    		this.prizeList=res.data.list||[];
		    		if(this.totalPage>1){
		    			this.nextFlag=true;
		    		}
    			}
    		})    		
    	},
    	//上一页
    	prev(){
    		if(!this.prevFlag){
    			return;
    		}
    		this.page-=1;
			this.nextFlag=true;
    		this.getMyPrizeList();
    		if(this.page<=1){
    			this.prevFlag=false;
    		}
    	},
    	//下一页
    	next(){
    		if(!this.nextFlag){
    			return;
    		}
    		this.page+=1;
    		this.prevFlag=true;
    		this.getMyPrizeList();
    		if(this.page==this.totalPage){
    			this.nextFlag=false;
    		}
    	},
    	//关闭活动规则弹窗
    	closeLotteryPrize(){
    		this.$emit("closeLotteryPrize");
    	}
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.shade{
	position: fixed;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	z-index: 20;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	background-color: rgba(0,0,0,0.6);
}
.panel{
	width: 5.95rem;
}
.panel_head{
	position: relative;
	width: 100%;
	height: 1rem;
	display: flex;
	justify-content: center;
	align-items: center;
	.head_bg{
		position: absolute;
		left: 0;
		bottom: 0;
		height: 1.27rem;
	}
	.head{
		height: 0.36rem;
	}
}
.panel_body{
	padding: 0.33rem 0.35rem 0.3rem;
	background-color: #fff;
	border-radius:0 0 0.2rem 0.2rem;
}
.prize_none{
	padding: 0.4rem 0;
	text-align: center;
	font-size: 0.3rem;
	color: #666;
}
.prize{
	line-height: 0.56rem;
	font-size: 0.26rem;
	color: #666666;
}
.pagination{
	margin-top: 0.3rem;
	margin-bottom: 0.14rem;
	display: flex;
	justify-content: center;
	.btn{
		width: 2.3rem;
		margin: 0 0.17rem;
		&.btn_gray{
			background: #ccc;
			box-shadow: none;
		}
	}	
}
.btn_close{
	margin-top: 0.4rem;
	.iconfont{
		font-size: 0.5rem;
		color: #fff;
	}
}
</style>
