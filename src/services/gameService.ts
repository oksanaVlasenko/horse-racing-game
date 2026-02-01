import store from "@/store"

import { ROUND_DISTANCES } from "@/types"

export const gameService = {
  async generateGame() {
    store.commit('ui/setLoading', {
      isLoading: true,
      text: 'Generating game...'
    })
    store.commit('ui/setIsNotGenerated', false)
    store.commit('schedule/setActiveRound', 1)
    store.dispatch('horses/generateHorsesList')
    store.dispatch('schedule/generateScheduleRounds')
    store.dispatch('history/generateHistoryRounds')

    setTimeout(() => {
      store.commit('ui/setIsNotGenerated', false)
      store.commit('ui/setLoading', {
        isLoading: false,
        text: ''
      })
    }, 1000)
  },

  resetGame() {
    store.commit('ui/setIsRaceStarting', false)
    store.commit('schedule/setActiveRound', 1)
    store.commit('runtime/setRuntimeRounds', [])
    store.commit('ui/setIsPaused', false)
    store.dispatch('history/generateHistoryRounds')
  },

  async startGame() {
    store.commit('ui/setIsRaceStarting', true)

    for (const roundKey in ROUND_DISTANCES) {
      store.commit('schedule/setActiveRound', roundKey)
      const horses = store.getters['schedule/getScheduleRounds'][roundKey].participants.map(
        (id: number) => store.getters['horses/getHorsesList'][id]
      )
      await store.dispatch('runtime/startRound', {
        horses,
        distance: store.getters['schedule/getScheduleRounds'][roundKey].distance
      })
    }

    this.resetGame()
  },
  togglePause() {
    const isPaused = store.getters['ui/isPaused']
    store.commit('ui/setIsPaused', !isPaused)
  }
}
