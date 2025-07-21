<template>
  <div class="flex">
    <div
      class="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-1 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
        <button
          v-for="ts in props.list"
          :key="ts.size"
          type="button"
          @click="changeTitleSize(ts.size)"
          class="py-1 px-4 inline-flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white"
          :class="
            selectedTitleSize === ts.size
              ? 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:bg-gray-800'
              : 'bg-transparent'
          "
          role="tab"
        >
          {{ ts.label }}
        </button>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref, watch } from "vue";
const props = defineProps({
  list: {
    type: Array,
    default: () => [],
  },
  selectedValue: {
    type: String,
    default: "",
  },
});

watch(
  () => props.selectedValue,
  () => {
    selectedTitleSize.value = props.selectedValue;
  }
);

const emit = defineEmits(["changeSize"]);
const selectedTitleSize = ref(props.selectedValue);

const changeTitleSize = (size) => {
  selectedTitleSize.value = size;
  emit("changeSize", size);
};
</script>
