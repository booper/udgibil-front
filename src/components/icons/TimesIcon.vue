<template>
  <!-- <svg
    class="w-6 h-6 fill-current mx-auto"
    :class="heightIcon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
  >
    <path
      fill-rule="evenodd"
      d="M15.78 14.36a1 1 0 0 1-1.42 1.42l-2.82-2.83-2.83 2.83a1 1 0 1 1-1.42-1.42l2.83-2.82L7.3 8.7a1 1 0 0 1 1.42-1.42l2.83 2.83 2.82-2.83a1 1 0 0 1 1.42 1.42l-2.83 2.83 2.83 2.82z"
    />
  </svg> -->

  <svg
    xmlns="http://www.w3.org/2000/svg"
    class="mx-auto"
    fill="currentColor"
    :class="heightIcon"
    viewBox="0 0 384 512"
  >
    <!--! Font Awesome Pro 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. -->
    <path
      d="M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"
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
