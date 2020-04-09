<!--弹窗-对话框-->
<template lang="html">
    <div class="layer_shadow" v-if="visible">
        <section class="layer_box">
            <div class="layer_tit" v-if="title">{{title}}</div>
            <div class="con">
                <slot></slot>
            </div>
            <div class="layer_btn inquiry_btn">
                <span class="close_btn" @click="handleClose">{{cancelText}}</span>
                <span class="confirm_btn" @click="handleConfirm">{{confrimText}}</span>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    data(){
        return{
            visible:false,
        }
    },
    props:{
        title:{
            type:String,
            default:'',
        },
        cancelText:{
            type:String,
            default:'取消',
        },
        confrimText:{
            type:String,
            default:'确定',
        }
    },
    methods:{
        show(){
            this.visible = true;    
        },
        handleClose(){
            this.visible = false;
        },
        handleConfirm(){
            this.$emit('handleConfirm')
            this.visible = false;
        }
    }
}
</script>

<style lang="less" scoped>
.con{
    width: 100%;

}
</style>
