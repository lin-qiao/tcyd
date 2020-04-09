<template>
<div>
    <div class="z_logisticsItem bg_fff" v-for="(item,index) in list" :key="index">
        <div class="z_logisticsTitle">
            <p class="f30">{{JSON.parse(item.content).goodsStatus}}</p>
            <p class="f22 c_999">{{item.addTimeStr}}</p>
        </div>
        <div class="z_logisticsContent">
            <div class="z_logisticsImg">
                <img alt="" :src="JSON.parse(item.content).goodsImage">
            </div>
            <div class="z_logisticsDes">
                <p class="c_666 f26 ellipsis_clip">{{JSON.parse(item.content).goodsTitle}}</p>
                <p class="c_999 f26 mt10">运单编号：{{JSON.parse(item.content).orderNo}}</p>
            </div>
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
