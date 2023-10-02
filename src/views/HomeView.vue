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
      :value="searchValue"
      :successValue="!!state.planList.length"
      :history-list="successListSearch"
      :error="errorCode"
      placeholder="Enter name of the city"
      class="mt-7 px-3"
      @clear-input="clearSearchInput"
      @input="searchCity"
    />

    <div class="mt-7 text-sm text-gray-600">Most popular cities</div>

    <TableCustom :list="state.cities"></TableCustom>
    <div class="left-side-desktop">
      <div class="choose-plan" v-if="state.planList.length">
        <PlanItem
          v-for="item in state.planList"
          :key="item"
          @click="activePlan = item.type"
          v-bind="item"
          :is-active="activePlan"
        ></PlanItem>
      </div>

      <div class="w-full h-full" v-else>
        <img class="left-img w-full h-full" src="@/assets/img/img.png" alt="" />
      </div>
    </div>

    <div class="cards">
      <div class="flex">
        <img src="@/assets/img/payments/visa.png" alt="" />
        <img src="@/assets/img/payments/master-card.png" alt="" />
        <img src="@/assets/img/payments/maestro.png" alt="" />
        <img src="@/assets/img/payments/processing-kz.png" alt="" />
      </div>
      <div class="bottom-text">All rights reserved Fast service 2021</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SelectInput from "@/components/atom/SelectInput.vue";
import TableCustom from "@/components/atom/TableCustom.vue";
import PlanItem from "@/components/PlanItem.vue";
import { getCities } from "@/api/city";
import { ref, reactive, watch, onBeforeMount } from "vue";
import { useRouter, useRoute } from "vue-router";

const router = useRouter();
const route = useRoute();

const searchValue = ref("");
const timeout = 400;
const timeoutInstance = ref();
const activePlan = ref();
const errorCode = ref(0);
const successListSearch = ref<string[]>([]);
const state = reactive({
  list: [],
  planList: [],
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

const clearSearchInput = () => {
  searchValue.value = "";
  router.push({ name: "home", query: { search: "" } });
  state.planList = [];
};

const searchCity = async (search: string) => {
  clearTimeout(timeoutInstance.value);
  timeoutInstance.value = setTimeout(async () => {
    router.push({ name: "home", query: { search } });
    state.planList = [];
    await getCities(search)
      .then((k) => {
        state.planList = k.data;
        errorCode.value = 0;
        if (!successListSearch.value.includes(search)) {
          successListSearch.value.push(search);
        }
      })
      .catch((err) => {
        console.log(err);
        errorCode.value = err.response.status;
      });
  }, timeout);
};

watch(
  () => successListSearch.value,
  () => {
    console.log(successListSearch.value);
    localStorage.setItem(
      "searchedCities",
      JSON.stringify(successListSearch.value)
    );
  },
  { deep: true }
);

onBeforeMount(() => {
  const search = route.query.search as string;
  if (search) searchValue.value = search;
  const searchListBefore = localStorage.getItem("searchCities");
  if (searchListBefore && JSON.parse(searchListBefore)) {
    successListSearch.value = JSON.parse(searchListBefore);
  }
});
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

    .choose-plan > * {
      width: 500px;
    }
  }
  .home {
    @apply w-1/2;
  }
  .cards {
    @apply absolute bottom-0;
  }
}

.cards {
  * {
    @apply mr-2;
  }
}

.bottom-text {
  color: #283044;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  opacity: 0.5;
}
</style>
