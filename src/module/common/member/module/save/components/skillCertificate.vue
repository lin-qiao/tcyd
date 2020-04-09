<template lang="html">
    <div class="form">
        <formInput
            v-model="name"
            title="证书名称"
            placeholder="该证书名称会展示给用户">
        </formInput>
        <div class="upload_img">
            <div class="tit">需要上传导游资格证/营业执照/许可证/工作中名片/毕业证/ 学生证或者相关资格证/培训证/荣誉证等</div>
            <div class="upload_item">
                <div class="upload_wrap">
                    <uploadImg
                        type=""
                        v-model="img"
                        class="plr0"
                        count="1"
                        :onTip="false"
                        pathType="member_auth_img_path">
                    </uploadImg>
                    <div class="tips">请上传证书照片（需包含证书名称和本人姓名）</div>
                    <div class="btn" @click="confirm">提交</div>
                </div>
                <div class="remove" v-if="id" @click="remove">移除</div>
            </div>
        </div>
    </div>
</template>

<script>
import formInput from 'src/components/formItem/formInput';
import uploadImg from 'src/components/uploads/uploadImg';
import {
    fetchAddSkill,   //添加证书
    fetchUpdateSkill, //证书修改
    fetchDeleteSkill //证书移除
}from '../service/getData'
export default {
    data(){
        return{
            name:'',
            img:'',
        }
    },
    props:{
        data:{   //证书数据
            type:Object,
            default(){
                return{
                    name:'',
                    img:''
                }
            }
        },
        id:{    //技能认证id
            default:0
        },
        index:{  //第几个证书
            default:0
        },
        skillId:{  //技能id
            default:''
        }
    },
    mounted(){
        if(this.data.name){
            this.name = this.data.name;
        }
        if(this.data.img){
            this.img = this.data.img;
        }
    },
    methods:{
        confirm(){
            // 传过来id，走修改
            if(this.id){
                this.update();
            }else{
                //没id,走添加
                this.add();
            }
        },
        // 添加证书
        add(){
            if(this.skillId == ''){
                alertTip('请先选择技能');
                this.$router.replace('/skillApprove');
                return;
            }
            if(this.name == ''){
                alertTip('请输入证书名称');
                return;
            }
            if(this.img == ''){
                alertTip('请上传证书照片');
                return;
            }
            fetchAddSkill(this.skillId,this.name,this.img).then(res => {
                if(res && res.status){
                    alertTip(res.msg);
                    this.$parent.getSkillDetail();
                    this.$parent.addVisible = false;
                }
            })
        },
        update(){
            if(this.name == ''){
                alertTip('请输入证书名称');
                return;
            }
            if(this.img == ''){
                alertTip('请上传证书照片');
                return;
            }
            fetchUpdateSkill(this.id,this.name,this.img,this.index).then(res => {
                if(res && res.status){
                    alertTip(res.msg);
                    this.$parent.getSkillDetail();
                }
            })
        },
        remove(){
            this.$confirm({
                content:'您确定要删除该证书吗？',
                confirm:()=>{
                    fetchDeleteSkill(this.id,this.index).then(res => {
                        if(res && res.status){
                            alertTip(res.msg);
                            this.$parent.getSkillDetail();
                        }
                    })
                }
            })
        }
    },
    components:{
        formInput,
        uploadImg
    },
    watch:{
        data:{
            handler(data) {
                if(data.name){
                    this.name = data.name;
                }
                if(data.img){
                    this.img = data.img;
                }
            },
            deep: true
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.upload_img{
    width: 7.2rem;
    margin-left: .3rem;
    padding-top: .3rem;
    .upload_wrap{
        position: relative;
        .border-b(@line_color);
        padding-bottom: .3rem;
        padding-right: .3rem;
    }
    .tit{
        font-size: .26rem;
        line-height: .38rem;
        color: #666;
        padding-right: .3rem;
    }
    .tips{
        color: #888;
    }
    .btn{
        padding: .1rem .4rem;
        position: absolute !important;
        right: .3rem;
        bottom: .3rem;
    }
    .remove{
        width: 7.5rem;
        margin-left: -.3rem;
        padding: 0 .3rem;
        height: 1rem;
        line-height: .8rem;
        font-size: .28rem;
        color: @color;
        border-bottom: .2rem solid @bg_color;
    }
}
</style>
