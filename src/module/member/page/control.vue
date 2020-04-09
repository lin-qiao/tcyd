<!--头部-->
<template>
    <div class="apply_box router_page bg_gray">
    	<div class="bg_fff">
    	<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 控制中心'></top>
    	<div class="line"></div>
    	<div class="flex justify_between flex_center control_item">
    		<span class="f28 flex flex_center"><i class="iconfont icon-naozhong c_orange f34 mr14"></i>勿扰时段</span>
			<form-switch v-model="controlData.isDisturb"></form-switch>
    	</div>
    	<div class="flex justify_between control_item" v-if="controlData.isDisturb">
    		<div class="f28 flex flex_center">
    			<form-date type="time" v-model="controlData.disturbStart" class="formdate"></form-date>
    			<span class="mr20">至</span>
    			<form-date type="time" v-model="controlData.disturbEnd" class="formdate"></form-date>
    		</div>
    		<!--<a href="javascript:void(0);" class="c_main">设置</a>-->
    	</div>
    	<div class="flex justify_between control_item bg_gray border-n">
    		<span class="f26 c_999">开启勿扰时，这个时间段将不会收到订单通知</span>
    	</div>
    	<div class="flex justify_between control_item">
    		<span class="f28 flex flex_center"><i class="iconfont icon-closeshop c_blue f34 mr14"></i>闭店打烊</span>
    		<form-switch v-model="controlData.isSnoring"></form-switch>
    	</div>
    	<div class="flex justify_between control_item" v-if="controlData.isSnoring">
    		<div class="f28 flex flex_center">
    			<form-date v-model="controlData.snoringStart" :endDate="endDate" :startDate="now" class="formdate formdate1"></form-date>
    		    <span class="mr20">至</span> 
    		    <form-date v-model="controlData.snoringEnd" :endDate="endDate" :startDate="now" class="formdate formdate1"></form-date>
    		</div>
    		<!--<a href="javascript:void(0);" class="c_main">设置</a>-->
    	</div>
    	<div class="flex justify_between control_item bg_gray border-n">
    		<span class="f26 c_999">开启勿扰时，这个时间段将不会收到订单通知</span>
    	</div>
    	<div class="flex justify_between control_item">
    		<span class="f28 flex flex_center">
    			<i class="iconfont icon-gonggao c_green f34 mr14"></i>
    			声音通知
    			<span class="f24 c_999 ml10">开启后新消息推送为声音提示</span>
    		</span>
    		<form-switch v-model="controlData.isVoice"></form-switch>
    	</div>
    	<div class="flex justify_between control_item">
    		<span class="f28 flex flex_center">
    			<i class="iconfont icon-hide c_purple f34 mr14"></i>
    			隐身接单
    		</span>
    		<form-switch v-model="controlData.isStealth"></form-switch>
    	</div>
    	<div class="flex justify_between control_item bg_gray border-n">
    		<span class="f26 c_999">开启后您将减少来自系统推送的诚意金订单，会影响您的收入</span>
    	</div>
    	<div class="flex justify_between control_item">
    		<span class="f28 flex flex_center">
    			<i class="iconfont icon-smile c_red f34 mr14"></i>
    			欢乐模式
    		</span>
    		<form-switch v-model="controlData.isHappyMode"></form-switch>
    	</div>
    	<div class="flex justify_between control_item bg_gray border-n">
    		<span class="f26 c_999">开启换了模式后您将在APP中看到动态弹幕信息，跟同城朋友一起欢乐约单</span>
    	</div>
    	</div>
	</div>
</template>

