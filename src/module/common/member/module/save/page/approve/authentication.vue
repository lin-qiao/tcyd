<!-- 额度评估-身份信息（上传后） -->
<template lang="html">
    <div>
        <top title="身份信息" :isReturn="false"></top>
        <div class="ptb30 plr30 bg_gray">
            仅用于全国公民身份证查询中心核实身份<br>
            拍摄时请确保身份证<em class="c_orange">边框完整、字迹清晰、亮度均衡</em>
        </div>
        <div class="authen_info">
            <div class="authen_item">
                <div class="img">
                    <img :src="idcard.front_img | imgUrl" alt="">
                    <div class="img_pop" @click="$router.push('/personApprove?frontFlag=true')">
                        <i class="iconfont icon-zhaopianpaizhao f34"></i>
                        <p class="f26 mt5">重拍</p>
                    </div>
                </div>
                <div class="authen_cell">
                    <div class="authen_cell_item">
                        <span class="cell_n">姓名</span>
                        <span class="cell_c">{{idcard.name}}</span>
                    </div>
                    <div class="authen_cell_item">
                        <span class="cell_n">身份证号</span>
                        <span class="cell_c">{{idcard.idcard_number | idcard}}</span>
                        <i class="iconfont icon-zhaopianpaizhao f34 c_main"></i>
                    </div>
                </div>
            </div>
            <div class="authen_item">
                <div class="img">
                    <img :src="idcard.rear_img | imgUrl" alt="">
                    <div class="img_pop" @click="$router.push('/personApprove?rearFlag=true')">
                        <i class="iconfont icon-zhaopianpaizhao f34"></i>
                        <p class="f26 mt5">重拍</p>
                    </div>
                </div>
                <div class="authen_cell">
                    <div class="authen_cell_item">
                        <span class="cell_n">签发机关</span>
                        <span class="cell_c">{{idcard.issued_by}}</span>
                    </div>
                    <div class="authen_cell_item">
                        <span class="cell_n">有效期限</span>
                        <span class="cell_c">{{idcard.valid_date_start | time('.')}} - {{idcard.valid_date_end | time('.')}}</span>
                        <i class="iconfont icon-zhaopianpaizhao f34 c_main"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="btn_block mtb60" @click="confrim">确定</div>
        <div class="tip f26">身份证拍摄遇到问题，<em class="c_main">请点击这里>></em></div>

        <div class="layer_shadow affirm" v-if="affirmVisible">
            <section class="layer_box">
                <p class="layer_con ptb40">{{idcard.name}}<br />{{idcard.idcard_number | idcard}}</p>
                <div class="layer_btn inquiry_btn">
                    <div class="close_btn" @click="affirmVisible = false">返回修改</div>
                    <div class="confirm_btn" @click="setIdcard" >确认无误<em v-if="time > 0">({{time}}s)</em></div>
                </div>
            </section>
        </div>
        <div class="layer_shadow" v-if="restartVisible">
            <section class="layer_box">
                <i class="iconfont icon-close1" @click="restartVisible = false"></i>
                <img src="~src/images/ico_2.png" alt="">
                <p class="ptb45 f30 text_center">身份证已过期，请重新上传</p>
                <div class="layer_btn">
                    <div class="btn max">立即上传</div>
                </div>
            </section>
        </div>
        <div class="layer_shadow" v-if="errorVisible">
            <section class="layer_box">
                <i class="iconfont icon-close1" @click="errorVisible = false"></i>
                <img src="~src/images/ico_2.png" alt="">
                <p class="ptb45 f30 text_center">身份信息与人脸识别信息不符<br>请重新认证</p>
                <div class="layer_btn">
                    <div class="btn min mlr20">身份认证</div>
                    <div class="btn min mlr20">人脸识别</div>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
import {
    fetchGetmemberbyidcard, //合伙人根据身份证判断是否在平台认证
    fetchSaveidcardinfo, //合伙人身份证号实名认证
} from '../../service/getData';

