<template>
	<div class="bg_gray router_page">
		<div class="bg_fff">
			<top :isReturn="false" :title='`同城  <span class="title_circle">●</span> `+pageData.title'></top>
			<item-skill :skillInfo="skillInfo"></item-skill>
			<div class="line_box"></div>
			<!--S 表单-->
			<div v-show="isEditor">
				<element-box :title="pageData.title" class="border-n l_honor">
		            <p slot="title" class="f26 c_666 ml40">添加您的{{pageData.title}}</p>
		        </element-box>
				<form-input :title="pageData.inputName1" :placeholder="pageData.placeholder1" v-model="work.inputName1"></form-input>
				<form-input title="工作岗位" placeholder="请输入您的职位" v-show="page=='work'" v-model="work.placeholder1"></form-input>
				<form-select title="学历" placeholder="请选择您的学历" :list="list" v-show="page=='education'" v-model="work.education"></form-select>
				<form-date :title="pageData.inputName3" :placeholder="'请选择'+pageData.inputName3" v-model="work.inputName3"></form-date>
				<form-date class="border-n" :title="pageData.inputName4" :placeholder="'请选择'+pageData.inputName4" v-model="work.inputName4"></form-date>
			</div>
			<!--E 表单-->
			<!--S 列表-->
			<div v-show="!isEditor">
				<ul class="l_honor_list">
					<li class="pl30 pr40 ptb20 flex flex_center justify_between" v-for="item in workList" v-show="page=='work'">
						<div class="f28">
							<p class="mb10">工作单位：<span class="c_666">{{item.workplace}}</span></p>
							<p class="mb10">工作岗位：<span class="c_666">{{item.position}}</span></p>
							<p class="mb10">入职时间：<span class="c_666">{{item.entryDate|date('yyyy-MM-dd')}}</span></p>
							<p>离职时间：<span class="c_666">{{item.soFarDate|date('yyyy-MM-dd')}}</span></p>
						</div>
						<i class="iconfont icon-edit f60 c_main ml50" @click="isEditor=true,isShow=true,getDetail(item.id)"></i>
					</li>
					<li class="pl30 pr40 ptb20 flex flex_center justify_between" v-for="item in educationList" v-show="page=='education'">
						<div class="f28">
							<p class="mb10">教育机构：<span class="c_666">{{item.schoolName}}</span></p>
							<p class="mb10">学历：<span class="c_666">{{item.education}}</span></p>
							<p class="mb10">开始时间：<span class="c_666">{{item.startDate|date('yyyy-MM-dd')}}</span></p>
							<p>结束时间：<span class="c_666">{{item.soFarDate|date('yyyy-MM-dd')}}</span></p>
						</div>
						<i class="iconfont icon-edit f60 c_main ml50" @click="isEditor=true,isShow=true,getDetail(item.id)"></i>
					</li>
				</ul>
			</div>
			<!--E 列表-->
        </div>
    	<a class="btn_block mtb60" v-show="isEditor&&!isShow"  href="javascript:void(0);" @click="workAdd()">提交</a>
		<a class="btn_block mtb60" v-show="!isEditor" href="javascript:void(0);" @click="isEditor=true,empty()">继续添加</a>
		<div class="mtb60 c_edit_delete" v-show="isShow">
    		<a class="btn_border c_edit_btn" href="javascript:void(0);" @click="workDelete()">删除</a>
    	    <a class="btn c_edit_btn" href="javascript:void(0);" @click="workUpdate()">保存</a>
    	</div>
	</div>
</template>

