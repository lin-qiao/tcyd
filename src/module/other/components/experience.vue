<template>
    <div>
        <div class="z_experience_item">
            <h2 class="f28"><i class="iconfont icon-jiaoyu f36"></i>我的优势</h2>
            <p class="f26">用户满意度是我们做事的首要信条！</p>
        </div>
        <div class="z_experience_item clearfix">
            <h2 class="f28"><i class="iconfont icon-jiaoyu f36"></i>教育经历</h2>
            <p class="f26"><span class="pull_left">山西大学</span><span class="pull_right">2010-09-01至 2014-06-30</span></p>
        </div>
        <div class="z_experience_item clearfix">
            <h2 class="f28"><i class="iconfont icon-gongzuojingli f36"></i>工作经历</h2>
            <p class="f26"><span class="pull_left">山西大德通科技有限公司</span><span class="pull_right">2010-09-01至 2014-06-30</span></p>
        </div>
        <div class="z_experience_item clearfix">
            <h2 class="f28"><i class="iconfont icon-wenti f36"></i>荣誉资质</h2>
            <p class="f26">世界模特大赛亚军</p>
            <p class="f26">杭州旅游小姐大赛冠军</p>
        </div>
        <div class="z_experience_item clearfix">
            <h2 class="f28"><i class="iconfont icon-wenti f36"></i>专业问答</h2>
            <p class="f26">最擅长的程序类型是？</p>
            <p class="f26">JAVA</p>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {

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
.z_experience_item{
    border-bottom: 1px solid @line_color;
    padding: 0.2rem 0;
    i{
        color: #ccc;
        margin-right: 0.2rem;
    }
    p{
        margin-top: 0.2rem;
    }
}
</style>
