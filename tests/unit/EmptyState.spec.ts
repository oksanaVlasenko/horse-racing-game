import { shallowMount } from '@vue/test-utils'
import EmptyState from '@/components/common/EmptyState.vue'
import { gameService } from '@/services/gameService'

jest.mock('@/services/gameService', () => ({
  gameService: {
    generateGame: jest.fn()
  }
}))

describe('EmptyState.vue', () => {
  let wrapper: any;

  beforeEach(() => {
    wrapper = shallowMount(EmptyState)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('renders the component', () => {
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the correct heading text', () => {
    const heading = wrapper.find('h3')
    expect(heading.text()).toBe("Let's start a race")
  })

  it('calls generateGame when button is clicked', async () => {
    const button = wrapper.find('button')
    expect(button.exists()).toBe(true)

    await button.trigger('click')

    expect(gameService.generateGame).toHaveBeenCalledTimes(1)
  })
})
