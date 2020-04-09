<template>
	<div class="router_page bg_gray pb98">
		<top title='同城  <span class="title_circle">●</span> 支付' :isReturn="false"></top>
		<div class="z_details border-n">
            <div class="clearfix">
                <p class="pull_left c_666 f28">推荐类目：<span class="c_333">{{payInfo.skillCategoryName}}</span></p>
			    <p class="pull_left c_666 f28" style="margin-left:1rem;">推荐范围：<span class="c_333">{{payInfo.cityName}}</span></p>
            </div>
            <p class="c_666 f28 mt30">区域推荐：<span class="c_333">{{payInfo.positionCn}}推荐  ￥{{payInfo.price}}/{{payInfo.dayNum}}天</span></p>
            <p class="c_666 f28 mt30">推荐时间：<span class="c_333">{{payInfo.addDate | date('yyyy-MM-dd')}}  至  {{payInfo.endDate | date('yyyy-MM-dd')}}</span></p>
		</div>
		<div class="hei20 bg_gray"></div>
		<div class="c_demandDetail_li">
			<p class="f28">应付金额：<span class="c_main">￥{{payInfo.price}}</span></p>
		</div>
		<div class="hei20 bg_gray"></div>
		<com-pay-recharge ref="comPayRecharge" @toPay="toPay" :payMoney="payInfo.price"></com-pay-recharge>
		<!--S 温馨提示-->
		<com-warm-prompt :code="code"></com-warm-prompt>
		<!--E 温馨提示-->
		<div class="c_fixed_bottom">
		    <a href="javascript:void(0);" class="btn_block" @click="toChildCheckPayMoneyAndType">支付定金</a>
		</div>
	</div>
</template>

<script>
import comPayRecharge from "src/components/com-pay-recharge"//支付
import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
import {
	fetchPayInfo,  //选择支付方式对应展示信息查询
	paySuccess, //支付
} from '../service/getData'; 
export default {
	data() {
		return {
			code:"TCFKWXTS",//温馨提示code 码
			id: '', //购买主键id
			payInfo: {}, //展示信息
		}
	},
	components:{
		comPayRecharge,
		comWarmPrompt
	},
	methods:{
		//选择支付方式对应展示信息查询
		getPayInfo () {
			fetchPayInfo(this.id).then(res => {
				this.payInfo = res.data.skillRecommendMemberVo
			})
		},
		toChildCheckPayMoneyAndType(){//调用子组件的 校验金额与类型函数
			this.$refs.comPayRecharge.checkPayMoneyAndType();
		},
		//支付
		toPay(){
			paySuccess(this.payInfo.id,true,this.$refs.comPayRecharge.accountType.toString()).then(res => {
				if (res.status) {
					alertTip('支付成功');
					this.$router.replace('/recommendList');
				}
			})
		}
	},
	mounted(){
					
	},
	activated () {
		this.id = this.$route.query.id; //路由获取购买主键id
		this.getPayInfo(); //选择支付方式对应展示信息查询
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
@import '~src/module/demandManage/style/demand.less';
.c_ccc{color:#ccc;}
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
.c_fixed_bottom{
    .btn_block{
        margin: 0.15rem auto;
    }
}
.z_details{
    background: #fff;
    padding: 0.3rem;
    position: relative;
}

</style>
