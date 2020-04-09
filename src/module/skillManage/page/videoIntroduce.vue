<template>
	<div class="bg_gray router_page">
		<div class="bg_fff pb20">
			<top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 编辑视频介绍'></top>
			<item-skill :skillInfo="{name:skillDetails.skillName,grade:skillDetails.integralGrade,gradeImg:skillDetails.levelImg,imgIcon:skillDetails.skillImg,time:skillDetails.addDate}"></item-skill>
			<div class="line_box"></div>
			<element-box title="视频介绍" class="border-n" :noBorder="true">
	            <p slot="content" class="f26 c_666 mt-20">您可以录制一段至少8秒的视频介绍您的技能或个人介绍</p>
	        </element-box>
	        <div class="pos_rel l_video">
	        	<img src="http://img01.dadetong.com/upload/avatar/50137_avatar_big.jpg" alt="" />
				<div class="video_play">
					<i class="iconfont icon-bofang c_fff f80"></i>
				</div>
	        </div>
	        <div class="text_center mt20 pos_rel">
				<a class="btn_border mlr10" href="javascript:void(0);">选择本地视频</a>
	        	<a class="btn_border mlr10" href="javascript:void(0);">录制视频介绍</a>
	        	
	        	<input type="file" @change="uploadVideo($event)" class="upfile_video" />
	        </div>
        </div>
    	<a class="btn_block mtb60" href="javascript:void(0);" @click="videoAdd">提交</a>
    	<com-warm-prompt :code="code" :innerHtml="prompt" class="mt60"></com-warm-prompt>
	</div>
</template>

<script>
	import itemSkill from 'src/components/item/itemSkill'
	import elementBox from 'src/components/item/itemElementBox';
	import comWarmPrompt from 'src/components/com-warm-prompt'; //温馨提示
	import { fetchUploadFile } from 'src/service/getData'
	import {
		fetchVideoAdd,//视频添加
		fetchGetSkillDetails//获取技能详情
	} from '../service/getData'
	export default{
		data(){
			return{
				skillDetails:'',//技能详情
				video:'',//视频地址
				code:"",//温馨提示code 码
				prompt:'<p>上传一段一段至少8秒的视频介绍，让您的服务更加有魅力，建议上传与技能相关的视频或个人介绍</p><p>视频中包含微信、QQ、手机号、二维码、色情内容的视频会导致技能审核无法沟通</p>',
				skillId:0
			}
		},
		components:{
			itemSkill,
			elementBox,
			comWarmPrompt
		},
		activated(){
			this.skillId=this.$route.query.skillId;//从参数获取 技能id
			this.getSkillDetails()//获取技能详情
	 	},
		methods:{
			//获取技能详情
			getSkillDetails(){
				//服务器名称 DDT_TC_MEMBER_SKILL_DETAILS
				fetchGetSkillDetails(this.skillId).then(res => {
					if(res.status==true){	
						this.skillDetails=res.data.data
					}else{
						alertTip(res.msg);
					}
				});
			},
			//视频添加
			videoAdd(){
				if(!this.video){
					alertTip('请传入视频');
					return
				}
				let param={
					skillId:this.skillId,
					video:this.video
				}
				//服务器名称 DDT_TC_SKILL_PROFILE_VIDEOADD
				fetchVideoAdd(param).then(res => {
					if(res.status==true){	
						alertTip(res.msg,()=>{
							this.$router.replace({
									path: '/skillDetail',
									query: {skillId:this.skillId}
								}
							);//跳转到技能详情
						});
					}else{
						alertTip(res.msg);
					}
				});
			},
			async uploadVideo(event) {
		      let files = event.target.files;
		      let file;
		      if (files && files.length > 0) {
		        // 获取目前上传的文件
		        file = files[0]
		        if (file.type.indexOf('video') == -1) {
		          window.alertTip('上传附件只能是视频！')
		          event.target.value = ''
		          return
		        }
		        var formData = new FormData()
		        formData.append('pathType',"tc_skill_video_path")
		        formData.append('file', file)
		        fetchUploadFile(formData).then(res => {
		          if (res && res.status) {
		            if (this.count == 1) {
		              this.$emit('input', res.data)
		            } else {
		              this.imgList.push(res.data)
		            }
		          }
		        })
		      }
		    },
		}
	}
</script>

<style lang="less" scoped>
.l_video{
	width: 6.9rem;
	height: 3.12rem;
	margin: 0 auto;
	img{
		display: block;
		width: 100%;
		height: 100%;
	}
	.video_play{
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		background: rgba(0,0,0,0.4);
		line-height: 3.12rem;
		text-align: center;
	}
}
.upfile_video{
	position: absolute;
	left: 50%;
    margin-left: -2.6rem;
    width: 2.44rem;
    height: 0.68rem;
    opacity: 0;
}
</style>