<template>
  <div class="container">
    <div class="scroll-area overflow-y-auto">
      <div class="sticky-header">
        <ListHeader 
          title="Results"
        />
      </div>
      
      <div class="px-4 pb-4">
        <List
          v-for="round in resultsList"
          :key="round.roundId"
          :ref="`round-${round.roundId}`"
          class="list-container"
        >
          <template v-slot:header>
            <h5 class="m-0 my-4">
              Round {{ round.roundId }} - {{  round.distance }}m
            </h5>
          </template>

          <template v-slot:list-headers>
            <span class="text-xs w-8 md:hidden lg:block">Position</span>
            <span class="text-xs w-10 lg:flex-1 px-1 lg:px-4">Color</span>
            <span class="text-xs w-12">Name</span>
            <span class="text-xs w-8 text-right">Time</span>
          </template>
      
          <template v-slot:list-items>
            <HorseInfoRow
              v-for="(horse, i) in round.horses"
              :key="horse.id"
              :horse="horse"
            >
              <template v-slot:first-col>
                <div class="w-8 text-left md:hidden lg:block">
                  {{ i + 1 }}
                </div>
              </template>

              <template v-slot:last-col>
                <div class="w-12 text-right">
                  {{ formatRaceTime(horse.time) }}
                </div>
              </template>
            </HorseInfoRow>
          </template>
        </List>
      </div>
      
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapGetters } from 'vuex'
  import { RoundHorseView, IRoundHorseView, RoundId } from '@/types'

  import scrollToRoundMixin from '@/mixins/scrollToRoundMixin'

  import ListHeader from '@/components/common/ListHeader.vue'
  import List from '@/components/common/List.vue'
  import HorseInfoRow from '@/components/common/HorseInfoRow.vue'

  interface Results {
    getRoundHistory: RoundHorseView,
    formatRaceTime: Function,
    scrollToRound: Function
  }
  
  export default (Vue as VueConstructor<Vue & Results>).extend({
    name: 'ResultList',
    mixins: [scrollToRoundMixin],
    components: {
      ListHeader,
      List,
      HorseInfoRow
    },
    computed: {
      ...mapGetters('history', ['getRoundHistory']),
      ...mapGetters('schedule', ['getActiveRound']),
      resultsList(): IRoundHorseView[] {
        return Object.values(this.getRoundHistory)
      }
    },
    methods: {
      formatRaceTime(time: number | null | undefined): string {
        if (time == null || isNaN(time)) {
          return '--:--'
        }

        const totalSeconds = Math.floor(time / 1000)
        const milliseconds = Math.floor((time % 1000) / 10)

        const secondsStr = String(totalSeconds).padStart(2, '0')
        const msStr = String(milliseconds).padStart(2, '0')

        return `${secondsStr}:${msStr}`
      }
    },
    watch: {
      getActiveRound(newId: RoundId, oldId: RoundId) {
        if (newId !== oldId) {
          this.scrollToRound(newId)
        }
      }
    }
  })
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .container {
    @apply w-auto md:w-full max-h-[calc(100vh-8rem)]
      md:max-w-64 md:ml-2 md:mr-8 p-0
      border rounded-xl shadow-xs
      flex flex-col
      overflow-hidden;
  } 

  .list-container {
    @apply p-0 mx-0 overflow-y-hidden border-none shadow-xs flex flex-col;
  }

  .round-subtitle {
    color: var(--bg-main);
    background: var(--text-secondary);
    @apply text-base capitalize;
  }
</style>