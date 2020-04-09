<template>
	<div class="">
		<!-- S 头部-->
		<top :title="!addressId?'新建收货地址':'修改收货地址'"></top>
		<!-- E 头部-->
		<div class="h_form">
			<form-input placeholder="请输入收货人姓名" title="收货人" v-model.trim="address.name"></form-input>
			<form-input placeholder="请输入手机号码"  title="手机号码" type="number" v-model.trim="address.phone">
				<!--<div class="h_operation" @click="addressBook"><i class="iconfont icon-tongxunlu"></i><p>通讯录</p></div>-->
			</form-input>
			<item-cell 
				title="所在地区" 
				:noBorder="true"
				:height="89"
				:handleClick="showCitySelectFn">
				<div class="h_address_wrap">
					<div class="c_333">{{addressText}}</div>
					<div class="h_operation" @click.stop="location"><i class="iconfont icon-location"></i><p>定位</p></div>					
				</div>
			</item-cell>
		</div>
		<div class="h_address_detail">
			<div class="h_tit">详细地址</div>
			<form-textarea :height="2" placeholder="请输入收货人的详细地址，有惊喜礼物哦~" v-model.trim="address.detailAddress"></form-textarea>
		</div>
		<div class="form_item" v-show="showDefaultSet">
			<div class="form_item_title c_666 f28">设置为默认收货地址</div>
			<div class="form_item_con">
				<i class="iconfont icon-on h_flag c_dc"  v-show="address.isDefault=='N'" @click="address.isDefault='Y'"></i>
				<i class="iconfont icon-off h_flag c_green" v-show="address.isDefault=='Y'" @click="address.isDefault='N'"></i>
			</div>
		</div>
		<div class="btn_block mt60" @click="saveAddress">保存</div>
	    <transition name="page-slide-bottom">
			<addressSelect 
				v-if="showCitySelect" 
				:showCitySelect="showCitySelect" 
				@on-showCitySelect-change="ShowCitySelectChange"
				@on-city-select="citySelectChange">
			</addressSelect>
		</transition>
	</div>
</template>

