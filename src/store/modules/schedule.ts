import { generateUniqueParticipants } from '@/utils/randomizer'
import {
  ScheduleRound,
  ROUND_DISTANCES,
  RoundId,
  Distance,
  RoundHorseView
} from "@/types"

interface ScheduleState {
  scheduleRounds: Partial<ScheduleRound>
  activeRound: RoundId
}

const state: ScheduleState = {
  scheduleRounds: {},
  activeRound: 1
}

const mutations = {
  setScheduleRounds(state: ScheduleState, rounds: ScheduleRound) {
    state.scheduleRounds = rounds
  },
  setActiveRound(state: ScheduleState, round: RoundId) {
    state.activeRound = round
  }
}

const actions = {
  generateScheduleRounds({ commit }: any) {
    const rounds: Partial<ScheduleRound> = {}

    for (let i = 1; i < 7; i++) {
      rounds[i as RoundId] = {
        roundId: i as RoundId,
        distance: ROUND_DISTANCES[i as RoundId] as Distance,
        participants: generateUniqueParticipants(10)
      }
    }

    commit('setScheduleRounds', rounds)
  }
}

const getters = {
  getScheduleRounds: (state: ScheduleState) => state.scheduleRounds,
  getScheduleRoundsView: (state: ScheduleState, getters: any, rootGetters: any) => {
    const scheduleRoundsView: Partial<RoundHorseView> = {} 
    for (const roundKey in state.scheduleRounds) {
      const round = roundKey as unknown as RoundId
      const horses = state.scheduleRounds[round as RoundId]?.participants.map(horseId => {
        const horse = rootGetters.horses.horsesList[horseId]

        return {
          id: horse.id,
          name: horse.name,
          color: horse.color
        }
      })

      scheduleRoundsView[round as RoundId] = {
        roundId: round as RoundId,
        distance: state.scheduleRounds[round as RoundId]?.distance || 0 as Distance,
        horses: horses ?? []
      }
    }

    return scheduleRoundsView
  },
  getActiveRound: (state: ScheduleState) => state.activeRound
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
