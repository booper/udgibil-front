<template>
  <div class="hidden sm:block">
    <div class="flex w-full py-6 flex-row cursor-pointer">
      <div class="w-1/5 m-0 bg-white shrink-0 dark:bg-gray-800">
        <div
          class="h-20 overflow-hidden"
          @click="emit('articleClicked', props.article.id)"
        >
          <img
            @load="handleImageLoad"
            @error="handleImageError"
            :src="computedImg"
            alt="image"
            class="object-cover w-full h-full rounded-md"
            referrerpolicy="no-referrer"
          />
        </div>
        <ArticleActions
          v-if="!previewFeed"
          :articleData="props.article"
          size="small"
          class="mt-2 pt-4"
        />
      </div>
      <div
        class="ps-3 pe-3 w-full"
        @click="emit('articleClicked', props.article.id)"
      >
        <div class="flex items-top mb-0 justify-between">
          <div
            class="text-sm leading-relaxed tracking-normal text-gray-500 dark:text-gray-400"
          >
            {{ datePub }}
          </div>
          <FeedPanel
            v-if="showFeed"
            :fId="props.article.feedId"
            :fImage="props.article.feed.image"
            :fTitle="props.article.feed.title"
          />
        </div>
        <h4
          class="block antialiased font-semibold leading-snug tracking-normal text-gray-800 dark:text-white"
          :class="computedTitle"
        >
          {{ props.article.title }}
        </h4>

        <p class="text-gray-400 mt-2 dark:text-gray-400" :class="computedText">
          {{ truncatedText }}
        </p>
      </div>
    </div>
  </div>
  <div
    class="sm:hidden bg-white border mt-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div
      class="h-40 overflow-hidden"
      @click="emit('articleClicked', props.article.id)"
    >
      <img
        @load="handleImageLoad"
        @error="handleImageError"
        :src="computedImg"
        alt="image"
        class="object-cover w-full h-full rounded-md"
        referrerpolicy="no-referrer"
      />
    </div>
    <div class="p-5">
      <h3
        class="mb-2 font-bold text-gray-800 dark:text-white"
        :class="computedTitle"
        @click="articleClicked"
      >
        {{ article.title }}
      </h3>

      <p
        class="mb-3 text-gray-500 dark:text-gray-400"
        :class="computedText"
        @click="articleClicked"
      >
        {{ truncatedText }}
      </p>

      <div
        class="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
      >
        <div
          class="text-sm leading-relaxed tracking-normal text-gray-500 dark:text-gray-400"
        >
          {{ datePub }}
        </div>
        <!-- <ArticleActionBar
          :articleData="article"
          :articleType="props.articleType"
        /> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
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
    // const timeAgo = useTimeAgo(dt);
    // articleTimeAgo = timeAgo.value;
    // const dt = DateTime.fromISO(props.article.pubDate).toLocal().toISO();
    // articleTimeAgo = format(dt);
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
