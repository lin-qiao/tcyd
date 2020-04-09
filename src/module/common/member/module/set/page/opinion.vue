<template>
    <div class="bg">
        <top title="意见反馈" :isReturn="false"></top>
        <!--<div class="z_top_nav swiper-container f28" id="J_topNav">
            <ul class="swiper-wrapper">
                <li class="swiper-slide" :class="{'on':bizType=='fuel'}" @click="bizType='fuel'">
                    <a href="javascript:;">油惠</a>
                </li>
                <li class="swiper-slide" :class="{'on':bizType=='group'}" @click="bizType='group'">
                    <a href="javascript:;">拼团</a>
                </li>
                <li class="swiper-slide" :class="{'on':bizType=='tc'}" @click="bizType='tc'">
                    <a href="javascript:;">同城</a>
                </li>
                <li class="swiper-slide">
                    <a href="">无形资产</a>
                </li>
                <li class="swiper-slide">
                    <a href="">优选</a>
                </li>
                <li class="swiper-slide">
                    <a href="">风投谷</a>
                </li>
                <li class="swiper-slide">
                    <a href="">定制</a>
                </li>
            </ul>
        </div>-->
        <div class="feedback_classify">
            <form-radio :list="list" type="feedback" v-model="fbType"></form-radio>
        </div>
        <div class="mt20 opinion">
            <form-text v-model="content" maxlength="150" input_placeholder="欢迎您向我们反馈使用过程中的任何意见或建议！" height="6"></form-text>
        </div>
        <div class="z_upload">
            <upload-img :pathType="pathType" :imgList="imgList" count="3"></upload-img>
        </div>
        <div class="z_mobile">
            <input type="text" class="f26" placeholder="请输入您的手机/QQ" v-model="mobileOrQQ">
        </div>
        <div class="z_submit">
			<a class="btn_block" href="javascript:;" @click="submitFeedback">提交</a>
		</div>
    </div>
</template>

<script>
import formRadio from 'src/components/formItem/formRadio';
import formText from 'src/components/formItem/formTextarea';
import uploadImg from 'src/components/uploads/uploadImg';
import formInput from 'src/components/formItem/formInput';
import {submitFeedback} from '../service/getData';
import {REGEX} from 'src/config/env'
export default {
    data () {
        return {
            list: [
                {id: '功能建议',name: '功能建议'},
                {id: '系统故障',name: '系统故障'},
                {id: '订单问题',name: '订单问题'},
                {id: '商品配送',name: '商品配送'},
                {id: '商品质量',name: '商品质量'},
                {id: '其他',name: '其他'}
            ],
            content: '',
            bizType: 'tc',
            mobileOrQQ: '',
            imgList: [],
            fbType: '',
            pathType: 'upload_path'
        }
    },
    components: {
        formRadio,
        formText,
        uploadImg,
        formInput
	},
	deactivated(){
        this.$destroy();	
    },
	mounted(){
        // this.$nextTick(() => {
        //     var mySwiper = new Swiper('#J_topNav', {
        //         freeMode: true,
        //         slidesPerView: 'auto',
        //     });
        // })
	},
	watch:{
	},
	methods: {
		submitFeedback() {
			if(!this.fbType){
				alertTip('请选择反馈类型！');
				return;
			}
			if(!this.content){
				alertTip('反馈内容不能为空！');
				return;
			}
			if(REGEX.noHtml.regex.test(this.content)){
				alertTip('反馈内容不能包含特殊字符！');
				return;
			}
            let para = {
                bizType: this.bizType,
                content: this.content,
                mobileOrQQ: this.mobileOrQQ,
                imgUrl: this.imgList ? this.imgList.join(',') : '',
                fbType: this.fbType
            };
            submitFeedback(para).then(res => {
                if (res.status) {
                    alertTip(res.msg);
                    this.$router.go(-1);
                }
            })
        }
	}
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
    background: #f5f5f5;
}
.z_top_nav{
    padding: 0 0.3rem;
    background: #fff;
    margin-top: 0.2rem;
    border-bottom: 1px solid #e8e8e8;
    .swiper-slide{
        width: auto;
    }
    li{
        height: 0.8rem;
        line-height: 0.8rem;
        display: inline-block;
        margin-right: 0.45rem;
    }
    .on{
        color: #ff4b48;
        border-bottom: 2px solid #ff4b48;
    }
}
.feedback_classify{
    padding: 0.3rem;
    background: #fff;
}
.opinion{
    padding: 0.3rem;
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
}
.z_upload{
    background: #fff;
    border-bottom: 1px solid #e8e8e8;
}
.z_mobile{
    background: #fff;
    height: 0.9rem;
    padding-left: 0.3rem;
    input{
        height: 100%;
        line-height: 0.9rem;
        width: 100%;
    }
}
.z_submit{
    padding: 0.6rem 0.7rem;
}
</style>
