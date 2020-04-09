<template>
	<div class="form_item form_check_box">
		<div class="form_check_out">
		    <label
        
				class="form_btn"
				:class="{'checked' : checkedList.indexOf(el[defaultProps.id]) != -1, 'isBadge' : isBadge, 'column2' : column == '2'}"
				v-for="(el,i) in list"
				:style="{height:height/100 + 'rem'}"
				@change="changeCheckbox($event)">
		  	    <input
					type="checkbox"
					:value="el[defaultProps.id]"
					style="display:none"/>
				<i
					class="iconfont icon-jiaobiao"
					v-if="checkedList.indexOf(el[defaultProps.id])!=-1&&isBadge">
				</i>
				<span v-html="el[defaultProps.name]"></span>
			</label>
		</div>
	</div>
</template>

<script>
export default {
  data() {
    return {
      checkedList: []
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
    selected: {
      //选中的id
      type: Array
    },
    isBadge: {
      //单选框样式
      default: false
    },
    height: {
      type: String,
      default: '60'
    },
    column: {
      //列数
      type: String,
      default: '3'
    },
    value: {
      default: null
    },
    defaultProps: {
      type: Object,
      default() {
        return {
          id: 'id',
          name: 'name'
        }
      }
    }
  },
  mounted() {},
  methods: {
    changeCheckbox($event) {
      let value = parseInt($event.target.value)
      if (this.checkedList.indexOf(value) == -1) {
        this.checkedList.push(value)
      } else {
        this.checkedList = this.checkedList.filter(v => v != value)
      }
      this.$emit('input', this.checkedList)
    }
  },
  watch: {
    value(val) {
      this.checkedList = val||[];
    }
  }
}
</script>

<style lang="less">
@import '../css/fromItem.less';
</style>
