<template>
	<div class="bg_gray router_page">
		<div class="bg_fff">
			<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 专业问答'></top>
			<item-skill :skillInfo="skillInfo"></item-skill>
			<div class="line_box"></div>
			<!--S 表单-->
			<div v-show="isEditor">
				<element-box title="专业问答" class="border-n l_honor">
		            <p slot="title" class="f26 c_666 ml40">添加一个或多个技能相关的问答</p>
		        </element-box>
				<form-select title="问答" placeholder="请选择问答" :list="questionList" v-model="questionInfo.question"></form-select>
	        	<form-textarea class="plr30" height="3" title="回答" maxlength="400" input_placeholder="详细描述您擅长的聊天的haute，您的个人风格。（为了防止受到干扰，请不要泄露手机号、微信等联系方式）" v-model="questionInfo.answer"></form-textarea>
			</div>
			<!--E 表单-->
			<!--S 列表-->
			<div v-show="!isEditor">
				<ul class="l_honor_list">
					<li class="pl30 pr40 ptb20 flex flex_center justify_between" v-for="el in answerList">
						<div class="f28 word_break">
							<p class="mb10">{{el.question}}</p>
							<p class="c_666">{{el.answer}}</p>
						</div>
						<i class="iconfont icon-edit f60 c_main ml50" @click="isEditor=true,isShow=true,getAskDetail(el.id)"></i>
					</li>
				</ul>
			</div>
			<!--E 列表-->
        </div>
    	<a class="btn_block mtb60" v-show="isEditor&&!isShow" href="javascript:void(0);" @click="answerAdd()">提交</a>
		<a class="btn_block mtb60" v-show="!isEditor" href="javascript:void(0);" @click="isEditor=true,empty()">继续添加</a>
		<div class="mtb60 c_edit_delete" v-show="isShow">
    		<a class="btn_border c_edit_btn" href="javascript:void(0);" @click="answerDelete()">删除</a>
    	    <a class="btn c_edit_btn" href="javascript:void(0);" @click="answerUpdate()">保存</a>
    	</div>
	</div>
</template>

<script>
	import itemSkill from 'src/components/item/itemSkill'
	import elementBox from 'src/components/item/itemElementBox';
	import formSelect from 'src/components/formItem/formSelect';
	import formTextarea from 'src/components/formItem/formTextarea';
	import {
		fetchGetQuestionList,//获取问题列表
		fetchAnswerAdd,//问题回答添加
		fetchAnswerUpdate,//问题回答修改
		fetchAnswerDelete,//问题回答删除
		fetchGetAnswerList,//获取技能问答列表
		fetchGetAskDetail,//获取问答详情
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
				answerList:'',//问答列表
				skillId:'',//技能ID
				questionList:[],//问题列表
				skillDetails:'',//技能详情
				skillInfo:{
					name:'',
					grade:'',
					gradeImg:'',
					imgIcon:'',
					time:''
				},//技能名称、技能等级、技能图片等信息
				questionInfo:{
					question:'',//问题
					answer:''//回答
				}
			}
		},
		components:{
			itemSkill,
			elementBox,
			formSelect,
			formTextarea
		},
		activated(){
			this.isShow=false//是否显示删除按钮
			this.skillId=this.$route.query.skillId//技能id
			this.url=this.$route.query.url//传递来的url
			this.getQuestionList()//获取问题列表
			this.getSkillDetails()//获取技能详情
			this.getAnswerList()//获取技能问答列表
	 	},
		methods:{
			//获取技能问答列表
			getAnswerList(){
				fetchGetAnswerList(this.skillId).then(res => {
					if(res.status){
						//有数据展示列表，无数据展示表单
						if(res.data.list.length==0){
							this.isEditor=true
							this.questionInfo={
								answer:''//回答
							}
						}else{
							this.isEditor=false
						}
						this.answerList=res.data.list//问答列表
					}else{
						alertTip(res.msg)
					}
				});
			},
			//获取技能问答详情
			getAskDetail(id){
				this.id=id//当前问答ID
				fetchGetAskDetail(id).then(res => {
					if(res.status){
						this.questionInfo.question=res.data.skillAnswerVo.question//问题
						this.questionInfo.answer=res.data.skillAnswerVo.answer//答案
					}else{
						alertTip(res.msg);
					}
				});
			},
			//获取问题列表
			getQuestionList(){
				fetchGetQuestionList(this.skillId).then(res => {
					if(res.status){
						for(let i=0,len=res.data.list.length;i<len;i++){
							this.questionList.push(res.data.list[i].question)//问题列表
						}
					}else{
						alertTip(res.msg)
					}
				});
			},
			//问题回答添加
			answerAdd(){
				if(!this.questionInfo.question){
					alertTip('请选择问题')
					return
				}
				if(!this.questionInfo.answer){
					alertTip('请输入问题对应的回答')
					return
				}
				if(REGEX.noHtml.regex.test(this.questionInfo.answer)){
					alertTip('问题回答不能包含敏感字符！');
					return;
				}
				//问答添加
				fetchAnswerAdd(this.skillId,this.questionInfo.question,this.questionInfo.answer).then(res => {
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
							this.getAnswerList()//修改完成后重新加载列表
						}
					}else{
						alertTip(res.msg)
					}
				});
			},
			//问答修改
			answerUpdate(){
				if(!this.questionInfo.question){
					alertTip('请选择问题')
					return
				}
				if(!this.questionInfo.answer){
					alertTip('请输入问题对应的回答')
					return
				}
				fetchAnswerUpdate(this.id,this.questionInfo.question,this.questionInfo.answer).then(res => {
					if(res.status){
						this.isEditor=false//关闭表单
						this.isShow=false
						this.getAnswerList()//修改完成后重新加载列表
					}else{
						alertTip(res.msg);
					}
				});	
			},
			//问答删除
			answerDelete(){
				if(!this.id){
					alertTip('请传入问答id');
					return
				}
				//服务器名称 DDT_TC_SKILL_PROFILE_EDUCATIONDELETE
				fetchAnswerDelete(this.id).then(res => {
					if(res.status){	
						alertTip(res.msg,()=>{
							this.isEditor=false//关闭表单
							this.isShow=false
							this.getAnswerList()//删除完成后重新加载列表
						});
					}else{
						alertTip(res.msg);
					}
				});
			},
			//点击继续添加按钮清空表单缓存数据
			empty(){
				this.questionInfo={
					question:'',//问题
					answer:''//回答
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
</style>
<style lang="less" scoped>
.word_break{
	word-break: break-all;
}
.l_honor_list{
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