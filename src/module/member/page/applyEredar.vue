<!--头部-->
<template>
    <div class="apply_box">
    	<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 申请技能达人'></top>
    	<div class="apply_tip c_orange ptb15 plr30">请完善资料在提交</div>
    	<div class="apply_con">
    		<ul class="apply_flow flex flex_center justify_between">
    			<li class="pos_rel">
    				<img src="../images/apply_flow1.png"/>
    				<p>报名申请</p>
    			</li>
    			<li class="mlr10"><img src="../images/apply_jt.png"></li>
    			<li class="pos_rel">
    				<img src="../images/apply_flow2.png"/>
    				<p>平台审核</p>
    			</li>
    			<li class="mlr10"><img src="../images/apply_jt.png"></li>
    			<li class="pos_rel">
    				<img src="../images/apply_flow3.png"/>
    				<p>申请成功</p>
    			</li>
    		</ul>
    		<div class="apply_task">
    		    <div class="f26 c_666 mb40 flex flex_center"><span class="title_icon mr10"></span>报名申请签约达人，您需要先完成以下事项：</div>
    	        <ul class="apply_list">
    	        	<li>
    	        		<img src="../images/apply_icon1.png" class="apply_img">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">需要特定技能审核通过</p>
    	        			<p class="f22 c_999">男士SPA，足疗，中医推拿、交友
							看定影、陪聊天、模特、享美食、
							情感咨询、练唱歌、待喝酒、导游</p>
    	        		</div>
    	        		<router-link to="/skillType" class="apply_btn">发布技能</router-link>
    	        	</li>
    	        	<li>
    	        		<img src="../images/apply_icon2.png" class="apply_img">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">真实头像</p>
    	        			<p class="f22 c_999">申请服务达人前，您需要确
							认上传了与视频、相册为同
							一人的头像</p>
    	        		</div>
    	        		<a href="javascript:void(0);" class="apply_btn">修改头像</a>
    	        	</li>
    	        	<li>
    	        		<img src="../images/apply_icon3.png" class="apply_img">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">个人照片</p>
    	        			<p class="f22 c_999">申请服务达人前，您需要确认至
							上上传3张本人照片，照片需要
							与头像、视频为同一人</p>
    	        		</div>
    	        		<router-link to="/dynamic" class="apply_btn">发布照片</router-link>
    	        	</li>
    	        	<li>
    	        		<img src="../images/apply_icon4.png" class="apply_img">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">本人视频<em class="f24 c_main ml20">未上传</em></p>
    	        			<p class="f22 c_999">申请服务达人前，您需要确
							认您上传了本人视频且与头
							像、相册相符</p>
    	        		</div>
    	        		<router-link to="/dynamic" class="apply_btn">上传视频</router-link>
    	        	</li>
    	        </ul>
    	        <div class="ptb20 f22 c_999 border-t">提示：如修改以上信息，请待平台（1-3分钟）审核通过后提交</div>
    		</div>
    		<div class="apply_task">
    		    <div class="f26 c_666 mb40 flex flex_center"><span class="title_icon mr10"></span>加分项目<em class="c_main f24">（选填）</em></div>
    	        <ul class="apply_list">
    	        	<li>
    	        		<img src="../images/apply_icon5.png" class="apply_img">
    	        		<div class="apply_text">
    	        			<p class="f28 mb5 ellipsis">实名认证</p>
    	        			<p class="f22 c_999">完成实名认证，可以获得
							大德通同城APP的特别推
							荐哦</p>
    	        		</div>
    	        		<router-link to="/save" class="apply_btn">去认证</router-link>
    	        	</li>
    	        </ul>
    		</div>
    	</div>
	</div>
</template>

<script>
    export default {
    	data(){
            return{
            	
            }
        },
        components:{
        	
        },
        mounted(){
        },
        deactivated(){
        	
       	},
       	methods: {
       		delectBtn(){//列表删除
       			
       		}
        }
    }
</script>

<style lang="less" scoped="scoped">
	@import (reference) "~src/style/all.less";
	i{
		vertical-align: middle;
	}
	.apply_box{
		min-height:100%;
		background:@bg_color;
	}
	.apply_tip{
		background:#fff5e5;
	}
	.apply_con{
		min-height: 3.5rem;
		padding:3.14rem 0.3rem 0.2rem;
		background: url(../images/apply_bg.jpg) no-repeat;
		background-size:100%;
	}
	.apply_flow{
		padding:0.3rem 0.6rem;
		.border-radius(0.1rem);
		text-align: center;
		background:#fff;
		margin-bottom:0.2rem;
		.box_shadow(0 0.32rem 0.32rem #eeeff3);
		img{
			width: 0.9rem;
		}
	}
	.apply_task{
		.border-radius(0.1rem);
		padding:0.4rem 0.2rem 0 0.2rem;
		background: #fff;
		.box_shadow(0 0.32rem 0.32rem #eeeff3);
		margin-bottom: 0.2rem;
		overflow: hidden;
	}
	.title_icon{
		width:0.05rem;
		height:0.26rem;
		background:url(../images/apply_solid.png) no-repeat;
		background-size:100%;
	}
	.apply_list{
		& li{
			.flex;
			.flex_center;
			.justify_between;
			margin-bottom: 0.4rem;
		}
		& .apply_img{
			flex-shrink:0;
			width:0.9rem;
			height:0.9rem;
			margin-right:0.2rem;
		}
		& .apply_text{
			flex-shrink:0;
			width:3.2rem;
		}
	}
	.apply_btn{
		width:1.6rem;
		height:0.6rem;
		line-height:0.6rem;
		.f28;
		color:@color;
		text-align: center;
		.border-radius(0.4rem);
		.border(@color)
	}
	.border-t{
		.border-t();
	}
	.mb5{margin-bottom:0.05rem;}
</style>
