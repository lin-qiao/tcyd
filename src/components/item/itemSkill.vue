<template>
	<div class="user_msg">
		<div>
			<strong class="f30 c_333">{{skillInfo.name}}</strong>
			<!-- <i class="iconfont icon-pingfen c_main" v-if="isGrade"></i>
			<i class="iconfont icon-pingfen c_main" v-if="isGrade"></i> -->
			<!--<img v-if="isGrade" :src="skillInfo.gradeImg | imgUrl" style="height: 0.3rem"/>-->
		</div>
		<div class="c_999 f24 mt20"> 
        <em class="f26 mlr10" v-if="isDay">
      	    <i v-if="skillInfo.requireStatus!='expired'">{{skillInfo.overdueTime>=0?skillInfo.overdueTime:0}}天后过期</i>
      	    <i v-if="skillInfo.requireStatus=='expired'">需求已过期</i>
        </em>
        <span v-if="!showCreateTime">发布时间：{{skillInfo.time}}</span>
    </div>
		<div class="c_666 f24 mt10 skill_createTime" v-if="showCreateTime">{{skillInfo.addDate}} 创建</div>
		<div class="user_avatar">
			<img :src="skillInfo.imgIcon | imgUrl" class="skill_avatar"/>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {}
  },
  components: {},
  props: {
    skillInfo: {
      //信息
      type: Object
    },
    isGrade: {
      //是否展示等级
      default: true
    },
    isDay: {
      //是否展示天数
      default: false
    },
    showCreateTime: {
      //是否展示创建时间
      default: false
    }
  },
  mounted() {},
  methods: {},
  watch: {}
}
</script>