<template>
	<div class="l_order_datail">
		<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 订单详情'></top>
		<message text="为了保护您的权益，对方将订金支付到平台后再去见面"></message>
		<div class="pos_rel pl30 l_order_detail_head">
			<item-head :isOrder="true" :userInfo="selfUserInfo" :isEarnestMoney="true" isShowIndustry :isShowDistance="false" :isShowApprove="true" :isShowTopAdd="true">
			</item-head>
			<i class="l_next iconfont icon-arrow-right c_999 f30" @click="homePage"></i>
			<a class="l_detail_btn btn" @click="toInvite" :disabled="disableInviteBtn" href="javascript:void(0);" v-bind:class="{'gray_btn':disableInviteBtn}">{{disableInviteBtn?"已邀请认证":"邀请认证"}}</a>
		</div>
		<div class="order_status" v-if="requireDetail.orderStatus">
			<!-- 雇主支付定金 -->
			<!-- 雇主待确认尾款 -->
			<template>
				<!-- 定金 -->
				<template v-if="requireDetail.paymentMethod == 'Deposit'">
					<p>支付定金：{{requireDetail.amount | number}}元
						<!--<em class="c_main">（已确认）</em>-->
					</p>
					<p v-if="requireDetail.balance">支付尾款：{{requireDetail.balance | number}}元
						<!--<em class="c_main" v-if="requireDetail.orderStatus != 'Complete'">（待确认）</em>
						<em class="c_main" v-if="requireDetail.orderStatus == 'Complete'">（已确认）</em>-->
					</p>
				</template>
				<!-- 全款 -->
				<template v-else-if="requireDetail.paymentMethod == 'Full'">
					<p>支付全款：{{requireDetail.amount | number}}元
						<!--<em class="c_main" v-if="requireDetail.orderStatus != 'Complete'">（待确认）</em>
						<em class="c_main" v-if="requireDetail.orderStatus == 'Complete'">（已确认）</em>-->
					</p>
				</template>
				<p class="c_main" v-if="requireDetail.orderStatus=='PaidInFull'">雇主<com-count-down formateType="2" :times="requireDetail.overdueConfirm"></com-count-down>后不操作自动将款项汇入您的账户</p>
			</template>

			<!-- 雇主要求退款 -->
			<template v-if="requireDetail.orderStatus == 'Refunding'">
				<p class="c_main">对方要求退款{{requireDetail.refundAmount | number}}元，剩余款项将支付给您</p>
				<p class="c_main">退款原因：{{requireDetail.refundReason}}</p>
				<div class="btn_border mlr10 f22" @click="rejectRefund">驳回退款</div>
				<div class="btn_border mlr10 f22" @click="consentRefund">同意退款</div>
				<p class="c_main"><com-count-down formateType="2" :times="requireDetail.overdueRefund"></com-count-down>后不操作自动将款项退还给对方</p>
			</template>
			<!-- 服务商驳回退款 -->
			<template v-else-if="requireDetail.orderStatus == 'RejectRefund'">
				<p class="c_main">已驳回退款{{requireDetail.refundAmount | number}}元</p>
			</template>
			<!-- 服务商同意退款 -->
			<template v-else-if="requireDetail.orderStatus == 'RefundSuccess'">
				<p class="c_main">已退款：{{requireDetail.refundAmount | number}}元</p>
			</template>
			<!-- 雇主发起仲裁 -->
			<template v-else-if="requireDetail.orderStatus == 'Arbitration'">
				<p class="c_main">对方发起仲裁，仲裁中...</p>
			</template>
			<!-- 雇主仲裁成功 -->
			<template v-else-if="requireDetail.orderStatus == 'ArbitrationEnd'&&requireDetail.refundResultAmount>0">
				<p>对方仲裁成功，已退还{{requireDetail.refundResultAmount | number}}元</p>
				<p class="c_main">退还原因：{{requireDetail.arbitrationRemark}}</p>
			</template>
			<!-- 雇主仲裁失败 -->
			 <template v-else-if="requireDetail.orderStatus == 'ArbitrationEnd'&&requireDetail.refundResultAmount==0">
				<p>对方仲裁失败，无退款</p>
			</template>
		</div>
		<div class="line_box"></div>
		<p class="c_main plr30 ptb25 border_b">诚意金已付{{selfUserInfo.earnestMoney | number}}元（已托管至同城平台，请放心应邀）</p>
		<ul class="pl30 f28 l_detail_item">
			<li>
				<span class="c_666">技能品类</span>
				<span>{{requireDetail.serviceSkillIdName}}</span>
			</li>
			<li>
				<span class="c_666">发布时间</span>
				<span>{{requireDetail.publishTime | date}}</span>
			</li>
			<!-- <li>
				<span class="c_666">预约时间</span>
				<span>{{requireDetail.agreeTime | date}}</span>
			</li> -->
			<li>
				<span class="c_666">结束时间</span>
				<span>{{requireDetail.endTime | date}}</span>
			</li>
			<li v-show="isShowAll">
				<span class="c_666">服务方式</span>
				<span>{{requireDetail.serviceMethod | serviceType}}</span>
			</li>
			<li v-for="(v,k) in requireDetail.map" v-show="isShowAll">
				<span class="c_666">{{k}}</span>
				<span>{{v}}</span>
			</li>
		</ul>
		<p class="text_center ptb10">
			<i class="iconfont c_999 f30" :class="isShowAll?'icon-arrow-up':'icon-arrow-down'" @click="isShowAll=!isShowAll"></i>
		</p>
		<div class="line_box"></div>
		<template v-if="immediatelyList.length">
			<h3 class="c_detail_title mt40 mb30">
				<img src="~src/images/title.png" class="mr10" /> 其他应邀者报价
				<img src="~src/images/title.png" class="c_rotate_title ml10" />
			</h3>
			<ul class="l_detail_other">
				<li class="pos_rel" v-for="el in immediatelyList">
					<item-head :userInfo="{
							nickname:el.nickName,
							headPhoto:el.headPhoto,
							age:el.age,
							mobileBind:el.attestation? el.attestation.mobile : '',
							isVerify:el.attestation? el.attestation.memberVerity : '',
							qqBind:el.attestation? el.attestation.qqBind : '',
							wbBind:el.attestation? el.attestation.wbBind : '',
							wxBind:el.attestation? el.attestation.wxBind : '',
							gender:el.gender,
							dist:el.distance
						}">
					</item-head>
					<p>{{el.serviceMethod | serviceType}}：{{el.unitPrice | number}}元/{{el.unit || '小时'}}</p>
					<p>应邀时间：{{el.agreeTime | date}}</p>
				</li>
			</ul>
		</template>
		<div v-if="unitPrice">
			<h3 class="c_detail_title mt40 mb30">
				<img src="~src/images/title.png" class="mr10" /> 我的报价与留言
				<img src="~src/images/title.png" class="c_rotate_title ml10" />
			</h3>
			<p class="pr30 c_main f24 mb10 clearfix">
				<!--<span @click="$refs.invitation.show()" class="pull_right flex flex_center justify_end">
					<i class="iconfont icon-xiugai f30"></i>修改报价</span>-->
			</p>
			<ul class="l_detail_other">
				<li class="pos_rel pt20">
					<p>
						<span class="c_333">{{serviceMethod | serviceType}}报价：</span>{{unitPrice | number}}元/{{unit || '小时'}}</p>
					<div class="l_detail_word f26 clearfix">
						<span class="c_333 pull_left">我的留言：</span>
						<p class="pull_left">{{introduce}}</p>
					</div>
				</li>
			</ul>
		</div>

		<!--S 底部按钮-->
		<div class="l_order_footer text_center pt30 pb20" v-if="requireDetail.inviteStatus != 'expired'">
			<!--未应邀-->
			<template v-if="requireDetail.inviteStatus == 'wait'">
				<p class="f24 c_main mb15">请您及时应邀，被应邀满的订单将会消失</p>
				<div>
					<a class="btn mlr10" @click="immediately">立即应邀</a>
					<a class="btn_border mlr10" @click="share">分享赚钱</a>
					<!-- <a class="btn mlr10" href="">支付保证金</a> -->
				</div>
			</template>
			<!--已应邀-->
			<template v-else-if="requireDetail.inviteStatus == 'success'">
				<div class="l_invitated">
					<router-link class="btn mlr10" :to="{path:'/instantMessage',query:{id:requireDetail.requireMid}}">发消息</router-link>
					<a class="btn gray_btn mlr10" @click="handleClickPhone">免费电话</a>
				</div>
			</template>
			<!--已成交-->
			<template v-else-if="requireDetail.inviteStatus ==  'done'">
				<div class="l_traded">
					<router-link class="btn mlr10" :to="{path:'/instantMessage',query:{id:requireDetail.requireMid}}">发消息</router-link>
				</div>
			</template>
		</div>
		<!--E 底部按钮-->
		<!-- S 应邀弹窗 -->
		<invitation ref="invitation" @change="inviteStatus = 'success'" :requireId="inviteId" :serviceMethod="serviceMethod" :unit="unit || '小时'" :otherInviteAvg="otherInviteAvg" :unitP="unitPrice" :intr="introduce">
		</invitation>

		<!-- E 应邀弹窗 -->
	</div>
