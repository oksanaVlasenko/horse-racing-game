import { getUniqueNames, getUniqueColors, getUniqueConditions } from '@/utils/randomizer'
import { HorseCatalog } from "@/types"

interface HorsesState {
  horsesList: HorseCatalog
}

const state: HorsesState = {
  horsesList: {}
}

const mutations = {
  setHorsesList(state: HorsesState, horses: HorseCatalog) {
    state.horsesList = horses
  }
}

const actions = {
  generateHorsesList({ commit }: any) {
    const COUNT = 20

    const names = getUniqueNames(COUNT)
    const colors = getUniqueColors(COUNT)
    const conditions = getUniqueConditions(COUNT)
    
    const horses: HorseCatalog = {}
    for (let i = 1; i < 21; i++) {
      horses[i] = {
        id: i,
        name: names[i - 1],
        color: colors[i - 1],
        condition: conditions[i - 1]
      }
    }
    commit('setHorsesList', horses)
  }
}

const getters = {
  getHorsesList: (state: HorsesState) => state.horsesList
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
