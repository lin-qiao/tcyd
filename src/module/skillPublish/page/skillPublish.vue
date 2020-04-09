<template lang="html">
    <div class="skill_public">
    	<div class="bg_fff">
      <!-- 标题 -->
    	<top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>技能信息</span>" rightIcon="icon-wenhao" @clickRight="$router.push('/useHelp')"></top>
      <!-- 标题 -->
      <!-- 图片上传 -->
        <message code="TCTJJNWXTS"></message>
        <label class="upload_img">
        	<div class="upload_img_box" :style="{backgroundImage:'url('+(imgList[0].indexOf('http')>-1?imgList[0]:imgBaseUrl+imgList[0])+')'}" v-if="imgList.length"></div>
            <div class="upload_bg" @click='toSkillImg' style="position: relative">
                <img src="~src/images/upload_bg.png" alt="" > 
                <p  v-if="!imgList.length">添加技能照片</p>
                <p  v-if="!imgList.length">展示颜值，技能兼具的自己</p>
                <p  v-if="imgList.length">您还可以添加{{9-imgList.length}}张图片</p>
            </div>
         
        </label>
       <!-- 图片上传 --> 
        <div class="skill_elm_list">
        	<!--S单选-->
            <element-box title="技能品类">
          	    <p slot="content" class="pl10 ellipsis f30">{{skillMsg.name}}<em class="c_666 ml30">{{skillMsg.remark}}</em></p>
            </element-box>
            <!--E单选-->
            <div v-for="(el,index) in data">
            	<!--S单选-->
                <element-box v-if="el.controlType=='checkbox'">
	          	    <span slot='tit'>{{el.attrName}}<em class='f26'><span v-if="el.isRequired=='Y'">( 必填 )</span> <span>( 多选 )</span></em></span>
	                <formCheckbox v-model='typeList[el.attrName]' slot="content" :list="el.attrValueList" :isBadge="true"></formCheckbox>
	            </element-box>
	            <!--E单选-->
	            <!--S单选-->
	            <element-box v-if="el.controlType=='radio'">
	                <span slot='tit'>{{el.attrName}}<em class='f26'><span v-if="el.isRequired=='Y'">( 必填 )</span></em></span>
	                <formRadio :type="el.attrName " v-model='typeList[el.attrName]' slot="content" :list="el.attrValueList" :isBadge="true"></formRadio>
	            </element-box>
	            <!--E单选-->
	            <div></div>
            </div>
            <element-box title="技能介绍">
                <router-link   :to="'/example?skillSubCategory='+query.skillSubCategory" slot="title" class="c_main f26">
                    <i class="iconfont icon-bianji f26"></i>
                    参考范例
                </router-link>
                <formTextarea
                    v-model="contentTxt"
                    slot="content"
                    class="pl0 bb_none"
                    input_placeholder="可以介绍您擅长提供的项目，您的专业性，是否有保障，以及您的服务特点和优势（字数20~150）"
                    maxlength="150"
                    height="3">
                </formTextarea>
            </element-box>
            <!-- <element-box title="语音介绍">
                <div class="flex c_999" slot="content">
                    <div class="left flex1">
                        <p class="mb30">您可以录制一段60秒的语音介绍您的技能</p>
                        <p class="flex flex_center">
                            <span class="mr10" >语音范例</span>
                            <itemAudio ></itemAudio>
                        </p>
                    </div>
                    <itemTape @startRecord ='startRecord' @stopRecord ='stopRecord' @playVoice='playVoice' @stopVoice='stopVoice' @uploadVoice='uploadVoice'></itemTape>
                </div>
            </element-box> -->
        </div>
        </div>
        <div class="skill_public_fixed">
	        <!-- 勾选协议 -->
	        
	        <div class="bg_gray flex flex_column ptb10">
	            <itemAgreement v-model='agreement'></itemAgreement>
	            <itemSteps></itemSteps>
	        </div>
	          <!-- 勾选协议 -->
	          <div class="bg_fff ptb20">
	          	<div class="btn_block " @click="submit" >下一步</div>
	          </div>
	        
        </div>
        <transition name="page-slide">
	     <keep-alive>
				<router-view></router-view>
	     </keep-alive>
		</transition>
    </div>
</template>

