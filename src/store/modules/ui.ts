import { MobilePanel } from "@/types"

interface UIState {
  trackWidth: number
  isLoading: boolean
  loaderText: string
  isNotGenerated: boolean
  isRaceStarting: boolean
  isPaused: boolean
  mobilePanel: MobilePanel
}

const state: UIState = {
  trackWidth: 0,
  isLoading: false,
  loaderText: '',
  isNotGenerated: true,
  isRaceStarting: false,
  isPaused: false,
  mobilePanel: null
}

const mutations = {
  setTrackWidth(state: UIState, width: number) {
    state.trackWidth = width
  },
  setLoading(state: UIState, payload: { isLoading: boolean, text: string }) {
    state.isLoading = payload.isLoading
    state.loaderText = payload.text
  },
  setIsNotGenerated(state: UIState, payload: boolean) {
    state.isNotGenerated = payload
  },
  setIsRaceStarting(state: UIState, payload: boolean) {
    state.isRaceStarting = payload
  },
  setIsPaused(state: UIState, value: boolean) {
    state.isPaused = value
  },
  setMobilePanel(state: UIState, panel: MobilePanel) {
    state.mobilePanel = panel
  }
}

const actions = {
   updateTrackWidth({ commit }: any, width: number) {
    commit('setTrackWidth', width)
  },
}

const getters = {
  isLoading: (state: UIState) => state.isLoading,
  loaderText: (state: UIState) => state.loaderText,
  isNotGenerated: (state: UIState) => state.isNotGenerated,
  isRaceStarting: (state: UIState) => state.isRaceStarting,
  getTrackWidth: (state: UIState) => state.trackWidth,
  isPaused: (state: UIState) => state.isPaused,
  mobilePanel: (state: UIState) => state.mobilePanel
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
