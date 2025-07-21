import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useFeedsStore = defineStore("feeds", () => {
  const currentFeed = ref(null);
  function setCurrentFeed(feedId) {
    currentFeed.value = feedId;
  }

  const getCurrentFeed = computed(() => {
    return currentFeed.value;
  });

  return {
    currentFeed,
    setCurrentFeed,
    getCurrentFeed,
  };
});
