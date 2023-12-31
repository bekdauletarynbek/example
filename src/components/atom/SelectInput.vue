<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits, computed, defineExpose } from "vue";
interface IProps {
  value?: string;
  list?: string[] | number[];
  placeholder?: string;
  successValue?: boolean;
  historyList?: string[];
  error?: boolean;
}

const props = defineProps<IProps>();
const myDiv = ref<HTMLElement>();

const value = ref("");
const recommendList = ref<boolean>(false);
const emits = defineEmits(["input", "clearInput"]);

onMounted(() => {
  console.log(props.value);
  console.log(searchHistory, props.historyList);
  if (props.value) {
    value.value = props.value;
  }
});

const clearInput = () => {
  value.value = "";
  emits("clearInput");
};

const updateValue = (data) => {
  value.value = data.target.value;
  emits("input", data.target.value);
};

const setValue = (name: string)=> {
  value.value = name;
}

const selectHistory = (item: string) => {
  value.value = item;
  recommendList.value = false;
  emits("input", item);
};

const handleFocus = (state) => {
  recommendList.value = state;
};

const searchHistory = computed(() => {
  if (props.historyList?.length) {
    return props.historyList?.filter((k) =>
      k.toLowerCase().includes(value.value)
    );
  }
  return "";
});
defineExpose({
  setValue
})
</script>

<template>
  <div class="w-full" ref="myDiv">
    <div
      class="flex border rounded-xl border-gray-200 h-12 w-full"
      :class="[
        recommendList && selectHistory?.length ? 'border-b-0 rounded-t-xl' : '',
        error ? 'border-red-500 border' : '',
      ]"
    >
      <input
        type="text"
        :value="value"
        @focus="handleFocus(true)"
        @input="updateValue"
        :placeholder="placeholder"
        class="w-full pl-5 rounded-xl"
        :class="[
           selectHistory?.length  && recommendList? 'rounded-t-xl border-0' : '',
        ]"
      />
      <div v-if="value" class="icon bg-red-500 w-16" @click="clearInput">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          class="bi bi-x-lg"
          viewBox="0 0 16 16"
        >
          <path
            d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
          />
        </svg>
      </div>
    </div>
    <div
      v-if="searchHistory?.length && recommendList"
      class="bottom-0 h-24 w-full z-100 border border-t-0 overflow-y-auto rounded-b-xl border-gray-200 -mt-1.5"
    >
      <div
        class="px-3 pl-5 py-1 pt-5 hover:bg-gray-100 cursor-pointer"
        @click="selectHistory(item)"
        v-for="item in searchHistory"
        :key="item"
      >
        {{ item }}
      </div>
    </div>
    <div v-if="error" class="text-red-500">Invalid props</div>
  </div>
</template>

<style scoped lang="scss">
input {
  @apply focus:border-white #{!important};
  &:focus {
    border-color: #fff;
  }
}

.icon {
  @apply rounded-full flex items-center justify-center text-white cursor-pointer;
}
</style>
