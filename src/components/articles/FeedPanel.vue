<template>
  <div
    class="flex ps-0 align-middle leading-1 rounded items-center bg-white dark:bg-gray-800"
  >
    <img class="h-4 rounded" :src="props.fImage" referrerpolicy="no-referrer" />
    <div class="flex-1 ps-2 text-sm truncate dark:text-slate-400">
      {{ fTitle }}
    </div>
  </div>
</template>

<script setup>
// import { ref, watch } from "vue";
// import { useFeedsStore } from "@/stores/feeds.js";
// const isActive = ref(false);
// const feedsStore = useFeedsStore();

const props = defineProps({
  fId: {
    type: String,
  },
  fImage: {
    type: String,
  },
  fTitle: {
    type: String,
  },
});

// const emit = defineEmits(["clickFeed"]);

// const goToArticlesList = (feedId) => {
//   emit("clickFeed", feedId);
// };

// watch(
//   () => feedsStore.getCurrentFeed,
//   (newVal) => {
//     if (props.fId === newVal) {
//       isActive.value = true;
//     } else {
//       isActive.value = false;
//     }
//   },
//   {
//     immediate: true,
//   }
// );
</script>
