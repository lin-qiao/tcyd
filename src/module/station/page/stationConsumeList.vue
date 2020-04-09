<template>
    <div class="router_page bg_gray">
        <top title="入驻记录" :isReturn="false"></top>
        <div class="station_title f28">
            <span>购买等级</span>
            <span>金额(元)</span>
        </div>
        <!-- S 消费明细列表 -->
        <div class="station_consume">
            <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :autoFill="false" ref="loadmore">
                <item-cell :title="el.partnerName" :height="143" :subtitle="el.payDate|date" isLink :value="el.orderAmount|number(2)" v-for="el in consumeList" @handleClick="showDetail(el.orderNo)">
                    <img slot="img" :src="el.partnerIcon|imgUrl" alt="">
                </item-cell>
            </mt-loadmore>
            <no-data v-if="!consumeList.length"></no-data>
        </div>
        <!-- E 消费明细列表 -->
        <!-- S 详情弹窗 -->
        <detail-popup ref="detailPopup" @closePopup="colseDetail" type="consume"></detail-popup>
        <!-- E 详情弹窗 -->
    </div>
</template>
<script>
import itemCell from 'src/components/item/itemCell'; //单元格
import detailPopup from 'src/module/common/member/module/wallet/components/detailPopup'; //详情弹窗
import {
    fetchStationConsumeList, //消费明细列表
    fetchStationConsumeDetail, //消费明细详情
} from '../service/getData';
export default {
    data () {
        return {
            consumeList: [], //消费明细列表
            orderStatus: 'success', //订单状态
            allLoaded:false,  //列表=>是否全部加载
            page:1,			//列表=>分页
            size:10,		//列表=>数量
        }
    },
    components: {
        itemCell,
        detailPopup,
    },
    activated () {
        this.getCosumeList();
    },
    methods: {
        //获取消费明细列表
        getCosumeList () {
            fetchStationConsumeList(this.orderStatus).then(res => {
                if (res.status) {
                    this.consumeList = res.data.list;
                    if(this.page==1){
					    this.consumeList = res.data.list||[];
					    this.$refs.loadmore.onTopLoaded();
					}else{
						this.consumeList = this.consumeList.concat(res.data.list||[]);
						this.$refs.loadmore.onBottomLoaded();
					}
					
					if(res.data.list&&res.data.list.length==this.size){
						this.allLoaded = false;
					}else{
						this.allLoaded = true;
					}
                } else{
					this.allLoaded = true;
				}
            })
        },
        loadTop(){		//下拉刷新
			this.page = 1;
			this.getCosumeList();
		},
		loadBottom(){	//上拉加载
			this.page += 1;
			this.getCosumeList();
		},
        showDetail(id){//打开详情弹窗
			this.$refs.detailPopup.popupVisible=true;
			this.$refs.detailPopup.detailFn(id);
		},
		colseDetail(){//关闭详情弹窗
			this.$refs.detailPopup.popupVisible=false;
		}
    }
}
</script>
<style lang="less">
.station_consume{
    .cell .cell_wrap {
        .cell_subtitle{
            color: #999 !important;
        }
        .cell_tit{
            color: #666 !important;
            img{
                width: 0.8rem;
                height: auto;
            }
        }
        .cell_value{
            color: #ff4b48 !important;
            font-size: 0.3rem;
        }
    }
}
</style>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.station_title{
    height: 0.9rem;
    .flex;
    .flex_center;
    .justify_between;
    .border_b;
    padding-left: 0.3rem;
    padding-right: 0.68rem;
}
.station_consume{
    position: absolute;
    top: 1.8rem;
    bottom: 0;
    left: 0;
    width: 100%;
    .overflow_scroll;
}
</style>