<script>
	import formSwitch from 'src/components/formItem/formSwitch';//开关
	import formDate from 'src/components/formItem/formDate';    //日期
	import {
		fetchControlOne,//控制中心查询
		fetchControlAdd //添加控制中心
	} from '../service/getData';
    export default {
    	data(){
            return{
            	now:new Date(),    //当前时间
        		endDate:new Date(new Date().getTime()+10*365*24*60*60*1000),//打烊的时间的限制  10年以后
            	controlData:{
            		isDisturb:false,   //勿扰时段 => 开关
	            	disturbStart:'',   //勿扰时段 => 勿扰开始
	            	disturbEnd:'',     //勿扰时段 => 勿扰结束
	            	isSnoring:false,   //闭店打烊 => 开关
	            	snoringStart:'',   //闭店打烊 => 打烊开始
	            	snoringEnd:'',     //闭店打烊 => 打烊结束
	            	isVoice:false,     //声音通知 => 开关
	            	isStealth:false,   //隐身接单 => 开关
	            	isHappyMode:false, //欢乐模式 => 开关
            	},
            	isCarryOut:false//初始化是否展示
            }
        },
        components:{
        	formSwitch,//开关
        	formDate,//日期
        },
        activated(){
        	this.isCarryOut = false;
        },
        watch:{
        	controlData:{//监听开关改变
        		deep:true,
        		handler(cur){
        			if(this.isCarryOut){
        				let data = {
		       				isDisturb:cur.isDisturb?'Y':'N',  //勿扰时段
			        		disturbStart:cur.disturbStart,    //勿扰开始
			        		disturbEnd:cur.disturbEnd,        //勿扰结束
			        		isSnoring:cur.isSnoring?'Y':'N',  //闭店打烊
			        		snoringStart:cur.snoringStart,    //打烊开始
			        		snoringEnd:cur.snoringEnd,        //打烊结束
			        		isVoice:cur.isVoice?'Y':'N',      //声音通知
			        		isStealth:cur.isStealth?'Y':'N',  //隐身接单
			        		isHappyMode:cur.isHappyMode?'Y':'N'//欢乐模式  
		       			}
		       			fetchControlAdd(data).then(res=>{})
        			}
        		}
        	}
        },
        mounted(){
        	this.controlShow();//请求默认开关值
        },
       	methods: {
            controlShow(){//请求默认开关值
            	fetchControlOne().then(res=>{
            		if(res.status){
            			let data = res.data;
		        		this.controlData.isDisturb = data.isDisturb=='Y'?true:false;    //勿扰时段
		        		this.controlData.disturbStart = data.disturbStart;              //勿扰开始
		        		this.controlData.disturbEnd = data.disturbEnd;                  //勿扰结束
		        		this.controlData.isSnoring = data.isSnoring=='Y'?true:false;    //闭店打烊
		        		this.controlData.snoringStart = data.snoringStart;              //打烊开始
		        		this.controlData.snoringEnd = data.snoringEnd;                  //打烊结束
		        		this.controlData.isVoice = data.isVoice=='Y'?true:false;        //声音通知
		        		this.controlData.isStealth = data.isStealth=='Y'?true:false;    //隐身接单
		        		this.controlData.isHappyMode = data.isHappyMode=='Y'?true:false;//欢乐模式  
            		}
            		this.$nextTick(res=>{
            			this.isCarryOut = true;
            		})
	        	})
            }
        }
    }
</script>

<style lang="less" scoped="scoped">
	@import (reference) "~src/style/all.less";
	i{
		vertical-align: middle;
	}
	.control_item{
		padding:0.16rem 0.3rem;
		.border-b();
	}
	.control_icon{
		font-size:0.58rem;
	}
	.c_icon_green{color:#4ad764;}
	.c_orange{color:#faa268;}
	.c_blue{color:#59a5fb;}
	.c_green{color:#9fc97d;}
	.c_purple{color:#93a8f5;}
	.c_red{color:#f97575;}
	
	.formdate{
		width:1rem !important;
		height: auto !important;
		padding:0 !important;
		margin: 0 !important;
		border:none !important;
		text-align: left;
		flex:0 0 initial !important;
		&.formdate1{
			width:1.6rem !important;
		}
	}
</style>
<style lang="less">
	.apply_box{
		.formdate{
			& .form_item_arrow{
				display: none !important;
			}
			& input{
				text-align: left !important;
			}
		}
	}
	.apply_box{
		& .mint-switch{
			.mint-switch-core{
				height: 0.54rem;
			}
			.mint-switch-core::before {
			    height: 0.5rem;
		    }
		    .mint-switch-core::after {
			    width: .5rem;
			    height: .5rem;
		    }
		    .mint-switch-input:checked + .mint-switch-core::after {
			    -webkit-transform: translateX(0.5rem);
			    -ms-transform: translateX(0.5rem);
			    transform: translateX(0.5rem);
			}
		}
	}
</style>
