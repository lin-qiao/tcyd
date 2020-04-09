<!--记录-->
<template lang="html">
    <div v-show="visible" class="layer_shadow">
        <section class="layer_box">
            <div class="layer_tit">充值明细</div>
            <i class="iconfont icon-close1" @click="handleClose"></i>
            <ul class="c_recharge_record">
            	<li><span>充值金额(元)</span><span>到账时间</span></li>
            	<li><span>100（1/6）</span><span>当日购买后24小时内</span></li>
            	<li><span>100（2/6）</span><span>2018年08月29日</span></li>
            	<li><span>100（3/6）</span><span>2018年08月29日</span></li>
            	<li><span>100（4/6）</span><span>2018年08月29日</span></li>
            	<li><span>100（5/6）</span><span>2018年08月29日</span></li>
            	<li><span>100（6/6）</span><span>2018年08月29日</span></li>
            </ul>
        </section>
    </div>
</template>

<script>
export default {
    data() {
		return {
        	visible:false,//是否展示弹窗
		}
	},
	props: {
        title: {        //标题
            type:String,
            default: ''
        },
    },
	methods: {
		show() {
            this.visible = true;
        },
        handleClose() {
            this.visible = false;
        }
	},
	watch:{
		
  	}
}</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.c_recharge_record{
	width:100%;
	li{
		height:0.8rem;
		display: flex;
		align-items: center;
		justify-content: space-around;
		font-size:0.26rem;
		color:#333;
	}
	li:nth-child(2n){
		.bg_gray;
	}
}
</style>
