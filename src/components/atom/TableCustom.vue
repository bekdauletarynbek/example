<script setup lang="ts">
import { defineProps, defineEmits } from "vue";

const emits = defineEmits(['select-city'])

interface Props {
  list: string[] | ITableItem[];
}

interface ITableItem {
  id: string | number;
  city?: string;
  label: string;
  title: string;
}

const selectCity = (item)=> {
  emits('select-city', (item.title || item))
}

const props = defineProps<Props>();
</script>

<template>
  <div class="grid grid-cols-2">
    <div
      class="border-0 border-b pb-2 border-color mx-7 mt-3 cursor-pointer"
      @click="selectCity(item)"
      v-for="item in props.list"
      :key="item.title || item"
    >
      {{ item.title || item }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.border-color {
  border-color: #e9f0eb;
  &:hover {
    @apply border-blue-500
  }
}
</style>
