<template>
  <div class="demand_publish">
    <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>发布需求</span>" :isReturn="false">
    </top>
    <div class="demand_publish_main">
      <div class="demand_publish_img flex justify_center flex_center flex_column">
        <p class="f32 text_center c_fff">{{skillInfo.name}}</p>
        <p class="f24 text_center mt10 c_fff ellipsis c_demand_remark">{{skillInfo.remark}}</p>
        <img src="~src/images/demandImg.jpg" />
      </div>
      <div class="demand_box">
        <!-- 诚意金 -->
        <itemElementBox title="诚意金<em class='f26'>( 单选 )</em>">
          <div slot="title" class="c_main flex flex_center" @click="alertTipFn">
            <i class="iconfont icon-info f30"></i>
            <span class="f24 ml15">使用帮助</span>
          </div>
          <formRadio :defaultProps="defaultProps1" v-model="earnestMoney" slot="content" type="cyj" :list="list" :isBadge="true">
          </formRadio>
          <p slot="content" class="f24 c_666 pl10 mt20">选择诚意金可提高成交率哦~</p>
        </itemElementBox>
        <!-- 诚意金 -->
        <!-- 服务方式 -->
        <itemElementBox title="服务方式<em class='f26'>( 单选 )</em>">
          <formRadio :hasImg="true" :defaultProps="defaultProps" v-model="serviceMethod" slot="content" type="fwfs" :list="servicesList" :isBadge="true" height="110" column="2">
          </formRadio>
        </itemElementBox>
        <!-- 服务方式 -->
        <div v-for="(el,index) in data">
          <!-- 单选多选 -->
          <itemElementBox v-if="el.controlType=='checkbox'">
            <span slot='tit'>{{el.attrName}}
              <em class='f26'>
                <span v-if="el.isRequired=='Y'">( 必填 )</span>
                <span>( 多选 )</span>
              </em>
            </span>
            <formCheckbox v-model='typeList[el.attrName]' slot="content" :list="el.attrValueList" :isBadge="true"></formCheckbox>
          </itemElementBox>
          <itemElementBox v-if="el.controlType=='radio'">
            <span slot='tit'>{{el.attrName}}
              <em class='f26'>
                <span v-if="el.isRequired=='Y'">( 必填 )</span>
              </em>
            </span>
            <formRadio :type="el.attrName " v-model='typeList[el.attrName]' slot="content" :list="el.attrValueList" :isBadge="true"></formRadio>
          </itemElementBox>
          <!-- 单选多选 -->
        </div>
      </div>
      <div class="bg_gray pt10">
        <itemAgreement ref="isRecommend"></itemAgreement>
        <p class="plr30">注：诚意金可用于订单支付；若未成交将退至同城账户</p>
        <!-- <div class="skill_recommend plr30 mt25 pb5 flex flex_center">
					<div class="select flex flex_center" @click="isRecommend = !isRecommend">
						<i class="iconfont icon-unselected c_999 mr10 f30" v-if="!isRecommend"></i>
			            <i class="iconfont icon-xuanzhong3 c_main mr10 f30" v-else></i>
						<span>订阅每周优质技能者推荐</span>
					</div>
					<div class="ask ml10">
						<i class="iconfont icon-wenhao f28 c_888"></i>
					</div>
				</div> -->
      </div>
      <div class="btn_block mtb20" @click="checkSelect">立即发布</div>
    </div>
    <pay ref="pay" moneyName="诚意金" :money="earnestMoney"></pay>
  </div>
</template>

