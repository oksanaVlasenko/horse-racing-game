import Vue from 'vue'
import { RoundId } from '@/types'

export default Vue.extend({
  methods: {
    scrollToRound(roundId: RoundId) {
      this.$nextTick(() => {
        const ref = this.$refs[`round-${roundId}`] as Vue[] | undefined
        const el = ref?.[0]?.$el as HTMLElement | undefined
        if (!el) return

        const scrollContainer = this.$el.querySelector('.scroll-area') as HTMLElement
        if (!scrollContainer) return

        const stickyHeaderHeight = 64

        const containerTop = scrollContainer.getBoundingClientRect().top
        const elementTop = el.getBoundingClientRect().top

        const offset =
          scrollContainer.scrollTop +
          (elementTop - containerTop) -
          stickyHeaderHeight

        scrollContainer.scrollTo({
          top: offset,
          behavior: 'smooth'
        })
      })
    }
  }
})
