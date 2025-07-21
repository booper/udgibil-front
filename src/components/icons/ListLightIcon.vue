<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="heightIcon"
    fill="currentColor"
    viewBox="0 0 448 512"
  >
    <path
      d="M0 80c0-8.8 7.2-16 16-16H432c8.8 0 16 7.2 16 16s-7.2 16-16 16H16C7.2 96 0 88.8 0 80zM0 240c0-8.8 7.2-16 16-16H304c8.8 0 16 7.2 16 16s-7.2 16-16 16H16c-8.8 0-16-7.2-16-16zM192 400c0 8.8-7.2 16-16 16H16c-8.8 0-16-7.2-16-16s7.2-16 16-16H176c8.8 0 16 7.2 16 16z"
    />
  </svg>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  h: {
    type: Number,
    default: 4,
  },
});

const heightIcon = computed(() => {
  return `h-${props.h} w-${props.h}`;
});
</script>
