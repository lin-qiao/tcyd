<template>
    <div class="router_page bg_gray remain_detail_page">
        <top title="查看详情" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <!-- S 内容-->
        <div class="f_notice_detail_box">
          <div class="f_notice_detail mb20">
            <div class="f_notice_tit"><i class="iconfont icon-choosehandle f_noticetit_left"></i>关于上线提醒订阅说明</div>
            <div class="f_notice_note">
              <div class="f28">
              	1.订阅为用户自愿行为，订阅当日开始生效。成功订阅者将收到平台推送的上线通知；<br>
				2.订阅服务者上线提醒服务，订阅服务{{$store.state.onlineRemindPrice}}元/月，订阅所产生的费用从账户中扣除；<br>
				3.上线提醒服务自动延期，当账户余额不足扣费失败时上线提醒服务将暂停，待余额足够扣费成功时上线提醒服务继续；<br>
				4.退订该服务，可咨询客服进行操作；<br>
				5.最终解释权归大德通所有。
              </div>
            </div>
            <div class="f_notice_company">
              <p>山西大德通科技有限公司</p>
              <p></p>
            </div>
          </div>
          <div class="f_notice_detail f_warmtip">
            <p>温馨提示：如您有任何问题请联系</p>
            <p>服务热线：{{$store.state.telephone}}</p>
            <a class="f_contract" :href="contactKF">
              <i class="iconfont icon-kefu"></i>在线客服
            </a>
          </div>	
        </div>
        <!-- E 内容 -->
    </div>
</template>
<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.remain_detail_page{
	z-index: 2001;
}
.f_notice_detail_box {
  width: 100%;
  height: 100%;
  background: #F5F5F5;
  padding: 0.3rem;
}

.f_notice_detail {
  width: 100%;
  background: #FFFFFF;
  border-radius: 0.04rem;
}

.f_notice_tit {
  position: relative;
  width: 100%;
  font-size: 0.32rem;
  padding: 0.3rem 0.2rem 0.3rem 0.7rem;
  border-bottom: 0.01rem solid #e5e5e5;
  overflow: hidden;
}

.f_noticetit_left {
  position: absolute;
  display: inline-block;
  color: #dd2729;
  margin-right: 0.06rem;
  font-size: 0.4rem;
  vertical-align: middle !important;
  left: 0.2rem;
  top: 0.26rem;
}

.f_notice_note {
  margin: 0 0.26rem;
  padding: 0.3rem 0;
  border-bottom: 0.01rem solid #e5e5e5;
  overflow: hidden;
  img{
    max-width: 100%;
  }
}

.f_notice_note {
  line-height: 0.46rem;
  font-size: 0.28rem;
}

.f_notice_company {
  padding: 0.2rem 0.3rem;

  p {
    line-height: 0.44rem;
    text-align: right;
    font-size: 0.24rem;
  }
}

.f_warmtip {
  padding: 0.2rem 0.3rem;
  margin-top: 0.16rem;
  position: relative;

  p {
    font-size: 0.26rem;
    line-height: 0.48rem;
    color: #888;
  }
}

.f_contract {
  font-size: 0.26rem;
  color: #dd2729;
  position: absolute;
  top: 0.45rem;
  right: 0.4rem;

  i {
    font-size: 0.4rem;
    margin-right: 0.04rem;
    vertical-align: middle !important;
  }
}
</style>