</template>

<script>
import message from 'src/components/notice/message'
import itemHead from 'src/components/item/itemHead'
import invitation from '../components/invitation'
import comCountDown from 'src/components/com-count-down' //倒计时组件
//发送邀请、检查是否邀请过
import {fetchNoticeSendLatter,fetchNoticeCheckSendLatter,fetchRegisterForredEnvelopes} from 'src/service/getData'
import {
  fetchServiceOrderDetail, //服务者需求详情
  fetchRequireDetail, //获取需求应邀详情
  fetchOrderConsentrefund, //同意退款
  fetchOrderRefund //驳回退款
} from '../service/getData'
import {getInfo,wxShare} from 'src/config/mUtils';
export default {
  data() {
    return {
      requireId: '', //需求id
      inviteId: 0, //应邀id
      requireDetail: {}, //需求详情
      immediatelyList: {}, //应邀列表
      unit: '', //服务单位
      unitPrice: '', //服务单价
      serviceMethod: '', //服务方式
      otherInviteAvg: '', //其他服务者均价
      introduce: '', //留言
      selfUserInfo: {}, //需求者信息
      isShowAll:true,//展示全部需求   false, 隐藏部分需求描述
      disableInviteBtn:true,//邀请状态为true 立即邀请按钮置灰，不能点击
      shareTitle:'', //分享标题
	  shareContent:'', //分享内容
	  shareUrl:'', //分享链接
	  shareImg:"",//分享图片
	  reference:getInfo('mobile'),//用户手机号
    }
  },
  activated() {
    if (this.$route.query.requireId) {
      this.requireId = this.$route.query.requireId
      this.getRequireDetail();//获取需求详情
      this.getInvitationDetail();//获取应邀详情
    }
  },
  mounted(){
  	this.shareMsg();
  },
  methods: {
    //获取需求详情
    getRequireDetail() {
      fetchServiceOrderDetail(this.requireId).then(res => {
        if (res && res.status) {
          const data = res.data
          //需求信息
          this.requireDetail = data
          this.checkSendLatterFn(this.requireDetail.requireMid);
          //需求者信息
          this.selfUserInfo = {
            nickname: data.nickName,
            headPhoto: data.headPhoto,
            age: data.age,
            mobileBind: data.attestation ? data.attestation.mobile : '',
            isVerify: data.attestation ? data.attestation.memberVerity : '',
            qqBind: data.attestation ? data.attestation.qqBind : '',
            wbBind: data.attestation ? data.attestation.wbBind : '',
            wxBind: data.attestation ? data.attestation.wxBind : '',
            gender: data.gender,
            dist: data.distance,
            earnestMoney: data.earnestMoney,
            overdueTime: data.overdueTime>0?data.overdueTime:0,
            inviteStatus: data.inviteStatus
          }
        }
      })
    },
    checkSendLatterFn(receiver){//检查是否邀请过
    	fetchNoticeCheckSendLatter('tcInvitationalAuth',receiver).then(res=>{
    		if(res.status){
    			if(res.data.status){
    				this.disableInviteBtn=false;//邀请状态为true 立即邀请按钮置灰，不能点击
    			}else{
    				this.disableInviteBtn=true;
    			}
			}
    	})
    },
    toInvite:function(){//更具Code码 对服务者 发送邀请
		fetchNoticeSendLatter("tcInvitationalAuth",this.requireDetail.requireMid).then(res=>{
			if(res.status){
				alertTip("邀请成功")
				this.disableInviteBtn=true;
			}
		})
	},
    //获取应邀详情
    getInvitationDetail() {
      fetchRequireDetail(this.requireId).then(res => {
        if (res && res.status) {
          this.inviteId = res.data.inviteId //应邀id
          this.immediatelyList = res.data.list //应邀列表
          this.unit = res.data.unit //服务单位
          this.unitPrice = res.data.unitPrice //服务单价
          this.serviceMethod = res.data.serviceMethod //服务方式
          this.otherInviteAvg = res.data.otherInviteAvg //其他服务者均价
          this.introduce = res.data.introduce //留言
        }
      })
    },
    //驳回退款
    rejectRefund() {
      fetchOrderRefund(this.requireDetail.orderSn).then(res => {
        if (res && res.status) {
            alertTip(res.msg);
            this.getRequireDetail();//获取需求详情
        }
      })
    },
    //同意退款
    consentRefund() {
      fetchOrderConsentrefund(this.requireDetail.orderSn).then(res => {
        if (res && res.status) {
          alertTip(res.msg)
          this.getRequireDetail();//获取需求详情
        }
      })
    },
    // 立即应邀
    immediately() {
      this.$refs.invitation.show()
    },
    //免费电话
    handleClickPhone() {
      let data = this.requireDetail
      let sex = data.gender == 'female' ? '' : 'bg_blue'
      let icon = data.gender == 'female' ? 'icon-nv' : 'icon-nan'
      let phoneNum = this.$store.state.telephone
      this.$confirm({
        layerImg: false,
        content:
				`<div>
					<div class="block_via">
						<img src="${this.$options.filters.imgUrl(data.headPhoto)}" class="mb10">
						${data.nickName}
						<em class="${sex}">
							<i class="${icon}" f16 iconfont"></i>
							${data.age}
						</em>
					</div>
					本电话不收取通信费用。拨打电话后，同城接通双方电话，注册同城的手机号码会接收到同城电话来电，请注意接听。
				</div>`,
        confirmBtn: `<a class="c_main" href="tel:${phoneNum}"><i class="iconfont icon-dianhua f26"></i>拨打电话</a>`,
        confirm: () => {}
      })
    },
    shareMsg(){//获取分享内容
    	if(this.shareUrl){
    		this.shareFn();
    	}else{
    		fetchRegisterForredEnvelopes("share").then(res=>{
				if(res.status){
					this.shareTitle=res.data.title;//分享标题
					this.shareContent=res.data.content;//分享内容
					this.shareUrl=res.data.url;//分享链接
					if(res.data.img){
						this.shareImg=res.data.img;//分享图片
					}else{
						this.shareImg='';//分享图片
					}
					this.shareFn();
				}
			});
    	}
	},
    //分享
    share() {
		this.$share.show();
    },
    shareFn(){
    	wxShare(this.shareUrl+"?reference="+this.reference+"&requireId="+this.requireId,this.shareTitle,this.shareContent,this.shareImg);
    },
    //跳转至个人主页
    homePage(){
    	this.$router.push({path:'/otherHome',query:{mid:this.requireDetail.requireMid}});
    }
  },
  components: {
    message,
    itemHead,
    invitation,
    comCountDown
  }
}
</script>
<style lang="less">
@import (reference) '~src/style/all.less';
.block_via {
  width: 100%;
  margin: 0.2rem 0 0.3rem;
  & img {
    display: block;
    width: 1.2rem;
    height: 1.2rem;
    margin: 0 auto;
    .border-radius(50%);
    .box_shadow(0 0 0.09rem #eeeaea);
  }
  em {
    display: inline-flex;
    vertical-align: middle;
    .flex_center;
    .justify_center;
    width: 0.56rem;
    height: 0.26rem;
    background: @color;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.18rem;
    i {
      margin-right: 0.04rem;
      font-size: 0.14rem;
    }
    &.bg_blue {
      background: #12adff;
    }
  }
}
</style>
<style lang="less">
.l_order_datail {
  .l_order_detail_head {
    .user_msg {
      padding-left: 1.06rem !important;
      margin-bottom: -0.14rem;
      .user_name {
        span {
          padding-right: 0.5rem;
        }
      }
    }
    .user_avatar {
      left: 0 !important;
    }
    /*.user_approve_state{
				position:relative;
				left:-1.08rem;
				top:1.72rem;
				em{
					display: none;
				}
			}*/
  }
  .l_detail_other {
    .user_approve_state {
      em {
        position: absolute;
        right: 0.28rem;
        top: 0.56rem;
      }
    }
  }
}
</style>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.l_order_datail {
  padding-bottom: 1.5rem;
  .l_next {
    position: absolute;
    right: 0.3rem;
    top: 0.32rem;
    z-index: 1;
  }
  .l_detail_btn {
    width: 2rem;
    position: absolute !important;
    font-size: 0.24rem;
    right: 0.3rem;
    bottom: 0.2rem;
  }
}
.l_detail_item {
  li {
    .flex;
    .flex_center;
    .justify_between;
    .pr30;
    height: 0.89rem;
    .border-b(#eee);
  }
}
.l_detail_other {
  width: 6.8rem;
  margin: 0 auto;
  li {
    .mb48;
    .pb20;
    .border-radius(0.05rem);
    .box_shadow(@shadow:0 0px 0.2rem rgba(0, 0, 0, 0.1));
    & > p {
      .plr30;
      line-height: 0.5rem;
      .c_666;
      .f26;
    }
    .l_detail_word {
      .border-t(#e8e8e8);
      .mlr30;
      .mt20;
      .pt20;
      line-height: 0.4rem;
      p {
        width: 4.9rem;
        .c_666;
      }
    }
  }
}
.l_order_footer {
  position: fixed;
  width: 7.5rem;
  left: 50%;
  bottom: 0;
  z-index: 2;
  margin-left: -3.75rem;
  background: #fff;
  .border-t(#eaeaea);
  .box_shadow(@shadow:0 0px 0.2rem rgba(0, 0, 0, 0.1));
  .l_invitated a {
    width: 2.66rem;
  }
  .l_traded a {
    width: 6.14rem;
  }
}
.order_status {
  width: 7.2rem;
  padding: 0.3rem 0.3rem 0.3rem 0;
  margin-left: 0.3rem;
  .border_t;
  p {
    margin-bottom: 0.25rem;
    .f26;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .btn_border {
    width: 1.8rem;
    height: 0.5rem;
    padding: 0;
    text-align: center;
    line-height: 0.5rem;
    margin-bottom: 0.25rem;
  }
}
</style>
