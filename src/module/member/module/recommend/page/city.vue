<template>
	<div class="l_address_hidden">
		<!--地址-->
		<!--S 头部-->
		<top title="选择城市"></top>
		<!--E 头部-->
		<div class="l_address_cur">
			<p class="l_address_loc">
				<span>{{city.city}}</span>
				<i class="iconfont icon-htmal5icon03 arrow_down"></i>
			</p>
			<div class="l_address_search">
				<a class="tit_icon left l_icon_search" @click="searchCity">
					<i class="iconfont icon-fangdajing"></i>
				</a>
				<form action="" @submit="searchCity($event)">
					<input class="l_city_search" type="search" placeholder="输入城市名或首字母查询" v-model.trim="cityCondition" autocomplete="off" maxlength="15" />
				</form>
			</div>
		</div>
		<p class="l_city_hint">当前正为您推荐{{city.name}}的内容，您可以切换城市查看其它城市的内容</p>
		<div class="l_city_box">
			<div v-show="seachFlag">
				<p class="l_noHistory" v-if="!cityHistory.length">没有符合条件的城市</p>
				<ul class="l_address_result l_brand_con" v-if="cityHistory.length">
					<li class="l_brand_name" v-for="(v,i) in cityHistory" v-bind:class="[{l_brand_name_last:cityHistory.length==(i+1)}]" @click="seachFlag=false;changeCity(v)">{{v.city}}</li>
				</ul>
			</div>
			<div v-show="!seachFlag">
				<div v-for="(el,key,index) in citys">
					<div class="l_brand_tit" v-bind:id="'address-'+(index+1)">{{key}}</div>
					<ul class="l_brand_con">
						<li class="l_brand_name" v-for="(v,i) in el" v-bind:class="[{l_brand_name_last:el.length==(i+1)}]" @click="changeCity(v)">{{v.city}}</li>
					</ul>
				</div>
				<div class="brand_choose_shortcut">
					<ul>
						<li v-for="(el,key,index) in citys" @click="goAddress('#address-'+(index+1))">{{key}}</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import top from 'src/components/top';
	import {fetchCityList} from '../service/getData';
	export default {
		data() {
			return {
				cityCondition: "", //搜索城市的input框
				city: {}, //所选城市
				seachFlag: false, //控制是否现在是搜索城市显示
				cityHistory: [], //符合条件的城市
				citys:[]
			}
		},
		components: {
			top
		},
		activated() {
			fetchCityList(this.$route.query.id,this.$route.query.position).then(res => {
				if(res.status){
					this.citys = res.data.cityList;
					if(this.$store.state.city.cityCode){
						this.city = this.$store.state.city;
					}else{
						let j = 0;
						for(let i in this.citys){
							if(j==0){
								this.city = this.citys[i][0];
							}
							j++;
						}
					}
				}
			})
		},
		methods: {
			//搜索城市
			searchCity(e) {
				if(e) {
					e.preventDefault();
					this.$el.querySelector(".l_city_search").blur();
				}
				if(this.cityCondition) {
					this.seachFlag = true;
					var cityCon = this.cityCondition.toUpperCase();
					this.cityHistory = [];
					for(let i in this.citys) {
						this.citys[i].forEach(v => {
							if(v.name.indexOf(cityCon) != -1 || i == cityCon) {
								this.cityHistory.push(v);
							}
						})
					}
				} else {
					this.seachFlag = false;
				}
			},
			//地址右侧的快捷按钮
			goAddress(selector) {
				var anchor = this.$el.querySelector(selector);
				this.$el.querySelector('.l_city_box').scrollTop = anchor.offsetTop;
			},
			//点击改变城市
			changeCity(v){
				this.city = v;
				this.$store.commit('CITY', v);
				this.$router.go(-1);
			}
		}
	}
</script>
<style lang="less" scoped>
@import (reference) '~src/style/all.less';
/* S 选择城市*/
.l_address_hidden {
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 111;
  width: 7.5rem;
  .overflow_scroll;
  .bg_fff;
}

.l_noHistory {
  margin-top: 3.9rem;
  text-align: center;
  font-size: 0.32rem;
  color: #999;
}

.l_address_cur {
  .plr30;
  height: 1.12rem;
  line-height: 1.12rem;

  .l_address_loc {
    .pos_rel;
    .pull_left;
    width: 1.4rem;
    height: 100%;
    padding-right: 0.28rem;
    .ellipsis;
    .f26;
    .c_333;
  }

  .arrow_down {
    position: absolute;
    top: 0;
    right: 0;
    color: #bcbcbc;
    .f30;
  }

  .l_address_search {
    width: 5.3rem;
    height: 100%;
    .pull_right;
    .pos_rel;

    input {
      width: 100%;
      height: 0.6rem;
      border: 1px solid #e5e5e5;
      .border-radius(0.04rem);
      padding-left: 0.6rem;
      .f24;
    }

    .tit_icon {
      top: 0.14rem;
      width: 0.8rem;

      i {
        .f32;
      }
    }
  }
}

.l_city_hint {
  .mlr30;
  .mb20;
  line-height: 1.5em;
  .c_666;
  .f26;
}

.l_brand_tit {
  height: 0.6rem;
  padding-left: 0.4rem;
  line-height: 0.6rem;
  background: #f5f5f5;
  .f28;
}

.l_brand_con {
  .plr20;
}

.l_brand_name {
  .plr20;
  height: 0.75rem;
  line-height: 0.74rem;
  .border-b;
  .f26;
  .c_333;
}

.l_brand_name_last {
  border: none;
}

.brand_choose_shortcut {
  .flex;
  .flex_center;
  position: fixed;
  top: 0.9rem;
  bottom: 0;
  right: 0;
  margin-right: 0.15rem;
  font-size: 0.26rem;
  color: #666;

  li {
    text-align: center;
    margin-bottom: 0.03rem;
  }
}
/* E 选择城市*/
.l_city_box{
	position: fixed;
	top: 2.97rem;
	bottom: 0;
	left: 0;
	right: 0;
	width: 100%;
	.overflow_scroll;
}
.l_brand_name.border_t{
	border-top: 1px solid #e5e5e5;
}
</style>