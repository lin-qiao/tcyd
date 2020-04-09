<template>
	<div>
		<top title='同城  <span class="title_circle">●</span> 需求详情' :isReturn="false" url="/demandManage"></top>
        <!--S 技能-->
        <item-skill :skillInfo="skillInfo" :isGrade="false" :isDay="true" :showCreateTime="false"></item-skill>
        <!--E 技能-->
        <div class="hei20 bg_gray"></div>
        <div class="c_demandDetail_tips">诚意金已付{{detail.earnestMoney|number}}元（已托管至平台，请放心应邀）</div>
	    <div class="hei20 bg_gray"></div>
	    <!--S 需求详情-->
	    <div class="c_demandDetail_out">
		    <ul class="c_back_gauge">
		    	
		    	<li class="c_demandDetail_li">
		    		<span>预约时间</span><span class="c_888">{{detail.publishTimeStr}}</span>
		    	</li>
		    	<li class="c_demandDetail_li">
		    		<span>结束时间</span><span class="c_888">{{detail.endTimeStr}}</span>
		    	</li>
		    	<li class="c_demandDetail_li"  v-show="isShowAll">
		    		<span>服务方式</span><span class="c_888">{{detail.serviceMethod|serviceType}}</span>
		    	</li>
		    	<!--<li class="c_demandDetail_li"  v-show="isShowAll">
		    		<span>需求项目</span><span>{{detail.skillCategoryName}}</span>
		    	</li>-->
		    	
		    	<li class="c_demandDetail_li" v-for="(v,k) in detail.map"  v-show="isShowAll">
		    		<span>{{k}}</span><span class="c_888">{{v}}</span>
		    	</li>
		    	
		    </ul>
		    <i class="iconfont" :class="isShowAll?'icon-arrow-up':'icon-arrow-down'"  @click="isShowAll=!isShowAll"></i>
	    </div>
	    <!--E 需求详情-->
	    <div class="hei20 bg_gray"></div>
	    <!--S 需求应邀详情-->
	    <div class="c_invited_box" v-if="inviterList.length">
	    	<h3 class="c_detail_title"><img src="~src/images/title.png" class="mr10"/>已有{{sericeCount|number(0)}}位服务者应邀 <img src="~src/images/title.png" class="c_rotate_title ml10"/></h3>
	    	<div class="c_invited_avatar flex flex_center justify_center" >
	    		<div v-for="el in inviterList">
		    		<img  :src="el.headPhoto|imgUrl" alt="el.nickName" @click="getInviterDetail(el)" />
		    		<i v-show="el.id==inviter.id"></i>
	    		</div>
	    	</div>
	    	<div class="c_invited_user pt10 pb30" v-if="sericeCount>0">
	    		<div class="user_msg border_b">
					<p class="user_name">{{inviter.nickName||"匿名账户"}}
						<em :class="{'bg_blue':inviter.gender!='female'}"><i class="iconfont" :class="[inviter.gender=='female'?'icon-nv':'icon-nan']"></i>{{inviter.age||25}}</em>
						<!--行业  身边动态页面显示-->
						<span class="pull_right c_666"><i class="iconfont icon-dizhi c_999 f26"></i>{{inviter.distance}}km</span>
					</p>
					<div class="user_avatar">
						<img :src="inviter.headPhoto|imgUrl" class="user_avatar_img"/>
					</div>
				</div>
	    		
	    		<ul>
			    	<li class="c_demandDetail_li">
			    		<com-icon :attestation="inviter.attestation" :showInviteBtn="true" :disableInviteBtn="disableInviteBtn" @toInvite="toInvite"></com-icon>
			    	</li>
			    	<!--<li class="c_demandDetail_li" v-if="true">
			    		<span>保证金</span>
			    		<a href="javascript:void(0);" class="btn  gray_btn c_invite_btn">邀请支付保证金</a>
			    	</li>
			    	<li class="c_demandDetail_li" v-else>
			    		<span class="c_main">保证金已付30.00元（已托管至同城平台）</span>
			    	</li>
			    	<li class="c_demandDetail_li">
			    		<span>技能等级</span><span>初级 <i class="iconfont icon-pingfen c_main"></i></span>
			    	</li>-->
			    	<li class="c_demandDetail_li">
			    		<span>{{inviter.serviceMethod|serviceType}}</span><span>{{inviter.unitPrice|number}}元/{{inviter.unit}}</span>
			    	</li>
			    	<!--<li class="c_demandDetail_li">
			    		<span>电话咨询</span><span>0.01元/分 <i class="iconfont icon-dianhua1 c_main"></i></span>
			    	</li>
			    	<li class="c_demandDetail_li">
			    		<span>视频咨询</span><span>1.00元/分钟 <i class="iconfont icon-shipin1 c_main"></i></span>
			    	</li>-->
			    	<li class="c_demandDetail_li ptb20">
			    		<span>Ta的优势</span><span class="inviter_advantage ellipsis_clip6">{{inviter.introduce}}</span>
			    	</li>
			    	<li class="c_demandDetail_li">
			    		<span>应邀时间</span><span>{{inviter.agreeTime|date}}</span>
			    	</li>
			    </ul>
			    <div class="text_center c_main f22 mtb30" v-show="!status">与服务者沟通后确定Ta来服务，约Ta见面，先给Ta支付定金吧</div>
			    <!-- S 驳回退款 -->
			    <div class="plr30 f24 flex flex_center justify_between mt20 lin_hei50 demand_detail_status" v-show="status=='RejectRefund'||status=='Arbitration'">
			    	<div>
			    		<p class="c_red" v-if="status=='RejectRefund'">申请退款被对方驳回</p>
			    		<p class="c_red" v-else>仲裁中...</p>
					 	<p class="c_666">交易遇到问题请确认付款前申请仲裁</p>
			    	</div>
			    	<div>
				    	<!-- 驳回退款 -->
				    	<a href="javascript:void(0);" v-show="status=='RejectRefund'" @click="routerArbitration" class="btn_border mt10 f22" >申请仲裁</a>	
			    	</div>
			    </div>
			    <!--E 驳回退款-->
			    <div class="plr30 f26 flex flex_center justify_between mtb20 lin_hei50 demand_detail_status">
			    	<div>
			    		<!--全款-->
			    		<p v-show="orderStatusArr.indexOf(status)>=0&&inviter.amount>0&&inviter.amount==inviter.unitPrice">支付全款：{{inviter.amount}}元<span class="c_red" v-if="['Refunding','RejectRefund','Arbitration'].indexOf(status)!=-1">（已申请退款{{inviter.refundAmount}}元）</span><!--<span class="c_red" v-else-if="orderStatusArr.indexOf(status)>=7">（已确认）</span><span v-else-if="orderStatusArr.indexOf(status)<=1" class="c_red">（未确认）</span>--></p>
			    		<!--定金-->
			    		<p v-show="orderStatusArr.indexOf(status)>=0&&inviter.amount>0&&inviter.amount!=inviter.unitPrice">支付定金：{{inviter.amount}}元<!--<span class="c_red">（已确认）</span>--></p>
					 	<!--尾款-->
					 	<p v-show="orderStatusArr.indexOf(status)>=1&&inviter.balance>0">支付尾款：{{inviter.balance}}元<span class="c_red" v-if="['Refunding','RejectRefund','Arbitration'].indexOf(status)!=-1">（已申请退款{{inviter.refundAmount}}元）</span><!--<span class="c_red" v-else-if="orderStatusArr.indexOf(status)>=7">（已确认）</span><span v-else-if="orderStatusArr.indexOf(status)<=1" class="c_red">（未确认）</span>--></p>
					 	<!--成功退款-->
					 	<p class="c_red" v-show="status=='RefundSuccess'&&inviter.refundAmount>0">成功退款：{{inviter.refundAmount}}元</p>
					 	<!--仲裁成功-->
					 	<p v-show="status=='ArbitrationEnd'&&inviter.refundResultAmount>0">仲裁成功：{{inviter.refundResultAmount}}元<span class="c_red">（已退款）</span></p>
					 	<!--仲裁失败-->
					 	<p v-show="status=='ArbitrationEnd'&&inviter.refundResultAmount==0">仲裁失败：{{inviter.refundAmount}}元<span>（退款失败）</span></p>
					 	<!--仲裁失败原因-->
					 	<p class="c_red" v-show="status=='ArbitrationEnd'&&inviter.refundAmount==0">失败原因：{{inviter.arbitrationRemark}}</p>
			    	</div>
			    	<div>
			    		<!--['DownPayment','PaidInFull','Refunding','RejectRefund','RefundSuccess','Arbitration','ArbitrationEnd','Complete',"HaveBeenEvaluated"]-->
			    		<!-- 付全款 -->
			    		<a href="javascript:void(0);" v-show="status=='PaidInFull'" @click="routerRefund" class="btn_border f22">申请退款</a>
				    	<!-- 已完成 -->
			    		<a href="javascript:void(0);" v-show="status=='Complete'" @click="routerEvaluate" class="btn_border f22">评价</a>
			    		<!-- 已评价 -->
			    		<p class="c_999" v-show="status=='HaveBeenEvaluated'">已评价</p>
			    	</div>
			    </div>
			    <!--确认付款-->
			    <div class="plr30 c_999 f24 mt-12 mb30" v-show="status=='PaidInFull'">完成服务后请确认付款，<com-count-down formateType="2" :times="times"></com-count-down>后自动确认</div>
			    <!--已申请退款-->
			    <div class="plr30 c_999 f24 mt-12 mb30" v-show="status=='Refunding'"><com-count-down formateType="2" :times="inviter.orverDueDate"></com-count-down>后对方未驳回申请，自动退款到您的同城账户</div>
			    <!--驳回退款或仲裁中-->
			    <div class="plr30 c_999 f24 mt-12 mb30" v-show="status=='RejectRefund'||status=='Arbitration'"><com-count-down formateType="2" :times="times"></com-count-down>后自动确认付款</div>
			    <div class="c_demand_pay">
			    	<a href="javascript:void(0);" @click="routerAdvisory" :class="!status||['DownPayment','PaidInFull','Complete','HaveBeenEvaluated'].indexOf(status)!=-1?'btn_border':'btn'">发消息</a>
			    	<!--无订单状态 显示立即付款  -->
			    	<a href="javascript:void(0);" v-show="!status" @click="routerPayType" class="btn" :class="{gray_btn:requireStatus}">立即付款</a>
			    	<!-- 付定金 -->
			    	<a href="javascript:void(0);" v-show="status=='DownPayment'" @click="routerPayType('last')" class="btn">支付尾款</a>
			    	<!--付尾款-->
			    	<a href="javascript:void(0);" v-show="status=='PaidInFull'" @click="toShowPwdDialog" class="btn">确认付款</a>
			    	<!-- 已完成 -->
			    	<a href="javascript:void(0);" v-show="orderStatusArr.indexOf(status)>=7" @click="routerAboutTa" class="btn">再次邀约</a>
			    	
			    </div>
	    	</div>
	    </div>
	    <!--E 需求应邀详情-->
	    <div v-if="!inviterList.length">
			<nodata class="bg_gray demand_detail_nodata" notice="亲，暂无应邀者~" :noDataImg="noDataImg"></nodata>
		</div>
	    <com-pay-pwd @getPayPwd="toComplete" ref="com_pay_pwd" :payMoney="inviter.balance||inviter.amount"></com-pay-pwd>
	</div>
