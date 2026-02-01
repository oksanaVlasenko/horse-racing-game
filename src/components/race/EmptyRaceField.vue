<template>
  <div>
    <div
      v-for="(i) in 10"
      :key="i"
      class="border-r-4 border-red-500"
    >
      <div class="race-field">
        <div class="field-number">
          <span class="-rotate-90">{{ i }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'EmptyRaceField'
  }
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

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