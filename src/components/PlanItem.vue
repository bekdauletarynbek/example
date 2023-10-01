<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

interface IPlan {
  title: string;
  price: string | number;
  image: string;
  currency: "$" | "₸";
}

const props = withDefaults(defineProps<IPlan>(), {
  currency: "$",
});
</script>

<template>
  <div class="px-5 py-3 border my-5 rounded-xl mx-3 bg-white">
    <p class="font-bold">{{ title }}</p>
    <div class="flex items-end justify-between">
      <p>{{ price }} {{ currency }}</p>
      <img :src="image" alt="" />
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
