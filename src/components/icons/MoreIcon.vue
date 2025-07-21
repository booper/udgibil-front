<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="heightIcon"
    fill="currentColor"
    viewBox="0 0 448 512"
  >
    <path
      d="M8 256a56 56 0 1 1 112 0A56 56 0 1 1 8 256zm160 0a56 56 0 1 1 112 0 56 56 0 1 1 -112 0zm216-56a56 56 0 1 1 0 112 56 56 0 1 1 0-112z"
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
