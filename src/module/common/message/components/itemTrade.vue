<template>
<div>
    <div class="z_tradeItem bg_fff" v-for="(item,index) in list" :key="index">
        <div class="z_itemTitle">
            <p class="f30">{{item.content.substring(0,item.content.indexOf(','))}}</p>
            <p class="f22 c_999">{{item.addTimeStr}}</p>
        </div>
        <div class="c_666 z_itemName ellipsis">{{item.content.substring(item.content.indexOf(',')+1)}}</div>
        <div class="c_999 z_itemFrom">{{item.bizType=='xn'?'来自无形资产':'来自同城'}}</div>
        <div class="z_itemImg">
            <img src="../images/z_logo.png" alt="" v-if="item.bizType=='tc'">
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
    mounted () {
        
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
