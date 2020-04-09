<template lang="html">
	<div class="pos_rel">
		<top title="完善资料" :leftShow="false"></top>
		<!--S 上传头像-->
		<div class="yl_img mb30">
			<div class="yl_img_bg">
				<img src="../images/default_avatar.png" alt="">
				<span class="avatar"><i class="iconfont icon-xiangji c_main f24"></i></span>
				<upload-img class="l_com_info_upload" :isAvatar="true" :count="1" v-model="headPhoto" :isShowClose="false" pathType="member_icon_img_path"></upload-img>
			</div>
			<p class="f26 c_999">上传个人形象照，将大大提高约单成功率</p>
		</div>
		<!--E 上传头像-->
		<ul class="yl_mode_list">
			<li>
				<!--S 昵称-->
				<div>
					<label class="yl_account yl_mode_item">
						<div class="yl_icon f28 c_666">
							昵称
						</div>
						<input type="text" v-model.trim="nickname" placeholder="请输入昵称" autocomplete="off" maxlength="10">
						<!--<div class="yl_code c_main f24"><i class="iconfont icon-xunhuanbofang f28 mr5"></i>换一个</div>-->
					</label>
				</div>
				<p class="f24 c_999 mt20 pb10">昵称是您在同城约单的个人品牌</p>
				<!--E 昵称-->
				<!--S 性别-->
				<div class="yl_account yl_mode_item">
					<div class="yl_icon f28 c_666">
						性别
					</div>
					<label class="sex_label" :class="{c_main:gender=='female'}" @click="gender='female'">
						<i class="iconfont icon-nv mr5"></i>女
					</label>
					<label class="sex_label" :class="{c_main:gender=='male'}" @click="gender='male'">
						<i class="iconfont icon-nan mr5"></i>男
					</label>
				</div>
				<!--E 性别-->
				<!--S 年龄--><!--添加年龄校验，出生日期不能大于等于今天-->
				<form-date class="l_com_info_date mt20" v-model="age" placeholder="请选择年龄" title="年龄" :endDate="endDate"></form-date>
				<!--E 年龄-->
			</li>
		</ul>
		<a class="btn_block mt30" href="javascript:void(0);" @click="toComplete">开始同城约单之旅</a>
	<!--	<to-other class="l_complete_info"></to-other>-->
	</div>
</template>

<script>
import {REGEX} from 'src/config/env'//正则
import formDate from 'src/components/formItem/formDate'//日期
import uploadImg from 'src/components/uploads/uploadImg';//上传图片
import toOther from 'src/module/index/components/toOther'//查看其它
import {fetchSetMess//完善信息
} from '../service/getData'
export default{
	data(){
		return{
			endDate:new Date(new Date().getTime()-24*60*60*1000),//结束时间 今天的前一天
			nickname:'',//昵称
			gender:'',//性别
			age:'',//出生日期
			headPhoto:''//头像
		}
	},
	components:{
		formDate,
		uploadImg,
		toOther
	},
	activated(){
		/*if(sessionStorage.isComplete!='Y'){//已完善
			if(!sessionStorage.experienceSkill){//已一键发布技能
				if(!sessionStorage.experienceService){//已一键发布需求
					this.$router.replace('/index');
				}else{
					this.$router.replace('/experienceService');
				}
			}else{
				this.$router.replace('/experienceSkill');
			}
		}*/
	},
	methods:{
		//完善资料
		toComplete(){
			if(!this.nickname){
				alertTip('请输入昵称');
				return;
			}
			if(!/^[0-9a-zA-Z\u4e00-\u9fa5]{1,10}$/.test(this.nickname)){
				alertTip('昵称只能由汉字字母数字组成');
				return;
			}
			if(!this.gender){
				alertTip('请选择性别');
				return;
			}
			if(!this.age){
				alertTip('请选择年龄');
				return;
			}
			if(!this.headPhoto){
				this.$confirm({
					cancelBtn:'取消',
					confirmBtn:'确定',
					layerImg:'http://tcyd-wx.dadetong.com/static/img/login_img.png',
					title:'',
					content:`
						<div class="flex flex_column pt20">
						    <p class="f28">您确定使用默认头像吗?</p>
						</div>
						`,
					confirm:() => {
						this.headPhoto = 'http://tcyd-wx.dadetong.com/static/img/login_img.png'
						this.complete();
					}
				})
			}else{
				this.complete();
			}
		},
		complete(){
			fetchSetMess(this.age,this.nickname,this.headPhoto,this.gender).then(res=>{
				if(res.status){
					sessionStorage.isComplete = 'N'
					alertTip('完善资料成功！',()=>{
						this.$router.replace('/experienceSkill');
					})
				}
			});
		}
	}

}
</script>
<style lang="less">
	.l_complete_info.btn_border{
		display: block;
		width: 6.14rem;
		margin: 0.3rem auto;
		padding-top: 0.15rem;
		padding-bottom: 0.15rem;
	}
	.l_com_info_date{
		width: 6.9rem!important;
		margin-left: 0!important;
		margin-right: 0.3rem!important;
		border:1px solid #e5e5e5;
		border-radius: 0.05rem;
		.from_item_title{
			width: 1.2rem;
			height: 100%;
			text-align: center;
			line-height: 0.86rem;
			border-right: 1px solid #e5e5e5;
		}
		.form_item_arrow{
			display: none!important;
		}
		.from_item_con input{
			text-align: left!important;
		}
	}
	.l_com_info_upload{
		position: absolute;
	    left: -0.3rem;
    	top: -0.36rem;
    	z-index: 10;
		.upfile_img_box{
			position: absolute!important;
			left: 0rem;
			top: 0.36rem;
			width: 1.1rem!important;
			height: 1.1rem!important;
			border-radius: (50%);
			border: none!important;
			img{
				border-radius: (50%);
			}
		}
		.y_upfile .button{
			width: 1.1rem!important;
			height: 1.1rem!important;
		}
		.cover_img{
			position: absolute!important;
			left: 0;
			top: 0;
			opacity: 0;
		}
	}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
	.yl_img_bg{
		position: relative;
		width: 1.1rem;
		height: 1.1rem;
		padding-top: 0.22rem;
		img{
			width: 0.8rem;
			height: 0.8rem;
		}
	}
	.avatar{
		position: absolute;
		z-index:1;
		display: block;
		width: 0.32rem;
		height: 0.32rem;
		background: #fff;
		border-radius: 50%;
		right: 0.04rem;
		bottom: -0.04rem;
		text-align: center;
		line-height: 0.32rem;
	}
	.yl_code{
		display: flex;
		align-items: center;
	}
	.sex_label{
		padding: 0 0.35rem;
		height: 100%;
		display: flex;
		align-items: center;
		font-size: 0.26rem;
		color: #999;
		input{
			display: none;
		}
		i{
			font-size: 0.3rem;
		}
	}
	.btn_block.border{
		box-shadow: none;
		background: transparent;
		color: @color;
		border: 1px solid @color;
	}
</style>