export default {
    data(){
        return{
            time:5,
            restartVisible:false,
            errorVisible:false,
            affirmVisible:false,  //确认弹窗
        }
    },
    computed:{
        ...mapState([
            'idcard'
        ])
    },
    mounted(){


    },
    methods:{
        confrim(){
            if(!this.idcard.name){
                alertTip('姓名识别错误，请重新上传');
                return;
            };
            if(this.isCardID(this.idcard.idcard_number) !== true){
                alertTip('身份证号识别错误，请重新上传');
                return;
            }
            if(!this.idcard.issued_by){
                alertTip('签发机关识别错误，请重新上传');
                return;
            }
            if(!this.idcard.valid_date_start || !this.idcard.valid_date_end){
                alertTip('有效日期识别错误，请重新上传');
                return;
            }
            // 判断是否实名认证过
            fetchGetmemberbyidcard(this.idcard.idcard_number).then(res => {
                //认证过
                if(!res.data.existFlag){
                    this.$confirm({
                        layerImg:'',
                        showClose:false,
                        content:`<p class="mt30">此身份已与其他用户（手机尾号：${res.data.mobile} ）绑定，请重新认证</p>`,
                        confirmBtn:'重新认证',
                        confirm:()=>{
                            // 初始化身份证信息
                            this.$store.commit('CLEAR_IDCARD');
                            this.$router.push('/personApprove?frontFlag=true&rearFlag=true');
                        }
                    })
                }
                //没认证，显示确认弹窗
                else{
                    this.time = 5;
                    this.affirmVisible = true;
                    let t = setInterval(()=>{
                        this.time -- ;
                        if(this.time <= 0){
                            clearInterval(t);
                        }
                    },1000)
                }
            })
        },
        // 实名认证
        setIdcard(){
            if(this.time > 0){
                return;
            }
            const data = {
                realName:this.idcard.name,
                cardNo:this.idcard.idcard_number,
                idCardFrontSide:this.idcard.front_img,
                idCardBackSide:this.idcard.rear_img,
                signOffice:this.idcard.issued_by,
                idCardStart:this.$options.filters.time(this.idcard.valid_date_start,'-'),
                idCardEnd:this.$options.filters.time(this.idcard.valid_date_end,'-')
            }
            fetchSaveidcardinfo(data).then(res => {
                if(res && res.status){
                    alertTip('身份认证成功',()=>{
                        this.$router.push('/faceApprove');
                    });
                }
            })
        }
    },
    filters:{
        idcard(val){
            val = String(val);
            return val.substring(0,6) + ' ' + val.substring(6,14) + ' ' + val.substring(14);
        },
        time(val,sign){
            val = String(val);
            return val.substring(0,4) + sign + val.substring(4,6) + sign + val.substr(6);
        }
    }
}
</script>

<style lang="less" scoped>
@import (reference) "~src/style/all.less";
.ptb40{
    padding-top: .4rem;
    padding-bottom: .4rem;
}
.authen_item{
    display: flex;
    align-items: center;
    padding-left: .3rem;
    .border-b(@line_color);
    .img{
        width: 1.2rem;
        height: 1.2rem;
        overflow: hidden;
        position: relative;
        img{
            max-width: 100px;
        }
        .img_pop{
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            width: 100%;
            height: 100%;
            position: absolute;
            top:0;
            left: 0;
            background:rgba(0,0,0,.3);
            color: #fff;
        }
    }
    .authen_cell{
        flex:1;
        margin-left: .3rem;
        .authen_cell_item{
            display: flex;
            height: 1.1rem;
            line-height: 1.1rem;
            padding-right: .3rem;
            &:first-child{
                .border-b(@line_color);
            }
            .cell_n{
                width: 1.5rem;
            }
            .cell_c{
                flex:1;
            }
        }
    }
}
.tip{
    position: fixed;
    bottom: 1.35rem;
    left: 0;
    right: 0;
    text-align: center;
}
.layer_btn{
    width: auto;
}
.layer_box{
    padding-top: .7rem;
    img{
        width: 1.44rem;
        height: 1.9rem;
    }
    p{
        line-height: 2;
    }
    .max{
        width: 3.4rem;
    }
    .min{
        width: 2.25rem;
    }

}
.affirm{
    .layer_box{
        padding-top: .2rem;
    }
    .layer_btn{
        width: 100%;
    }
}
</style>
