<template>
  <div class="w-full flex justify-between sm:flex-row flex-col">
    <div class="flex items-center justify-between px-8">
      <h1 class="header">
        Horse Racing 
      </h1>
      <img src="@/assets/icons/finish-line-flag.svg" alt="" class="size-10 rounded-full ml-2" />
    </div>
    
    <div class="flex items-center justify-between gap-2 px-8">
      <button 
        class="default-btn"
        :disabled="isRaceStarting"
        @click="generateGame"
      >
        Generate
      </button>

      <button 
        v-if="!isRaceStarting"
        class="default-btn"
        :disabled="isNotGenerated"
        @click="startGame"
      >
        Start
      </button>

      <button 
        v-else
        class="default-btn"
        @click="togglePause"
      >
        {{ isPaused ? 'Resume' : 'Pause' }}
      </button>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapGetters } from 'vuex'
  import { gameService } from '@/services/gameService'

  interface Header {
    generateGame: () => Function,
    startGame: () => Function,
    togglePause: () => Function,
    isNotGenerated: boolean,
    isRaceStarting: boolean,
    isPaused: boolean
  }

  export default (Vue as VueConstructor<Vue & Header>).extend({
    name: 'Header',
    computed: {
      ...mapGetters('ui',['isNotGenerated', 'isRaceStarting', 'isPaused'])
    },
    methods: {
      generateGame() {
        gameService.generateGame()
      },
      startGame() {
        gameService.startGame()
      },
      togglePause() {
        gameService.togglePause()
      }
    }
  })
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .header {
    @apply text-4xl font-semibold tracking-tight sm:text-5xl;
  }

  
</style>