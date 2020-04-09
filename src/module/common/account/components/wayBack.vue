<!--弹窗-信息框-->
<template>
  <div class="yl_other">
		<p class="yl_other_tit">其他找回方式</p>
		<ul class="yl_other_list">
			<li v-if="way!='phone'">
				<router-link  to="/forget" replace>
					<div class="yl_other_icon">
						<i class="iconfont icon-ai-phone yl_orange"></i>
					</div>
					<p>手机验证</p>
				</router-link>
			</li>
			<li v-if="way!='email'">
				<router-link  to="/findByEmail" replace>
					<div class="yl_other_icon">
						<i class="iconfont icon-youxiang yl_green"></i>
					</div>
					<p>邮箱验证</p>
				</router-link>
			</li>
			<li>
				<router-link  to="/sfyz" replace>
					<div class="yl_other_icon">
						<i class="iconfont icon-user yl_blue"></i>
					</div>
					<p>身份验证</p>
				</router-link>
			</li>
			<li v-if="way!='mibao'">
				<router-link  to="/findByQuestion" replace>
					<div class="yl_other_icon">
						<i class="iconfont icon-mima1 yl_red"></i>
					</div>
					<p>密保验证</p>
				</router-link>
			</li>
		</ul>
	</div>
</template>

<script>

export default {
  props:{
  	way:{
  		default:'phone'
  	}
  }
}
</script>
<style lang="less" scoped>
.yl_other_list{
	a{
		display: block;
		width: 100%;
		height: 100%;
	}
}
</style>