<template>
  <div class="flex items-center gap-2 px-2 py-1">
    <slot name="first-col" />

    <span class="w-4 h-4 rounded-full flex-shrink-0">
      <HorseIcon 
        :color="horse.color"
      />
    </span>
    
    <div class="flex-1 text-right">
      <p class="text-xs lg:text-sm truncate m-0">
        {{ horse.name }}
      </p>
    </div>

    <slot name="last-col" />
  </div>
</template>

<script lang="ts">
  import HorseIcon from '@/components/common/HorseIcon.vue'
  import { HorseView } from '@/types'
  import { PropType } from 'vue'

  export default {
    name: 'HorseInfoRow',
    components: {
      HorseIcon
    },
    props: {
      horse: {
        type: Object as PropType<HorseView>,
        required: true
      }
    }
  }
</script>