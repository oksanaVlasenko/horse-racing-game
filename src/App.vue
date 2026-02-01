<template>
  <div id="app">
    <RaceGame />

    <Loader />

    <MobilePanelRoot />
  </div>
</template>

<script lang="ts">
  import Loader from '@/components/common/Loader.vue'
  import RaceGame from '@/pages/RaceGame.vue'
  import MobilePanelRoot from '@/components/common/MobilePanelRoot.vue'

  export default {
    name: 'App',
    components: {
      Loader,
      RaceGame,
      MobilePanelRoot
    }
  }
</script>