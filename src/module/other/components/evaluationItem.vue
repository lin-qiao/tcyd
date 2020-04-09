<template>
<div>
    <div class="z_evaluation_all" v-for="el in list" :key="el.id">
        <div class="z_head">
            <img :src="el.headPhoto|imgUrl" alt="">
            <p>{{el.nickname}}</p>
        </div>
        <p class="f24 c_666 mt20">{{el.addTimeStr}}<span class="ml50">态度：{{el.workingAttitude}}</span><span class="ml20">准确：{{el.workAccuracy}}</span><span class="ml20">技能：{{el.workAbility}}</span></p>
        <p class="f26 c_333 mt20 z_des">{{el.content}}</p>
    </div>
</div>
</template>
<script>
export default {
    data () {
        return {

        }
    },
    props: {
        list: {
            type: Array,
            default: []
        }
    },
    mounted () {

    },
    methods: {

    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.z_evaluation_all{
    padding: 0.25rem 0.3rem;
    background: #fff;
    .border-b;
    .z_head{
        display: flex;
        align-items: center;
        img{
            width: 0.67rem;
            height: 0.67rem;
            border-radius: 50%;
            margin-right: 0.2rem;
        }
        p{
            font-size: 0.29rem;
            color: #000;
        }
    }
    .z_des{
        line-height: 1.8;
    }
}
</style>
