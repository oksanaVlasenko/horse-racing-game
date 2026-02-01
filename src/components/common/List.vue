<template>
  <div 
    class="container"
  >
    <slot name="header" />

    <slot name="body">
      <div class="flex flex-col overflow-hidden">
        <div class="flex items-center justify-between sticky top-0 z-10 px-2 py-1 flex-shrink-0">
          <slot name="list-headers" />
        </div>
        
        <div class="scroll-area">
          <div class="overflow-hidden lg:overflow-y-auto divide-y-2 divide-gray-200">
            <slot name="list-items" />
          </div>
        </div>
        
      </div>
    </slot>    
  </div>
</template>

<script lang="ts">
  export default {
    name: 'ListComponent'
  }
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .container {
    @apply w-full max-h-[calc(100vh-10rem)] p-4 border rounded-xl shadow-xs flex flex-col;
  }
</style>