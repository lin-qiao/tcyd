<template>
	<div class="bg_gray pb121" style="min-height: 100%;">
		<!-- S 头部-->
		<top :title="'我的收货地址'"></top>
		<!-- E 头部-->
		<div class="h_reminder">
			<i class="iconfont icon-group45"></i>
			<span>已保存{{addressNum}}条地址，还能保存{{addressNumResidue}}条</span>
		</div>
		<ul class="h_address_list">
			<li class="h_item" v-for="v in addressList">
				<div class="h_info">
					<span class="h_name">{{v.name}}</span>
					<span class="h_phone">{{v.phone}}</span>
					<div class="h_address">{{v.provinceStr}}{{v.cityStr}}{{v.countyStr}}{{v.detailAddress}}</div>
				</div>
				<div class="h_operation">
					<div class="h_check" :class="{active:v.isDefault=='Y'}" @click="setDefaultAddress(v.id)"><i class="iconfont icon-duihao2"></i>默认地址</div>
					<div class="h_edit">
						<a class="h_btn" @click="editAddress(v.id)"><i class="iconfont icon-edit"></i>编辑</a>
						<a class="h_btn" @click="deleteAddress(v.id)" v-if="v.isDefault!='Y'"><i class="iconfont icon-trash"></i>删除</a>
					</div>
				</div>
			</li>
		</ul>
		<div class="h_footer" v-if="addressNumResidue!=0">
			<router-link :to="'/addAddress?addressNum='+addressNum" class="btn_block">新增地址</router-link>
		</div>
	</div>
</template>

<script>
import {
	fetchAddressList,//获取收货地址列表
	fetchDeleteAddress,//删除收货地址
	fetchSetDefaultAddress,//设置默认收货地址
} from '../service/getData'
export default {
	data() {
		return {
			addressList:[],//收货地址列表
			addressNum:0,//已经添加地址条数
			addressNumResidue:0,//剩余可添加条数
		}
	},
	activated() {
		this.getAddressList();
	},
	methods: {
		//获取收货地址列表
		getAddressList(){
			fetchAddressList().then(res=>{
				var data=res.data||{};
				this.addressList=data.list||[];
				this.addressNumResidue=data.address||0;
				this.addressNum=data.addressNo||0;
			})
		},
		//编辑收货地址
		editAddress(id){
			this.$router.push({path:"/addAddress",query:{id:id}})
		},
		//删除收货地址
		deleteAddress(id){
			this.$confirm({
				content:"您确定要删除吗？",
				confirm:()=>{
        			fetchDeleteAddress(id).then(res=>{
        				if(res.status){
        					this.getAddressList();
        				}
					})
				}
			})
		},
		//设置默认收货地址
		setDefaultAddress(id){
			fetchSetDefaultAddress(id).then(res=>{
				if(res.status){
					this.getAddressList();
				}
			})
		}
	}
}
</script>
<style lang="less" scoped>
@import (reference) "~src/style/all";
.h_reminder{
	width: 7.5rem;
	height: 0.8rem;
	padding: 0 0.3rem;
	background-color: #fff5e5;
	line-height: 0.8rem;
	font-size: 0.24rem;
	color: #f4890d;
	.iconfont{
		float: left;
		margin-right: 0.15rem;
		color: #ffa516;
	}
}
.h_address_list{
	.h_item{
		background-color: #fff;
		margin-bottom: 0.2rem;
	}
	.h_info{
		padding: 0.2rem 0.3rem 0.25rem;
		border-bottom: 0.02rem solid @line_color;
	}
	.h_name,.h_phone{
		font-size: 0.28rem;
		line-height: 0.6rem;
	}
	.h_name{
		margin-right: 0.4rem;
	}
	.h_address{
		line-height: 0.4rem;
		font-size: 0.26rem;
	}
	.h_operation{
		.flex();
		height: 0.9rem;
		padding: 0 0.3rem;
		justify-content:space-between;
		align-items: center;
		font-size: 0.26rem;
		color: #666;
		.h_check{
			&.active .iconfont{
				color: @color;
			}
			.iconfont{
				font-size: 0.42rem;
				color: #dcdcdc;
			}
		}
		.h_edit{
			.flex();
		}
		.h_btn{
			margin-left: 0.3rem;
			line-height: 0.4rem;
			color: #666;
		}
		.iconfont{
			float: left;
			margin-right: 0.1rem;
			line-height: 0.4rem;
			font-size: 0.4rem;
			color: #ababab;
		}
	}
}
.h_footer{
	position: fixed;
	left: 0;
	right: 0;
	bottom: 0;
	.flex();
	justify-content: center;
	align-items: center;
	height: 1.2rem;
	background-color: #fff;
	border-top:1px solid #eaeaea;	
	.box_shadow(0 0 0.18rem rgba(190,189,189,0.16));
}
</style>


