<script setup lang="ts">
import { defineProps, withDefaults, computed, capitalize } from "vue";
import { ICityAndPlan } from "@/api/city";

interface IPlan extends ICityAndPlan {
  isActive: "pickup" | "courier" | "post";
}

const props = withDefaults(defineProps<IPlan>(), {
  currency: "$",
  isActive: "pickup",
});

const image = computed(() => {
  return require(`@/assets/svg/${props.type}.svg`);
});

const title = computed(() => {
  return capitalize(props.type);
});
</script>

<template>
  <div
    class="flex border my-5 bg-white rounded-3xl mx-3"
    :class="{ 'is-unactive': !available }"
  >
    <div class="flex-grow px-5 py-3">
      <p class="font-bold title-color title-font">{{ title }}</p>
      <div class="flex items-end justify-between">
        <p class="price-color text-2xl font-semibold">
          {{ price }} {{ currency }}
        </p>
        <img :src="image" alt="" />
      </div>
    </div>

    <div v-if="isActive === type" class="icon-active">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="currentColor"
        class="bi bi-check2"
        viewBox="0 0 16 16"
      >
        <path
          d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"
        />
      </svg>
    </div>
  </div>
</template>

<style scoped lang="scss">
.icon-active {
  @apply flex items-center justify-center text-white font-extrabold px-3 w-16 text-2xl rounded-r-2xl;
  background: linear-gradient(
    310deg,
    #65b3e4 42.89%,
    rgba(255, 255, 255, 0) 81.27%
  );
}

.price-color {
  color: #78a1bb;
}

.title-color {
  color: #283044;
}

.title-font {
  font-family: Roboto;
  font-size: 20px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: left;
}

@media (min-width: 762px) {
  .title-font {
    font-size: 24px;
  }
}

.is-unactive {
  opacity: 0.6;
  @apply cursor-not-allowed;
}
</style>
