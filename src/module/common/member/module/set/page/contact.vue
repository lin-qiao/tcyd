<template>
    <div class="bg">
        <top title="联系客服" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <div class="z_set">
			<div class="z_cell_box">
                <item-cell :height="90" v-for="el in list" :key="el.id" :title="el.title" :isLink="true" :value="el.mobile" @handleClick="makePhoneCall(el.mobile)">
                    <img slot="img" :src="el.logo"/>
                </item-cell>
			</div>
		</div>
    </div>
</template>

<script>
import itemCell from 'src/components/item/itemCell';
import tcIcon from '../../wallet/images/icon_tc.png';
import zbIcon from '../../wallet/images/icon_zb.png';
import zscqIcon from '../../wallet/images/icon_zscq.png';
import wxzcIcon from '../../wallet/images/icon_wxzc.png';
import mjIcon from '../../wallet/images/icon_mj.png';
export default {
	data() {
		return {
            title: '400-846-3777',
            list: [
                {id: 1, logo: tcIcon, title: '同城', mobile: this.$store.state.telephone},
                {id: 2, logo: zbIcon, title: '众包', mobile: '400-846-3777'},
                {id: 3, logo: zscqIcon, title: '知识产权', mobile: '400-113-6999'},
                {id: 4, logo: wxzcIcon, title: '无形资产', mobile: '400-113-6999'},
                {id: 5, logo: mjIcon, title: '媒介', mobile: '400-113-6999'},
                // {id: 6, logo: '../images/z_logo.png', title: '借款', mobile: '400-080-3000'}
            ]
		}
	},
	components: {
        itemCell
	},
	activated() {
	},
	mounted(){
		
	},
	watch:{
	},
	methods: {
		makePhoneCall(mobile) {
            // var phoneNumber = mobile.split('-').join('');
            this.$confirm({
                content: mobile,
                layerImg: false,
                confirmBtn: "<a href='tel:" + mobile + "' class='c_main'>呼叫</a>",
                cancelBtn: '取消',
                confirm:()=>{
                    console.log(mobile);
                }
            })
        }
	}
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.bg{
	background: @bg_color;
}
.z_set{
    margin-top: 0.2rem;
	.z_cell_box{
		background: #fff;
	}
}
.z_content{
    padding: 0.7rem;
    i{
        font-size: 0.52rem;
        color: #a7a7a7;
    }
}
</style>