<script>
import itemElementBox from 'src/components/item/itemElementBox' //元素盒子
import formRadio from 'src/components/formItem/formRadio' //单选
import formCheckbox from 'src/components/formItem/formCheckbox' //多选
import itemAgreement from 'src/components/item/itemAgreement' //协议
import pay from 'src/components/pay'
// import gd from 'https://webapi.amap.com/maps?v=1.4.8&key=2a2cdcc47348d1404cdc528bebc614ee&plugin=AMap.CitySearch'
//需求发布
import {
  fetchRequirePublish, //提交
  fetchskillAttrList, //列表
  fetchsCategoryDetail //查上面的图片和信息
} from '../service/getData'
//需求发布
import {
  fetchSkillServiceList, //服务方式
  fetchTextDetail//通用富文本
} from 'src/service/getData'
export default {
  data() {
    return {
      getLng: '', //经度
      getLat: '', //纬度
      city: '', //城市
      province: '', //省
      list: [], //诚意金列表
      servicesList: [], //服务方式列表
      defaultProps: {
        id: 'id',
        name: 'name',
        img: 'img',
        selectImg: 'selectImg'
      },
      defaultProps1: {
        id: 'name',
        name: 'name'
      },
      payState: false, //支付弹窗
      earnestMoney: '', //诚意金
      serviceMethod: '', // 服务方式
      data: [], //发布需求选择列表
      typeList: {}, //每个类型对应的选择值
      skillInfo: {}, //类目信息
      skillCategory: '', //技能一级id
      skillSubCategory: '', //技能二级id
      layerImg:'',//提示图片
      helpText:"",//使用帮助的提示信息
    }
  },
  components: {
    itemElementBox,
    formRadio,
    formCheckbox,
    itemAgreement,
    pay
  },
  activated() {
    // if (!this.city) {
    //   this.gdApi() //地图相关
    // }

    this.skillCategory = this.$route.query.skillCategory //技能一级id
    this.skillSubCategory = this.$route.query.skillSubCategory //技能二级id

    //获取头部图片信息
    fetchsCategoryDetail(this.skillSubCategory).then(res => {
      this.skillInfo = res.data
      let _data = [],
        _list = []
      _list = res.data.earnesTmoney.split(',')
      for (let i = 0; i < _list.length; i++) {
        _data[i] = { id: i + 1, name: _list[i] }
      }
      this.list = _data
      this.earnestMoney = _data[0].name
    })
    this.typeList = {}
    this.data={}

    //发布需求选择列表
    fetchskillAttrList(this.skillSubCategory).then(res => {
      if (res.status) {
        this.data = res.data.list
      }
    })
    //获取服务方式
    fetchSkillServiceList(this.skillSubCategory).then(res => {
      if (res.status) {
        this.servicesList = (res.data.list || []).map(v => ({
          id: v.serviceEnums,
          name: v.serviceType,
          img: v.image,
          selectImg: v.selectImage
        }))
        this.serviceMethod=res.data.list[0].serviceEnums;
      }
    });
    //使用帮助提示信息
    fetchTextDetail('TCFBXQCYJTS').then(res=>{
    	if (res.status) {
         this.helpText=res.data.detail;
      }
    })
  },
  mounted() {},
  methods: {
  	alertTipFn(){
  		this.$alert({
  			title:'提示',
  			layerImg:this.layerImg,
				content:this.helpText
			})
  	},
    checkSelect() {
      //校验必选
      //提交
      for (let i = 0; i < this.data.length; i++) {
        let _data = this.typeList[this.data[i].attrName] //当前填写 选择内容
        let _i = this.data[i]
        if ('checkboxradio'.indexOf(_i.controlType) != -1) {
          if ((!_data || !_data.length) && _i.isRequired == 'Y') {
            return alertTip('请选择' + _i.attrName)
          }
        }
      }
      if (!this.$refs.isRecommend.check) {
        alertTip('请先阅读并同意用户协议')
        return
      }
      if(parseInt(this.earnestMoney)){
      	this.$refs.pay.show() //支付弹窗
      }else{
      	this.requirePublish('','');
      }
    },
    requirePublish(withhold, pwd) {
      //循环拼接id
      let idArr = ''
      for (let el in this.typeList) {
        if (typeof this.typeList[el] == 'object') {
          let data = this.typeList[el] + '' //特殊处理，与技能接口入参不同
          data = data.replace(/,/g, '-')
          idArr = idArr + ',' + data
        } else {
          idArr = idArr + ',' + this.typeList[el]
        }
      }
      idArr = idArr.replace(',', '')
      this.typeList.serviceMethod = this.serviceMethod //服务方式
      this.typeList.earnestMoney = parseInt(this.earnestMoney) //诚意金
      this.typeList.skillCategory = this.skillCategory //技能一级id
      this.typeList.skillSubCategory = this.skillSubCategory //技能二级id
      this.typeList.skillIds = idArr //选中idarr
      this.typeList.withhold = withhold //支付方式
      this.typeList.tradePassword = pwd //交易密码
      if (!window.CITY) {
        alertTip('请稍后，正在获取位置信息')
        return
      }
      // this.typeList.coordinateX = this.getLng
      // this.typeList.coordinateY = this.getLat //纬度
      // this.typeList.city = this.city
      // this.typeList.province = this.province
      this.typeList.coordinateX = window.LON
      this.typeList.coordinateY = window.LAT //纬度
      this.typeList.city = window.CITY
      this.typeList.province = window.PROVINCE
      fetchRequirePublish(this.typeList).then(res => {
        if (res.status == true) {
          alertTip(res.msg, () => {
            this.$router.replace(
              '/demandSuccess?requireId=' +
                res.data.requireId +
                '&name=' +
                this.skillInfo.name
            ) //发布成功页面
          })
        } else {
          alertTip(res.msg)
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.c_demand_remark {
  width: 6rem;
  height: 0.3rem;
}
.demand_publish_main {
  .demand_publish_img {
    width: 100%;
    height: 1.99rem;
    position: relative;
    img {
      position: absolute;
      width: 100%;
      height: 100%;
      left: 0;
      top: 0;
      z-index: -1;
    }
  }
}
.c_ccc {
  color: #ccc;
}
.c_back_gauge {
  background: #fff;
  padding-left: 0.3rem;
  .c_demandDetail_li {
    padding-left: 0;
  }
}
.c_demandDetail_li {
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 0 0.3rem;
  position: relative;
  height: 0.92rem;
  border-bottom: 1px solid #eee;
  align-items: center;
  span {
    font-size: 0.28rem;
    color: #666;
  }
}
.c_pay_popup .mint-popup {
  width: 100%;
}
.c_pay_list {
  position: relative;
  img {
    position: absolute;
    left: 0rem;
    top: 50%;
    margin-top: -0.3rem;
    width: 0.6rem;
    height: 0.6rem;
  }
  i {
    color: #cccccc;
    font-size: 0.4rem;
  }
}
.c_pay_list span:first-child {
  padding-left: 0.9rem;
}
.btn_border,
.btn {
  padding: 0.1rem 0.6rem;
}
</style>
