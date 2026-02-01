import { shallowMount } from '@vue/test-utils'
import Loader from '@/components/common/Loader.vue'
import { createUIStore } from './__mocks__/ui.store'

describe('Loader.vue', () => {
  let wrapper: any
  let store: any

  beforeEach(() => {
    store = createUIStore()

    wrapper = shallowMount(Loader, {
      store
    })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the loader text', async () => {
    store.commit('ui/setLoading', {
      isLoading: true,
      text: 'Loading...'
    })

    await wrapper.vm.$nextTick()
    expect(wrapper.find('h3').text()).toBe('Loading...')
  })
})