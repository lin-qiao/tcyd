<!-- 身份认证失败说明 -->
<template>
    <div>
        <top title="身份认证失败说明" :isReturn="false" v-if="$store.state.platform=='wx'"></top>
        <div class="plr30 ptb30">
            <p>1.必须是本人身份证，否则将无法通过，且无法重新申请</p>
            <p class="mb0">2. [提高身份证通过率] ，保持身份证内容清晰可辨</p>
            <p>
                a.整张身份证 置于拍摄区域内，并对齐框边缘<br>
                b.保持 光线充足，避免反光<br>
                c.点击屏幕自动 对焦，拍摄过程中减少手机晃动
            </p>
            <div class="img1">
                <img src="~src/images/authentication_fail_1.png" alt="">
                <p>保持摄像头清洁，证件后面建议垫上一张白纸</p>
            </div>
            <div class="error">
                <p class="c_main">[错误示例]</p>
                <div class="error_wrap">
                    <div class="error_item">
                        <img src="~src/images/authentication_fail_2.png" alt="">
                        <p>没对焦，点击屏幕对焦</p>
                    </div>
                    <div class="error_item">
                        <img src="~src/images/authentication_fail_3.png" alt="">
                        <p>反光有亮斑，调整一下位置</p>
                    </div>
                    <div class="error_item">
                        <img src="~src/images/authentication_fail_4.png" alt="">
                        <p>不完整，置于拍摄区域内</p>
                    </div>
                    <div class="error_item">
                        <img src="~src/images/authentication_fail_5.png" alt="">
                        <p>临时身份证，或其他证件</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
	data(){
        return{
          
        }
    }
}
</script>

<style lang="less" scoped>
p{
    margin-bottom: .3rem;
    line-height: .44rem;
}
.mb0{
	margin-bottom: 0;
}
.img1{
    text-align: center;
    img{
        width: 4.81rem;
        height: 3.06rem;
    }
}
.error{
    margin-top: 1.2rem;
    .error_wrap{
        display: flex;
        flex-wrap: wrap;
    }
    .error_item{
        width: 50%;
        text-align: center;
    }
    img{
        width: 3.17rem;
        height: 2.07rem;
    }
}
</style>
