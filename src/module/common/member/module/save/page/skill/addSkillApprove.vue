<!-- 添加证书 -->
<template lang="html">
    <div>
        <top :title="title"></top>
        <template v-for="(el,index) in certifyList">
            <skillCertificate :id="id" :index="index + 1" :data="el"></skillCertificate>
        </template>
        <skillCertificate :skillId="skillId" v-if="addVisible || !certifyList.length"></skillCertificate>
        <div class="upload_add" @click="addVisible = true"><i class="iconfont icon-jia"></i>添加新证书</div>
    </div>
</template>

<script>
import skillCertificate from '../../components/skillCertificate';
import {
    fetchSkillDetail  //技能详情
} from '../../service/getData'
export default {
    data(){
        return{
            title:'<span class="middle">同城</span><em class="title_circle mlr10">●</em><span class="middle"></span>',
            skillName:'',  //技能名称
            skillId:'',   //技能id
            id:'',  //技能认证id
            addVisible:false,//添加新证书
            certifyList:[], //证书列表
        }
    },
    activated(){
       if(this.$route.query.skillName){
           this.skillName = this.$route.query.skillName;
           this.title = '<span class="middle">同城</span><em class="title_circle mlr10">●</em><span class="middle">' + this.skillName + '</span>'
       }
       if(this.$route.query.skillId){
           this.skillId = this.$route.query.skillId;
       }
       if(this.$route.query.id){
           this.id = this.$route.query.id;
           this.getSkillDetail();
       }
    },
    methods:{
        getSkillDetail(){
            fetchSkillDetail(this.id).then(res => {
                if(res && res.status){
                    this.certifyList = JSON.parse(res.data.skillCertification.content);
                }
            })
        }
    },
    components:{
        skillCertificate
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.upload_add{
    width: 7.5rem;
    margin-left: -.3rem;
    height: 1rem;
    line-height: 1rem;
    color: @color;
    font-size: .28rem;
    text-align: center;
    i{
        font-size: .24rem;
        font-weight: bold;
        vertical-align: middle;
        margin-right: .15rem;
    }
}
</style>
