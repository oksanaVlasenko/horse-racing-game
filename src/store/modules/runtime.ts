import { 
  Distance, 
  RuntimeRound, 
  IHorse,
  RuntimeHorse, 
} from "@/types"

import { createRuntimeHorses, applyTick } from '@/engine/runtimeEngine'

interface RuntimeState {
  runtimeRounds: Partial<RuntimeRound>
}

const state: RuntimeState = {
  runtimeRounds: []
}

const mutations = {
  setRuntimeRounds(state: RuntimeState, rounds: RuntimeRound) {
    state.runtimeRounds = rounds
  }
}

const actions = {
  startRound({ commit, rootState }: any, { horses, distance }: { horses: IHorse[]; distance: Distance }) {
    return new Promise((resolve) => {
      const activeRound = rootState.schedule.activeRound

      const raceHorses: RuntimeHorse[] = createRuntimeHorses(horses)

      commit('setRuntimeRounds', raceHorses)

      const startTimeRace = performance.now()
      let startTime = startTimeRace
      let finishedCount = 0

      const tick = (currentTime: number) => {
        if (rootState.ui.isPaused) {
          startTime = currentTime
          requestAnimationFrame(tick)
          return
        }

        const deltaTimeMs = currentTime - startTime

        const finishedNow = applyTick(
          raceHorses,
          deltaTimeMs,
          currentTime - startTimeRace,
          distance
        )

        finishedCount += finishedNow

        commit('setRuntimeRounds', raceHorses)

        if (finishedCount < raceHorses.length) {
          startTime = currentTime
          requestAnimationFrame(tick)
          return
        }

        raceHorses.sort((a, b) => a.finishTime - b.finishTime)
        raceHorses.forEach((h, i) => (h.place = i + 1))

        commit(
          'history/setPartialResults',
          {
            roundId: activeRound,
            distance,
            horses: raceHorses.map(h => ({
              id: h.id,
              name: h.name,
              color: h.color,
              time: Math.round(h.finishTime),
              position: h.position
            }))
          },
          { root: true }
        )

        commit(
          'ui/setLoading',
          {
            isLoading: true,
            text: `Round ${activeRound} is over. Winner is ${raceHorses[0].name} with time ${(raceHorses[0].finishTime / 1000).toFixed(2)}`
          },
          { root: true }
        )

        setTimeout(() => {
          commit(
            'ui/setLoading',
            { isLoading: false, text: '' },
            { root: true }
          )
          resolve(true)
        }, 2000)
      }

      requestAnimationFrame(tick)
    })
  }
}

const getters = {
  getRuntimeRounds: (state: RuntimeState, _: any, rootState: { ui: { trackWidth: any } }) => {
    const trackWidth = rootState.ui.trackWidth

    return state.runtimeRounds.map((horse) => ({
      ...horse,
      displayPosition: (horse?.progress ?? 0) * trackWidth
    }))
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters
}
