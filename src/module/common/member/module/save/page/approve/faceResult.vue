<!-- 人脸识别认证结果 -->
<template lang="html">
    <div class="face_result">
        <top title="人脸识别" :isReturn="false"></top>
        <div class="result">
            <template v-if="status == 1">
                <img src="../../images/l_success.png" style="margin-top:-3rem;">
                <p class="f30 mt35">恭喜您认证成功</p>
                <!-- <p class="f28 mt20">亲，人脸识别正在认证中，请稍后</p> -->
            </template>
            <template v-else>
                <img src="~src/images/ico_2.png" alt="">
                <p class="p1">很遗憾，人脸识别失败请重新识别<br>失败原因：接口返回失败原因</p>
                <div class="btn_block mt45">重新识别</div>
                <div class="tip">
                    <p class="tip_tit c_main">如何提高成功率？</p>
                    <div class="bubble_box">
                        <p>1、确保人脸出现在视频里；</p>
                        <p>2、摘下眼镜并露出耳朵</p>
                        <p>3、保持光线充足和均匀；</p>
                        <p>4、通畅的网络更容易检测成功</p>
                    </div>
                </div>
            </template>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      status: 1
    }
  }
}
</script>

<style lang="less" scoped>
.face_result {
    height: 100%;
    display: flex;
    flex-direction: column;
}
.result {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    img {
        height: 2.3rem;
        width: auto;
    }
    .p1 {
        line-height: 0.42rem;
        font-size: 0.26rem;
        margin-top: 0.4rem;
        text-align: center;
    }
    .tip{
        margin-top: 2.1rem;
        .tip_tit{
            height: .7rem;
            line-height: .7rem;
            text-align: center;
            font-size: .26rem;
            margin-bottom: .2rem;
        }
        .bubble_box{
            display: flex;
            flex-wrap: wrap;
            p{
                width: 50%;
                font-size: .24rem;
                line-height: 2;
                color: #666;
            }
        }
    }
}
</style>
