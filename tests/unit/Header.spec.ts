import { shallowMount } from '@vue/test-utils'
import Header from '@/components/common/Header.vue'
import { gameService } from '@/services/gameService'
import { createUIStore } from './__mocks__/ui.store'

jest.mock('@/services/gameService', () => ({
  gameService: {
    generateGame: jest.fn(),
    startGame: jest.fn(),
    togglePause: jest.fn()
  }
}))

describe('Header.vue', () => {
  let wrapper: any
  let store: any

  const findButton = (text: string) =>
    wrapper.findAll('.default-btn').wrappers.find(b =>
      b.text().toLowerCase().includes(text)
    )!

  beforeEach(() => {
    store = createUIStore()

    gameService.startGame.mockImplementation(() => {
      store.commit('ui/setIsRaceStarting', true)
    })

    gameService.togglePause.mockImplementation(() => {
      store.commit('ui/setIsPaused', !store.state.ui.isPaused)
    })

    wrapper = shallowMount(Header, {
      store
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('calls generateGame', async () => {
    await findButton('generate').trigger('click')

    expect(gameService.generateGame).toHaveBeenCalledTimes(1)
  })

  it('calls startGame', async () => {
    await findButton('start').trigger('click')

    expect(gameService.startGame).toHaveBeenCalledTimes(1)

    expect(store.state.ui.isRaceStarting).toBe(true)
  })

  it('toggles pause / resume and updates UI', async () => {
    store.commit('ui/setIsRaceStarting', true)
    await wrapper.vm.$nextTick()

    await findButton('pause').trigger('click')
    await wrapper.vm.$nextTick()

    expect(gameService.togglePause).toHaveBeenCalledTimes(1)
    expect(store.state.ui.isPaused).toBe(true)

    await findButton('resume').trigger('click')
    await wrapper.vm.$nextTick()

    expect(gameService.togglePause).toHaveBeenCalledTimes(2)
    expect(store.state.ui.isPaused).toBe(false)
  })

  it('disables buttons when isNotGenerated = true', async () => {
    store.commit('ui/setIsNotGenerated', true)
    await wrapper.vm.$nextTick()

    const disabledButtons = wrapper.findAll('.default-btn[disabled]')
    expect(disabledButtons.length).toBeGreaterThan(0)
  })
})
