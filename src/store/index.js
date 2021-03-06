import Vue from 'vue'
import Vuex from 'vuex'

import state from './state'
import getters from './getters'
import mutations from './mutations'
import plugins from './plugins'
Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  plugins,
  state,
  getters,
  mutations
})
