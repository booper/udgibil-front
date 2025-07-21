<template>
  <svg
    :class="heightIcon"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
  >
    <path
      d="M240 64c0-8.8-7.2-16-16-16s-16 7.2-16 16V240H32c-8.8 0-16 7.2-16 16s7.2 16 16 16H208V448c0 8.8 7.2 16 16 16s16-7.2 16-16V272H416c8.8 0 16-7.2 16-16s-7.2-16-16-16H240V64z"
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
