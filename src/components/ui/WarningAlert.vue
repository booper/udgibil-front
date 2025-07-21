<template>
  <div
    class="bg-yellow-50 border border-yellow-200 dark:border-yellow-700 text-sm text-yellow-800 rounded-lg p-4 dark:bg-yellow-800/10 dark:border-yellow-900 dark:text-yellow-500"
    role="alert"
  >
    <div class="flex">
      <div class="flex-shrink-0">
        <WarningIcon class="dark:text-yellow-500" />
      </div>
      <div class="ms-4">
        <h3 class="text-sm font-semibold">{{ props.title }}</h3>
        <div class="mt-1 text-sm text-yellow-700 dark:text-yellow-600">
          {{ props.message }}
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import WarningIcon from "@/components/icons/WarningIcon.vue";

const props = defineProps({
  title: {
    type: String,
    default: "",
  },
  message: {
    type: String,
    default: "",
  },
});
</script>
