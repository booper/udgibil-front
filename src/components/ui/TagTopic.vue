<template>
  <span
    class="mb-2 mr-1 max-w-[10rem] truncate whitespace-nowrap inline-block py-1.5 px-3 rounded-md cursor-pointer text-xs font-medium bg-gray-100 text-indigo-800 hover:bg-gray-200 dark:bg-indigo-400/10 dark:text-indigo-400 dark:ring-1 dark:ring-inset dark:ring-indigo-400/20 dark:hover:bg-indigo-700 dark:hover:text-gray-300"
    @click="changeTopic"
    >#{{ props.topic }}</span
  >
</template>

<script setup>
import { useRelatedTopics } from "@/stores/relatedTopics.js";
const relatedTopicsStore = useRelatedTopics();
const props = defineProps({
  topic: String,
});

const changeTopic = () => {
  relatedTopicsStore.setCurrentTopic(props.topic);
};
</script>