</template>

<script type="text/javascript">
import itemSkill from 'src/components/item/itemSkill' //技能信息组件
import itemHead from 'src/components/item/itemHead' //用户信息
import comIcon from 'src/components/com-icon' //认证图标组件
import comPayPwd from 'src/components/alert/com-pay-pwd' //交易密码弹窗组件
import comCountDown from 'src/components/com-count-down' //倒计时组件
import noDataImg from 'src/images/nodata.png';//无数据图片

//发送邀请、检查是否邀请过
import {fetchNoticeSendLatter,fetchNoticeCheckSendLatter} from 'src/service/getData'
//需求详情   应邀者列表，立即应邀，确认付款（完成）
import {fetchRequireDetail,fetchRequireInviterList,fetchRequireToInvite,fetchRequireComplete} from '../service/getData'//需求详情
export default {
	data() {
		return {
			skillInfo:{},//技能信息
			requireId:1,  //需求Id 从 url 参数中获取
			detail:{},//需求详情
			inviterList:[],//应邀者列表
			sericeCount:0,//应邀服务者数量
			inviter:{},//应邀者 对象详情
			status:"",//已付定金、尾款、退款、仲裁 等
		    isShowAll:true,//展示全部需求   false, 隐藏部分需求描述
		    times:"0",//时间戳
		    requireStatus:true,//需求是否在进行中
		    noDataImg:noDataImg,//无数据图片
		    disableInviteBtn:true,//邀请状态为true 立即邀请按钮置灰，不能点击
		    orderStatusArr:['DownPayment','PaidInFull','Refunding','RejectRefund','RefundSuccess','Arbitration','ArbitrationEnd','Complete',"HaveBeenEvaluated"]
		    				//付金定、已付款、已申请退款、退款被驳回、退款成功、仲裁中、仲裁结束、已完成、已评价
		}
	},
	components:{
		itemSkill,
		itemHead,
		comIcon,
		comPayPwd,
		comCountDown
	},
	activated(){
		this.inviter = {};
		this.init();//初始化
	},
	methods:{
		async init(){
			this.requireId=this.$route.query.requireId||1;//需求ID
			//读取 需求详情
			let res= await fetchRequireDetail(this.requireId);
			this.detail=res.data;
			this.skillInfo={
				name:this.detail.skillSubCategoryName,//分类名称
				overdueTime:this.detail.overdueTime,//过期时间
				time:this.detail.publishTimeStr,//发布时间
				imgIcon:this.detail.image, //分类图标
				requireStatus:this.detail.requireStatus//状态
			}
			//根据需求Id 请求 应邀者列表
			let inviter_res = await fetchRequireInviterList(this.requireId);
			
			let inviterList=inviter_res.data.list||[];//应邀者列表
			this.inviterList=inviterList;//应邀者列表
			//付金定、已付款、已申请退款、退款被驳回、退款成功、仲裁中、仲裁结束、已完成、已评价
			//['DownPayment','PaidInFull','Refunding','RejectRefund','RefundSuccess','Arbitration','ArbitrationEnd','Complete',"HaveBeenEvaluated"],
			this.requireStatus = (inviterList.filter(v=>['DownPayment','PaidInFull','Refunding','RejectRefund','Arbitration'].indexOf(v.orderStatus)!=-1)).length;
			this.sericeCount=inviter_res.data.sericeCount||0;//应邀服务者总数量
			if(inviterList.length){
				this.inviter=inviterList[0];
			}
			if(inviter_res.data.serviceMid){//已应邀 获取对应 应邀者详情
				this.getInviterDetail(inviterList.filter(v=>v.serviceMid==inviter_res.data.serviceMid)[0])
			}else if(inviterList&&inviterList.length>0){//默认取第一个应邀者
				this.getInviterDetail(inviterList[0]);
			}
		},
		toShowPwdDialog:function(){
			this.$confirm({
				cancelBtn:'取消',
				confirmBtn:'确定',
				layerImg:'',
				title:'提示',
				content:`
					<div class="flex flex_column pt20">
					    <p class="f28">您确认付款${this.inviter.balance||this.inviter.amount}元?</p>						    
					</div>
					`,
				confirm:() => {
					this.toComplete('');
				}
			})	
			//this.$refs.com_pay_pwd.show()//弹窗交易密码弹窗
		},
		toComplete:function(tradePassword){ //确认付款 用户支付尾款，服务者服务完成，用户操作确认付款，平台给服务者付款
			fetchRequireComplete(this.inviter.orderSn,tradePassword).then(res=>{
			   if(res.status){
			   		alertTip("确认付款完成，订单已完成");
			   		this.status='Complete';//订单状态
			   		this.requireStatus = false;
			   }
			})
		},
		getInviterDetail:function(el){ //获取选择的应邀人详情 从列表中直接读取详情
			this.inviter=el;
			this.times=this.inviter.overdueDateConfirm;//倒计时时间戳
			this.status=this.inviter.orderStatus;//订单状态
			fetchNoticeCheckSendLatter("tcInvitationalAuth",this.inviter.serviceMid).then(res=>{
				if(res.status){
					if(res.data.status){
						this.disableInviteBtn=false;//邀请状态为true 立即邀请按钮置灰，不能点击
					}else{
						this.disableInviteBtn=true;//邀请状态为true 立即邀请按钮置灰，不能点击
					}
				}
			})
		},
		routerPayType:function(payType){ //跳转到 选择支付类型（定金/全款）页面
			if(payType=="last"){//尾款支付
				this.$router.push('/pay?requireId='+this.requireId+'&orderSn='+this.inviter.orderSn+"&payBalance="+(this.inviter.unitPrice*100-this.inviter.amount*100)/100+"&paymentMethod=last");
			}else{
				//立即支付时，判断是否有未完成订单
				if(this.requireStatus){
					return;
				}
				this.$router.push('/payType?requireId='+this.requireId+"&payBalance="+this.inviter.unitPrice+"&serviceMid="+this.inviter.serviceMid);	
			}
		},
		routerRefund:function(){ //跳转到退款页面
			this.$router.push("/refund?orderSn="+this.inviter.orderSn);
		},
		routerEvaluate:function(){//跳转到评价页面
			this.$router.push('/evaluate?orderSn='+this.inviter.orderSn);
		},
		routerAboutTa:function(){//跳转到约他
			this.$router.push('/aboutTa?skillId='+this.detail.skillSubCategory+'&mid='+this.inviter.serviceMid);
		},
		routerAdvisory:function(){//跳转到发消息页面
			this.$router.push('/instantMessage?id='+this.inviter.id);
		},
		routerArbitration:function(){//跳转到申请仲裁页面
			this.$router.push('/arbitration?orderSn='+this.inviter.orderSn);
		},
		toInvite:function(){//更具Code码 对服务者 发送邀请
			fetchNoticeSendLatter("tcInvitationalAuth",this.inviter.serviceMid).then(res=>{
				if(res.status){
					alertTip("邀请成功");
					this.disableInviteBtn=true;
				}
			})
		}
	},
	mounted(){
		
		// this.$refs.alertInquiry.alertInquiryFn(
		// 	"<p>亲，发消息每小时收取<span class='c_main'>5个钻石</span>不足一小时按1小时计算</p>"
		// );
	}

}
</script>
<style lang="less">
@import '../style/demand.less';
.inviter_advantage{
	max-width: 4.5rem;
}
.c_invited_user{
	.border-radius(0.15rem);
	.box_shadow(0px 0px 0.3rem rgba(0,0,0,0.1));
}
.lin_hei50{
	line-height: 0.5rem;
}
.c_demandDetail_li{
	min-height: 0.92rem;
	height: auto;
	.btn_border{
		padding:0.04rem 0.1rem;
		display:block;
		.f22;
	}
}
.demand_detail_status{
	.btn_border{
		width: 1.5rem;
		padding:0.04rem 0;
		display:block;
	}
}
.ellipsis_clip6{
	display: -webkit-box;
    overflow: hidden;

    white-space: normal !important;
    text-overflow: ellipsis;
    word-wrap: break-word;

    -webkit-line-clamp: 6;
    -webkit-box-orient: vertical;
}
.demand_detail_nodata{
	.nodata_box{
		img{
			height: 2.2rem!important;
		}
	}
}
</style>
