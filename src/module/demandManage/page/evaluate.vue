<template>
	<div>
		<top title='同城  <span class="title_circle">●</span> 发表评价' :isReturn="false"></top>
		<div class="hei20 bg_gray"></div>
		<div class="c_eveluate_box">
			<div class="c_eveluateStar">
		    	<div class="c_Star">
		    		<span class="f30">工作准确度</span>
		    		<i class="iconfont icon-pingfen c_main" v-for="v in accuracy" @click="accuracy=v">
		    		</i><i class="iconfont icon-pingfen" v-for="v in 5-accuracy" @click="accuracy=(accuracy+v)"></i>
		    	</div>
		    	<div class="c_Star">
		    		<span class="f30">工作技能</span>
		    		<i class="iconfont icon-pingfen c_main" v-for="v in skill" @click="skill=v"></i>
		    		<i class="iconfont icon-pingfen" v-for="v in 5-skill" @click="skill=(skill+v)"></i>
		    	</div>
		    	<div class="c_Star">
		    		<span class="f30">工作态度</span>
		    		<i class="iconfont icon-pingfen c_main" v-for="v in attitude" @click="attitude=v"></i>
		    		<i class="iconfont icon-pingfen" v-for="v in 5-attitude" @click="attitude=(attitude+v)"></i>
		    	</div>
		    </div>
		    <div class="c_eveluate_label">
				<div class="c_eveluate_title"><span>给Ta点个赞</span></div>
				<formCheckbox :list="list" v-model="keyWord" column="2"></formCheckbox>
			</div>
			<formTextarea maxlength="200" v-model="content" input_placeholder="有什么补充或者其它想说的~" class="c_gray_textarea"></formTextarea>
		    <div class="c_eveluate_anonymity">
		    	<i class="iconfont icon-choosehandle mr20 f40" :class="{c_main:agree}" @click="agree=!agree"></i>匿名评价
		    	<!--<p>评价有机会获得1元现金，7日内未评价系统默认好评</p>-->
		    	<a href="javascript:void(0);" class="btn_block mt60" @click="toFeedBack">提交评价</a>
		    </div>
		</div>
	</div>
</template>

<script>
	import formTextarea from 'src/components/formItem/formTextarea'//textarea文本框
	import formCheckbox from 'src/components/formItem/formCheckbox'//多选
	//发布评价 
	import {fetchRequireFeedback} from '../service/getData'//需求详情
	//根据code 获取   常用 评价 印象关键词
	import {fetchDictionapyList} from 'src/service/getData'//需求详情
	import {REGEX} from 'src/config/env'
	
export default {
	data() {
		return {
				orderSn:"",//订单号
		    	accuracy: 0, 	//工作准确度
				skill: 0, //工作技能
				attitude: 0,//工作态度
				list:[//评语列表
				    {id:1,name:'熟悉工商法则'},
				    {id:2,name:'办理流程了如指掌'},
				    {id:3,name:'细致耐心'},
				    {id:4,name:'效率高'},
				    {id:5,name:'业务熟练'},
				    {id:6,name:'办理经验丰富'},
				    {id:7,name:'费用合理'},
				    {id:8,name:'服务周到'}
				],
				keyWord:[],
				content:"",
				agree:true//是否同意匿名
		}
	},
	components:{
		formTextarea,
		formCheckbox
	},
	methods:{
		toFeedBack:async function(){//
			if(!this.accuracy){
				alertTip("请评价工作准确度");
				return;
			}
			if(!this.skill){
				alertTip("请评价工作技能");
				return;
			}
			if(!this.attitude){
				alertTip("请评价工作态度");
				return;
			}
			if(!this.content){
				alertTip('评价内容不能为空！');
				return;
			}
			if(!this.keyWord.length){
				alertTip('请选择评价印象！');
				return;
			}
			if(REGEX.noHtml.regex.test(this.content)){
				alertTip('评价内容不能包含特殊字符！');
				return;
			}
			//数组过滤器
//			let accounimpression= this.list.filter((item,index)=>{
//				return this.keyWord.indexOf(item.id)>-1 
//			});
			let accounimpression=[];//用户印象 name 数字， 最后 toString 转成字符传传递参数
			//循环拼接  印象 字符串
			for(let i=0,len=this.list.length;i<len;i++){
				let item=this.list[i];
				if(this.keyWord.indexOf(item.id)>-1){
					accounimpression.push(item.name)
				}
			}
			let param={
			 	orderSn:this.orderSn,//	订单流水号
				workAccuracy:this.accuracy.toString(),//  {String} 工作准确度
			 	workAbility:this.skill.toString(),//  {String}	工作技能
			 	workingAttitude:this.attitude.toString(),//  {String}	工作态度
			 	impression:accounimpression.toString(),//  {String}	印象
			 	evaluationComment:this.content, // {String}	评价内容
			    isAnonymous:this.agree?"Y":"N"  //{String}	是否匿名评价
			}
			let res=await fetchRequireFeedback(param)
			if(res&&res.status){
				alertTip("评价成功！",()=>{
					 this.$router.go(-1);
				})
			}
		}
	},
	activated(){
		this.accuracy = 0; 	//工作准确度
		this.skill = 0; 	//工作技能
		this.attitude = 0; 	//工作态度
		this.keyWord = [];
		this.content = '';
		this.agree = true;//是否同意匿名
		this.orderSn=this.$route.query.orderSn;
	},
	mounted(){
		//请求常用评价关键词
		fetchDictionapyList("TCDDPJYXBQ").then((res)=>{
			if(res.status){
				this.list=res.data.list;	
			}
		})		
	}
	
}
</script>
<style lang="less" scoped>
@import '../style/demand.less';
.c_gray_textarea{
	border:1px solid #eee;
	margin:0.3rem 0;
	padding:0.1rem;
}
</style>
