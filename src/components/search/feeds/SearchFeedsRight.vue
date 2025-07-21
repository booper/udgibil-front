<template>
  <div class="w-2/12 pt-3">
    <div class="sticky top-0 pt-1 px-3">
      <h3
        v-if="listRelatedTopics.length"
        class="text-xl pb-4 dark:text-gray-300"
      >
        {{ titleRelatedTopics }}
      </h3>
      <div class="flex flex-wrap">
        <TagTopic
          v-for="(topic, index) in listRelatedTopics"
          :key="index"
          :topic="topic"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useRelatedTopics } from "@/stores/relatedTopics.js";
import TagTopic from "@/components/ui/TagTopic.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const relatedTopicsStore = useRelatedTopics();
const listRelatedTopics = ref([]);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;
const titleRelatedTopics = computed(() => t("titleRelatedTopics"));
watch(
  () => relatedTopicsStore.getRelatedTopics,
  (newVal) => {
    listRelatedTopics.value = newVal;
  }
);
</script>
