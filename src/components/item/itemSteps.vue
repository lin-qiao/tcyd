<template lang="html">
  <div class="steps flex flex_center justify_center ptb10">
      <div class="step_item flex flex_center" v-for="(v,i) in list" :class="{current:i + 1 == index}">
          <i class="iconfont f30" :class="v.icon"></i>
          <p class="c_666">{{v.name}}</p>
      </div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            list:[
                { icon:'icon-ziliao', name:'技能信息'},
                { icon:'icon-fuwuchuangb', name:'服务方式'},
                { icon:'icon-duihao2', name:'提交成功'}
            ]
        }
    },
    props:{
        index:{
            type:String,
            default:'1'
        }
    }
}
</script>

<style lang="less" scoped>
.steps{
    .step_item{
        .iconfont{
            color: #c6c6c6;
            margin: 0 .14rem;
        }
        &:last-child{
            &::after{
                display: none;
            }
        }
        &::after{
            content: '';
            width: .65rem;
            height: .19rem;
            background: url('../images/steps_arrows.png') no-repeat;
            background-size: cover;
            margin-left: .14rem;
        }
        &.current{
            .iconfont{
                color: #ffa599;
            }
        }
    }
}
</style>
