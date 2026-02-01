import Vue from "vue"
import Vuex from "vuex"

import horses from "./modules/horses"
import schedule from "./modules/schedule"
import history from "./modules/history"
import runtime from "./modules/runtime"
import ui from "./modules/ui"

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    horses,
    schedule,
    history,
    runtime,
    ui
  }
})
