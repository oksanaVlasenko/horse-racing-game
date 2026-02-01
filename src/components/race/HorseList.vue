<template>
  <List>
    <template v-slot:header>
      <ListHeader 
        title="Horse List" 
      />
    </template>

    <template v-slot:list-headers>
      <span class="text-xs w-8">Color</span>
      <span class="text-xs flex-1 text-right px-2">Name</span>
      <span class="text-xs w-12 text-right">Condition</span>
    </template>
 
    <template v-slot:list-items>
      <HorseInfoRow
        v-for="horse in horsesList"
        :key="horse.id"
        :horse="horse"
      >
        <template v-slot:last-col>
          <div class="w-12 text-right">
            {{ horse.condition }}
          </div>
        </template>
      </HorseInfoRow>
    </template>
  </List>
</template>

<script lang="ts">
  import Vue, { VueConstructor } from 'vue'
  import { mapGetters } from 'vuex'
  import { IHorse, HorseCatalog } from "@/types"

  import ListHeader from '@/components/common/ListHeader.vue'
  import List from '@/components/common/List.vue'
  import HorseInfoRow from '@/components/common/HorseInfoRow.vue'

  interface HorseList {
    getHorsesList: () => HorseCatalog
  }
  
  export default (Vue as VueConstructor<Vue & HorseList>).extend({
    name: 'HorseList',
    components: {
      ListHeader,
      List,
      HorseInfoRow
    },
    computed: {
      ...mapGetters('horses', ['getHorsesList']),
      horsesList(): IHorse[] {
        return Object.values(this.getHorsesList)
      }
    }
  })
</script>

<style lang="scss" scoped>
  @reference "tailwindcss";

  .container {
    @apply w-auto h-full max-h-[calc(100vh-10rem)] md:max-w-48 mx-0 md:ml-8 p-4 border rounded-xl shadow-xs flex flex-col;
  }
</style>