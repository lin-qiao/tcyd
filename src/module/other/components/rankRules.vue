<template>
    <div>
        <div class="z_rank_rule clearfix">
            <span>等级</span>
            <span>图标</span>
            <span>金币段</span>
        </div>
        <div class="z_rank_rule clearfix" v-for="el in list" :key="el.id">
            <span>{{el.levelName}}</span>
            <span><img :src="el.levelImg | imgUrl" alt=""></span>
            <span class="c_333">{{el.integralMin}}~{{el.integralMax}}</span>
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
    }
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.z_rank_rule{
    width: 100%;
    height: 0.9rem;
    border-bottom: 1px solid #e8e8e8;
    padding-right: 0.3rem;
    span{
        display: block;
        float: left;
        width: 33.33%;
        height: 0.9rem;
        text-align: center;
        line-height: 0.9rem;
        font-size: 0.28rem;
        color: #666;
        i{
            font-size: 0.3rem;
			color: #fe5e50;
        }
        img{
            width: 0.6rem;
            height: 0.6rem;
            margin-top: 0.15rem;
        }
    }
}
</style>
