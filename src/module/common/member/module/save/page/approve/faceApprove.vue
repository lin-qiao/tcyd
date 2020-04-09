<!-- 人脸识别 -->
<template lang="html">
    <div class="face_approve">
        <top title="人脸识别" :isReturn="false"></top>
        <div class="tip">身份证信息已确定，请进行人脸识别</div>
        <div class="approve_info">
            <div class="img">
                <img :src="info.idCardFrontSide | imgUrl" alt="">
            </div>
            <div class="info">
                <div class="info_item">
                    <span class="name">姓名</span>
                    <span class="con">{{info.realName}}</span>
                </div>
                <div class="info_item">
                    <span class="name">身份证号</span>
                    <span class="con">{{info.cardNo}}</span>
                </div>
            </div>
        </div>
        <div class="tit plr30 f26">人脸识别</div>
        <div class="btn_wrap" v-if="info.checkStatus != 'live_pass'">
            <div class="btn_block" @click="start">开始</div>
        </div>
        <div class="layer_shadow" v-if="visible">
            <section class="layer_box">
                <i class="iconfont icon-close1" @click="visible = false"></i>
                <img src="~src/images/ico_2.png" alt="">
                <p class="ptb45 f30 text_center">请先进行身份证认证</p>
                <div class="layer_btn">
                    <div class="btn max">立即认证</div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import {
    fetchN
} from 'src/config/fetch';
import {
    mapState
} from 'vuex';
import {
    fetchGetmemberbyucid,  //查询认证信息
    fetchSaveLiveimgInfo, //活体实名认证
} from '../../service/getData';
import { fetchUploadFile } from 'src/service/getData'; //上传图片
import {
    getStore,
    setStore,
    removeStore
} from 'src/config/mUtils';
export default {
    data() {
        return {
            visible:false,
            info:{}, //实名认证信息
        }
    },
    computed: {
        ...mapState([
            'api_key',
            'api_secret',
            'return_url',
            'notify_url'
        ])
    },
    activated(){
        this.getIdcardInfo();
        this.getResult();
    },
    methods: {
        //查询认证信息
        getIdcardInfo(){
            fetchGetmemberbyucid().then(res => {
                if(res && res.status){
                    this.info = res.data.memberRealName;
                    if(!this.info.checkStatus){
                        this.visible = true;
                        return;
                    }
                }
            })
        },
        //获取token
        start() {
            if(!this.info.checkStatus){
                this.visible = true;
                return;
            }
            let obj = {
                return_url: window.location.origin + '/faceApprove',
                biz_no: this.info.ucid,
                comparison_type: '1',
                idcard_mode: '0',
                idcard_name: this.info.realName,
                idcard_number: this.info.cardNo,
            }

            fetchN('POST', '/tc/member/faceid/getToken', obj).then(res => {
                if(!res.status){
                    alertTip(res.msg);
                    return;
                }
                let data = JSON.parse(res.data);
                if (data.error_message) {
                    alertTip(data.error_message);
                    return;
                }
                setStore('biz_id' ,data.biz_id);
                window.location.href = 'https://api.megvii.com/faceid/lite/do?token=' + data.token;
            })

        },
        //查询活体检测信息
        getResult(){
            if(!getStore('biz_id')){
                return;
            }
            const obj = {
                biz_id:getStore('biz_id'),
                return_image:'1'
            }
            fetchN('GET','/tc/member/faceid/getResult', obj).then(res => {
                if(!res.status){
                    alertTip(res.msg);
                    return;
                }
                let data = JSON.parse(res.data);
                if(data.error_message){
                    alertTip(data.error_message);
                    return;
                }
                // NOT_STARTED 未开始 PROCESSING 认证中
                if(data.status == 'NOT_STARTED'){
                    alertTip('请先调用do方法');
                    return;
                }
                if(data.status == 'PROCESSING'){
                    alertTip('正在进行人脸识别中...');
                    return;
                }
                if(data.status == 'CANCELLED'){
                    alertTip('您已经取消了活体认证');
                    removeStore('biz_id');
                    return;
                }
                if(data.status == 'FAILED'){
                    alertTip('活体认证流程未完成或超时');
                    removeStore('biz_id');
                    return;
                }
                if(data.status == 'TIMEOUT'){
                    alertTip('活体认证流程超时');
                    removeStore('biz_id');
                    return;
                }
                //status状态等于ok的时候走下面
                //活体认证失败，提示失败原因
                if(data.liveness_result.result == 'FAIL'){
                    //人脸对比结果有错误信息，展示错误信息
                    if(data.verify_result.error_message){
                        let message = '';
                        switch (data.verify_result.error_message) {
                            case 'NO_SUCH_ID_NUMBER':
                                message = '数据源中没有此身份证号码的记录';
                                break;
                            case 'ID_NUMBER_NAME_NOT_MATCH':
                                message = '身份信息与人脸识别信息不符<br />请重新认证'
                                break;
                            case 'IMAGE_ERROR_UNSUPPORTED_FORMAT: data_source':
                                message = '数据源没有和身份信息相匹配的照片<br />请重新认证'
                                break;
                        }
                        this.$alert({
                            layerImg:require('src/images/lay_bell.png'),
                            content:message
                        })
                    }
                    removeStore('biz_id');

                }
                //活体认证通过
                else if(data.liveness_result.result == 'PASS'){

                    //base64转文件流
                    let uploadFile = this.convertBase64UrlToBlob(data.images.image_best);
                    //上传活体照片
                    this.uploadImg(uploadFile);
                }
            })
        },
        /// base64转Blob对象
    	convertBase64UrlToBlob(urlData){
            var arr = urlData.split(','), mime = arr[0].match(/:(.*?);/)[1],
    			bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    		while(n--){
    			u8arr[n] = bstr.charCodeAt(n);
    		}
    		return new Blob([u8arr], {type:mime});
    	},
        //图片上传
        uploadImg(file){
            var formData = new FormData()
            formData.append('pathType', 'member_auth_img_path')
            formData.append('file', file, "file_"+Date.parse(new Date())+".jpg")
            fetchUploadFile(formData).then(res => {
                if(res && res.data){
                    this.saveLiveInfo(res.data);
                }
            })
        },
        //修改活体认证状态
        saveLiveInfo(img){
            let obj = {
                realName:this.info.realName,
                cardNo:this.info.cardNo,
                liveImg:img
            };
            fetchSaveLiveimgInfo(obj).then(res => {
                if(res && res.status){
                    this.$alert({
                        layerImg:require('src/images/winIcon1.png'),
                        content:'恭喜您，活体认证通过',
                        showClose:false,
                        confirm:()=> {
                            this.$router.replace('/save');
                        }
                    })
                    removeStore('biz_id');
                }
            })
        }
    }
}
</script>

