<template lang="html">
    <div class="pb121">
    	<top title="<span class='middle'>同城</span><em class='title_circle mlr10'>●</em><span class='middle'>编辑技能</span>"></top>
        <message text="请勿发布黄赌毒类低俗隐晦内容，为了防止收到干扰，请不要泄露"></message>
        <itemSkill :skillInfo="skillInfo"></itemSkill>
        <ul class="vertical_nav_list">
             <router-link class="nav_item"  :to="'/skillPublish?skillCategory='+skillCategory+'&skillSubCategory='+skillSubCategory+'&skillId='+skillId">
                <div class="left">
                    <h3><em></em>技能信息</h3>
                    <p>编辑您的技能介绍、语音介绍、优势等信息</p>
                </div>
                <div class="right">
                    <i class="iconfont icon-arrow-right f30"></i>
                </div>
           </router-link>
            <router-link class="nav_item"  :to="'/serviceType?skillCategory='+skillCategory+'&skillSubCategory='+skillSubCategory+'&skillId='+skillId">
                <div class="left">
                    <h3><em></em>技能方式</h3>
                    <p>编辑您的服务方式、价格、时间等信息</p>
                </div>
                <div class="right">
                    <i class="iconfont icon-arrow-right f30"></i>
                </div>
            </router-link>
        </ul>
        <ul class="vertical_nav_list">
            <!-- <li class="nav_item">
                <div class="left">
                    <h3><i class="iconfont icon-shipin"></i>视频介绍<span class="f24 c_999">（选填）</span></h3>
                    <p>录制一段视频展现您的技能或个人介绍</p>
                </div>
                <div class="right">
                    <router-link class="right_btn" :to="'/videoIntroduce?skillId='+skillId">去完善</router-link>
                    <!-- <span>89%用户已完善</span> -->
                <!-- </div>
            </li> -->
            <li class="nav_item">
                <div class="left">
                    <h3><i class="iconfont icon-jiaoyu"></i>教育经历<span class="f24 c_999">（选填）</span></h3>
                    <p>添加您的教育经历</p>
                </div>
                <div class="right">
                    <router-link class="right_btn" :to="'/education?skillId='+skillId">{{education}}</router-link>
                    <!-- <span>89%用户已完善</span> -->
                </div>
            </li>
            <li class="nav_item">
                <div class="left">
                    <h3><i class="iconfont icon-gongzuojingli"></i>工作经历<span class="f24 c_999">（选填）</span></h3>
                    <p>添加您的工作经历</p>
                </div>
                <div class="right">
                    <router-link class="right_btn" :to="'/work?skillId='+skillId">{{work}}</router-link>
                    <!-- <span>89%用户已完善</span> -->
                </div>
            </li>
            <li class="nav_item">
                <div class="left">
                    <h3><i class="f34 iconfont icon-jiangzhang "></i>荣誉资质<span class="f24 c_999">（选填）</span></h3>
                    <p>添加与技能相关的荣誉资质</p>
                </div>
                <div class="right">
                    <router-link class="right_btn" :to="'/honor?skillId='+skillId">{{honor}}</router-link>
                    <!-- <span>89%用户已完善</span> -->
                </div>
            </li>
            <li class="nav_item">
                <div class="left">
                    <h3><i class="iconfont icon-wenti"></i>专业问答<span class="f24 c_999">（选填）</span></h3>
                    <p>添加与技能相关的专业问答</p>
                </div>
                <div class="right">
                    <router-link class="right_btn" :to="'/ask?skillId='+skillId">{{answer}}</router-link>
                    <!-- <span>89%用户已完善</span> -->
                </div>
            </li>
        </ul>
        <router-link class="per_btn" to="/skillAudit">
            <div class="btn_block mtb20">确定</div>
       </router-link>
    </div>
</template>

