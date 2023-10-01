<template>
  <div class="home flex flex-col">
    <div class="flex items-center">
      <img alt="Vue logo" src="@/assets/img/logo.png" />
      <p class="pl-3 font-bold text-lg">FastService</p>
    </div>

    <div class="mt-12 text-2xl font-bold">Delivery cost</div>
    <div class="text-gray-400 text-sm mt-1.5">
      Enter name of the city to<br />
      count delivery cost
    </div>
    <SelectInput
      @input="searchCity"
      placeholder="Enter name of the city"
      class="mt-7 px-3"
    />
    <div class="mt-7 text-sm text-gray-600">Most popular cities</div>

    <TableCustom :list="state.cities"></TableCustom>
    <div class="left-side-desktop">
      <div class="choose-plan w-full">
        <PlanItem
          v-for="item in state.list"
          :key="item"
          v-bind="item"
        ></PlanItem>
      </div>

      <div class="w-full h-full">
        <img class="left-img w-full h-full" src="@/assets/img/img.png" alt="" />
      </div>
    </div>

    <div class="cards absolute bottom-0">
      <div class="flex">
        <img src="@/assets/img/payments/visa.png" alt="" />
        <img src="@/assets/img/payments/master-card.png" alt="" />
        <img src="@/assets/img/payments/maestro.png" alt="" />
        <img src="@/assets/img/payments/processing-kz.png" alt="" />
      </div>
      <div>All rights reserved Fast service 2021</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectInput from "@/components/atom/SelectInput.vue";
import TableCustom from "@/components/atom/TableCustom.vue";
import PlanItem from "@/components/PlanItem.vue";
import { getCities } from "@/api/city";
import { ref, reactive } from "vue";

const state = reactive({
  list: [
    {
      title: "Pick up",
      price: 0,
      image: require("@/assets/svg/box.svg"),
    },
    {
      title: "Pick up",
      price: 0,
      image: require("@/assets/svg/box-machine.svg"),
    },
    {
      title: "Pick up",
      price: 0,
      image: require("@/assets/svg/box-size.svg"),
    },
  ],
  cities: [
    "Nur-Sultan",
    "Almaty",
    "Shymkent",
    "Atyrau",
    "Aktau",
    "Zhana Turmis",
    "Karagandy",
    "Kentau",
    "Aitei",
    "Pavlodar",
  ],
  searchCities: [],
});

const searchCity = async (search: string) => {
  let data = await getCities(search);
  console.log("searching", data);
};
</script>

<style lang="scss">
.home {
  @apply pt-5 pb-10;
}

.left-img {
  border-radius: 40px 40px 0px 0px;
}

.left-side-desktop {
  background-color: #f7f7f7;
  @apply h-full pt-3 rounded-t-3xl mt-5;
}

@media (min-width: 762px) {
  .left-side-desktop {
    @apply absolute right-0 top-0 flex items-center justify-center w-1/2 rounded-l-3xl mt-0;
  }
  .home {
    @apply w-1/2;
  }
}

.cards {
  * {
    @apply mr-2;
  }
}
</style>
