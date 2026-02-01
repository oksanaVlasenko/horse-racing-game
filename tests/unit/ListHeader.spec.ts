import { shallowMount } from '@vue/test-utils'
import ListHeader from '@/components/common/ListHeader.vue'

describe('ListHeader.vue', () => {
  it('renders the component', () => {
    const wrapper = shallowMount(ListHeader)
    expect(wrapper.exists()).toBe(true)
  })

  it('renders the title prop', () => {
    const title = 'My Header'
    const wrapper = shallowMount(ListHeader, {
      propsData: { title }
    })
    
    const h5 = wrapper.find('h5.subtitle')
    expect(h5.exists()).toBe(true)
    expect(h5.text()).toBe(title)
  })

  it('applies additional HTML attributes via $attrs', () => {
    const wrapper = shallowMount(ListHeader, {
      attrs: {
        id: 'my-header',
        'data-test': 'header'
      }
    })

    const h5 = wrapper.find('h5.subtitle')
    expect(h5.attributes('id')).toBe('my-header')
    expect(h5.attributes('data-test')).toBe('header')
  })

  it('has the correct CSS class', () => {
    const wrapper = shallowMount(ListHeader)
    const h5 = wrapper.find('h5')
    expect(h5.classes()).toContain('subtitle')
  })

  it('renders empty string if no title is provided', () => {
    const wrapper = shallowMount(ListHeader)
    expect(wrapper.find('h5').text()).toBe('')
  })
})
