import { shallowMount } from '@vue/test-utils'
import HorseInfoRow from '@/components/common/HorseInfoRow.vue'
import HorseIcon from '@/components/common/HorseIcon.vue'

describe('HorseInfoRow.vue', () => {
  const horse = {
    name: 'Thunder',
    color: 'blue'
  }

  it('renders the component', () => {
    const wrapper = shallowMount(HorseInfoRow, {
      propsData: { horse }
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('renders horse name', () => {
    const wrapper = shallowMount(HorseInfoRow, {
      propsData: { horse }
    })
    expect(wrapper.find('p').text()).toBe(horse.name)
  })

  it('passes color prop to HorseIcon', () => {
    const wrapper = shallowMount(HorseInfoRow, {
      propsData: { horse }
    })
    const icon = wrapper.findComponent(HorseIcon)
    expect(icon.exists()).toBe(true)
    expect(icon.props('color')).toBe(horse.color)
  })

  it('renders content in first-col slot', () => {
    const wrapper = shallowMount(HorseInfoRow, {
      propsData: { horse },
      slots: {
        'first-col': '<div class="first-slot">First</div>'
      }
    })
    expect(wrapper.find('.first-slot').exists()).toBe(true)
    expect(wrapper.find('.first-slot').text()).toBe('First')
  })

  it('renders content in last-col slot', () => {
    const wrapper = shallowMount(HorseInfoRow, {
      propsData: { horse },
      slots: {
        'last-col': '<div class="last-slot">Last</div>'
      }
    })
    expect(wrapper.find('.last-slot').exists()).toBe(true)
    expect(wrapper.find('.last-slot').text()).toBe('Last')
  })
})
