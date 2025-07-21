<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    :class="heightIcon"
    viewBox="0 0 320 512"
  >
    <path
      d="M15 239c-9.4 9.4-9.4 24.6 0 33.9L207 465c9.4 9.4 24.6 9.4 33.9 0s9.4-24.6 0-33.9L65.9 256 241 81c9.4-9.4 9.4-24.6 0-33.9s-24.6-9.4-33.9 0L15 239z"
    />
  </svg>
</template>
<script setup>
import { computed } from "vue";

const props = defineProps({
  h: {
    type: Number,
    default: 5,
  },
});

const heightIcon = computed(() => {
  return `h-${props.h} w-${props.h}`;
});
</script>
