<template>
  <div class="w-1/3 mb-4">
    <article
      class="flex items-end relative overflow-hidden rounded-lg transition border border-gray-300 mr-4 mb-2 hover:border-slate-400 hover:shadow-md cursor-pointer dark:border-slate-700 dark:hover:border-slate-400"
      @click="selectCategory"
      :class="props.boxType === 'big' ? 'h-32 pb-6 px-4' : 'py-4 px-4'"
    >
      <div class="text-md text-black dark:text-slate-300 z-50">
        {{ props.item.lang.en }}
      </div>
      <!-- <CircleNewsIcon
        :h="40"
        class="absolute top-[-20px] right-[-60px] r text-gray-200 opacity-10 dark:text-gray-700 dark:opacity-20"
      /> -->
    </article>
  </div>
</template>

<script setup>
// import { defineEmits } from "vue";
// import CircleNewsIcon from "@/components/icons/CircleNewsIcon.vue";

const props = defineProps({
  item: Object,
  boxType: {
    type: String,
    default: "normal",
  },
});

const selectCategory = () => {
  emit("categorySelected", { topic: props.item.topics.en });
};

const emit = defineEmits(["categorySelected"]);
</script>
