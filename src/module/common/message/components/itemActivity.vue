<template>
<div>
    <div class="z_activityItem" v-for="(item,index) in list" :key="index">
    	<a :href="item.url">
	        <div class="z_activityImg">
	            <img :src="item.image|imgUrl" alt="">
	        </div>
	        <div class="z_activityTitle plr20">
	            <p class="f28 ellipsis">{{item.title}}</p>
	        </div>
	        <div class="f24 c_888 pt20 plr20 ellipsis z_activityDes">活动时间：{{item.startTimeMs|date('yyyy年MM月dd日')}} - {{item.endTimeMs|date('yyyy年MM月dd日')}}</div>
	    </a>
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
