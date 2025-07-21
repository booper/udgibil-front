<template>
  <div class="md:w-[49%] mb-4">
    <div
      class="flex flex-col bg-white border shadow-sm rounded-xl dark:bg-gray-800 dark:border-gray-700 dark:shadow-gray-700/[.7]"
    >
      <img
        v-if="computedImg !== noImage && computedImg !== noImage2"
        @load="handleImageLoad"
        @error="handleImageError"
        :src="computedImg"
        class="w-full h-auto rounded-t-xl cursor-pointer"
        referrerpolicy="no-referrer"
        @click="emit('articleClicked', props.article.id)"
      />
      <div class="px-4 pt-2" @click="emit('articleClicked', props.article.id)">
        <FeedPanel
          v-if="showFeed"
          :fId="props.article.feedId"
          :fImage="props.article.feed.image"
          :fTitle="props.article.feed.title"
          class="mb-2"
        />
        <h3
          class="text-lg font-bold text-gray-800 dark:text-white"
          :class="computedTitle"
        >
          {{ props.article.title }}
        </h3>
        <p class="mt-1 text-gray-500 dark:text-gray-400" :class="computedText">
          {{ truncatedText }}
        </p>
      </div>
      <div class="flex justify-between px-4 py-6">
        <div
          class="text-sm leading-relaxed tracking-normal text-gray-500 dark:text-gray-400"
        >
          {{ datePub }}
        </div>
        <ArticleActions
          v-if="!previewFeed"
          :articleData="props.article"
          size="big"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
// import { useTimeAgo } from "@vueuse/core";
import ArticleActions from "@/components/shared/ArticleActions.vue";
import FeedPanel from "@/components/articles/FeedPanel.vue";
import { useUserStore } from "@/stores/user";
import { DateTime } from "luxon";
import { useSessionStore } from "@/stores/session";
import { useTimeAgo } from "@/composibles/timeago.js";

const props = defineProps({
  article: Object,
  previewFeed: {
    type: Boolean,
    default: false,
  },
  showFeed: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["articleClicked"]);
const locale = ref("en");
const sessionStore = useSessionStore();
const noImage = import.meta.env.VITE_NO_IMAGE;
const noImage2 =
  "https://ik.imagekit.io/feedban/feedban/noimage.png?updatedAt=1698080701286";
const imageLoadedOk = ref(true);
const userStore = useUserStore();
const truncatedText = computed(() => {
  let text = "";

  if (
    props.article.descriptionPlain !== null &&
    props.article.descriptionPlain !== undefined &&
    props.article.descriptionPlain !== "null"
  ) {
    text =
      props.article.descriptionPlain.length <= 200
        ? props.article.descriptionPlain
        : props.article.descriptionPlain.substr(0, 200) + "...";
  }
  return text;
});
const articleDateTime = ref(userStore.getArticleDateTime);
const selectedTitleSize = ref(userStore.getArticleTitleSize);
const selectedTextSize = ref(userStore.getArticleTextSize);

locale.value =
  sessionStore.getLang !== null || sessionStore.getLang !== undefined
    ? sessionStore.getLang
    : "en";

watch(
  () => userStore.getArticleDateTime,
  (newVal) => {
    articleDateTime.value = newVal;
  }
);
watchEffect(() => {
  selectedTitleSize.value = userStore.getArticleTitleSize;
  selectedTextSize.value = userStore.getArticleTextSize;
});

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

const computedText = computed(() => {
  return "text-" + selectedTextSize.value;
});

const computedImg = computed(() => {
  return imageLoadedOk.value ? props.article.image.url : noImage;
});

const datePub = computed(() => {
  let articleTimeAgo = "";

  if (articleDateTime.value === "ago") {
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

const handleImageLoad = () => {};
const handleImageError = () => {
  imageLoadedOk.value = false;
};
</script>
