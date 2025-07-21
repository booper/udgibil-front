<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :class="classIcon"
    fill="currentColor"
    viewBox="0 0 128 512"
  >
    <path
      d="M64 360a56 56 0 1 0 0 112 56 56 0 1 0 0-112zm0-160a56 56 0 1 0 0 112 56 56 0 1 0 0-112zM120 96A56 56 0 1 0 8 96a56 56 0 1 0 112 0z"
    />
  </svg>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  class: {
    type: String,
    default: "fill-current w-4 h-4",
  },
});

const classIcon = computed(() => {
  return `${props.class}`;
});
</script>
