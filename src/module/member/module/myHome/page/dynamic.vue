<template>
    <div class="router_page bg_gray">
        <top :isReturn="false" title='同城  <span	 class="title_circle">●</span> 发布动态'></top>
        <message text="请勿发布黄赌毒类低俗隐晦内容，为了防止收到干扰，请不要泄露"></message>
        <div class="dynamic_classify">
            <h2 class="f28 pb20">选择关联技能<i class="iconfont icon-wenhao f30 ml10 c_666" @click="dynamicExplain"></i></h2>
            <form-radio :list="skillList" type="skillList" v-model="skillList.id" :defaultProps="skillObject" column="4"></form-radio>
        </div>
        <!-- S 发布动态文字输入框 -->
        <div class="mt20 opinion">
            <form-text v-model="content" maxlength="400" input_placeholder="请输入这一刻的想法" height="6"></form-text>
        </div>
        <!-- E 发布动态文字输入框 -->
        <!-- S 上传图片 -->
        <div class="z_upload">
            <upload-img :imgList="imgList" :pathType="pathType" count="6" :isRedpacket="false"></upload-img>
        </div>
        <!-- E 上传图片 -->
        <div class="dynamic_btn">
            <a class="btn_block" href="javascript:;" @click="publishDynamic">发布</a>
        </div>
    </div>
</template>
<script>
import formRadio from 'src/components/formItem/formRadio';
import formText from 'src/components/formItem/formTextarea';
import uploadImg from 'src/components/uploads/uploadImg';
import message from 'src/components/notice/message';
import {
    dynamicAdd, //发布动态
    dynamicSkill //技能列表
} from '../service/getData';
import {REGEX} from 'src/config/env'
export default {
    data () {
        return {
            skillList: [],
            content: '',
            imgList: [],
            skillObject: {
                id: 'id',
                name: 'skillText'
            },
            pathType: 'upload_path'
        }
    },
    components: {
        formRadio,
        formText,
        uploadImg,
        message
    },
    mounted () {
        this.getSkillList(); //获取技能列表
    },
    methods: {
    	dynamicExplain(){
			this.$alert({
				layerImg:'',
				content:'<div class="pt50">关联您发布的技能，有利于TA通过对您的感兴趣的动态直接约您。</div>',
				confirmBtn:'我知道了'
			})
		},
        //获取技能列表
        getSkillList () {
            dynamicSkill().then(res => {
                if (res.status) {
                    this.skillList = res.data.list;
                }
            })
        },
        //发布动态
        publishDynamic () {
        	if(this.content&&REGEX.noHtml.regex.test(this.content)){
        		alertTip('动态描述不能包含敏感字符！');
			    return;
        	}
            let para = {
                title: this.content,
                fileType: '1',
                filePuth: this.imgList ? this.imgList.join(',') : '',
                skillId: this.skillList.id
            };
            dynamicAdd(para).then(res => {
                if (res.status) {
                    alertTip(res.msg);
                    this.$router.push('/index');
                }
            })
        }
    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.opinion{
    padding: 0.3rem;
    background: #fff;
    border-bottom: 1px solid #f2f2f2;
}
.bg{
	background: @bg_color;
}
.dynamic_classify{
    padding: 0.3rem;
    background: #fff;
}
.z_upload{
    background: #fff;
    margin-bottom: 1.2rem;
}
.dynamic_btn{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    padding: 0.2rem 0.66rem;
    background: #fff;
    border-top: 1px solid #eaeaea;
}
</style>