<script>
	import itemSkill from 'src/components/item/itemSkill'
	import elementBox from 'src/components/item/itemElementBox';
	import formInput from 'src/components/formItem/formInput';
	import formDate from 'src/components/formItem/formDate';
	import formSelect from 'src/components/formItem/formSelect';
	import {
		fetchWorkAdd,//工作经历添加
		fetchWorkUpdate,//工作经历修改
		fetchWorkDelete,//工作经历删除
		fetchEducationAdd,//教育经历添加
		fetchEducationUpdate,//教育经历修改
		fetchEducationDelete,//教育经历删除
		fetchGetWorkList,  //获取工作经历列表
		fetchGetEducationList,//获取教育经历列表
		fetchGetWorkDetail,//获取工作经历详情
		fetchGetEducationDetail,//获取教育经历详情
		fetchGetSkillDetails//获取技能详情
	} from '../service/getData'
	import {REGEX} from 'src/config/env'
	export default{
		data(){
			return{
				page:'work',
				isEditor:false,//是否编辑状态
				isShow:false,//是否显示删除按钮
				id:'',//修改时传递的ID
				url:'',//传递来的url
				skillId:'',//技能ID
				workList:'',//工作经历列表
				educationList:'',//教育经历列表
				skillDetails:'',//技能详情
				work:{
					inputName1:'',//工作单位/教育机构
					placeholder1:'',//单位名称
					inputName3:'',//入职时间/开始时间
					inputName4:'',//离职时间/结束时间
					education:''//学历
				},
				skillInfo:{
					name:'',
					grade:'',
					gradeImg:'',
					imgIcon:'',
					time:''
				},//技能名称、技能等级、技能图片等信息
				list:[
					'初中及以下',
					'高中',
					'中专',
					'大专',
					'本科',
					'硕士及以上',
					'其他'
				]
			}
		},
		components:{
			itemSkill,
			elementBox,
			formInput,
			formDate,
			formSelect
		},
		activated(){
			this.isShow=false//是否显示删除按钮
			this.page = this.$route.path.split("/")[1];
			this.url=this.$route.query.url//传递来的url
			this.skillId=this.$route.query.skillId,//技能id
			this.getSkillDetails()//获取技能详情
			if(this.page=='work'){
				this.getWorkList()//获取工作经历列表
			}else{
				this.getEducationList()//获取教育经历列表
			}
		},
		computed:{
			pageData(){
				if(this.page=='work'){
					return {
						title:'工作经历',
						inputName1:'工作单位',
						placeholder1:'请输入单位名称',
						inputName3:'入职时间',
						inputName4:'离职时间'
					}
				}else{
					return {
						title:'教育经历',
						inputName1:'教育机构',
						placeholder1:'请输入学校名称',
						inputName3:'开始时间',
						inputName4:'结束时间'
					}
				}
			}
		},
		methods:{
			//获取工作经历列表
			getWorkList(){
				fetchGetWorkList(this.skillId).then(res => {
					if(res.status){
						//有数据展示列表，无数据展示表单
						if(res.data.list.length==0){
							this.isEditor=true
							this.work={
								inputName1:'',//工作单位/教育机构
								placeholder1:'',//单位名称
								inputName3:'',//入职时间/开始时间
								inputName4:'',//离职时间/结束时间
							}
						}else{
							this.isEditor=false
						}
						this.workList=res.data.list//工作列表
					}else{
						alertTip(res.msg);
					}
				});
			},
			//获取教育经历列表
			getEducationList(){
				fetchGetEducationList(this.skillId).then(res => {
					if(res.status){
						for(let i=0,len=res.data.list.length;i<len;i++){
							//学历枚举
							switch (res.data.list[i].education) {
								case 'middle':
								res.data.list[i].education='初中及以下'
								break;

								case 'high':
								res.data.list[i].education='高中'
								break;

								case 'secondary':
								res.data.list[i].education='中专'
								break;

								case 'college':
								res.data.list[i].education='大专'
								break;

								case 'undergraduate':
								res.data.list[i].education='本科'
								break;

								case 'graduate':
								res.data.list[i].education='硕士及以上'
								break;

								case 'other':
								res.data.list[i].education='其他'
								break;
							}
						}
						//有数据展示列表，无数据展示表单
						if(res.data.list.length==0){
							this.isEditor=true
							this.work={
								inputName1:'',//工作单位/教育机构
								inputName3:'',//入职时间/开始时间
								inputName4:'',//离职时间/结束时间
								education:this.list[0]//学历
							}
						}else{
							this.isEditor=false
						}
						this.educationList=res.data.list//教育经历列表
					}else{
						alertTip(res.msg)
					}
				});
			},
			//获取详情信息
			getDetail(id){
				this.id=id//修改传递的id
				//工作经历详情信息
				if(this.page=='work'){
					fetchGetWorkDetail(id).then(res => {
						if(res.status){
							this.work.inputName1=res.data.skillWorkVo.workplace//工作单位
							this.work.placeholder1=res.data.skillWorkVo.position//单位名称
							this.work.inputName3=this.getTime(res.data.skillWorkVo.entryDate)//入职时间
							this.work.inputName4=this.getTime(res.data.skillWorkVo.quitDate)//离职时间
						}else{
							alertTip(res.msg);
						}
					});
				}else{
					//教育经历详情信息
					fetchGetEducationDetail(id).then(res => {
						if(res.status){
							this.work.inputName1=res.data.skillEducationVo.schoolName//教育机构
							//学历枚举
							switch (res.data.skillEducationVo.education) {
								case 'middle':
								this.work.education='初中及以下'
								break;

								case 'high':
								this.work.education='高中'
								break;

								case 'secondary':
								this.work.education='中专'
								break;

								case 'college':
								this.work.education='大专'
								break;

								case 'undergraduate':
								this.work.education='本科'
								break;

								case 'graduate':
								this.work.education='硕士及以上'
								break;

								case 'other':
								this.work.education='其他'
								break;
							}//学历
							this.work.inputName3=this.getTime(res.data.skillEducationVo.startDate)//开始时间
							this.work.inputName4=this.getTime(res.data.skillEducationVo.endDate)//结束时间
						}else{
							alertTip(res.msg);
						}
					});
				}
			},
			//修改
			workUpdate(){
				//工作经历修改
				if(this.page=='work'){
					if(!this.work.inputName1){
						alertTip('请输入工作单位');
						return
					}
					if(REGEX.noHtml.regex.test(this.work.inputName1)){
						alertTip('单位名称不能包含敏感字符！');
						return;
					}
					if(!this.work.placeholder1){
						alertTip('请输入职位');
						return
					}
					if(REGEX.noHtml.regex.test(this.work.placeholder1)){
						alertTip('职位名称不能包含敏感字符！');
						return;
					}
					if(!this.work.inputName3){
						alertTip('请输入入职时间');
						return
					}
					if(!this.work.inputName4){
						alertTip('请输入离职时间');
						return
					}
					if(new Date(this.work.inputName3).valueOf()>=new Date(this.work.inputName4).valueOf()){
						alertTip('入职时间不能超过离职时间');
						return
					}
					//修改
					fetchWorkUpdate(this.id,this.skillId,this.work.inputName1,this.work.placeholder1,this.work.inputName3,this.work.inputName4).then(res => {
						if(res.status){
							this.isEditor=false//关闭表单
							this.isShow=false
							this.getWorkList()//添加完成后重新加载列表
						}else{
							alertTip(res.msg);
						}
					});
				}else{
					//教育经历修改
					if(!this.work.inputName1){
						alertTip('请输入教育机构');
						return
					}
					if(REGEX.noHtml.regex.test(this.work.inputName1)){
						alertTip('教育机构名称不能包含敏感字符！');
						return;
					}
					if(!this.work.education){
						alertTip('请输入学历');
						return
					}
					if(!this.work.inputName3){
						alertTip('请输入开始时间');
						return
					}
					if(!this.work.inputName4){
						alertTip('请输入结束时间');
						return
					}
					if(new Date(this.work.inputName3).valueOf()>=new Date(this.work.inputName4).valueOf()){
						alertTip('开始时间不能超过结束时间');
						return
					}
					//DDT_TC_SKILL_PROFILE_EDUCATIONUPDATE
					fetchEducationUpdate(this.id,this.skillId,this.work.inputName1,this.getEducation(this.work.education),this.work.inputName3,this.work.inputName4).then(res => {
						if(res.status){
							this.isEditor=false//关闭表单
							this.isShow=false
							this.getEducationList()
						}else{
							alertTip(res.msg);
						}
					});
				}		
			},
			//添加
			workAdd(){
				if(this.page=='work'){
					if(!this.work.inputName1){
						alertTip('请输入工作单位');
						return
					}
					if(REGEX.noHtml.regex.test(this.work.inputName1)){
						alertTip('单位名称不能包含敏感字符！');
						return;
					}
					if(!this.work.placeholder1){
						alertTip('请输入职位');
						return
					}
					if(REGEX.noHtml.regex.test(this.work.placeholder1)){
						alertTip('职位名称不能包含敏感字符！');
						return;
					}
					if(!this.work.inputName3){
						alertTip('请输入入职时间');
						return
					}
					if(!this.work.inputName4){
						alertTip('请输入离职时间');
						return
					}
					if(new Date(this.work.inputName3).valueOf()>=new Date(this.work.inputName4).valueOf()){
						alertTip('入职时间不能超过离职时间');
						return
					}
					//工作添加
					fetchWorkAdd(this.skillId,this.work.inputName1,this.work.placeholder1,this.work.inputName3,this.work.inputName4).then(res => {
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
								this.getWorkList()//添加完成后重新加载列表
							}
						}else{
							alertTip(res.msg);
						}
					});
				}else{
					if(!this.work.inputName1){
						alertTip('请输入教育机构');
						return
					}
					if(REGEX.noHtml.regex.test(this.work.inputName1)){
						alertTip('教育机构名称不能包含敏感字符！');
						return;
					}
					if(!this.work.education){
						alertTip('请输入学历');
						return
					}
					if(!this.work.inputName3){
						alertTip('请输入开始时间');
						return
					}
					if(!this.work.inputName4){
						alertTip('请输入结束时间');
						return
					}
					if(new Date(this.work.inputName3).valueOf()>=new Date(this.work.inputName4).valueOf()){
						alertTip('开始时间不能超过结束时间');
						return
					}
					//教育添加
					//服务名称：DDT_TC_SKILL_PROFILE_EDUCATIONADD
					fetchEducationAdd(this.skillId,this.work.inputName1,this.getEducation(this.work.education),this.work.inputName3,this.work.inputName4).then(res => {
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
								this.getEducationList()
							}	
						}else{
							alertTip(res.msg);
						}
					});
				}
			},
			//删除
			workDelete(){
				if(!this.id){
					alertTip('请传入问答id');
					return
				}
				if(this.page=='work'){
					//服务器名称 DDT_TC_SKILL_PROFILE_EDUCATIONDELETE
					fetchWorkDelete(this.id).then(res => {
						if(res.status){	
							alertTip(res.msg,()=>{
								this.isEditor=false//关闭表单
								this.isShow=false
								this.getWorkList()//删除完成后重新加载列表
							});
						}else{
							alertTip(res.msg);
						}
					});	
				}else{
					//服务器名称 DDT_TC_SKILL_PROFILE_EDUCATIONDELETE
					fetchEducationDelete(this.id).then(res => {
						if(res.status){	
							alertTip(res.msg,()=>{
								this.isEditor=false//关闭表单
								this.isShow=false
								this.getEducationList()//删除完成后重新加载列表
							});
						}else{
							alertTip(res.msg);
						}
					});
				}
			},
			//点击继续添加按钮清空表单缓存数据
			empty(){
				this.work={
					inputName1:'',//工作单位/教育机构
					placeholder1:'',//单位名称
					inputName3:'',//入职时间/开始时间
					inputName4:'',//离职时间/结束时间
					education:''//学历
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
			//时间戳转时间格式Y-M-D
			getTime(time){
				let d=new Date(parseInt(time))
				let Y = d.getFullYear();
				let Mo = d.getMonth() + 1 < 10 ? '0' + (d.getMonth() + 1) : d.getMonth() + 1;
				let D = d.getDate() < 10 ? '0' + d.getDate() : d.getDate();
				return Y + '-' + Mo + '-' + D;
			},
			//获取学历
			getEducation(education){
				let newEducation;
				//学历枚举
				switch (education) {
					case '初中及以下':
                        newEducation='middle'
					break;

					case '高中':
                        newEducation='high'
					break;

					case '中专':
                        newEducation='secondary'
					break;

					case '大专':
                        newEducation='college'
					break;

					case '本科':
                        newEducation='undergraduate'
					break;

					case '硕士及以上':
                        newEducation='graduate'
					break;

					case '其他':
                        newEducation='other'
					break;
				}
				return newEducation
			}
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
<style lang="less" scoped>
	.l_honor_list{
		li{
			border-bottom: 0.2rem solid #f5f5f5;
		}
	}
</style>