<!-- 认证中心 -->
<template lang="html">
    <div>
        <top title="认证中心" :isReturn="false"></top>
        <cell
            title="实名认证"
            icon="icon-tubiaozhizuomoban"
            color="#31d19f"
            :value="checkStatus == 'live_pass'? '已认证' : '未认证'"
            isLink
            :handleClick="toApprove">
        </cell>
        <!--<cell
            title="企业认证"
            icon="icon-qiyerenzheng"
            color="#ff7878"
            value="未认证"
            isLink
            to="/companyApprove">
        </cell>
        <cell
            title="大学生认证"
            icon="icon-xueshengrenzheng"
            color="#65c4ff"
            value="未认证"
            isLink>
        </cell>-->
    </div>
</template>

<script>
import cell from 'src/components/item/itemCell'; //单元格
import {
	fetchGetmemberbyucid //查询认证信息
} from '../../service/getData'
export default {
	data(){
		return{
			checkStatus:''
		}
	},
    components:{
        cell
    },
    activated(){
		fetchGetmemberbyucid().then( res => {
			if(res && res.status && res.data.memberRealName){
				this.checkStatus = res.data.memberRealName.checkStatus;
			}
		})
	},
	methods:{
		//跳转认证
		toApprove(){
			if(this.checkStatus == 'live_pass'){
				return;
			}else if(this.checkStatus == 'auth_pass'){
				this.$router.push('/faceApprove');
			}else{
				this.$router.push('/personApprove')
			}
		}
	}
}
</script>

<style lang="css">
</style>
