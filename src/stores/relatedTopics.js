import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useRelatedTopics = defineStore("topics", () => {
  const related = ref([]);
  const currentTopic = ref(null);

  function setRelatedTopics(topicsArr) {
    related.value = topicsArr;
  }

  const setCurrentTopic = (topic) => {
    currentTopic.value = topic;
  };

  const getRelatedTopics = computed(() => related.value);
  const getCurrentTopic = computed(() => currentTopic.value);

  return {
    related,
    setRelatedTopics,
    getRelatedTopics,
    setCurrentTopic,
    getCurrentTopic,
  };
});
