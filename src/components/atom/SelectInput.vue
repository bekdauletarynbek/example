<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits } from "vue";
import ListSelect from "@/components/atom/ListSelect.vue";
interface IProps {
  value?: string | number;
  list?: string[] | number[];
  placeholder?: string;
  successValue?: boolean;
}

const props = defineProps<IProps>();

const value = ref<string | number>("");
const recommendList = ref<boolean>(false);
const emits = defineEmits(["input", "clearInput"]);

onMounted(() => {
  console.log(props.value);
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

const handleFocus = (state) => {
  recommendList.value = state;
};
</script>

<template>
  <div class="w-full relative">
    <div
      class="flex border border-b-0 rounded-t-xl border-gray-200 h-12 w-full"
    >
      <input
        type="text"
        :value="value"
        @focus="handleFocus(true)"
        @blur="handleFocus(false)"
        @input="updateValue"
        :placeholder="placeholder"
        class="border-0 w-full pl-5 rounded-t-xl"
      />
      <div v-if="!successValue" class="bg-blue-500 w-32 ml-auto mr-0 icon">
        Enter
      </div>
      <div v-else class="icon bg-red-500 w-16" @click="clearInput">
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
      v-if="recommendList"
      class="bottom-0 h-24 w-full z-100 border border-t-0 rounded-b-xl border-gray-200"
    >
      <ListSelect></ListSelect>
    </div>
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
