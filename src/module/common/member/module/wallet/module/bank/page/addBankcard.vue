<template>
	<div class="router_page bg_gray">
		<!-- S 头部-->
		<top :title="$route.query.id?'编辑银行卡':'绑定银行卡'"></top>
		<!-- E 头部-->
		<div class="bg_fff c_add_bank">
			<form-input 
				class="left" 
				title="持卡人姓名" 
				v-model="realName" 
				placeholder="持卡人姓名"
				disabled="disabled">
			</form-input>
			<form-input 
				class="left" 
				title="身份证号" 
				v-model="idCard" 
				placeholder="身份证号"
				disabled="disabled">
			</form-input>
			<form-input 
				class="left" 
				title="开户银行" 
				v-model.trim="allBank.bankName"
				placeholder="请选择开户银行"
				disabled="disabled"
				>
				<router-link to="/wallet/bankList"><i class="iconfont icon-icon1 f56 ml20 c_888"></i></router-link>
			</form-input>
		    <form-input 
		    	class="left" 
		    	title="银行卡号"  
		    	v-model.trim="allBank.cardNo" 
		    	placeholder="请输入银行卡号"
		    	maxlength="30"
		    	>
		    </form-input>
		    <div class="c_open_bank" @click="showCitySelect = true">
		        <div>开户地区：</div> 
		        <div>
		        	<span>{{addressText == ''?'选择地区':addressText}}</span>
		        	<i class="iconfont icon-arrow-right ml10"></i>
		        </div> 
		    </div>
		    <div class="h_bankname">
				<div class="h_tit c_666">具体开户行</div>
				<form-textarea :height="2" placeholder="请输入具体开户行名称" v-model.trim="allBank.bankSubName"></form-textarea>
			</div>
			<div class="hei20 bg_gray"></div>
		    <form-input 
		    	class="left" 
		    	type="code"
		    	title="短信验证码"
		    	:align="true"
		    	maxlength="6"
		    	v-model.trim="allBank.validCode"
		    	:noBorder="true" @getCode="getCode">
		    </form-input>
		    <div class="hei20 bg_gray"></div>
		    <div v-if="isTradePswd=='N'">
			    <form-input 
			    	inputType="password"
			    	class="left" 
			    	title="交易密码"
			    	v-model.trim="pwd" 
			    	number="true"
				    placeholder="请设置6位平台交易密码"
				    maxlength="6"
			    	>
			    </form-input>
			    <form-input 
			    	inputType="password"
			    	class="left" 
			    	title="确认密码"
			    	number="true"
			    	v-model.trim="newPwd" 
				    placeholder="确认密码"
				    :noBorder="true"
				    maxlength="6"
			    	>
			    </form-input>
			</div>
		</div>
	    <div class="plr30 pt30 f24 c_888" v-if="($route.query.id&&allBank.isDefault!='Y')||$route.query.bankNo"><!--默认银行卡和第一张银行卡隐藏-->
	      <i v-if="!isDefault" class="iconfont icon-circle f40 c_888 mr10 middle" @click="selectDefault"></i>
	      <i v-if="isDefault" class="iconfont icon-duihao2 f40 c_main mr10 middle" @click="selectDefault"></i>
	      <span @click="selectDefault">设为默认银行卡</span>
	    </div>
	    <a href="javascript:void(0);" class="btn_block mt60 c_fff" @click="saveBank">立即绑定</a>
	    
	    
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
//个人认证信息,查询安全中心信息,设置交易密码,获取短信验证码
import {
  fetchMemberGetMemberInfo,
  fetchGetMemberInfo,
  fetchUpdatePswd,
  fetchSendCode
} from 'src/module/common/member/module/save/service/getData'
//添加银行卡,编辑银行卡
import { fetchAddBank, fetchEditBank } from '../service/getData'
import region_info from 'src/json/region_info.json'
import formInput from 'src/components/formItem/formInput'
import formTextarea from 'src/components/formItem/formTextarea'
import addressSelect from 'src/components/formItem/addressSelect' //省市县组件
import { REGEX } from 'src/config/env'
export default {
  data() {
    return {
      id: '', //银行卡id
      realName: '', //真实姓名
      idCard: '', //身份证号
      checkStatus: 'fail', //个人认证状态
      isTradePswd: 'N', //是否设置交易密码
      pwd: '', //交易密码
      newPwd: '', //确认交易密码
      showCitySelect: false, //是否显示地址选择器
      addressText: '', //地址信息
      allBank: {
        bankName: '', //开户行名称
        cardNo: '', //银行卡号
        bankSubName: '', //具体开户行
        province: '', //省份id
        city: '', //市id
        area: '', //区id
        validCode: '', //短信验证码
        code: '', //银行编码
        submitToken: true
      },
      isDefault: true //1:默认银行卡    0:不是默认银行卡
    }
  },
  components: {
    formInput,
    formTextarea,
    addressSelect
  },
  activated() {
    this.allBank.bankName = this.$store.state.bankName //获取银行名称
    this.allBank.code = this.$store.state.bankCode //获取银行编码

    this.tradePswdFn() //获取用户是否设置交易密码
    this.getQualifyResult() //获取个人认证状态
    // 修改地址
    if (this.$route.query.id && this.allBank.id != this.$route.query.id) {
      // 获取地址信息
      let {
        realName,
        bankName,
        cardNo,
        bankSubName,
        province,
        city,
        area,
        code,
        isDefault
      } = JSON.parse(localStorage.editBank)
      this.allBank = {
        id: this.$route.query.id, //银行卡id
        bankName: bankName, //开户行名称
        cardNo: cardNo, //银行卡号
        bankSubName: bankSubName, //银行网点
        province: province, //省份id
        city: city, //市id
        area: area, //区id
        code: code, //银行编码
        isDefault: isDefault,
        submitToken: true
      }
      this.isDefault = isDefault == 'N' ? false : true
      if(/^\d$/.test(province)){
      	this.addressText = `${this.parseAddress(province)} - ${this.parseAddress(city)} - ${this.parseAddress(area)}`
      }else{
      	this.addressText = `${province} - ${city} - ${area}`
      }
    }else{
    	this.allBank.cardNo = ''; //银行卡号
    	this.allBank.bankSubName = ''; //银行网点
    	this.allBank.province = ''; //省份id
    	this.allBank.city = ''; //市id
    	this.allBank.area = ''; //区id
    	this.allBank.isDefault = 'Y';
    }
  },
  methods: {
    setUpPwd() {
      //设置密码
      let param = {
        newPswd: this.pwd,
        againNewPswd: this.newPwd,
        submitToken: true
      }
      fetchUpdatePswd(param).then(res => {
        if (res.status) {
          sessionStorage.setItem('is_tradePswd','Y')//改变本地存储的是否设置交易密码
          this.backUrlFn()
        }
      })
    },
    tradePswdFn() {
      //获取用户是否设置交易密码
      if(sessionStorage.is_tradePswd){
      	this.isTradePswd = sessionStorage.is_tradePswd //是否设置交易密码
      }else{
      	fetchGetMemberInfo().then(res => {
	        if (res.status) {
	            this.isTradePswd = res.data.is_tradePswd //是否设置交易密码
	        }
	    })
      }
    },
    getQualifyResult() {//获取个人认证状态
        fetchMemberGetMemberInfo().then(res => {
            if (res.status) {
                let data = res.data.memberRealName;
		        if(!data || data.checkStatus=="auth_pass"){
                	this.$alert({
				        confirmBtn: '立即实名认证',
				        content:"<div><h3 class='f30'>请您先实名认证</h3><p class='f26 c_888 mt10'>为保证交易安全请您先实名认证</p></div>",
				        confirm: () => {
				        	if (!data) {
				        		this.$router.push('/personApprove')
				        	}else if(data.checkStatus=="auth_pass"){
				        		this.$router.push('/faceApprove')
				        	}
				            
				        },
				        close:()=>{
				        	this.$router.go(-1);
				        }
		            })
                	return
                }
		        this.realName = data.realName||'' //真实姓名
                this.idCard = data.cardNo||'' //身份证号
            }
        })
    },
    saveBank() {
      if (!this.allBank.bankName) {
        alertTip('请选择开户行！')
        return
      }

      if (!this.allBank.cardNo) {
        alertTip('请输入银行卡号！')
        return
      }
      if (this.allBank.cardNo.length < 13) {
        alertTip('请输入13-30位的银行卡号！')
        return
      }
      if (!this.allBank.bankSubName) {
        alertTip('请输入开户行网点！')
        return
      }
      if (!this.allBank.province) {
        alertTip('请选择所在地！')
        return
      }
      if (!this.allBank.validCode) {
        alertTip('请输入短信验证码！')
        return
      }
      if (this.isTradePswd!='Y') {
        //未设置密码
        if (!this.pwd) {
          alertTip('请输入支付密码')
          return
        }
        if (!REGEX.payPwd.regex.test(this.pwd)) {
          alertTip('密码格式错误!')
          return
        }
        if (!this.newPwd) {
          alertTip('请再次输入支付密码')
          return
        }
        //两次新密码验证
        if (this.pwd != this.newPwd) {
          alertTip('两次输入密码不一致')
          return
        }
      }
      this.allBank.realName = this.realName
      this.allBank.isDefault = this.isDefault == true ? 'Y' : 'N'
      if (this.$route.query.id) {
        //是否有银行卡id
        fetchEditBank(this.allBank).then(res => {
          //修改银行卡
          if (res.status) {
            alertTip(res.msg, () => {
              this.$router.push('/wallet/bankcard')
            })
          } else {
            alertTip(res.msg)
          }
        })
      } else {
        fetchAddBank(this.allBank).then(res => {
          //添加银行卡
          alertTip(res.msg, () => {
            if (res.status) {
              if (this.isTradePswd!='Y') {
                //未设置密码
                this.setUpPwd() //设置交易密码
              } else {
                this.backUrlFn()
              }
            }
          })
        })
      }
    },
    getCode(callback) {
      //获取短信验证
      if (!this.allBank.bankName) {
        alertTip('请选择开户行！')
        return
      }

      if (!this.allBank.cardNo) {
        alertTip('请输入银行卡号！')
        return
      }
      if (this.allBank.cardNo.length < 13) {
        alertTip('请输入13-30位的银行卡号！')
        return
      }
      if (!this.allBank.bankSubName) {
        alertTip('请输入开户行网点！')
        return
      }
      if (!this.allBank.province) {
        alertTip('请选择所在地！')
        return
      }
      fetchSendCode('ddt','memberCard').then(res => {
          callback(res);
      })
    },
    //添加银行卡成功以后跳转地址
    backUrlFn() {
      let withdraw = this.$route.query.withdraw
      if (withdraw == 'withdraw') {
        this.$store.state.bankCardId = this.allBank.id //银行卡id
        this.$store.state.bankCardNo = this.allBank.cardNo //银行卡号
        this.$store.state.bankCardName = this.allBank.bankName //开户行
        this.$router.push('/wallet/withdraw')
      } else {
        this.$router.push('/wallet/bankcard')
      }
    },
    // 选择默认地址
    selectDefault() {
      this.isDefault = !this.isDefault
    },
    parseAddress(id) {
      // 地址ID转字符串
      var city
      region_info.region_info.forEach((v, i) => {
        if (v.ID == id) {
          city = v.NAME
        }
      })
      return city
    },
    ShowCitySelectChange(val) {
      // 隐藏显示地址选择器
      this.showCitySelect = val
    },
    citySelectChange(p, c, a) {
      // 获取地址选择器所传省市
      this.allBank.province = p.NAME
      this.allBank.city = c.NAME
      this.allBank.area = a.NAME
      this.addressText = `${p.NAME} - ${c.NAME} - ${a.NAME}`
    }
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all';
.h_bankname {
  padding: 0 0.3rem;
  border-top: 0.2rem solid @bg_color;
  border-bottom: 0.2rem solid @bg_color;
  .h_tit {
    font-size: 0.28rem;
    line-height: 0.8rem;
  }
}
.c_open_bank {
  height: 0.9rem;
  border-bottom: 1px solid #e8e8e8;
  font-size: 0.28rem;
  color: #666;
  display: flex;
  width: 7.2rem;
  padding-left: 0.3rem;
  line-height: 0.9rem;
  justify-content: space-between;
}
</style>


