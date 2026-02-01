<template>
  <div class="container">
    <ListHeader 
      title="Race" 
    />

    <h5 class="m-0 my-4">
      Round {{ getActiveRound }} - {{ activeDistance }} m
    </h5>

    <div 
      ref="track"
      class="flex flex-col"
    >
      <EmptyRaceField v-if="!isRaceStarting" />

      <div v-else>
        <div
          v-for="(horse, i) in activeHorses"
          :key="horse.id"
          class="border-r-4 border-red-500"
        >
          <div class="race-field">
            <div class="field-number">
              <span class="-rotate-90">{{ i + 1  }}</span>
            </div>

            <span 
              class="w-6 h-6 rounded-full flex-shrink-0"
              :style="{ transform: `translateX(${horse.displayPosition}px) translateY(${horse.bounce}px)` }"
            >
              <HorseRunningIcon 
                :color="horse.color"
              />
            </span>
          </div>
        </div>
      </div>
      <span class="uppercase font-semibold text-red-500 text-right">Finish</span>
    </div>
    
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import ListHeader from '@/components/common/ListHeader.vue'
  import HorseRunningIcon from '@/components/race/HorseRunningIcon.vue'
  import EmptyRaceField from '@/components/race/EmptyRaceField.vue'

  import { mapActions, mapGetters } from 'vuex'
  import { ROUND_DISTANCES, RoundId, RuntimeRound } from '@/types'

  interface Race {
    getRuntimeRounds: RuntimeRound;
    getActiveRound: RoundId;
    updateTrackWidth: Function;
    isRaceStarting: boolean
  }

  export default (Vue as VueConstructor<Vue & Race>).extend({
    name: 'RaceComponent',
    components: {
      ListHeader,
      HorseRunningIcon,
      EmptyRaceField
    },
    computed: {
      ...mapGetters('schedule', ['getActiveRound']),
      ...mapGetters('runtime', ['getRuntimeRounds']),
      ...mapGetters('ui', ['isRaceStarting']),
      activeHorses(): RuntimeRound {
        return this.getRuntimeRounds 
      },
      activeDistance(): number {
        return ROUND_DISTANCES[this.getActiveRound]
      }
    },
    mounted() {
      this.updateTrack()
      window.addEventListener('resize', this.updateTrack)
    },
    beforeDestroy() {
      window.removeEventListener('resize', this.updateTrack)
    },
    methods: {
      ...mapActions('ui', ['updateTrackWidth']),
      updateTrack() {
        const trackElement = this.$refs.track as HTMLElement;
        const width = trackElement?.offsetWidth - 64;

        this.updateTrackWidth(width)
      }
    },
    watch: {
      getActiveRound(v, prev) {
        if (!v || v === prev) return
        this.updateTrack()
      }
    }
  })
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .round-subtitle {
    color: var(--bg-main);
    background: var(--text-secondary);
    @apply text-base capitalize;
  }

  .container {
    @apply w-auto h-full max-h-[calc(100vh-10rem)] mx-2 p-4 border rounded-xl shadow-xs flex flex-col;
  }

  .race-field {
    background: var(--field-primary);
    @apply flex items-center h-6 md:h-8 mb-2 shadow-xs overflow-hidden border-b-2;
  }

  .field-number {
    background: var(--success);
    color: var(--bg-main);
    @apply flex items-center justify-center
          h-full w-6 md:w-8
          text-xs
          border-r border-gray-200;
  }
</style>