<script>
import formInput from 'src/components/formItem/formInput'
import formTextarea from 'src/components/formItem/formTextarea'
import itemCell from 'src/components/item/itemCell'
import addressSelect from 'src/components/formItem/addressSelect';
import {
	fetchAddress,//根据id获取收货地址
	fetchUpdateAddress,//修改收货地址
	fetchAddAddress//添加收货地址
} from '../service/getData'
import {REGEX} from 'src/config/env'//正则
export default {
	data() {
		return {
			addressId:"",//收货地址id
        	showCitySelect: false, //是否显示地址选择
        	address:{
	            "city": "",
	            "cityStr": "",
	            "county": "",
	            "countyStr": "",
	            "detailAddress": "",
	            "isDefault": "N",
	            "name": "",
	            "phone": "",
	            "province": "",
	            "provinceStr": ""
	        },
        	addressText:"",//地址-省市县
        	showDefaultSet:true//是否展示设置默认地址
		}
	},
	components: {
		formInput,
		formTextarea,
		itemCell,
		addressSelect
	},
	activated() {
		this.initData();
		this.addressId=this.$route.query.id;
		this.addressNum=this.$route.query.addressNum;
		if(this.addressId){
			this.getAddress();
		}
		if(this.addressNum==0){
			this.showDefaultSet=false;
			this.address.isDefault="Y";
		}
	},
	methods: {
		//数据初始化
		initData(){
			this.address={
	            "city": "",
	            "cityStr": "",
	            "county": "",
	            "countyStr": "",
	            "detailAddress": "",
	            "isDefault": "N",
	            "name": "",
	            "phone": "",
	            "province": "",
	            "provinceStr": ""
	       };
	       this.addressText="";
	       this.showDefaultSet=true;
		},
		//展示下拉选择城市
		showCitySelectFn(){
			this.showCitySelect = true
		},
		//选择城市
		ShowCitySelectChange(val) {
			this.showCitySelect = val;
		},
		// 获取地址选择器所传省市
	    citySelectChange(p, c, a) {
    		this.address.provinceStr = p.NAME;
    		this.address.province = p.CODE;
    		this.address.cityStr = c.NAME;
    		this.address.city = c.CODE;
    		this.address.countyStr = a.NAME;
    		this.address.county = a.CODE;
    		this.addressText = `${p.NAME} - ${c.NAME} - ${a.NAME}`;
    	},
    	//定位
    	location() {
    		if(!window.COUNTY){
    			alertTip("定位失败");
    			return;
    		}
    		var p={NAME: window.PROVINCE,CODE:window.PROVINCECODE};
    		var c={NAME: window.CITY,CODE:window.CITYCODE};
    		var a={NAME: window.COUNTY,CODE:window.COUNTYCODE};
    		this.citySelectChange(p,c,a);
    	},
    	//通讯录
    	addressBook(){
    		
    	},
    	//根据id查询收货地址信息
    	getAddress(){
    		fetchAddress(this.addressId).then(res=>{
				this.address=res.data||{};
				if(res.data.isDefault=='Y'){
					this.showDefaultSet=false;
				}
				this.addressText =this.address.province+this.address.city+this.address.county;
			})
    	},
    	//添加收货地址
    	addAddress(data){
    		fetchAddAddress(data).then(res=>{
    			if(res.status){
    				this.$router.go(-1);
    			}
			})
    	},
    	//修改收货地址
    	updateAddress(data){
    		data.id=this.addressId;
    		fetchUpdateAddress(data).then(res=>{
    			if(res.status){
    				this.$router.go(-1);
    			}
			})
    	},
    	//保存
    	saveAddress(){
    		var addressObj=this.address;
    		if(!addressObj.name){
    			alertTip("姓名不能为空");
    			return;
    		}
    		if(!addressObj.phone){
    			alertTip("手机号不能为空");
    			return;
    		}
    		if(!addressObj.province){
    			alertTip("请选择所在地区");
    			return;
    		}
    		if(!addressObj.detailAddress){
    			alertTip("请输入详细地址");
    			return;
    		}
			if(!REGEX.mobile.regex.test(addressObj.phone)){
				alertTip('请输入正确的手机号');
				return;
			}
    		var data={
    			name:addressObj.name,
    			phone:addressObj.phone,
    			province:addressObj.provinceStr,
    			city:addressObj.cityStr,
    			county:addressObj.countyStr,
    			detailAddress:addressObj.detailAddress,
    			isDefault:addressObj.isDefault,
    			submitToken:true
    		};
    		if(this.addressId){
    			this.updateAddress(data);
    		}else{
    			this.addAddress(data);
    		}
    	}
	}
}
</script>
<style lang="less">
.h_form{
	.cell .cell_wrap{
		padding-right: 0.3rem !important;
	}
	.cell .cell_tit .cell_tit_con{
		color: #666;
		margin-left: 0 !important;
	}
	.h_address_wrap{
		display: flex;
		align-items: center;
	}
}
</style>
<style lang="less" scoped>
@import (reference) "~src/style/all";
.h_operation{
	position: relative;
	width: 0.98rem;
	padding-left: 0.3rem;
	margin-left: 0.3rem;
	text-align: center;
	font-size: 0.22rem;
	white-space:nowrap; 
	.iconfont{
		font-size: 0.32rem;
		color: #555;
	}
	p{
		color: #333;
	}
	&:before{
		content: "";
		position: absolute;
		left: 0;
		top: 0;
		bottom:0;
		margin: auto 0;
		width: 1px;
		height:0.54rem ;
		background-color: #e8e8e8;
	}
}
.h_address_detail{
	padding: 0 0.3rem;
	border-top: 0.2rem solid @bg_color;
	border-bottom: 0.2rem solid @bg_color;
	.h_tit{
		font-size: 0.28rem;
		line-height: 0.8rem;
	}
}
.form_item{
    width: 7.2rem;
    height: 0.89rem;
    padding-right: 0.3rem;
    margin-left: 0.3rem;
    border-bottom: 1px solid #e8e8e8;
    display: -webkit-box;
    display: -webkit-flex;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -webkit-align-items: center;
    -ms-flex-align: center;
    align-items: center;
    justify-content: space-between;
    .h_address{
    	height: 100%;
	    -webkit-box-flex: 1;
	    -webkit-flex-grow: 1;
	    -ms-flex-positive: 1;
	    flex-grow: 1;
	    .flex();
	    justify-content: flex-end;
	    align-items: center;
	    font-size: 0.28rem;
    }
}
.h_flag{
	font-size: 0.8rem;
}
.c_dc{
	color: #dcdcdc;
}
</style>


