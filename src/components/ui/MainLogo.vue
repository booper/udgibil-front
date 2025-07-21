<template>
  <div
    class="flex items-center space-x-1 focus:outline-none focus:ring-0"
    :class="props.class"
  >
    <LogoIcon />
    <div class="text-2xl" :class="props.class">Udgibil</div>
  </div>
</template>
<script setup>
import LogoIcon from "@/components/icons/LogoIcon.vue";

const props = defineProps({
  class: {
    type: String,
    default: "text-indigo-700 dark:text-indigo-400",
  },
});
</script>
