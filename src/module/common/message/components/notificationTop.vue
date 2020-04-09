<template>
<div>
    <div class="z_container_bg"></div>
    <div class="z_container_btn">
        <router-link to="/inform" class="z_btnItem">
            <img src="../images/system.png" alt="">
            <p>系统通知</p>
        </router-link>
        <router-link to="/activity" class="z_btnItem">
            <img src="../images/activity.png" alt="">
            <p>精选活动</p>
        </router-link>
        <router-link to="/tradingTips" class="z_btnItem">
            <img src="../images/tradingTips.png" alt="">
            <p>交易提醒</p>
        </router-link>
        <router-link to="/hireMsg" class="z_btnItem">
            <img src="../images/commission.png" alt="">
            <p>佣金消息</p>
        </router-link>
        <router-link to="/logistics" class="z_btnItem">
            <img src="../images/logistics.png" alt="">
            <p>物流消息</p>
        </router-link>
        <a href="javascript:;" class="z_btnItem">
            <img src="../images/service.png" alt="">
            <p>在线客服</p>
        </a>
    </div>
</div>
    
</template>
<script>
export default {
    data () {
        return {

        }
    }
}
</script>
<style lang="less">
@import '../style/z_style.less';
</style>

