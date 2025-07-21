<template>
  <div
    class="flex ps-1 py-2 align-middle leading-1 rounded hover:bg-indigo-50 items-center dark:hover:bg-gray-700 dark:text-gray-400"
    :class="
      isActive ? 'bg-indigo-50 dark:bg-gray-700' : 'bg-white dark:bg-gray-800'
    "
    @click="goToArticlesList(props.fId)"
  >
    <img
      class="h-6 w-6 rounded handle-feed-drag cursor-grab"
      :src="props.fImage"
      referrerpolicy="no-referrer"
    />
    <div class="flex-1 ps-2 cursor-pointer font-semibold text-sm truncate">
      {{ fTitle }}
    </div>
  </div>
</template>

<script setup>
import { ref, watch, watchEffect } from "vue";
import { useFeedsStore } from "@/stores/feeds.js";
// import { useCollectionStore } from "@/stores/collections.js";
const isActive = ref(false);
const feedsStore = useFeedsStore();
// const collectionStore = useCollectionStore();
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

const emit = defineEmits(["clickFeed"]);

const goToArticlesList = (feedId) => {
  emit("clickFeed", feedId);
};

watch(
  () => feedsStore.getCurrentFeed,
  (newVal) => {
    if (props.fId === newVal) {
      isActive.value = true;
    } else {
      isActive.value = false;
    }
  },
  {
    immediate: true,
  }
);

watchEffect(() => {
  const cf = feedsStore.getCurrentFeed;

  if (props.fId === cf) {
    isActive.value = true;
  } else {
    isActive.value = false;
  }
});
</script>
