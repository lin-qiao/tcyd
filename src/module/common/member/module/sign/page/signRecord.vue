<template>
	<div class="bg_gray router_page">
		<!--S 头部-->
		<top class="l_sign_title border-n" title="早起打卡赢现金" :isReturn="false"></top>
		<div class="l_sign_record_top c_fff f26 pt36 plr30">
			<p class="f48">我的战绩</p>
			<ul class="flex l_sign_mess mt60">
				<li>
					<p class="f46">{{totalMoneyOut|number(2)}}</p>
					<p>累计投入(元)</p>
				</li>
				<li>
					<p class="f46">{{totalMoneyIn|number(2)}}</p>
					<p>累计赚取(元)</p>
				</li>
				<li>
					<p class="f46">{{clockInCount}}</p>
					<p>成功打卡(天)</p>
				</li>
			</ul>
			<!--<div class="l_sign_share c_fff">
				<img src="../images/yea.png" alt="" />
				晒战绩
			</div>-->
			<p class="l_sign_tip c_fff plr30 navigate_right">每日瓜分金额将于9:00前到账小金库</p>
		</div>
		<!--E 头部-->
		<!--S 无数据-->
		<div class="l_sign_nodata text_center" v-if="!list.length">
			<img src="../images/nodata.jpg" alt="" />
			<p class="f28 c_999 mt4">暂无任何战绩</p>
		</div>
		<!--E 无数据-->
		<!--S 列表-->
		<div v-if="list.length">
			<p class="plr30 c_999 f26 l_sign_record_tit">战绩明细</p>
			<ul class="f26 c_999 l_sign_record pl30 bg_fff">
				<li class="clearfix pr30" v-for="(el,i) in list" :border-n="(i+1)==list.length">
					<p class="pull_left">{{el.signedTimeStr}}<span class="ml40 c_z_main" v-if="el.signedStatus=='Y'">打卡成功</span><span class="ml40 c_green" v-else>打卡失败</span></p>
					<p class="pull_right" :class="el.signedStatus=='Y'?'c_z_main':'c_green'">{{el.signedStatus=='Y'?'+':'-'}}{{el.money}}</p>
				</li>
			</ul>
		</div>
		<!--E 列表-->
	</div>
</template>

<script>
	import {fetchClockInList} from '../service/getData'//查询打卡记录、资金累计
	export default{
		data(){
			return{
				list:[],//打卡记录
				page:1,//页码
				size:10,//条数
				totalMoneyOut:0,//累计投入
				totalMoneyIn:0,//累计赚取
				clockInCount:0//成功打卡的天数
			}
		},
		activated(){
			this.page = 1;
			this.getList();
		},
		methods:{
			getList(){
				fetchClockInList(this.page,this.size).then(res=>{
					if(res.data){
						this.totalMoneyOut = res.data.totalMoneyOut||0,//累计投入
						this.totalMoneyIn = res.data.totalMoneyIn||0,//累计赚取
						this.clockInCount = res.data.clockInCount||0//成功打卡的天数
						this.list = res.data.list;
					}
				})
			}
		}
	}
</script>

<style lang="less">
.l_sign_title{
	.tit_icon i,.tit_font,.tit_icon {
		color: #fff!important;	
	}
}
</style>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_green{
	color: #49bc51!important;
}
.l_sign_title{
	.gradient_v(#fd6a55,#ff4a48);
}
.l_sign_record_top{
	.pos_rel;
	height: 3.8rem;
	.gradient_v(#fd6a55,#ff4a48);
	.l_sign_share{
		position: absolute;
		right:0.3rem;
		top:0.4rem;
		width: 2rem;
		height: 0.58rem;
		.border-radius(0.29rem);
		background:rgba(255,255,255,0.2);
		line-height:0.58rem;
		text-align:center;
		padding-right:0.1rem;
		img{
			height: 0.84rem;
			vertical-align: bottom;
			margin-top: -0.26rem;
		}
	}
	.l_sign_mess{
		li{
			margin-right: 0.8rem;
		}
	}
	.l_sign_tip{
		position: absolute;
		bottom: 0;
		left: 0;
		right: 0;
		background: rgba(255,255,255,0.1);
		line-height: 0.68rem;
		&:after{
			color: #fff;
		}
	}
}
.l_sign_nodata{
	padding-top: 1.1rem;
	img{
		width: 1.82rem;
	}
}
.l_sign_record_tit{
	line-height: 0.7rem;
}
.l_sign_record{
	li{
		line-height: 1.06rem;
		.border-b(#e5e5e5);
	}
}
</style>