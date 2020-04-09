<template>
	<div class="bg_gray router_page">
		<div class="bg_fff">
			<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 荣誉资质'></top>
			<item-skill :skillInfo="skillInfo"></item-skill>
			<div class="line_box"></div>
	        <!--表单-->
	        <div v-show="isEditor">
	        	<element-box title="荣誉资质" class="border-n l_honor">
		            <p slot="title" class="f26 c_666 ml40">添加一个或多个技能相关的荣誉资质</p>
		        </element-box>
				<form-input title="荣誉名称" placeholder="请输入名称" v-model="honorInfo.honorName"></form-input>
				<form-input title="颁发机构" placeholder="请输入颁发机构" v-model="honorInfo.mechanism"></form-input>
				<form-date class="border-n" title="获得时间" placeholder="请选择获得时间" v-model="getTime"></form-date>
			</div>
			<!--列表-->
			<div v-show="!isEditor">
				<ul class="l_honor_list">
					<li class="pl30 pr40 ptb20 flex flex_center justify_between" v-for="item in honorList">
						<div class="f28">
							<p class="mb10">{{item.honorName}}</p>
							<p class="c_666">{{item.issuingAuthority}}</p>
						</div>
						<i class="iconfont icon-edit f60 c_main ml50" @click="isEditor=true,isShow=true,getHonorDetail(item.id)"></i>
					</li>
				</ul>
			</div>
        </div>
    	<a class="btn_block mtb60" v-show="isEditor&&!isShow" href="javascript:void(0);" @click="honorAdd()">提交</a>
    	<a class="btn_block mtb60" v-show="!isEditor&&honorList.length<10" href="javascript:void(0);" @click="isEditor=true,empty()">继续添加</a>
    	<div class="mtb60 c_edit_delete" v-show="isShow">
    		<a class="btn_border c_edit_btn" href="javascript:void(0);" @click="honorDelete()">删除</a>
    	    <a class="btn c_edit_btn" href="javascript:void(0);" @click="honorUpdate()">保存</a>
    	</div>
	</div>
</template>

