<template>
  <div class="container">
    <div class="scroll-area overflow-y-auto">
      <div class="sticky-header">
        <ListHeader 
          title="Program" 
        />
      </div>
      
      <div class="px-4 pb-4">
        <List
          v-for="round in scheduleListList"
          :key="round.roundId"
          :ref="`round-${round.roundId}`"
          class="list-container "
        >
          <template v-slot:header>
            <h5 class="m-0 my-4">
              Round {{ round.roundId }} - {{ round.distance }}m
            </h5>
          </template>

          <template v-slot:list-headers>
            <span class="text-xs w-8">Position</span>
            <span class="text-xs w-10 flex-1 px-4">Color</span>
            <span class="text-xs w-12 text-right">Name</span>
          </template>
      
          <template v-slot:list-items>
            <HorseInfoRow
              v-for="(horse, i) in round.horses"
              :key="horse.id"
              :horse="horse"
            >
              <template v-slot:first-col>
                <div class="w-12 text-left">
                  {{ i + 1 }}
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

  interface Schedule {
    getScheduleRoundsView: RoundHorseView,
    scrollToRound: Function
  }

  export default (Vue as VueConstructor<Vue & Schedule>).extend({
    name: 'ScheduleList',
    mixins: [scrollToRoundMixin],
    components: {
      ListHeader,
      List,
      HorseInfoRow
    },
    computed: {
      ...mapGetters('schedule', ['getScheduleRoundsView', 'getActiveRound']),
      scheduleListList(): IRoundHorseView[] {
        return Object.values(this.getScheduleRoundsView)
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
      md:max-w-64 p-0
      border rounded-xl shadow-xs
      flex flex-col
      overflow-hidden;
  } 

  .list-container {
     @apply w-full p-0 mx-0 max-h-[calc(100vh-10rem)] border-none shadow-xs flex flex-col;
  }

  .round-subtitle {
    color: var(--bg-main);
    background: var(--text-secondary);
    @apply text-base capitalize;
  }
</style>