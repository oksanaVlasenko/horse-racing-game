import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const createUIStore = (overrides = {}) =>
  new Vuex.Store({
    modules: {
      ui: {
        namespaced: true,
        state: {
          isNotGenerated: false,
          isRaceStarting: false,
          isPaused: false,
          isLoading: false,
          loaderText: '',
          ...overrides
        },

        getters: {
          isNotGenerated: s => s.isNotGenerated,
          isRaceStarting: s => s.isRaceStarting,
          isPaused: s => s.isPaused,
          isLoading: (s) => s.isLoading,
          loaderText: (s) => s.loaderText
        },

        mutations: {
          setIsNotGenerated(state, value) {
            state.isNotGenerated = value
          },
          setIsRaceStarting(state, value) {
            state.isRaceStarting = value
          },
          setIsPaused(state, value) {
            state.isPaused = value
          },
          setLoading(state, payload) {
            state.isLoading = payload.isLoading
            state.loaderText = payload.text
          }
        },

        actions: {
          togglePause({ commit, state }) {
            commit('setIsPaused', !state.isPaused)
          },
          startGame({ commit }) {
            commit('setIsRaceStarting', true)
          },
          generateGame({ commit }) {
            commit('setIsNotGenerated', false)
          }
        }
      }
    }
  })
