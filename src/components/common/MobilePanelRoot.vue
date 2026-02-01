<template>
  <div 
    v-if="panel" 
    class="mobile-panel"
    ref="panel"
  >
    <header class="panel-header">
      <h3>{{ title }}</h3>
      <button 
        class="default-btn"
        @click="close"
      >
        ✕
      </button>
    </header>

    <div class="panel-body">
      <HorseList v-if="panel === 'horses'" />
      <ScheduleList v-else-if="panel === 'schedule'" />
      <ResultList v-else-if="panel === 'results'" />
    </div>
  </div>
</template>

<script lang="ts">
  import HorseList from '@/components/race/HorseList.vue'
  import ScheduleList from '@/components/race/ScheduleList.vue'
  import ResultList from '@/components/race/ResultList.vue'

  import Vue, { VueConstructor } from 'vue'
  import { mapGetters, mapMutations } from 'vuex'
  import { MobilePanel } from '@/types'

  interface MobilePanelRoot {
    mobilePanel: MobilePanel,
    setMobilePanel: Function
  }

  export default (Vue as VueConstructor<Vue & MobilePanelRoot>).extend({
    name: 'MobilePanelRoot',
    components: {
      HorseList,
      ScheduleList,
      ResultList
    },

    computed: {
      ...mapGetters('ui', ['mobilePanel']),
      panel(): MobilePanel {
        return this.mobilePanel
      },
      title(): string {
        return (
          this.panel && {
            horses: 'Horse List',
            schedule: 'Schedule',
            results: 'Results'
          }[this.panel] || ''
        )
      }
    },

    mounted() {
      this.updateScreen()
      window.addEventListener('resize', this.updateScreen)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateScreen)
    },

    methods: {
      ...mapMutations('ui', ['setMobilePanel']),
      close(): void {
        this.setMobilePanel(null)
      },
      updateScreen(): void {
        const trackElement = this.$refs.panel as HTMLElement
        const width = trackElement?.offsetWidth
        if (width && width > 768) {
          this.close()
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";
  
  .mobile-panel {
    @apply fixed inset-0 z-50 flex flex-col px-4 overflow-x-hidden;
    background: var(--bg-main);
  }

  .panel-header {
    @apply flex items-center justify-between border-b;
    border-color: var(--bg-secondary);
  }

  .panel-body {
    @apply flex flex-col items-center gap-4 overflow-y-auto mt-4;

    > * {
      @apply w-full max-w-md; 
    }
  }
</style>
