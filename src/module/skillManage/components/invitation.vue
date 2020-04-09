<template lang="html">
    <!--S 修改报价-->
    <div class="l_layer" v-if="visible">
        <div class="l_layer_quote_box">
            <div class="l_layer_quote_title layer_tit flex flex_center justify_between plr30">
                <p class="f28 c_main">如下内容将发送给该客户，请确认</p>
                <a href="javascript:void(0);" @click="visible=false"><i class="f40 c_666 iconfont icon-close1"></i></a>
            </div>
            <div class="l_layer_quote layer_con text_left f26">
                <div class="layer_item">
                    <div class="layer_item_input">
                        <span class="f28">{{serviceMethod | serviceType}}的价格</span>
                        <input class="f30" type="text"  v-model.trim="unitPrice" maxlength="7" autocomplete="off"/>
                        元/{{unit}}
                    </div>
                    <p class="ptb15 c_999">其他服务者均价：<span class="c_main">{{otherInviteAvg | number}}元</span></p>
                </div>
                <textarea class="l_layer_quote_txt mt10" placeholder="请填写您的优势"  v-model.trim="introduce" maxlength="150"></textarea>
                <p class="l_layer_hint f26 pt10 pb20">同城全面禁止私下交易，举报有奖</p>
            </div>
            <div class="layer_btn inquiry_btn">
                <span class="close_btn" @click="visible=false">取消</span>
                <span class="confirm_btn" @click="immediatelyInvited">确认</span>
            </div>
        </div>
    </div>
    <!--E 修改报价-->
</template>

<script>
import {
	fetchImmediately,  //技能列表=>待应邀=>立即邀请
} from '../service/getData';
//用户实名认证信息查询
import { fetchGetmemberbyucid } from 'src/module/common/member/module/save/service/getData'
export default {
    data(){
        return{
            visible:false,    //开关
            unitPrice:'',     //价格
            introduce:'',    //优势
			checkStatus:'1'    //实名认证状态
        }
    },
    props:{
        serviceMethod:{   //服务方式
            type:String,
            default:''
        },
        unit:{          //单位
            type:String,
            default:''
        },
        otherInviteAvg:{ //其他应邀者报价
            default:''
        },
        requireId:{    //需求id
            default:''
        },
        intr:{    //优势
            type:String,
            default:''
        },
        unitP:{   //报价
            default:0,
        }
    },
    methods:{
        show(){
        	if(this.checkStatus=='1'){//未获取过实名认证状态 ==》去获取
        		fetchGetmemberbyucid().then( res => {
					if(res && res.status){
						this.checkStatus = res.data.memberRealName&&res.data.memberRealName.checkStatus;
					}
					this.showLayer();
				})
        	}else{//已获取 =》直接走逻辑
        		this.showLayer();
        	}
        },
        showLayer(){
        	if(this.checkStatus != 'live_pass'){
				this.$alert({
					confirmBtn:'立即实名认证',
					layerImg:require('src/images/noreal.png'),
					content:`
						<div class="flex flex_column pb20">
						    <p class="f30">为保障交易安全请您先实名认证</p>
						</div>
						`,
					confirm:() => {
						if(this.checkStatus == 'auth_pass'){
							this.$router.push('/faceApprove');
						}else{
							this.$router.push('/personApprove')
						}
					}
				})
				return;
			}
        	if(this.intr){
	            this.introduce = this.intr;
	        }else{
	        	this.introduce = '';
	        }
	        if(this.unitP){
	            this.unitPrice = this.unitP;
	        }else{
	        	this.unitPrice = '';
	        }
            this.visible = true;
        },
        immediatelyInvited(){//技能列表=>待应邀=>立即应邀弹窗确定按钮
        	if(parseInt(this.unitPrice)<1 || parseInt(this.unitPrice)>1000000){
				alertTip("技能价格不能大于1000000元且不能小于1元");
				return;
			}
			fetchImmediately(this.requireId,this.unit,this.unitPrice,this.introduce).then(res=>{
				if(res.code=='000'){
					alertTip('应邀成功');
					this.visible = false;
                    this.$emit('change'); //写回调的函数
				}
			})
		},

    },
    watch:{
        unitP(val){
            this.unitPrice = val;
        },
        intr(val){
            this.introduce = val;
        },
        unitPrice(cur){
        	this.unitPrice = cur.toString().replace(/\D+/g, '');
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
/*弹窗*/
.l_layer{
    .flex;
    .flex_center;
    .justify_center;
    position: fixed;
    width: 7.5rem;
    left: 50%;
    margin-left: -3.75rem;
    top: 0;
    bottom: 0;
    background: rgba(0,0,0,0.5);
    z-index: 23;
}
.l_layer_quote_box{
    width: 6.08rem;
    max-height: 100%;
    background: #fff;
    .overflow_auto;
    .border-radius(0.1rem);
}
.l_layer_quote_title{
    height: 1rem;
    .icon-close1{
        bottom: 0.32rem;
    }
}
.l_layer_quote{
    display: block;
}
.layer_item_input{
    .flex;
    .flex_center;
    input{
        width: 2rem;
        height: 0.66rem;
        padding: 0 0.1rem;
        .mlr10;
        .border(#dbdbdb);
        .border-radius(0.04rem);
        .text_right;
    }
}
.l_layer_quote_txt{
    width:100%;
    height: 1.6rem;
    .border;
    .border-radius(0.04rem);
    padding: 0.1rem;
    resize: none;
    .f26;
    line-height: 1.8em;
}
.l_layer_hint{
    color: #feaf08;
}
</style>
