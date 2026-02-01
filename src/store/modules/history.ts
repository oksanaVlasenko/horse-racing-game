import {
  RoundHorseView,
  RoundId,
  Distance,
  IRoundHorseView
} from "@/types"

interface HistoryState {
  roundHistory: Partial<RoundHorseView>
}

const state: HistoryState = {
  roundHistory: {}
}

const mutations = {
  setRoundHistory(state: HistoryState, round: RoundHorseView) {
    state.roundHistory = round
  },
  setPartialResults(state: HistoryState, payload: IRoundHorseView) {
    state.roundHistory[payload.roundId] = payload
  }
}

const actions = {
  generateHistoryRounds({ commit, rootState }: any) {
    const historyRoundsView: Partial<RoundHorseView> = {}

    const scheduleRounds = rootState.schedule.scheduleRounds
    const horsesList = rootState.horses.horsesList

    for (const roundKey in scheduleRounds) {
      const round = roundKey as unknown as RoundId

      const horses = scheduleRounds[round]?.participants?.map((horseId: number) => {
        const horse = horsesList[horseId]
        return {
          id: horse.id,
          name: horse.name,
          color: horse.color,
          time: null,
          position: 0
        }
      })

      historyRoundsView[round] = {
        roundId: round,
        distance: scheduleRounds[round]?.distance || 0 as Distance,
        horses: horses ?? []
      }
    }

    commit('setRoundHistory', historyRoundsView)
  }
}

const getters = {
  getRoundHistory: (state: HistoryState) => state.roundHistory
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
