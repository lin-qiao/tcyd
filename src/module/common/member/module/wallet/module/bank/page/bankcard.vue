<template>
	<div class="router_page y_bankcard bg_gray">
		<!-- S 头部-->
		<top title="绑定银行卡"></top>
		<!-- E 头部-->
		<div class="y_bankcard_con">
			<ul class="y_bankcard_list">
				<li class="y_bankcard_item" v-for="el in bankList">
					<a href="javascript:void(0);" @click="selectCard(el)">
						<img src="../../../images/icon_card_2.png" alt="">
						<div class="y_bankcard_info">
							<div class="y_bankcard_name">{{el.bankName}}<span class="ml10 f20" v-if="el.isDefault!='N'">默认</span></div>
							<div class="y_bankcard_identity"><span class="mr5">{{el.realName | format('realName')}}</span>（{{idNumber | format('idNumber')}}）</div>
							<div class="y_bankcard_cardId">{{el.cardNo|format('bankCard')}}</div>
						</div>
					</a>
					<div v-if="el.id==id" class="y_bankcard_drop">
						<div class="y_bankcard_close" @click="id=''"><i class="iconfont icon-close1"></i></div>
						<div class="y_bankcard_operation">
							<span class="y_bankcard_edit" @click="editBank(el)">编辑</span>
							<span class="y_bankcard_del" @click="id='',deleteBankFu(el.id)" v-if="el.isDefault!='Y'">删除</span>
						</div>
					</div>
				</li>
				<li v-if="bankList.length<3"  class="y_bankcard_item add">
					<a href="javascript:void(0);" @click="addBankCard">
						<div class="y_add_card">
							<div class="y_bankcard_icon"><i class="iconfont icon-icon1"></i></div>
							<p>添加银行卡</p>
						</div>
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
//个人认证信息
import { fetchMemberGetMemberInfo } from 'src/module/common/member/module/save/service/getData'
//银行卡列表,删除银行卡
import { fetchBankList, fetchDeleteBank } from '../service/getData'
import { setStore } from 'src/config/mUtils'
export default {
  data() {
    return {
      checkStatus: 'success', //个人认证状态
      bankList: [], //银行卡列表
      bankNo:0,//已添加银行卡数量
      id: '', //银行卡id
      idNumber: '' //身份证号
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.id = ''
    this.bankListFu()
    next()
  },
  activated() {
    this.bankListFu() //获取银行卡列表
    this.getQualifyResult() //获取个人认证状态
  },
  methods: {
    getQualifyResult() {//获取个人认证状态
        fetchMemberGetMemberInfo().then(res => {
            if (res.status) {
                let data = res.data.memberRealName;
                if(!data || data.checkStatus=="auth_pass"){
                	this.$alert({
				        confirmBtn: '立即实名认证',
				        content:"<div><h3 class='f30'>请您先实名认证</h3><p class='f26 c_888 mt10'>为保证交易安全请您先实名认证</p></div>",
				        confirm: () => {
				        	if (!data) {
				        		this.$router.push('/personApprove')
				        	}else if(data.checkStatus=="auth_pass"){
				        		this.$router.push('/faceApprove')
				        	}
				            
				        },
				        close:()=>{
				        	this.$router.go(-1);
				        }
		           })
                }
            }
        })
    },
    addBankCard() {
      //添加银行卡
        this.$router.push('/wallet/addBankcard?bankNo='+(this.bankNo||''))
    },
    //选择银行卡
    selectCard(data) {
      var withdraw = this.$route.query.withdraw
      if (withdraw == 'withdraw') {
        this.$store.state.bankCardId = data.id //银行卡id
        this.$store.state.bankCardNo = data.cardNo //银行卡号
        this.$store.state.bankCardName = data.bankName //开户行
        this.$router.push('/wallet/withdraw')
      } else {
        this.id = data.id //银行卡id
        return
      }
    },
    bankListFu() {
      //银行卡列表
      fetchBankList().then(res => {
        if (res.code == '000') {
          this.idNumber = res.data.idNumber //身份证号
          this.bankNo = res.data.bankNo;
          this.bankList = res.data.list || [] //银行卡列表
        }
      })
    },
    editBank(obj) {
      //编辑银行卡
      setStore('editBank', obj)
      this.$router.push(`/wallet/addBankcard?id=${obj.id}`)
    },
    deleteBankFu(id) {
      //删除银行卡
      fetchDeleteBank(id).then(res => {
        if (res.code == '000') {
          alertTip(res.msg)
          this.bankListFu()
        }
      })
    }
  }
}
</script>
<style lang="less">
@import (reference) '~src/style/all';
/* S 银行卡列表*/
.y_bankcard {
  height: 100%;
  display: flex;
  flex-direction: column;
  .y_bankcard_con {
    flex: 1;
    background: #f3f3f3;
    padding: 0.4rem 0.3rem;
  }
  .y_bankcard_item {
    position: relative;
    height: 2.18rem;
    margin-bottom: 0.36rem;
  }
  .y_bankcard_item a {
    display: flex;
    height: 100%;
    padding: 0.33rem 0.5rem;
    .gradient(#fe6f79, #fd7678);
    border-radius: 5px;
    img {
      width: 0.83rem;
      height: 0.83rem;
      .border-radius(50%);
    }
    .y_bankcard_info {
      color: #fff;
      margin-left: 0.4rem;
    }
    .y_bankcard_name {
      margin-top: 0.04rem;
      font-size: 0.28rem;
      span {
        .border(#fff);
        display: inline-block;
        height: 0.3rem;
        line-height: 0.28rem;
        padding: 0 0.08rem;
      }
    }
    .y_bankcard_identity {
      margin-top: 0.05rem;
      font-size: 0.24rem;
    }
    .y_bankcard_cardId {
      margin-top: 0.26rem;
      font-size: 0.32rem;
    }
  }
  .y_bankcard_item.add a {
    padding: 0;
    .y_add_card {
      width: 100%;
      height: 1.55rem;
      margin-top: 0.65rem;
      background: #fff;
      border: 1px solid #e5e5e5;
      border-top: none;
      border-bottom-left-radius: 5px;
      border-bottom-right-radius: 5px;
    }
    .y_bankcard_icon {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 0.75rem;
      height: 0.75rem;
      background: #fff;
      border-radius: 50%;
      margin: -0.25rem auto 0;
      .iconfont {
        font-size: 0.5rem;
        color: #c4c4c4;
      }
    }
    p {
      text-align: center;
      margin-top: 0.15rem;
      font-size: 0.26rem;
    }
  }
  .y_bankcard_drop {
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 5px;
    position: absolute;
    top: 0;
    left: 0;
    color: #fff;
  }
  .y_bankcard_close {
    position: absolute;
    top: 0.15rem;
    right: 0.15rem;
    .iconfont {
      font-size: 0.4rem;
    }
  }
  .y_bankcard_operation {
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.32rem;
    .y_bankcard_del {
      padding-left: 0.65rem;
      border-left: 1px solid #fff;
    }
    .y_bankcard_edit {
      padding-right: 0.65rem;
      
    }
  }
}
/* E 银行卡列表*/
</style>


