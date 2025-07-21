<template>
  <div class="py-8 sm:mx-auto sm:w-full sm:max-w-sm">
    <div class="flex justify-center items-center">
      <div
        class="h-12 w-12 animate-spin inline-block border-[3px] border-current border-t-transparent text-indigo-600 rounded-full dark:text-indigo-500"
        role="status"
        aria-label="loading"
      ></div>
    </div>
  </div>
</template>
<script setup>
// import { computed } from "vue";
// const props = defineProps({
//   radius: {
//     type: Number,
//     default: 12,
//   },
// });

// const radius = computed(() => {
//   return "w-" + props.radius + " h-" + props.radius;
// });
</script>
