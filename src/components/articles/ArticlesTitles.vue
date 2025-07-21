<template>
  <div class="py-2">
    <div
      class="w-2/12 text-sm leading-relaxed tracking-normal text-gray-500 dark:text-gray-400"
    >
      {{ datePub }}
    </div>
    <h4
      class="block font-semibold leading-snug tracking-normal text-gray-800 dark:text-gray-300"
      :class="computedTitle"
      @click="emit('articleClicked', props.article.id)"
    >
      {{ props.article.title }}
    </h4>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
// import { useTimeAgo } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import { DateTime } from "luxon";
import { useSessionStore } from "@/stores/session";
import { useTimeAgo } from "@/composibles/timeago.js";

const props = defineProps({
  article: Object,
});

const emit = defineEmits(["articleClicked"]);
const locale = ref("en");
const userStore = useUserStore();
const sessionStore = useSessionStore();
const articleDateTime = ref(userStore.getArticleDateTime);
const selectedTitleSize = ref(userStore.getArticleTitleSize);

watch(
  () => userStore.getArticleDateTime,
  (newVal) => {
    articleDateTime.value = newVal;
  }
);
watchEffect(() => {
  selectedTitleSize.value = userStore.getArticleTitleSize;
});

locale.value =
  sessionStore.getLang !== null || sessionStore.getLang !== undefined
    ? sessionStore.getLang
    : "en";

const computedTitle = computed(() => {
  let size = "text-lg";
  if (selectedTitleSize.value === "lg") {
    size = "text-xl";
  } else if (selectedTitleSize.value === "md") {
    size = "text-lg";
  } else if (selectedTitleSize.value === "sm") {
    size = "text-md";
  } else if (selectedTitleSize.value === "xl") {
    size = "text-2xl";
  }

  return size;
});

const datePub = computed(() => {
  let articleTimeAgo = "";

  if (articleDateTime.value === "ago") {
    // const timeAgo = useTimeAgo(dt);
    // articleTimeAgo = timeAgo.value;
    const timeAgo = useTimeAgo();

    articleTimeAgo = timeAgo.formatedDateTimeAgo(
      props.article.pubDate,
      locale.value
    );
  } else {
    const dt = DateTime.fromISO(props.article.pubDate).toLocal();
    articleTimeAgo = dt.toLocaleString(DateTime.DATETIME_SHORT);
  }
  return articleTimeAgo;
});
</script>
