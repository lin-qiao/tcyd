<!--弹窗-信息框-->
<template>
  <div v-if="isShowLoading" class="alert_loading">
    <span>{{loading}}</span>
  </div>
</template>

<script>

export default {
  data(){
    return{
      isShowLoading:false,
    }
  },
  props:{
  	loading:{//加载文字
  		default:'loading'
  	}
  },
  methods: {
  	//开启
    alertLoadingFn (){
      this.isShowLoading = true;
    },
    //关闭
    closeLoadingFn (){
    	this.isShowLoading = false;
    }
  }
}
</script>

<style lang="less" scoped>
.alert_loading{
  position: fixed;
  left: 50%;
  top: 50%;
  width: 2rem;
  height: 2rem;
  margin-top: -1rem;
  margin-left: -1rem;
  z-index: 2000;
  background: rgba(0,0,0,0.5) url(~src/images/alert_loading.gif) no-repeat center 30%;
  text-align: center;
  border-radius: .3rem;
  background-size:.6rem;
  color: #fff;
}
.alert_loading span{
  display: block;
  margin-top: 1.2rem;
}
</style>
