<template>
	<div class="skillPage">
		<div class="l_list_item bg_fff pos_rel" v-for="item in list">
			<img v-if="false" class="l_list_new" src="../images/new.png" />
			<router-link :to="{path:'/orderDetail',query:{requireId:item.requireId}}">
				<item-head 
					:userInfo="{
						nickname:item.nickName,
						age:item.age,
						headPhoto:item.headPhoto,
						dist:item.distance,
						gender:item.gender,
						mobileBind:item.attestation&&item.attestation.mobile,
						qqBind:item.attestation&&item.attestation.qqBind,
						wbBind:item.attestation&&item.attestation.wbBind,
						wxBind:item.attestation&&item.attestation.wxBind,
						isSkillCertification:'N',
					}">
				</item-head>
				<div class="plr30">
					<div>
						<p class="mt5 clearfix l_mess">
							<span class="pull_left f28">{{item.skillSubCategoryStr}}</span>
							<span class="pull_left f24 c_999 ml20" v-if="item.status=='expired'">订单已过期</span>
							<span class="pull_right f26 c_main flex flex_center"><i class="f32 mr5 iconfont icon-chengyijin"></i>{{item.earnestMoney}}</span>
						</p>
						<p class="f26 c_666 mt10 mb24 l_mess">
							<span class="mr8" v-if="item.status!='expired'">{{item.overdueTime>0?item.overdueTime:0}}天后过期</span>
							<span>发布时间：{{item.publishTime|date('yyyy-MM-dd HH:mm:ss')}}</span>
						</p>
					</div>
				</div>
			</router-link>
			<!--S待应邀-->
			<div class="l_item_handler ptb18 f26" v-if="item.status=='wait'">
				<a class="btn" href="javascript:void(0);" @click="invite(item.requireId,item.id)">立即应邀</a>
				<a class="btn_border" href="javascript:void(0);" @click="shareOrder(item.requireId)">分享赚钱</a>
				<!--1期暂无<a class="btn" href="">支付保证金</a>-->
			</div>
			<!--E待应邀-->
			
			<!--S已应邀-->
			<div v-if="item.status=='success'">
				<p class="l_list_tip f24 plr30">为保证您的权益，对方将订金支付到平台后再去见面</p>
				<div class="l_item_handler ptb18 f26">
					<router-link class="btn" :to="{path:'/instantMessage',query:{id:item.requireMid}}">发消息</router-link>
					<!--<a class="btn" href="javascript:void(0);" :class="{'gray_btn':!(item.attestation&&item.attestation.mobile=='Y')}" @click="phoneBtn(item)">免费电话</a>-->
				</div>
			</div>
			<!--E已应邀-->
			
			<!--S已成交-->
			<div v-if="item.status=='done'">
				<!--<p class="plr30 c_main mb24 mt-12">已付全款：{{item.amount|number()}}元</p>-->
				<div class="l_item_handler ptb18 f26">
					<router-link class="btn" :to="{path:'/instantMessage',query:{id:item.requireMid}}">发消息</router-link>
				</div>
			</div>
			<!--E已成交-->
			<div class="line_box"></div>
		</div>
	</div>
</template>

<script>
	import itemHead from 'src/components/item/itemHead'
	import {fetchRegisterForredEnvelopes} from 'src/service/getData';//获取分享内容
	import {getInfo,wxShare} from 'src/config/mUtils';
	export default{
		data(){
			return{
				requireId:0,//需求id
				id:0,//应邀id
				shareTitle:'', //分享标题
	            shareContent:'', //分享内容
	            shareUrl:'', //分享链接
	            shareImg:"",//分享图片
	            reference:getInfo('mobile'),//用户手机号
			}
		},
		components:{
			itemHead
		},
		props: {
			userInfo: {//用户信息
		       type: Object
		    },
		    list:{
				default:Array
			}
		},
		mounted(){
	        this.shareMsg();
	    },
		methods:{
			shareMsg(){//获取分享内容
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
	    				
	    			}
	    		});
	    	},
			shareOrder(requireId){
				this.$share.show();
				wxShare(this.shareUrl+"?reference="+this.reference+"&requireId="+requireId,this.shareTitle,this.shareContent,this.shareImg);
			},
			invite(requireId,id){//待应邀=>立即邀请
				this.requireId = requireId;
				this.id = id;
				this.$emit('invite');
			},
			phoneBtn(item){//打电话
				let sex =  item.gender=='female'?'':'bg_blue';
				let icon = item.gender=='female'?'icon-nv':'icon-nan';
				let phoneNum = this.$store.state.telephone;
				this.$confirm({
					layerImg:false,
					content:"<div><div class='block_via'><img src="+item.headPhoto+" class='mb10'>"+item.nickName+"<em class="+sex+"><i class='"+icon+" f16 iconfont'></i>"+item.age+"</em></div>本电话不收取通信费用。拨打电话后，同城接通双方电话，注册同城的手机号码会接收到同城电话来电，请注意接听。</div>",
					confirmBtn:"<a class='c_main' href='tel:"+phoneNum+"'><i class='iconfont icon-dianhua f26'></i>拨打电话</a>",
					confirm:()=>{
	        			
					}
				})
			}
		}
	}
</script>
<style lang="less">
	@import (reference) "~src/style/all.less";
	.skillPage{
		min-height: 7.8rem;
	}
	.block_via{
		width:100%;
		margin:0.2rem 0 0.3rem;
		& img{
			display: block;
			width:1.2rem;
		    height:1.2rem;
		    margin:0 auto;
			.border-radius(50%);
			.box_shadow(0 0 0.09rem #eeeaea);
		}
		em{
            display:inline-flex;
            vertical-align: middle;
            .flex_center;
            .justify_center;
            width:0.56rem;
            height:0.26rem;
            background: @color;
            border-radius:0.04rem;
            color:#fff;
            font-size:0.18rem;
            i{
               margin-right: 0.04rem;
               font-size:0.14rem;
            }
            &.bg_blue{
            	background:#12adff;
            }
        }
	}
</style>
<style lang="less" scoped>
	@import (reference) "~src/style/all.less";
	.l_list_item{
		.l_item_handler{
			.flex;
			.justify_center;
			.border-t(#e8e8e8);
			a{
				margin: 0 0.1rem;
			}
		}
		.l_list_new{
			position: absolute;
			left: 0;
			top: 0;
			height: 0.7rem;
		}
	}
	.l_list_tip{
		background: #fff5e5;
		line-height: 0.6rem;
		color: #f4890d;
	}
	.l_mess{
		line-height: 0.34rem;
	}
</style>