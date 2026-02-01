<template>
  <div>
    <Header />

    <EmptyState 
      v-if="isNotGenerated"
    />

    <div 
      v-else
      class="flex flex-col md:flex-row w-full"
    >
      <div class="md:hidden order-1 overflow-x-hidden ">
        <MobileTabs />
      </div>

      <div class="order-2 flex-1 min-w-0 mx-6 md:mx-0">
        <Race />
      </div>

      <div class="hidden md:flex order-1 shrink-0">
        <HorseList />
      </div>

      <div class="hidden md:flex order-3 shrink-0">
        <ScheduleList />
      </div>

      <div class="hidden md:flex order-4 shrink-0">
        <ResultList />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'
  
  import HorseList from '@/components/race/HorseList.vue'
  import ScheduleList from '@/components/race/ScheduleList.vue'
  import ResultList from '@/components/race/ResultList.vue'
  import Race from '@/components/race/Race.vue'
  import Header from '@/components/common/Header.vue'
  import EmptyState from '@/components/common/EmptyState.vue'
  import MobileTabs from '@/components/common/MobileTabs.vue'

  export default {
    name: 'RaceGame',
    components: {
      HorseList,
      ScheduleList,
      ResultList,
      Race,
      Header,
      EmptyState,
      MobileTabs
    },
    computed: {
      ...mapGetters('ui', ['isNotGenerated'])
    }
  }
</script>