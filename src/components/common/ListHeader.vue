<template>
  <h5 
    v-bind="$attrs"
    class="subtitle"
  >
    {{ title }}
  </h5>
</template>

<script lang="ts">
  export default {
    name: 'ListHeader',
    inheritAttrs: false,
    props: {
      title: {
        type: String,
        default: ''
      }
    }
  }
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .subtitle {
    background: var(--accent-secondary);
    color: var(--bg-main);
    border-color: var(--bg-main);
    @apply rounded-xl m-0 mb-2 text-sm px-4 py-2.5 shadow-xs leading-5 border normal-case;
  }
</style>