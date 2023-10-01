<script setup lang="ts">
import { ref, defineProps, onMounted, defineEmits } from "vue";
import ListSelect from "@/components/atom/ListSelect.vue";
interface IProps {
  value?: string | number;
  list?: string[] | number[];
  placeholder?: string;
}
const value = ref<string | number>("");
const recommendList = ref<boolean>(false);
const props = defineProps<IProps>();
const emits = defineEmits(["input"]);

onMounted(() => {
  console.log("it is onmounted");
  if (props.value) {
    value.value = props.value;
  }
});

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
      <div
        class="bg-blue-500 w-32 ml-auto mr-0 rounded-full flex items-center justify-center text-white"
      >
        Enter
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
</style>
