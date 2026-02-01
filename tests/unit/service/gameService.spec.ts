import { gameService } from '@/services/gameService'
import store from '@/store'

jest.mock('@/types', () => ({
  ROUND_DISTANCES: {
    1: 100
  }
}))

jest.mock('@/store', () => ({
  commit: jest.fn(),
  dispatch: jest.fn(),
  getters: {
    'ui/isPaused': false,
    'schedule/getScheduleRounds': {
      1: { distance: 100, participants: [0] }
    },
    'horses/getHorsesList': {
      0: { id: 1, name: 'Horse', condition: 1 }
    }
  }
}))

describe('gameService', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })

  it('generateGame commits loading and dispatches generators', async () => {
    await gameService.generateGame()

    expect(store.commit).toHaveBeenCalledWith('ui/setLoading', {
      isLoading: true,
      text: 'Generating game...'
    })

    expect(store.dispatch).toHaveBeenCalledWith('horses/generateHorsesList')
    expect(store.dispatch).toHaveBeenCalledWith('schedule/generateScheduleRounds')
    expect(store.dispatch).toHaveBeenCalledWith('history/generateHistoryRounds')
  })

  it('togglePause toggles ui/isPaused', () => {
    gameService.togglePause()

    expect(store.commit).toHaveBeenCalledWith('ui/setIsPaused', true)
  })

  it('resetGame resets state and history', () => {
    gameService.resetGame()

    expect(store.commit).toHaveBeenCalledWith('ui/setIsRaceStarting', false)
    expect(store.commit).toHaveBeenCalledWith('ui/setIsPaused', false)
    expect(store.dispatch).toHaveBeenCalledWith('history/generateHistoryRounds')
  })

  it('startGame commits race start and dispatches runtime rounds', async () => {
    await gameService.startGame()

    expect(store.commit).toHaveBeenCalledWith('ui/setIsRaceStarting', true)

    expect(store.dispatch).toHaveBeenCalledWith(
      'runtime/startRound',
      {
        horses: [{ id: 1, name: 'Horse', condition: 1 }],
        distance: 100
      }
    )
  })
})
