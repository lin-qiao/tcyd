<!--弹窗-询问框-->
<template>
    <div v-show="visible" class="layer_shadow" id="J_layer_confirm">
        <section class="layer_box">
            <div class="layer_tit" v-if="title">
                {{title}}
            </div>
            <i class="iconfont icon-close1" @click="handleClose" v-if="showClose"></i>
            <img class="layer_img" :src="layerImg" v-if="layerImg" :class='{"mt30":!title}' />
            <div class="layer_con" v-html="content" :class="{'mb30':!layerImg}"></div>
            <div class="layer_btn inquiry_btn" v-if="type == 'confirm'">
                <span class="close_btn" @click="handleCancel" v-html="cancelBtn"></span>
                <span class="confirm_btn" :class="{'c_oil':isCharge}" @click="handleConfirm" v-html="confirmBtn"></span>
            </div>
            <div class="layer_btn inquiry_btn" v-if="type == 'alert'">
                <span class="confirm_btn" :class="{'c_oil':isCharge}" @click="handleConfirm" v-html="confirmBtn"></span>
            </div>
        </section>
    </div>
</template>

<script>
import layerImg from 'src/images/noreal.png';//实名认证图片
export default {
    data() {
        return {
            visible: false,   //弹窗显示
        }
    },
    mounted() {

    },
    props: {
        type: { // 可以有alert, 和confirm两个类型
            type: String,
            default: 'confirm',
            validator(value) {
                return value === 'confirm' || value === 'alert';
            },
        },
        title: {        //标题
            type:String,
            default: ''
        },
        content:{      //内容
            type:String,
            default:''
        },
        layerImg: { //小图
            default: layerImg
        },
        confirmBtn: {    //提交按钮文字
            default: '确定'
        },
        cancelBtn: {    //取消按钮文字
            default: '取消'
        },
        showClose:{  //关闭按钮显示
            default:true
        },
        confirm:{
            type:Function,
            default:() => {}
        },
        close:{
            type:Function,
            default:() => {}
        },
        cancel:{
            type:Function,
            default:() => {}
        },
        isCharge:{
        	 default:false
        }
    },
    methods: {
        show() {
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
            this.close();
        },
        handleCancel(){
            this.visible = false;
            this.cancel();
        },
        handleConfirm() {
            this.visible = false;
            this.confirm();
        }
    }
}
</script>

<style lang="less" scoped>
@import '~src/style/layer';
</style>
