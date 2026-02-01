<template>
  <div 
    v-if="isLoading"
    class="loader"
  >
    <div class="spinner" />
    <h3 class="uppercase">
      {{ loaderText }}
    </h3>
  </div>
</template>

<script lang="ts">
  import { mapGetters } from 'vuex'

  export default {
    name: 'LoaderComponent',
    computed: {
      ...mapGetters('ui',['isLoading', 'loaderText'])
    }
  }
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .loader {
    @apply fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-stone-300 opacity-75 flex flex-col items-center justify-center;
  }

  .spinner {
    @apply w-12 h-12 border-4 border-amber-600 border-t-transparent rounded-full animate-spin;
  }
</style>