<script>
	import itemSkill from 'src/components/item/itemSkill'
	import elementBox from 'src/components/item/itemElementBox';
	import formInput from 'src/components/formItem/formInput';
	import formDate from 'src/components/formItem/formDate';
	import {
		fetchGetHonorList,  //获取技能荣誉列表
		fetchGetHonorDetail,//获取技能荣誉详情
		fetchHonorUpdate,//技能荣誉修改
		fetchHonorAdd,//技能荣誉添加
		fetchHonorDelete,//技能荣誉删除
		fetchGetSkillDetails//获取技能详情
	} from '../service/getData'
	import {REGEX} from 'src/config/env'
	export default{
		data(){
			return{
				isEditor:false,//是否编辑状态
				isShow:false,//是否显示删除按钮
				id:'',//修改时传递的ID
				url:'',//传递来的url
				skillId:'',//技能id
				getTime:'',//获得时间
				honorList:'',//技能荣誉列表
				skillDetails:'',//技能详情
				honorInfo:{
					honorName:'',//荣誉名称
					mechanism:'',//颁发机构
				},
				skillInfo:{
					name:'',
					grade:'',
					gradeImg:'',
					imgIcon:'',
					time:''
				}//技能名称、技能等级、技能图片等信息
			}
		},
		components:{
			itemSkill,
			elementBox,
			formInput,
			formDate
		},
		activated(){
			this.isShow=false//是否显示删除按钮
			this.url=this.$route.query.url//传递来的url
			this.skillId=this.$route.query.skillId//技能id
			this.getHonorList()//获取技能荣誉列表
			this.getSkillDetails()//获取技能详情
	 	},
		methods:{
			//获取技能荣誉列表
			getHonorList(){
				fetchGetHonorList(this.skillId).then(res => {
					if(res.status){
						//有数据展示列表，无数据展示表单
						if(res.data.list.length==0){
							this.isEditor=true
							this.honorInfo={
								honorName:'',//荣誉名称
								mechanism:'',//颁发机构
							}
							getTime:''//获得时间
						}else{
							this.isEditor=false
						}
						this.honorList=res.data.list//荣誉列表信息
					}else{
						alertTip(res.msg);
					}
				});
			},
			//获取技能荣誉详情
			getHonorDetail(id){
				this.id=id//当前荣誉ID
				fetchGetHonorDetail(id).then(res => {
					if(res.status){
						this.honorInfo.honorName=res.data.skillHonorVo.honorName//荣誉名称
						this.honorInfo.mechanism=res.data.skillHonorVo.issuingAuthority//荣誉颁发机构
						//时间戳转时间格式Y-M-D
						let d=new Date(parseInt(res.data.skillHonorVo.getDate))
						let Y = d.getFullYear();
						let Mo = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
						let D = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
						this.getTime=Y + '-' + Mo + '-' + D;//当前荣誉的获取时间
					}else{
						alertTip(res.msg);
					}
				});
			},
			//技能荣誉添加
			honorAdd(){
				if(!this.honorInfo.honorName){
					alertTip('请输入荣誉名称');
					return
				}
				if(REGEX.noHtml.regex.test(this.honorInfo.honorName)){
					alertTip('荣誉名称不能包含敏感字符！');
					return;
				}
				if(!this.honorInfo.mechanism){
					alertTip('请输入颁发机构');
					return
				}
				if(REGEX.noHtml.regex.test(this.honorInfo.mechanism)){
					alertTip('颁发机构名称不能包含敏感字符！');
					return;
				}
				if(!this.getTime){
					alertTip('请输入时间');
					return
				}
				fetchHonorAdd(this.skillId,this.honorInfo.honorName,this.honorInfo.mechanism,this.getTime).then(res => {
					if(res.status){
						this.isEditor=false//关闭表单
						this.isShow=false
						if(this.url){	
							alertTip(res.msg,()=>{
								this.$router.replace({
										path: '/skillDetail',
										query: {skillId:this.skillId}
									}
								);//跳转到技能详情
							});
						}else{
							this.getHonorList()//添加完成后重新加载列表
						}
					}else{
						alertTip(res.msg);
					}
				});
			},
			//技能荣誉修改
			honorUpdate(){
				if(!this.honorInfo.honorName){
					alertTip('请输入荣誉名称');
					return
				}
				if(!this.honorInfo.mechanism){
					alertTip('请输入颁发机构');
					return
				}
				if(!this.getTime){
					alertTip('请输入时间');
					return
				}
				fetchHonorUpdate(this.id,this.skillId,this.honorInfo.honorName,this.honorInfo.mechanism,this.getTime).then(res => {
					if(res.status){
						this.isEditor=false//关闭表单
						this.isShow=false
						this.getHonorList()//修改完成后重新加载列表
					}else{
						alertTip(res.msg);
					}
				});	
			},
			//删除荣誉
			honorDelete(){
				if(!this.id){
					alertTip('请传入荣誉id');
					return
				}
				//服务器名称 DDT_TC_MEMBER_SKILL_DETAILS
				fetchHonorDelete(this.id).then(res => {
					if(res.status){	
						alertTip(res.msg,()=>{
							this.isEditor=false//关闭表单
							this.isShow=false
							this.getHonorList()//删除完成后重新加载列表
						});
					}else{
						alertTip(res.msg);
					}
				});
			},
			//点击继续添加按钮清空表单缓存数据
			empty(){
				this.getTime='',//获得时间
				this.honorInfo={
					honorName:'',//荣誉名称
					mechanism:''//颁发机构
				}
			},
			//获取技能详情
			getSkillDetails(){
				//服务器名称 DDT_TC_MEMBER_SKILL_DETAILS
				fetchGetSkillDetails(this.skillId).then(res => {
					if(res.status){	
						this.skillDetails=res.data.data//技能详情信息
						this.skillInfo={
							name:this.skillDetails.skillName,
							grade:this.skillDetails.integralGrade,
							gradeImg:this.skillDetails.levelImg,
							imgIcon:this.skillDetails.categoryImg,
							time:this.skillDetails.addDate,
						}//技能名称、技能等级、技能图片等信息
					}else{
						alertTip(res.msg);
					}
				});
			},
		}
	}
</script>

<style lang="less">
.l_honor{
	.el_box_tit{
		justify-content: flex-start!important;
	}
	.el_box_info{
		display: none;
	}
}
.l_honor_list{
	line-height: 0.4rem;
	li{
		border-bottom: 0.2rem solid #f5f5f5;
	}
}
/*S 编辑删除按钮*/
.c_edit_delete{
	text-align: center;
	.btn_border{
		background: none;
	}
	.c_edit_btn{
		width:2.68rem;
		height:0.66rem;
		display: inline-block;
		margin:0 0.16rem;
	}
}
/*E 编辑删除按钮*/
</style>