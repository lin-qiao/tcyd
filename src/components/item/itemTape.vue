<template lang="html">
    <div class="item_tape">
        <div class="item_tape_btn" @click="isShow = true">
            <i class="iconfont icon-msnui-mic-inverse f42"></i>
            <p class="f22">添加语音</p> 
        </div>
        <div class="bg_black" v-if="isShow"></div>
        <transition name="page-slide-bottom">
            <div class="item_tape_main" v-if="isShow">
                <div class="item_tape_close" @click="_stopVoice(1)">
                    <i class="iconfont icon-close1"></i>
                </div>
                <div class="item_tape_start" v-if="step == 1">
                    <img src="../images/tape_start.png" alt="" @click="_startRecord" >
                    <p class="p2">点击开始录音，最多录制60秒</p>
                </div>
                <div class="item_tape_ing" v-else-if="step == 2">
                    <p class="p1">已录制<em class="c_main">{{time}}</em>秒</p>
                    <div class="item_tape_img"  @click="_stopRecord">
                        <div class="img_bg"></div>
                        <i class="icon"></i>
                    </div>
                </div>
                <div class="item_tape_end"  v-else>
                    <p class="p1">已录制<em class="c_main">{{time}}</em>秒，点击试听</p>
                    <div class="item_tape_img">
                        <div class="item_tape_restart" @click='_stopVoice(2)'>
                            <img src="../images/tape_restart.png" alt="">
                            <p class="c_999">重新录制</p>
                        </div>
                        <div class="item_tape_end" @click='_playVoice'>
                            <img src="../images/tape_end.png" alt="">
                        </div>
                        <div class="item_tape_success" @click='_uploadVoice'>
                            <img src="../images/tape_success.png" alt="">
                            <p class="c_main">录制完成</p>
                        </div>
                    </div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      isShow: false,
      step: 1,
      time: 0, //录制时间
      t: '' //定时器
    }
  },
  methods: {
    _startRecord() {
      this.t = setInterval(() => {
        this.time += 1
      }, 1000)
      this.step = 2
      this.$emit('startRecord')
    },

    _stopRecord() {
      this.step = 3
      clearInterval(this.t)
      this.$emit('stopRecord')
    },
    _playVoice() {
      this.$emit('playVoice')
    },
    _stopVoice(i) {
      if (i == 1) {
        this.isShow = false
      }
      if (i == 2) {
        this.step = 1
        this.time = 0
      }
      this.$emit('stopVoice')
    },
    _uploadVoice() {
      this.isShow = false
      this.$emit('uploadVoice')
    }
  }
}
</script>

<style lang="less" scoped>
@keyframes rotate {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.bg_black {
  width: 7.5rem;
  position: fixed;
  top: 0;
  left: 50%;
  bottom: 0;
  margin-left: -3.75rem;
  background: rgba(0, 0, 0, 0.6);
}
.item_tape {
  .item_tape_btn {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 1.2rem;
    height: 1.2rem;
    border: 1px solid #dbdbdb;
    border-radius: 0.05rem;
    color: #999;
    .iconfont {
      margin-bottom: 0.05rem;
      color: #cfcfcf;
    }
  }
  .item_tape_main {
    height: 4rem;
    background: #fff;
    width: 7.5rem;
    position: fixed;
    left: 50%;
    bottom: 0;
    margin-left: -3.75rem;
    .item_tape_close {
      position: absolute;
      right: 0.43rem;
      top: 0.23rem;
      .iconfont {
        font-size: 0.46rem;
      }
    }
    .item_tape_start {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      img {
        width: 1.9rem;
        height: 1.9rem;
      }
    }
    .item_tape_ing {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item_tape_img {
        width: 1.9rem;
        height: 1.9rem;
        position: relative;
        .img_bg {
          width: 1.9rem;
          height: 1.9rem;
          background: url(../images/tape_ing.png) no-repeat;
          background-size: cover;
          animation: rotate 5s linear infinite;
        }
        .icon {
          display: block;
          width: 0.79rem;
          height: 0.62rem;
          background: url(../images/tape_ing_icon.png) no-repeat;
          background-size: cover;
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          margin: auto;
        }
      }
    }
    .item_tape_end {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      .item_tape_img {
        display: flex;
        justify-content: center;
        align-items: center;
        .item_tape_end {
          width: 1.9rem;
          height: 1.9rem;
          margin: 0 0.7rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .item_tape_restart,
        .item_tape_success {
          width: 1.35rem;
          height: 1.35rem;
          img {
            width: 100%;
            height: 100%;
          }
          p {
            font-size: 0.26rem;
            line-height: 0.26rem;
            text-align: center;
          }
        }
      }
    }
    .p1 {
      font-size: 0.26rem;
      position: absolute;
      top: 0.3rem;
      text-align: center;
    }
    .p2 {
      font-size: 0.26rem;
      color: #666;
      position: absolute;
      bottom: 0.55rem;
      text-align: center;
    }
  }
}
</style>
