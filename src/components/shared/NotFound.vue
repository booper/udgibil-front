<template>
  <div
    class="flex justify-center text-gray-500 dark:text-gray-400"
    :class="props.marginTop"
  >
    <HotCupDarkSvg />
  </div>
  <p
    class="text-center mt-3 text-gray-500 dark:text-gray-400"
    :class="props.marginBottom"
  >
    {{ props.msg }}
  </p>
</template>
<script setup>
import HotCupDarkSvg from "@/components/ui/svg/HotCupDarkSvg.vue";

const props = defineProps({
  msg: {
    type: String,
    default: "",
  },
  marginTop: {
    type: String,
    default: "pt-20",
  },
  marginBottom: {
    type: String,
    default: "",
  },
});
</script>
