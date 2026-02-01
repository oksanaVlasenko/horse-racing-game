import { shallowMount } from '@vue/test-utils'
import RaceGame from '@/pages/RaceGame.vue'
import { createUIStore } from './__mocks__/ui.store'

const stubs = {
  Header: true,
  EmptyState: true,
  HorseList: true,
  RaceComponent: true,
  ScheduleList: true,
  ResultList: true
}

describe('RaceGame.vue (container unit test)', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    store = createUIStore()

    wrapper = shallowMount(RaceGame, {
      store,
      stubs
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders EmptyState when isNotGenerated is true', async () => {
    store.commit('ui/setIsNotGenerated', true)
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'HorseList' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'RaceComponent' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'ScheduleList' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'ResultList' }).exists()).toBe(false)
  })

  it('renders child components when isNotGenerated is false', async () => {
    store.commit('ui/setIsNotGenerated', false)
    await wrapper.vm.$nextTick()

    expect(wrapper.findComponent({ name: 'EmptyState' }).exists()).toBe(false)
    expect(wrapper.findComponent({ name: 'HorseList' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'RaceComponent' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ScheduleList' }).exists()).toBe(true)
    expect(wrapper.findComponent({ name: 'ResultList' }).exists()).toBe(true)
  })
})
