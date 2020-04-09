<template lang="html">
    <div class="router_page bg_gray pb244 service_type">
    	<div class="bg_fff">
        <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>编辑服务方式</span>" rightIcon="icon-wenhao" @clickRight="$router.push('/useHelp')"></top>
        <message  text="请勿发布黄赌毒类低俗隐晦内容，为了防止收到干扰，请不要泄露"></message>
        <elementBox title="技能方式及报价<em class='f26 c_666 ml20'>添写技能报价即开启相应技能方式</em>">
            <div slot="content">
                <div class="form_offer_item current" v-for="(item,i) in serviceTypeList">
                    <div class="form_offer_info">
                        <img :src="item.selectImage|imgUrl">
                        <p>{{item.serviceType}}</p>
                    </div>
                    <div class="form_offer_right">
                        <div class="form_offer_tip flex justify_between flex_center">
                            <span class="f26">可以收到附近或同城的{{item.serviceType}}订单</span>
                           <!-- <i class="iconfont icon-bangzhu f30" @click="helpLink"></i>-->
                        </div>
                        <div class="form_offer_input">
                            <input type="text" v-model="skillPrice[i]" onkeyup="this.value=this.value.replace(/\D/g,'')" autocomplete="off" >
                            <span class="f24 plr20">元/{{item.unit}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </elementBox>
        <elementBox title="接受派单" class="el_switch">
            <div class="el_con" slot="content">
                <p>每天可为您分配优质订单，自动抢单轻松赚钱</p>
                <formSwitch class="switch"  v-model="acceptFlag"></formSwitch>
            </div>
        </elementBox>
        </div>
        <div class="skill_public_fixed">
	        <div class="bg_gray flex flex_column ptb10">
	            <itemAgreement text="发布服务成功，即为同意" v-model="flog"></itemAgreement>
	            <itemSteps index="2"></itemSteps>
	        </div>
	        <div class="pb121"></div>
	        <div class="btn_wrap">
	            <div class="btn_block"  @click="submit">确认提交</div>
	        </div>
        </div>
    </div>
</template>

<script>
import message from 'src/components/notice/message' //通知
import elementBox from 'src/components/item/itemElementBox'
import itemAgreement from 'src/components/item/itemAgreement' //勾选
import itemSteps from 'src/components/item/itemSteps' //勾选
import formSwitch from 'src/components/formItem/formSwitch' //滑动按钮
// import { REGEX } from 'src/config/env'
import {
  fetchAddSkill, //添加
  fetchUpdateskillService, //修改
  fetchskillDetails //详情
} from '../service/getData'
import {
  fetchSkillServiceList //服务方式列表
} from 'src/service/getData'
export default {
  data() {
    return {
      skillPrice:[], //技能报价
      flog: true, //是否同意协议
      acceptFlag: true, //是否接收派单
      query: {}, //地址参数
      serviceTypeList: [] //技能方式列表
    }
  },
  components: {
    message,
    elementBox,
    itemAgreement,
    itemSteps,
    formSwitch
  },
  methods: {
    helpLink() {
      this.$router.push({ path: '/useHelp' })
    },
    submit() {
      //提交
      //判断是否所有金额都没填
      if (this.skillPrice.every(v=>!v)) {
        alertTip('请至少添加一种技能方式报价');
        return
      }
      if (!this.flog) {
        alertTip('请先阅读并同意用户协议')
        return
      }
	  let data = {};
	  if(window.localStorage.skill){
	  	data = JSON.parse(window.localStorage.skill);
	  }
      let arr = [];
      this.serviceTypeList.forEach((v,i)=>{
      	if(this.skillPrice[i]){
      		arr.push({
      			price: this.skillPrice[i],
      			serviceType:v.serviceEnums,
      			unit:{ 小时: 'hour', 分钟: 'minute', 天: 'day', 次: 'times' }[v.unit]
      		})
      	}
      })
      data.serviceMode = arr;
      data.acceptFlag = this.acceptFlag ? 'Y' : 'N' //协议
      data.submitToken = true
      if (this.query.skillId) {
        //修改
        fetchUpdateskillService(
          this.query.skillId,
          data.serviceMode,
          data.acceptFlag,
          data.submitToken
        ).then(res => {
          if (res.code != '000') {
            alertTip(res.msg)
          } else {
            alertTip(res.msg, () => {
              this.$router.push({ path: '/perfectMsg', query: this.query })
            })
          }
        })
      } else {
        //添加
        fetchAddSkill(data).then(res => {
          if (res.code != '000') {
            alertTip(res.msg)
          } else {
            alertTip(res.msg, () => {
              this.$router.push(
                '/perfectMsg?skillCategory=' +
                  this.query.skillCategory +
                  '&skillSubCategory=' +
                  this.query.skillSubCategory +
                  '&skillId=' +
                  res.data.skillId
              )
            })
          }
        })
      }
    }
  },
  activated() {
    this.query = this.$route.query;
    this.skillPrice = [];
    //获取技能方式列表
    if (this.query.skillSubCategory) {
      //二级技能id
      fetchSkillServiceList(this.query.skillSubCategory).then(res => {
        if (res.status) {
          this.serviceTypeList = res.data.list;
        }
        if (this.query.skillId) {
	      fetchskillDetails(this.query.skillId).then(res => {
	        let data = res.data.data.servicePriceList
	        this.acceptFlag = res.data.data.acceptFlag == 'N' ? false : true
	        if(data.length){
	        	this.serviceTypeList.forEach((v,i)=>{
	        		let price = data.filter(value=>v.serviceEnums==value.serveType);
		          	if(price.length){
		          		this.skillPrice.push(price[0].price);
		          	}else{
		          		this.skillPrice.push('');
		          	}
		        })
	        }
	        // for (let i = 0; i < data.length; i++) {
	        //   if (data[i].serviceType == '线下服务') {
	        //     this.offlineSkills = data[i].price
	        //   }
	        //   if (data[i].serviceType == '线上服务') {
	        //     this.onlineSkills = data[i].price
	        //   }
	        // }
	      })
	    }else{
	    	this.serviceTypeList.forEach(v=>{
	          	this.skillPrice.push('');
	        })
	    }
      })
    }

    
  }
}
</script>

<style lang="less">
@import (reference) '~src/style/all.less';
.service_type {
  .form_offer_item {
    display: flex;
    margin-bottom: 0.6rem;
    &:last-child {
      margin-bottom: 0;
    }
    .form_offer_info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      width: 1.4rem;
      height: 1.4rem;
      .border(@border_color);
      border-radius: 0.03rem;
      img {
        width: 0.5rem;
        height: 0.5rem;
        margin-bottom: 0.1rem;
      }
      p {
        .c_999;
      }
    }
    .form_offer_right {
      flex: 1;
      padding: 0 0.3rem;
    }
    .form_offer_input {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-top: 0.35rem;
      width: 100%;
      height: 0.7rem;
      .border(@border_color);
      border-radius: 0.03rem;
      input {
        height: 100%;
        flex: 1;
        .f24;
        text-align: center;
        color: @color;
        &::placeholder {
          text-align: center;
          color: #999;
        }
      }
    }
    &.current {
      .form_offer_info {
        .c_main;
        .border(@color);
        .iconfont {
          .c_main;
        }
        p {
          .c_main;
        }
      }
    }
  }
  .el_switch {
    .el_box_tit {
      border: none !important;
    }
    .el_box_info {
      padding-top: 0 !important;
    }
    .el_con {
      position: relative;
      .switch {
        position: absolute;
        right: 0;
        top: -0.4rem;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.pb244 {
  padding-bottom: 2.44rem;
}
.skill_public_fixed {
  position: fixed;
  width: 7.5rem;
  left: 50%;
  margin-left: -3.75rem;
  bottom: 0;
}
</style>
