<template>
	<div class="router_page bg_gray">
		<top title='同城  <span class="title_circle">●</span> 申请仲裁' :isReturn="false"></top>
		<div class="bg_fff">
			<!-- S 发布动态文字输入框 -->
	        <div class="mt20 opinion">
	            <form-text v-model.trim="content" maxlength="400" input_placeholder="请输入仲裁原因" height="6"></form-text>
	        </div>
	        <!-- E 发布动态文字输入框 -->
	        <!-- S 上传图片 -->
	        <div class="z_upload">
	            <upload-img :imgList="imgList" pathType="tc_require_file_path" count="6"></upload-img>
	            <div class="c_upload_tips" v-show="isTips">请上传凭证<i class="iconfont icon-close " @click="isTips=false"></i></div>
	        </div>
        </div>
        <!-- E 上传图片 -->
       <a href="javascript:void(0)" class="btn_block mt60" @click="toArbitration">提交</a>
	</div>
</template>

<script>
import formText from 'src/components/formItem/formTextarea';
import uploadImg from 'src/components/uploads/uploadImg';
import {fetchRequireArbitration} from  '../service/getData';
export default {
	data() {
		return {
			orderSn:"",//订单号
		    content:"",//仲裁原因
		    imgList: [],//图片列表
		    pathType:"",
		    isTips:true//提示信息
		}
	},
	components:{
		formText,
		uploadImg
	},
	methods:{
		toArbitration:function(){
			if(!this.content){
				alertTip("请输入仲裁原因");
				return;
			}
			if(this.imgList.length==0){
				alertTip("请上传凭证");
				return;
			}
			fetchRequireArbitration(this.orderSn,this.content,this.imgList.toString()).then(res=>{
				if(res.status){
					alertTip("申请仲裁成功",()=>{
						 this.$router.go(-1);
					});
				}
			})
		}
	},
	activated(){
	  	this.orderSn = this.$route.query.orderSn;
	  	this.imgList = [];
	  	this.content = "";
	}
}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
.opinion{
    padding: 0.3rem;
    background: #fff;
    border-bottom: 1px solid #eee;
}
.z_upload{
    background: #fff;
    margin-bottom: 0.7rem;
    position:relative;
}
.c_upload_tips{
	background: #fff7ea;
	padding:0.1rem 0.2rem;
	.f22;
	color:#fba723;
	line-height:0.36rem;
	position:absolute;
	top:0rem;
	left:1.3rem;
	border-radius:0.06rem;
	i{
		position:absolute;
		top:-0.14rem;
		right:-0.14rem;
		color:#fba723;
		.f30;
	}
}
</style>
