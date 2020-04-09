<template lang="html">
  <section class="showChose" v-show="showChose">
    <div class="box" @touchmove.prevent="">
    </div>
    <section class="address">
      <section class="title">
        <div @click="closeAdd()"><a href="javascript:;">取消</a></div>
        <h4>所在地</h4>
        <div @click="saveAdd()"><a href="javascript:;">确定</a></div>
      </section>
      <section class="address_title">
        <div class="area" @click="provinceSelected()" :class="Province?'':'active'">{{Province?Province.NAME:'请选择'}}</div>
        <div class="area" @click="citySelected()" :class="City?'':'active'" v-show="Province">{{City?City.NAME:'请选择'}}</div>
        <div class="area"  :class="Area?'':'active'" v-show="City">{{Area?Area.NAME:'请选择'}}</div>
      </section>
      <ul>
        <li class="addList" v-for="(v,i) in ProList" @click="getProvinceId(v,i)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.NAME}}</li>
        <li class="addList" v-for="(v,i) in CityList" @click="getCityId(v,i)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.NAME}}</li>
        <li class="addList" v-for="(v,i) in AreaList" @click="getAreaId(v,i)" v-show="showArea" :class="v.selected ? 'active' : ''">{{v.NAME}}</li>
      </ul>
    </section>
  </section>
</template>

<script>
import address from 'src/json/region_info.json'
export default {
  data () {
    return {
      showChose: this.showCitySelect,   //插件是否显示
      showProvince: true,               //是否显示省份
      showCity: false,                  //是否显示市
      showArea:false,                   //是否显示区县
      ProList:[],                       //省数组
      CityList: [],                     //市数组
      AreaList:[],                      //区数组
      Province: false,                  //省份
      City: false,                      //市
      Area:false,                       //区
      selected: false                   // v-for循环判断是否为当前
    }
  },
  components:{
  },
  props:[
    'showCitySelect'
  ],
  mounted(){
    this.ProList = address.region_info.filter(function(e,i){
      return e.PARENT_ID == 1;
    })
    this.ProList.splice(0,5);
  },
  methods: {
    //保存地址
    saveAdd(){
      if(!this.Province){
        alertTip("请先选择省");
      }else if(!this.City){
        alertTip("请先选择市");
      }else if(!this.Area){
        alertTip("请先选择区县");
      }else{
        // 向父组件传值
        this.$emit("on-city-select",this.Province,this.City,this.Area);
        this.showChose = false;
      }
    },
    // 取消
    closeAdd() {
      this.showChose = false;
    },
    // 根据省id 获取市
    getProvinceId(pro,index) {
      this.Province = pro;
      this.showProvince=false;
      this.showCity=true;
      // 点击选择当前添加active
      this.ProList.map( a => a.selected = false );
      this.ProList[index].selected = true;
      // 根据ID获取市
      this.CityList = address.region_info.filter(function(e,i){
        return e.PARENT_ID == pro.ID;
      })
    },
    // 根据市id获取区
    getCityId(city,index){
      this.City = city;
      this.showCity = false;
      this.showArea = true;
      // 点击选择当前添加active
      this.CityList.map( a => a.selected = false );
      this.CityList[index].selected = true;
      // 根据ID获取市
      this.AreaList = address.region_info.filter(function(e,i){
        return e.PARENT_ID == city.ID;
      })
    },
    // 确认区
    getAreaId(area,index){
      this.Area = area;
      // 选择当前添加active
      this.AreaList.map( a => a.selected = false );
      this.AreaList[index].selected = true;
    },
    // 点击省份清除市级信息
    provinceSelected() {
      // 清除市级列表
      this.CityList = false;
      // 清除市级选项
      this.City = false;
      // 选项页面的切换
      this.showProvince = true;
      this.showCity = false;
      this.showArea = false;
    },
    citySelected(){
      // 清除区级列表
      this.AreaList = false;
      // 清除区级选项
      this.Area = false;
      // 选项页面的切换
      this.showArea = false;
      this.showCity = true;
      this.showProvince = false;
    }
  },
  watch:{
    showCitySelect(val){
      this.showChose = val;
    },
    showChose(val){
      this.$emit("on-showCitySelect-change",val);
    }
  }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.myAddress{
  width: 100%;
  background-color: white;
  border-top: 4px solid rgba(245,245,245,1);
  color:#333;
}
.myAddress .cont{
  border-bottom: 1px solid rgba(245,245,245,0.8);
}
.myAddress .cont span{
  display: inline-block;
  font-size: 0.28rem;
  color: #333;
  line-height: 0.88rem;
  margin-left: 0.32rem;
}
.myAddress .cont section{
  float:left;
}
.myAddress .cont p{
  display: inline-block;
  font-size: 0.28rem;
  color: #333333;
  line-height: 0.88rem;
  margin-left: 1rem;
}
.myAddress .cont .pic2{
  float: right;
  width: 0.14rem;
  height: 0.24rem;
  margin: 0.32rem 0.32rem 0.32rem 0;
}
.myAddress .cont p.text{
  margin-left: 0.72rem;
}
.showChose{
  width:100%;
  height:100%;
  position:fixed;
  top:0;
  left:0;
  z-index:120;
}
.address{
  position:absolute;
  bottom:0;
  left:0;
  z-index:130;
  background:#fff;
  width:100%;
  border-top: 1px solid #dbdbdb;
}
.title{
  display: flex;
  padding: 0 .3rem;
  justify-content:space-between;
  align-items: center;
  font-size: .28rem;
  color:#333;
}
.title h4{
  display:inline-block;
  font-size:0.32rem !important;
  line-height:0.88rem;
  font-weight:normal;
}
.title span{
  font-size:0.45rem;
  line-height:0.34rem;
}
.area{
  display:inline-block;
  font-size:0.3rem;
  line-height:0.88rem;
  margin-left:0.42rem;
  color:#333;
}
.address_title{
  border-bottom: 1px solid #dbdbdb;
}
.addList{
  padding-left:0.32rem;
  font-size:0.3rem;
  line-height:0.88rem;
  color:#333;
}
/* 修改的格式 */
.address ul{
  width:100%;
  height: 4.4rem;
  .overflow_auto;
}
.address ul li{
  margin-left:5%;
}
.address_title .active{
  color:@color;
  border-bottom:0.02rem solid @color;
}
.address ul .active{
  color:@color;
}
.box{
  position: absolute;
  left: 0;
  top:0;
  z-index:121;
  bottom: 0;
  right: 0;
  background-color: rgba(0,0,0,0.4);
}
</style>
