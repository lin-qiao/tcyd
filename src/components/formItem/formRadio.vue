<template>
<div class="form_item form_check_radius">
  <div class="form_check_out">
    <label
		class="form_btn"
		:class="{'checked': el[defaultProps.id] == checked, 'isBadge' : isBadge, 'column2' : column == '2'}"
		:style="{height:height/100 + 'rem'}"
		v-for="(el,i) in list"
		@click="changeRadio($event)">
		<input
			type="radio"
			:name="type"
			:value="el[defaultProps.id]"
			style="display:none"/>
		<i
			class="iconfont icon-jiaobiao"
			v-if="( el[defaultProps.id] == checked ) && isBadge">
		</i>
		<span>
        <template v-if="hasImg">
            <img :src="el[defaultProps.selectImg] | imgUrl" v-if="el[defaultProps.id] == checked"/>
            <img :src="el[defaultProps.img] | imgUrl" v-if="el[defaultProps.id] != checked"/>
        </template>
        <em v-html="el[defaultProps.name]"></em>
    </span>
	</label>
	<label
	    v-if="custom"
		class="form_btn"
		:class="{'checked': val == checked, 'isBadge' : isBadge, 'column2' : column == '2'}"
		@input="changeRadio($event)">
		<i
			class="iconfont icon-jiaobiao"
			v-if="( val == checked ) && isBadge">
		</i>
		<input v-model="val" class="input" type="number" :placeholder="customPlaceholder">
	</label>
  </div>
</div>
</template>

<script>
export default {
  data() {
    return {
      val: '', //自定义
      checked: null
    }
  },
  components: {},
  props: {
    placeholder: {
      default: ''
    },
    list: {
      type: Array
    },
    value: {
      default: null
    },
    type: {
      required: true
    },
    height: {
      type: String,
      default: '60'
    },
    isBadge: {
      //单选框样式
      default: false
    },
    column: {
      //列数
      type: String,
      default: '3'
    },
    custom: {
      //自定义
      type: Boolean,
      default: false
    },
    customPlaceholder: {
      type: String,
      default: ''
    },
    hasImg:{
        type:Boolean,
        default:false
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          id: 'id',
          name: 'name',
          img:'img',
          selectImg:'selectImg'
        }
      }
    }
  },
  mounted() {
    if (this.value) {
      this.checked = this.value
    }
  },
  methods: {
    changeRadio($event) {
      this.checked = $event.target.value
      this.$emit('input', $event.target.value)
    }
  },
  watch: {
    value(val) {
      this.checked = val
    }
  }
}
</script>

<style lang="less">
@import '../css/fromItem.less';
.form_check_out {
  width: 7.5rem;
}
</style>
