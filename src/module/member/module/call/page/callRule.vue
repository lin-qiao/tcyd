<template>
    <div class="bg_gray router_page">
        <top title="规则详情" :isReturn="false"></top>
        <div class="oil_rule_box">
        	<h3><i class="iconfont icon-duihao2"></i>关于手机卡规则详情</h3>
        	<div class="oil_rule">
        		<h4>手机卡充值套餐</h4>
        		<p>大德通为注册用户提供手机卡代充服务，本服务不提供任何实体卡、电子卡的销售。</p>
        		<table>
        			<tr><th>充值套餐</th><th>折扣</th><th>每月充值金额</th></tr>
        			<tr><td>立即到账</td><td>99折(折扣价仅限中石化)</td><td>每月充值金额</td></tr>
        			<tr><td>3个月</td><td>98折</td><td>100的整倍数</td></tr>
        			<tr><td>6个月</td><td>96折</td><td>100的整倍数</td></tr>
        			<tr><td>12个月</td><td>92折</td><td>100的整倍数</td></tr>
        			<tr><td>24个月</td><td>98折</td><td>100的整倍数</td></tr>
        			<tr><td>6个月</td><td>96折</td><td>100的整倍数</td></tr>
        		</table>
        		<h4 class="c_main">注：</h4>
        		<p>1、套餐折扣非固定，根据全国油价涨跌相应变动，购买后每月套餐充值至手机卡额度不受影响；<br>
				2、若购买多个套餐，每月充值金额相应叠加；<br>
				3、手机卡充值套餐可以直接充值至手机卡；</p>
				<h4>手机卡充值套餐</h4>
        		<p>大德通用户每月油费500元，他购买了3个月98折，每月充值500元的套餐，购买时需要支付500*3*98%=1470元，购买完2小时内，第一笔500月即充值到手机卡中，以后第2个月和第3个月的这一天，都会充值到手机卡中，共节省30元。</p>
        		<h4>手机卡充值时间</h4>
        		<p>1、购买后当天充值第一笔，之后每月同一天进行充值；<br>
                2、每天充值时间为0:00-21:00，不在这一时间段内充值，充值到账会延顺到第2天；</p>
                <h4>支持全国移动，联通，电信</h4>
        		<p>1、购买后当天充值第一笔，之后每月同一天进行充值；<br>
				2、每天充值时间为0:00-21:00，不在这一时间段内充值，充值到账会延顺到第2天；<br>
				3、充值成功后，大德通会以短信的形式通知您；</p>
        		<div class="f_notice_company">
		            <p>大德通科技有限公司</p>
		            <p>2018-06-24 14:47</p>
		        </div>
        	</div>
        </div>
        <div class="f_notice_detail f_warmtip">
	        <p>温馨提示：如您有任何问题请联系</p>
	        <p>服务热线：{{telephone}}</p>
	        <a class="f_contract" :href="contactKF">
	          <i class="iconfont icon-kefu"></i>在线客服
	        </a>
	    </div>	
    </div>
</template>
<script>
export default {
    data() {
		return {
			telephone:''
		}
	},
	components: {
	},
	activated() {
		
	},
	mounted(){
		this.telephone=this.$store.state.telephone;
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.oil_rule_box{
	width:6.9rem;
	margin:0.3rem;
	background: #fff;
	h3{
		.f32;
		.c_333;
		padding:0.3rem 0.2rem;
		border-bottom:1px solid #e8e8e8;
		i{
			.f30;
			.c_main;
			.mr10;
		}
	}
	.oil_rule{
		margin:0.3rem 0.2rem;
		p{
			.f28;
		    .c_666;
		    line-height:0.4rem;
		    margin-bottom:0.3rem;
		}
		h4{
			.f28;
		    color:#333;
		    margin-bottom:0.3rem;
		}
		table{
			border:1px solid #e8e8e8;
			text-align:center;
			margin-bottom:0.3rem;
			th,td{
				border-bottom:1px solid #e8e8e8;
				border-right:1px solid #e8e8e8;
				height:0.7rem;
				.f24;
				color:#333;
			}
		}
	}
}
.f_notice_detail {
  width: 6.9rem;
  margin:0.3rem auto;
  background: #FFFFFF;
}
.f_warmtip {
  padding: 0.2rem 0.3rem;
  margin-top: 0.16rem;
  position: relative;
  p {
    font-size: 0.26rem;
    line-height: 0.48rem;
    color: #888;
  }
}
.f_contract {
  font-size: 0.26rem;
  color: #dd2729;
  position: absolute;
  top: 0.45rem;
  right: 0.4rem;

  i {
    font-size: 0.4rem;
    margin-right: 0.04rem;
    vertical-align: middle !important;
  }
}
.f_notice_company {
	border-top:1px solid #e8e8e8;
    padding: 0.2rem 0.3rem;
	p {
	    line-height: 0.44rem;
	    text-align: right;
	    font-size: 0.24rem;
	    margin-bottom:0 !important;
	}
}
</style>
