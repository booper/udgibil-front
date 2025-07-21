<template>
  <div class="flex w-full py-6 flex-row text-gray-700 cursor-pointer">
    <div
      class="w-1/5 m-0 text-gray-700 bg-white shrink-0 rounded-md dark:bg-gray-800"
    >
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
        :articleData="props.article"
        size="small"
        class="mt-2 pt-4"
        :articleType="'bookmark'"
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
          :fId="props.article.feedId"
          :fImage="props.article.feed.image"
          :fTitle="props.article.feed.title"
        />
      </div>
      <h4
        class="block antialiased font-semibold leading-snug tracking-normal text-black dark:text-gray-300"
        :class="computedTitle"
      >
        {{ props.article.title }}
      </h4>
      <div
        class="flex items-center mb-2 font-sans text-md antialiased font-semibold leading-snug tracking-normal"
      >
        <div class="text-gray-400">{{ props.article.feed.title }}</div>
      </div>
      <p class="text-gray-400 text-sm dark:text-gray-500" :class="computedText">
        {{ truncatedText }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { DateTime } from "luxon";
// import { useTimeAgo } from "@vueuse/core";
import ArticleActions from "@/components/shared/ArticleActions.vue";
import FeedPanel from "@/components/articles/FeedPanel.vue";
import { useUserStore } from "@/stores/user";
import { useSessionStore } from "@/stores/session";
import { useTimeAgo } from "@/composibles/timeago.js";

const props = defineProps({
  article: Object,
});

const emit = defineEmits(["articleClicked"]);
const locale = ref("en");
const sessionStore = useSessionStore();
const userStore = useUserStore();
const noImage =
  "https://ik.imagekit.io/feedban/feedban/noimage.png?updatedAt=1698080701286";
const imageLoadedOk = ref(true);
const articleDateTime = ref(userStore.getArticleDateTime);
const selectedTitleSize = ref(userStore.getArticleTitleSize);
const selectedTextSize = ref(userStore.getArticleTextSize);

locale.value =
  sessionStore.getLang !== null || sessionStore.getLang !== undefined
    ? sessionStore.getLang
    : "en";

watchEffect(() => {
  selectedTitleSize.value = userStore.getArticleTitleSize;
  selectedTextSize.value = userStore.getArticleTextSize;
});

const truncatedText = computed(() => {
  if (props.article.descriptionPlain.length <= 200)
    return props.article.descriptionPlain;
  return props.article.descriptionPlain.substr(0, 200) + "...";
});

const computedImg = computed(() => {
  return imageLoadedOk.value ? props.article.image.url : noImage;
});

watch(
  () => userStore.getArticleDateTime,
  (newVal) => {
    articleDateTime.value = newVal;
  }
);

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

// const datePub = computed(() => {
//   let articleTimeAgo = "";
//   const dt = DateTime.fromISO(props.article.pubDate).toLocal();
//   if (articleDateTime.value === "ago") {
//     const timeAgo = useTimeAgo(dt);
//     articleTimeAgo = timeAgo.value;
//   } else {
//     articleTimeAgo = dt.toLocaleString(DateTime.DATETIME_SHORT);
//   }
//   return articleTimeAgo;
// });

const handleImageLoad = () => {};
const handleImageError = () => {
  imageLoadedOk.value = false;
};
</script>
