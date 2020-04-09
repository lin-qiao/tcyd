import Vue from 'vue'
import Vuex from 'vuex'
import VueClipboard from 'vue-clipboard2'
import Swiper from '../plugins/swiper.min.js'
import state from './state'
import mutations from './mutations'
import actions from './action'
import getters from './getters'

Vue.use(Vuex)
Vue.use(VueClipboard)

export default new Vuex.Store({
	state,
	getters,
	actions,
	mutations
})
