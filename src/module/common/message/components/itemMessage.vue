<template>
<div>
    <div class="z_messageItem" v-for="(item,index) in list" :key="index">
        <div class="z_messageImg">
            <img src="../images/z_avatar.png" alt="">
            <img src="../images/z_vip.png" alt="" class="z_vip">
        </div>
        <div class="z_messageDes">
            <div class="z_messageTitle">
                <p class="f28">快乐的猫<span>羽毛球</span></p>
                <p class="f24 c_999">2018-06-04 09:12</p>
            </div>
            <div class="f26 c_666 ellipsis mt20">我对您的订单很感兴趣，期待您的回复...</div>
        </div>
    </div>
</div>

</template>
<script>
export default {
    data () {
        return {
        }
    },
    components: {

    },
    props: {
        list: {
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="less">
@import '../style/z_style.less';
</style>