<style lang="less" scoped>
.face_approve {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background: #f5f5f5;
}
.tip {
    height: 0.8rem;
    line-height: 0.8rem;
    padding: 0 0.3rem;
    background: #fef5e4;
    color: #ffa516;
    font-size: 0.24rem;
}
.tit {
    height: 0.88rem;
    line-height: 0.88rem;
    background: #fff;
}
.approve_info {
    display: flex;
    align-items: center;
    padding: 0 0.3rem;
    border-bottom: 0.2rem solid #f5f5f5;
    background: #fff;
    .img {
        width: 1.2rem;
        height: 1.2rem;
        margin-right: 0.3rem;
            overflow: hidden;
        img {
            display: block;
            max-width: 100px;
        }
    }
    .info {
        flex: 1;
    }
    .info_item {
        display: flex;
        height: 1rem;
        line-height: 1rem;
        &:first-child {
            border-bottom: 1px solid #e5e5e5;
        }
        span {
            height: 100%;
            font-size: 0.26rem;
        }
        .name {
            width: 1.5rem;
            color: #666;
        }
        .con {
            flex: 1;
        }
    }
}
.layer_box{
    padding-top: .7rem;
    img{
        width: 1.44rem;
        height: 1.9rem;
    }
    p{
        line-height: 2;
    }
    .layer_btn{
        justify-content: center;
    }
    .max{
        width: 3.4rem;
    }
    .min{
        width: 2.25rem;
    }

}
</style>