<script>
import formCheckbox from 'src/components/formItem/formCheckbox' //多选
import formRadio from 'src/components/formItem/formRadio' //单选
import formTextarea from 'src/components/formItem/formTextarea' //文本
import message from 'src/components/notice/message' //横幅
import elementBox from 'src/components/item/itemElementBox' //盒
import itemAudio from 'src/components/item/itemAudio' //语音
import itemTape from 'src/components/item/itemTape' //语音
import itemAgreement from 'src/components/item/itemAgreement' //协议
import itemSteps from 'src/components/item/itemSteps' //协议
import {REGEX,imgBaseUrl} from 'src/config/env'
import {
	fetchGetSkillDetails//获取二级技能详情
} from 'src/module/index/service/getData';
import {
  fetchskillAttrList, //技能选择列表
  fetchskillDetails, //用户技能详情
  fetchWXsdk, //微信
  fetchUpdateskillInfo //修改
} from '../service/getData'
export default {
  data() {
    return {
      imgBaseUrl:imgBaseUrl,
      imgList: [], //图片
      localId: '', //本地微信语音id
      serverId: '', //服务器微信语音id
      data: [], //总的数据
      typeList: {}, //每个类型对应的选择值
      contentTxt: '', //技能介绍
      agreement: true, //勾选协议
      skillMsg:{},
      query: '' //头部参数
    }
  },
  components: {
    message,
    formCheckbox,
    formTextarea,
    elementBox,
    itemAudio,
    itemTape,
    itemAgreement,
    itemSteps,
    formRadio
  },
  methods: {
    // startRecord() {
    //   //开始录
    //   let _this = this
    //   wx.startRecord()
    //   wx.onVoiceRecordEnd({
    //     // 录音时间超过一分钟没有停止的时候会执行 complete 回调
    //     complete: function(res) {
    //       console.log('onVoiceRecordEnd')
    //       _this.localId = res.localId
    //     }
    //   })
    // },
    // stopRecord() {
    //   //停止录
    //   let _this = this
    //   wx.stopRecord({
    //     success: function(res) {
    //       console.log(res)
    //       _this.localId = res.localId
    //     }
    //   })
    // },
    // playVoice() {
    //   //播放
    //   let _this = this
    //   wx.playVoice({
    //     localId: _this.localId // 需要播放的音频的本地ID，由stopRecord接口获得
    //   })
    // },
    // stopVoice() {
    //   //停止播放
    //   let _this = this
    //   wx.stopVoice({
    //     localId: _this.localId
    //   })
    // },
    // uploadVoice() {
    //   //上传语音
    //   let _this = this
    //   wx.uploadVoice({
    //     localId: _this.localId,
    //     isShowProgressTips: 1, // 默认为1，显示进度提示
    //     success: function(res) {
    //       _this.serverId = res.serverId // 返回音频的服务器端ID
    //       console.log('服务器id', res.serverId)
    //     }
    //   })
    // },
    toSkillImg() {
      //跳转上传图片
      if (this.query.skillId) {
        //修改流程需要带图片过去
        window.sessionStorage.imgList = JSON.stringify(this.imgList)
      }
      this.$router.push('/skillPublish/skillImg')
    },
    initialization() {
      //初始化
      fetchskillDetails(this.query.skillId).then(res => {
        //获取详情
        let data = res.data.data
        this.query.skillCategory = data.skillCategory
        this.query.skillSubCategory = data.skillSubCategory
        this.contentTxt = data.serviceIntroduced //技能介绍
        // this.serverId = data.serverId //语音Id
        if (!this.imgList.length) {
          this.imgList = data.skillImg.split(',') //图片
          window.sessionStorage.imgList = JSON.stringify(this.imgList)
        }
        //赋值选中项
        for (let i = 0; i < data.attrList.length; i++) {
          let _data = data.attrList[i];
          let _attrValueList = _data.attrValueList;
          this.typeList[_data.attrName] = [];
          for (let t = 0; t < _attrValueList.length; t++) {
            this.typeList[_data.attrName].push(_attrValueList[t].id);
          }
        }
      })
    },
    submit() {
      //提交
      //循环判断动态参数填写情况
      for (let i = 0; i < this.data.length; i++) {
        let _data = this.typeList[this.data[i].attrName] //当前填写 选择内容
        let _i = this.data[i]
        if ('checkboxradio'.indexOf(_i.controlType) != -1) {
          if ((!_data || !_data.length) && _i.isRequired == 'Y') {
            return alertTip('请选择' + _i.attrName)
          }
        }
      }
      if (!this.contentTxt) {
        alertTip('请填写技能介绍!')
        return
      }
      if (this.contentTxt.length<20) {
        alertTip('亲，技能介绍最少20个字哦！')
        return
      }
      if(REGEX.noHtml.regex.test(this.contentTxt)){
		alertTip('技能介绍不能包含敏感字符！');
		return;
	  }
      if (!this.agreement) {
        alertTip('请先阅读并同意用户协议')
        return
      }
      //1 图片 2 语音 3 技能描述 4 循环数据

      //循环拼接id 开始
      let idArr = ''
      this.typeList.attrId='';
      for (let el in this.typeList) {
        idArr = idArr + ',' + this.typeList[el]
      }
      idArr = idArr.replace(',', '')
      idArr = idArr.replace(',,', ',')
      // for (let i = 0; i < this.typeList.length; i++) {
      //   if (
      //     typeof this.typeList[i] == 'number' ||
      //     typeof this.typeList[i] == 'object'
      //   ) {
      //     idArr + ',' + this.typeList[i]
      //     return
      //   }
      // }
      this.typeList.attrId = idArr
      //循环拼接id 完
      this.typeList.serviceIntroduced = this.contentTxt //技能介绍
      this.typeList.skillCategory = this.query.skillCategory //一级Id
      this.typeList.skillSubCategory = this.query.skillSubCategory //二级id
      // this.typeList.serverId = this.serverId  //微信语音id
      this.typeList.skillImg = JSON.stringify(this.imgList)
      this.typeList.skillImg = this.typeList.skillImg
        .replace('[', '')
        .replace(']', '')
        .replace(/"/g, '')
      window.localStorage.skill = JSON.stringify(this.typeList) //缓存 下个页面使用
      if (this.query.skillId) {
        //修改
        this.typeList.skillId = this.query.skillId
        this.typeList.submitToken = true
        fetchUpdateskillInfo(this.typeList).then(res => {
          if (res.code == '000') {
            alertTip(res.msg, () => {
              this.$router.replace({ path: '/serviceType', query: this.query })
            })
          } else {
            alertTip(res.msg)
          }
        })
      } else {
        //添加
        this.$router.replace({ path: '/serviceType', query: this.query })
      }
    }
  },
  beforeRouteUpdate(to,from,next){
  	if (from.fullPath=="/skillPublish/skillImg"&&window.sessionStorage.imgListK == 1) {
      this.imgList = JSON.parse(window.sessionStorage.imgList || '[]') //从缓存里拿
      window.sessionStorage.imgListK = 0
    }
  	next();
  },
  activated() {
  	this.contentTxt="";
  	sessionStorage.removeItem('imgList');
    /*if (window.sessionStorage.imgListK == 1) {
      this.imgList = JSON.parse(window.sessionStorage.imgList || '[]') //从缓存里拿
      window.sessionStorage.imgListK = 0
    }*/
    //获取二级分类技能信息
	fetchGetSkillDetails(this.$route.query.skillSubCategory).then(res=>{
		this.skillMsg = res.data||{};
	})
//  if (
//    this.query == '' ||
//    this.$route.query.skillSubCategory != this.query.skillSubCategory ||
//    (this.$route.query.skillId || 0) * (this.query.skillId || 0) == 0 ||
//    this.$route.query.skillId * this.query.skillId !=
//    this.query.skillId * this.query.skillId
//    this.$route.query.skillSubCategory == this.query.skillSubCategory &&
//    this.$route.query.skillId == this.query.skillId
//  ) {
//    //取反
//  } else {
      //1 第一次进 2 类别不一样 3 一次修改一次不是 4  都修改 但是id不一样
      this.query = this.$route.query
      this.typeList = {}
      fetchskillAttrList(this.query.skillSubCategory).then(res => {
        //获取列表
        this.data = res.data.list
        if (this.query.skillId) {
          //修改
          this.initialization()
        }
      })
//  }
    // fetchWXsdk(encodeURIComponent(location.href)).then(res => {
    //   wx.config({
    //     //debug: true, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    //     appId: res.appId, // 必填，企业号的唯一标识，此处填写企业号corpid
    //     timestamp: res.timestamp, // 必填，生成签名的时间戳
    //     nonceStr: res.nonceStr, // 必填，生成签名的随机串
    //     signature: res.signature, // 必填，签名，见附录1
    //     jsApiList: res.jsApiList
    //   })
    // })
    // wx.error(function(res) {
    //   console.log(res)
    // })
    // wx.ready(function() {
    //   wx.getLocation({
    //     type: 'wgs84', // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
    //     success: function(res) {
    //       console.log(res)
    //       var latitude = res.latitude // 纬度，浮点数，范围为90 ~ -90
    //       var longitude = res.longitude // 经度，浮点数，范围为180 ~ -180。
    //       var speed = res.speed // 速度，以米/每秒计
    //       var accuracy = res.accuracy // 位置精度
    //     }
    //   })
    // })
  }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.skill_public{
	min-height: 100%;
	.bg_gray;
	padding-bottom:2.44rem;
}
.skill_public_fixed{
	position: fixed;
	width: 7.5rem;
	left: 50%;
	margin-left: -3.75rem;
	bottom: 0;
}
.bb_none {
  border-bottom: none;
}
.upload_img {
  display: block;
  height: 2.6rem;
  background-color: @bg_color;
  & > .upload_img_box{
    display: block;
    width: 100%;
    height: 2.6rem;
    background-repeat: no-repeat;
    background-size:cover;
    background-position: center;
    position: absolute;
  }
  .upload_bg {
    height: 2.6rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    img {
      width: 1.1rem;
      height: 1.1rem;
      margin-bottom: 0.2rem;
    }
    p {
      color: #666;
    }
  }
}
</style>
