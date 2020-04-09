<template>
  <div>
    <top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>全部分类</span>"></top>
    <div class="nav_menus">
      <ul class="nav_list">
        <li class="nav_item" :class="{current:v.skillId == fid}" @click="changeFirst(v)" v-for="v in firstList">{{v.name}}</li>
      </ul>
    </div>
    <div class="skill_type_list">
      <div class="skill_type_box">
        <h2 class="skill_type_tit">{{fName}}</h2>
        <ul class="skill_list">
          <li class="skill_item" v-for="el in secondList" @click="routerSearch(el)">
            <img :src="el.icon|imgUrl" alt="el.name">
            <p>{{el.name}}</p>
          </li>

        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/javascript">
//一级分类列表，二级分类列表
import {
  fetchRequireFirstList,
  fetchRequireSecondList
} from '../../demandPublish/service/getData'
export default {
  data() {
    return {
      firstList: [], //第一类目集合
      secondList: [], //第二类目集合
      fid: 0, //选中一级类目 id
      fName: '' //选中一级类目 名称
    }
  },
  components: {},
  watch: {
    fid: function() {
      //只要 一级类目 选中值有变化 则修改二级类目
      if (parseInt(this.fid) <= 0) {
        //错误值
        return
      }
      fetchRequireSecondList(this.fid).then(res => {
        this.secondList = res.data.list
      })
    }
  },
  methods: {
    changeFirst(checkedObj) {
      this.fid = checkedObj.skillId
      this.fName = checkedObj.name
    },
    routerSearch(el) {
      this.$router.push(
      	'/search?skillId='+el.skillId+'&name='+el.name
      )
    }
  },
  mounted() {
    //默认读取第一级类目
    fetchRequireFirstList().then(res => {
      let firstList = res.data.list
      this.firstList = firstList
      //获取列表 第一个 技能 Id(默认选中)
      this.fName = firstList[0].name
      this.fid = firstList && firstList.length > 0 ? firstList[0].skillId : 0
    })
  }
}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.nav_menus {
  width: 1.9rem;
  top: 0.89rem;
  position: absolute;
  bottom: 0;
  left: 0;
  background: #fff;
  .overflow_scroll;
  .nav_item {
    height: 0.88rem;
    line-height: 0.88rem;
    font-size: 0.26rem;
    text-align: center;
    border-bottom: 1px solid @border_color;
    position: relative;
    &.current {
      background: #f5f5f5;
      color: @color;
      &::before {
        content: '';
        display: block;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        width: 0.04rem;
        background: @color;
      }
    }
  }
}
.skill_type_list {
  position: absolute;
  top: 0.89rem;
  left: 1.9rem;
  right: 0;
  bottom: 0;
  background-color: #f5f5f5;
  padding: 0 0.2rem;
  .overflow_scroll;
  .skill_type_tit {
    height: 0.7rem;
    line-height: 0.7rem;
    font-size: 0.24rem !important;
  }
  .skill_list {
    display: flex;
    flex-flow: wrap;
    background: #fff;
    padding-bottom: 0.3rem;
  }
  .skill_item {
    width: 33.33%;
    text-align: center;
    margin-top: 0.55rem;
    &:nth-child(-n + 3) {
      margin-top: 0.3rem;
    }
    img {
      display: block;
      width: 0.75rem;
      height: 0.75rem;
      margin: 0 auto;
    }
    p {
      margin-top: 0.1rem;
      color: #666;
    }
  }
}
</style>
