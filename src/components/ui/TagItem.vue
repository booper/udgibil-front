<template>
  <div
    class="bg-indigo-100 p-1 ps-0 hover:bg-indigo-200 inline-flex items-center text-sm rounded mt-2 mr-1 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-1 dark:ring-inset dark:ring-indigo-400/20"
  >
    <span class="ml-2 mr-1 leading-relaxed truncate max-w-xs" x-text="tag">{{
      props.tag
    }}</span>
    <button
      v-if="removeDisabled === false"
      @click="$emit('remove', index)"
      class="inline-block align-middle text-gray-500 hover:text-gray-600 focus:outline-none dark:text-indigo-400 dark:hover:text-indigo-300"
    >
      <TimesIcon :h="4" />
    </button>
  </div>
</template>

<script setup>
import { ref, watch } from "vue";
import TimesIcon from "@/components/icons/TimesIcon.vue";

const props = defineProps({
  tag: String,
  index: Number,
  disabled: {
    type: Boolean,
    default: false,
  },
});
const removeDisabled = ref(props.disabled);

watch(
  () => props.disabled,
  (val) => {
    removeDisabled.value = val;
  }
);
</script>
