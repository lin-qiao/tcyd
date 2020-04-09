<template>
	<div class="router_page bg_gray">
		<div class="bg_fff">
			<top left='<i class="iconfont icon-arrow-left"></i>' @clickLeft="$refs.messageBox.show()" :title='`同城  <span	 class="title_circle">●</span> 约Ta${skillMsg.name||""}`'></top>
			<!--个人信息-->
			<div class="l_item_box">
				<item :userInfo="userInfo" :isShowDistance="false"></item>
			</div>
			<!--技能信息-->
			<element-box title="需求品类">
                <p slot="content" class="pl10 ellipsis hei13em">{{skillMsg.name}}<em class="c_666 ml30">{{skillMsg.remark}}</em></p>
            </element-box>
            <!-- 服务方式 -->
	        <element-box title="服务方式<em class='f26'>( 单选 )</em>">
	            <formRadio :hasImg="true" :defaultProps="defaultProps" v-model="serviceMethod" slot="content" type="fwfs" :list="servicesList" :isBadge="true" height="110" column="2">
	            </formRadio>
	        </element-box>
	        <!-- 服务方式 -->
            <!--选择诚意金-->
			<element-box title="诚意金<em class='f26 c_666'>( 单选 )</em>">
                <p slot="title" class="c_main f24 flex flex_center">
                    <i class="iconfont icon-info f30 mr10"></i> 未成交将退回您的同城账户
                </p>
                <form-radio slot="content" type="cyj" :list="list" :isBadge="true" v-model="earnestMoney"></form-radio>
                <p slot="content" class="f24 c_666 pl10 mt20">选择诚意金可提高成交率哦~</p>
            </element-box>
            <!--选择诚意金-->
		</div>
		<div class="plr30">
			<p class="f24 c_666 mtb20">注：诚意金可用于订单支付，若未成交将退至您的账户。</p>
		</div>
		<!--协议-->
		<agreement :isCenter="true" v-model="agreement"></agreement>
		<a class="btn_block mt30 mb30" href="javascipt:void(0);" @click="publishDemand">发布需求</a>
		<!--S 支付弹窗-->
		<pay ref="pay" moneyName="诚意金" :money="earnestMoney"></pay>
		<!--E 支付弹窗-->
		<!--S 提出弹窗-->
		<messageBox 
			title="提示" 
			ref="messageBox" 
			cancelBtn="我再想想" 
			confirmBtn="确认退出" 
			layerImg="" 
			content='<p class="pt30 c_666">还差一点就约到Ta，您真的要走吗？</p>'
			:confirm="goBack"></messageBox>
		<!--E 提出弹窗-->
	</div>
</template>

<script>
	import pay from 'src/components/pay'//诚意金支付组件
	import item from 'src/components/item/itemHead'//头部
	import formRadio from 'src/components/formItem/formRadio'//单选
	import elementBox from 'src/components/item/itemElementBox';//元素
	import agreement from 'src/components/item/itemAgreement';//协议
	import messageBox from 'src/components/alert/messageBox/main';  //对话框
	import {
		fetchGetSkillDetails,//获取技能详情
		fetchPublishDemandAboutTa//约他发布需求
	} from '../service/getData';
	import {
	    fetchSkillServiceList //服务方式
	} from 'src/service/getData'
	import {memberInfo} from 'src/module/member/module/myHome/service/getData'//获取个人信息
	export default{
		data(){
			return{
				userInfo:{},//用户信息
				skillId:'',//技能id
				skillMsg:{},//技能信息
				mid:'',//用户id
				list:[],//诚意金列表
				earnestMoney:'',//诚意金
				agreement:true,//是否同意协议
				serviceMethod:"",//服务方式
				defaultProps: {
			        id: 'id',
			        name: 'name',
			        img: 'img',
			        selectImg: 'selectImg'
			    },
			    servicesList: [], //服务方式列表
			}
		},
		components: {
			item,
			formRadio,
			elementBox,
			agreement,
			messageBox,
			pay
		},
		activated(){
			//获取技能id
			this.skillId = this.$route.query.skillId;
			//获取用户id
			this.mid = this.$route.query.mid;
			//获取技能信息
			fetchGetSkillDetails(this.skillId).then(res=>{
				if(res.data){
					this.skillMsg = res.data||{};
					this.list = res.data.earnesTmoney.split(',').map(v=>({id:v,name:v}));
				}
			})
			//获取用户信息
			memberInfo(this.mid).then(res=>{
				if(res.data){
					this.userInfo = res.data;
				}
			})
			//获取服务方式
		    fetchSkillServiceList(this.skillId).then(res => {
		      if (res.status) {
		        this.servicesList = (res.data.list || []).map(v => ({
		          id: v.serviceEnums,
		          name: v.serviceType,
		          img: v.image,
		          selectImg: v.selectImage
		        }))
		        this.serviceMethod=res.data.list[0].serviceEnums;
		      }
		    })
		},
		methods:{
			//回退
			goBack(){
				this.$router.go(-1);
			},
			//点击发布需求
			publishDemand(){
				if(!this.earnestMoney){
					alertTip('请选择诚意金');
					return;
				}
				if(!this.agreement){
					alertTip('请勾选我同意大德通同城用户协议');
					return;
				}
				this.$refs.pay.show();
			},
		    //需求发布
		    requirePublish(withhold,pwd) {
		      //确认发布
		      fetchPublishDemandAboutTa(
		      	{
		      		earnestMoney:this.earnestMoney,//诚意金
		      		skillSubCategory:this.skillId,//技能id
		      		serviceMethod:this.serviceMethod,//服务方式
		      		province:PROVINCE,//省
		      		city:CITY,//市
		      		coordinateX:LON,//经度
		      		coordinateY:LAT,//纬度
		      		withhold:withhold,//扣款方式
		      		serviceMid:this.mid,//服务者id
		      		tradePassword:pwd,//交易密码
		      		kilometer:this.userInfo.distance||'0.1'//距离
		      	}
		      ).then(res => {
		      	//发布成功,回退
		        if (res.code == '000') {
		          alertTip(res.msg, () => {
		            this.goBack();
		          })
		        }
		      })
		    }
		}
	}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.hei13em{
	height: 1.3em;
}
.l_item_box{
	margin:0.26rem;
	.box_shadow(@shadow:0 0px 0.2rem rgba(0, 0, 0, 0.1));
}
</style>