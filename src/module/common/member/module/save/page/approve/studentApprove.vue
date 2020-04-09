<!-- 大学生认证 -->
<template lang="html">
    <div>
        <top title="大学生认证" :isReturn="false"></top>
        <div class="bg_gray plr30 ptb25 f26 c_999">请提供本人相关信息，并上传本2张学生证件，确保图标清晰，四角完整</div>
        <div class="form">
            <formInput
                title="姓名：">
            </formInput>
            <formSelect
                title="入学时间：">
            </formSelect>
            <formSelect
                title="院校省份：">
            </formSelect>
            <formInput
                title="院校名称：">
            </formInput>
            <formInput
                title="专业：">
            </formInput>
            <div class="uploads pb121">
                <div class="form_tit">证件图片：</div>
                <certificate
                    :initImg="require('../../images/uploads_bg_1.png')"
                    title="上传学生证注册页">
                </certificate>
                <certificate
                    :initImg="require('../../images/uploads_bg_6.png')"
                    title="上传学生证详情页">
                </certificate>
            </div>
        </div>
        <div class="btn_wrap">
            <div class="btn_block gray_btn">认证</div>
        </div>
    </div>
</template>

<script>

import formInput from 'src/components/formItem/formInput';
import formSelect from 'src/components/formItem/formSelect';
import certificate from '../../components/certificate';
export default {
    components:{
        formInput,
        formSelect,
        certificate
    }
}
</script>

<style lang="less" scoped>
.form_tit{
    height: .89rem;
    line-height: .89rem;
    padding: 0 .3rem;
    font-size: .28rem;
    color: #666;
}
</style>
