<template>
  <div class="py-8 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="flex justify-center items-center">
      <div
        class="animate-spin inline-block border-[3px] border-current border-t-transparent text-indigo-600 rounded-full dark:text-indigo-500"
        :class="radius"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
const props = defineProps({
  radius: {
    type: Number,
    default: 12,
  },
  cols: {
    type: String,
  },
});

const radius = computed(() => {
  return "w-" + props.radius + " h-" + props.radius;
});
</script>
