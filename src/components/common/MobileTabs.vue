<template>
  <div class="flex justify-between px-8 my-4 flex-wrap">
    <button 
      class="default-btn my-1" 
      @click="open('horses')"
    >
      Horses
    </button>
    <button 
      class="default-btn my-1" 
      @click="open('schedule')"
    >
      Schedule
    </button>
    <button 
      class="default-btn my-1" 
      @click="open('results')"
    >
      Results
    </button>
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapMutations } from 'vuex'
  import { MobilePanel } from '@/types'

  interface MobileTabs {
    setMobilePanel: Function
  
  }
  export default (Vue as VueConstructor<Vue & MobileTabs>).extend({
    name: 'MobileTabs',
    methods: {
      ...mapMutations('ui', ['setMobilePanel']),
      open(panel: MobilePanel): void {
        this.setMobilePanel(panel)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .mobile-tabs {
    @apply flex gap-8 my-4 w-full;
  }
</style>