<script>
import itemSkill from 'src/components/item/itemSkill'
import message from 'src/components/notice/message'
import { fetchskillDetails } from '../service/getData' //技能详情
import {
    fetchGetWorkList,  //获取工作经历列表
    fetchGetEducationList,//获取教育经历列表
    fetchGetAnswerList,//获取技能问答列表
    fetchGetHonorList,  //获取技能荣誉列表
} from '../../skillManage/service/getData'
export default {
  data() {
    return {
      skillId: '', //当前用户技能Id
      skillCategory: '', //父类id
      skillSubCategory: '', //子类id
      work:'',//工作列表长度		
      education:'',//教育列表长度
      answer:'',//技能问答列表长度
      honor:'',//荣誉列表长度
      skillInfo: {
        name: '',
        grade: '',
        gradeImg: '',
        time: '',
        imgIcon: ''
      }
    }
  },
  components: {
    message,
    itemSkill
  },
  activated() {
    this.skillId = this.$route.query.skillId //当前用户技能Id
    this.skillCategory = this.$route.query.skillCategory //父类id
    this.skillSubCategory = this.$route.query.skillSubCategory //子类id
    fetchskillDetails(this.skillId).then(res => {
      //获取技能详情
      let data = res.data.data
      //   this.skillInfo = res.data
      this.skillInfo.name = data.skillName
      this.skillInfo.grade = data.integralGrade // 技能等级
      this.skillInfo.gradeImg = data.levelImg // 技能等级图片
      this.skillInfo.time = data.addDate
      this.skillInfo.imgIcon = data.categoryImg //技能图片
      this.skillSubCategory = data.skillSubCategory
    })
    this.getWorkList()//获取工作经历列表
    this.getEducationList()//获取教育经历列表
    this.getAnswerList()//获取技能问答列表
    this.getHonorList()//获取技能荣誉列表
  },
  methods:{
      //获取工作经历列表
        getWorkList(){
            fetchGetWorkList(this.skillId).then(res => {
                if(res.status){
                    this.work=res.data.list.length>0?'已完善':'可完善'
                }else{
                    alertTip(res.msg);
                }
            });
        },
        //获取教育经历列表
        getEducationList(){
            fetchGetEducationList(this.skillId).then(res => {
                if(res.status){
                    this.education=res.data.list.length>0?'已完善':'可完善'
                }else{
                    alertTip(res.msg)
                }
            });
        },
        //获取技能问答列表
        getAnswerList(){
            fetchGetAnswerList(this.skillId).then(res => {
                if(res.status){
                    this.answer=res.data.list.length>0?'已完善':'可完善'
                }else{
                    alertTip(res.msg)
                }
            });
        },
        //获取技能荣誉列表
        getHonorList(){
            fetchGetHonorList(this.skillId).then(res => {
                if(res.status){
                    this.honor=res.data.list.length>0?'已完善':'可完善'
                }else{
                    alertTip(res.msg);
                }
            });
        },
  }
}
</script>

<style lang="less" scoped>
@import (reference) '~src/style/all.less';
.vertical_nav_list {
  padding-left: 0.3rem;
  border-top: 0.2rem solid @bg_color;
  .nav_item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 1.3rem;
    padding-right: 0.3rem;
    .border-b(@border_color);
    .left {
      h3 {
        font-size: 0.28rem;
        position: relative;
        padding-left: 0.4rem;
        em {
          width: 0.05rem;
          height: 0.3rem;
          background: @color;
          position: absolute;
          top: 0;
          left: 0;
        }
        .iconfont {
          position: absolute;
          top: 0;
          left: 0;
          color: #ccc;
          font-size: 0.3rem;
        }
      }
      p {
        color: #999;
        padding-left: 0.4rem;
        margin-top: 0.15rem;
      }
    }
    .right {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-flow: column;
      span {
        color: #999;
        margin-top: 0.15rem;
      }
      .right_btn {
        width: 1.45rem;
        height: 0.56rem;
        line-height: 0.56rem;
        text-align: center;
        .border(@color);
        color: @color;
        border-radius: 0.3rem;
      }
    }
    &:last-child {
      border-bottom: none;
    }
  }
}
.per_btn {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  background: #fff;
  .border-t(@line_color);
}
</style>
