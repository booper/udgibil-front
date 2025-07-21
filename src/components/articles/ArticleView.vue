<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 px-6 pt-3 pb-20">
    <ProcessPulse v-if="!articleLoaded" />
    <div v-else>
      <div v-if="articleFound" class="h-full flex flex-col relative">
        <div
          v-if="!props.preview"
          class="sticky top-0 p-4 z-50 ps-0 border-b bg-white dark:bg-gray-800 dark:border-gray-600"
        >
          <div class="flex items-center justify-between w-full">
            <div
              class="flex items-center text-md text-indigo-500 cursor-pointer"
              :to="feedUrl"
              @click="goBack"
            >
              <ChevronLeftIcon />

              <span class="ps-2">{{ textBackToList }}</span>
            </div>

            <ArticleActions :articleData="articleData.article" />
          </div>
        </div>

        <div class="flex-grow overflow-y-auto mt-4">
          <p class="text-left text-xs text-gray-500 mb-2 dark:text-gray-400">
            {{ datePub }}
          </p>
          <h1 class="text-3xl text-left mb-2 dark:text-gray-300">
            {{ articleTitle }}
          </h1>
          <div v-if="!props.preview">
            <div v-if="followed" class="flex items-center mb-10">
              <div
                class="flex-1 truncate text-left text-gray-400 hover:text-indigo-500 ms-1 cursor-pointer dark:text-gray-400 dark:hover:text-indigo-500"
                @click="goBack"
              >
                {{ articleData.feed.title }}
              </div>
              <div class="text-left text-gray-400 dark:text-gray-400">
                {{ author }}
              </div>
            </div>

            <div v-if="!followed" class="mt-10 mb-10">
              <FeedBoxItem :feedItem="articleData.feed" />
            </div>
          </div>
          <div v-else>
            <div class="flex items-center mb-10">
              <div
                class="flex-1 truncate text-left text-gray-400 hover:text-indigo-500 ms-1 cursor-pointer dark:text-gray-400 dark:hover:text-indigo-500"
                @click="goBack"
              >
                {{ articleData.feed.title }}
              </div>
              <div class="text-left text-gray-400 dark:text-gray-400">
                {{ author }}
              </div>
            </div>
          </div>

          <div v-if="yt">
            <div class="relative w-full pt-[56.25%]">
              <iframe
                :src="getYoutubeEmbedUrl(articleData.article.link)"
                class="absolute top-0 left-0 w-full h-full"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </div>
          </div>
          <div v-else>
            <img
              v-if="articleData.article.image.url !== noImage"
              class="rounded-md w-full"
              :src="articleData.article.image.url"
              referrerpolicy="no-referrer"
            />
            <div
              v-if="!isUsersArticle"
              class="mt-10 text-left text-gray-800 dark:text-gray-300"
            >
              <div
                v-if="fullHtmlArticle"
                v-html="fullHtmlArticle"
                class="prose prose-p:mb-2 prose-img:rounded-lg prose-blockquote:dark:text-gray-300 prose-headings:dark:text-gray-300 prose-a:text-blue-500 prose-strong:dark:text-gray-300 dark:text-gray-300"
              ></div>
              <div v-else>
                <p
                  v-for="p in articleContent"
                  :key="p"
                  class="my-4"
                  :class="computedText"
                >
                  {{ p }}
                </p>
              </div>
            </div>
            <div v-else class="mt-8">
              <ViewUsersArticle
                :article="articleData.article"
                :class="computedText"
              />
            </div>

            <div class="mt-5 text-center flex flex-col" v-if="!isUsersArticle">
              <button
                @click="goToOriginalLink"
                class="rounded-md px-8 py-2 mt-10 text-indigo-600"
              >
                {{ btnReadSource }}
              </button>
            </div>
          </div>
          <!-- <div
            id="container-089657940b988c46a430b10c84d601b7"
            class="mt-6 dark:text-gray-300"
          ></div> -->
        </div>
      </div>
      <div v-else><NotFound msg="Article not found" /></div>
    </div>
  </div>
</template>

<script setup>
import {
  reactive,
  ref,
  watch,
  toValue,
  computed,
  watchEffect,
  onMounted,
} from "vue";

import { useRoute } from "vue-router";
import { useGet } from "@/composibles/networks";
import router from "@/router";
import { useFeedsStore } from "@/stores/feeds.js";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import { splitStringByNewLine } from "@/helpers/utils";
import ArticleActions from "@/components/shared/ArticleActions.vue";
import { DateTime } from "luxon";
import { useCollectionStore } from "@/stores/collections.js";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import ViewUsersArticle from "@/components/articles/ViewUsersArticle.vue";
import NotFound from "@/components/shared/NotFound.vue";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.vue";
import { useUserStore } from "@/stores/user";
import { usePingPong } from "@/composibles/PingPong";
import { useSessionStore } from "@/stores/session";
import { useTimeAgo } from "@/composibles/timeago.js";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
const sessionStore = useSessionStore();
const collectionStore = useCollectionStore();
const reqGet = useGet();
const route = useRoute();
const userStore = useUserStore();
const selectedTextSize = ref(userStore.getArticleTextSize);
const id = ref(route.params.id);
const articleData = reactive({});
const articleLoaded = ref(false);
const feedUrl = ref("");
const feedStore = useFeedsStore();
const articleContent = ref([]);
const followed = ref(false);
const articleFound = ref(false);
const noImage = ref(import.meta.env.VITE_NO_IMAGE);
const articleDateTime = ref(userStore.getArticleDateTime);
const fullHtmlArticle = ref(null);
const yt = ref(false);

locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const articleTitle = computed(() => {
  return articleData.article.title.length
    ? articleData.article.title
    : "No Title";
});

watch(
  () => userStore.getArticleDateTime,
  (newVal) => {
    articleDateTime.value = newVal;
  }
);

const btnBackSearchList = computed(() => t("btnBackSearchList"));
const btnBackFeedsList = computed(() => t("btnBackFeedsList"));
const btnReadSource = computed(() => t("btnReadSource"));

const textBackToList = computed(() => {
  if (
    props.fromSearch !== null &&
    props.fromSearch !== undefined &&
    props.fromSearch
  ) {
    return btnBackSearchList.value;
  } else {
    return btnBackFeedsList.value;
  }
});

const props = defineProps({
  fromSearch: Boolean,
  preview: {
    type: Boolean,
    default: false,
  },
});

watchEffect(() => {
  selectedTextSize.value = userStore.getArticleTextSize;
});

const datePub = computed(() => {
  let articleTimeAgo = "";

  if (articleDateTime.value === "ago") {
    const timeAgo = useTimeAgo();

    articleTimeAgo = timeAgo.formatedDateTimeAgo(
      articleData.article.pubDate,
      locale.value
    );
  } else {
    const dt = DateTime.fromISO(articleData.article.pubDate).toLocal();
    articleTimeAgo = dt.toLocaleString(DateTime.DATETIME_SHORT);
  }
  return articleTimeAgo;
});

const author = computed(() => {
  let a = "";
  if (!articleData.feed.anonymous) {
    if (articleData.article.userId !== null) {
      a = "by " + articleData.article.author;
    } else {
      a =
        articleData.article.author !== null
          ? "by " + articleData.article.author
          : "";
    }
  }

  return a;
});

const computedText = computed(() => {
  return "prose-" + selectedTextSize.value;
});

const isUsersArticle = computed(() => {
  return articleData.article.userId !== null;
});

const goBack = () => {
  if (
    props.fromSearch !== null &&
    props.fromSearch !== undefined &&
    props.fromSearch
  ) {
    window.history.back();
  } else {
    if (
      feedStore.getCurrentFeed !== null &&
      feedStore.getCurrentFeed !== undefined &&
      feedStore.getCurrentFeed === articleData.feed.id
    ) {
      window.history.back();
    } else {
      router.push({
        path: feedUrl.value,
      });
    }
  }

  //
};

const loadArticle = () => {
  const articleUrl = ref("/articles/id");
  const params = reactive({});
  params.id = id;

  reqGet.request(articleUrl, params).then(() => {
    const resGet = toValue(reqGet.res);
    if (resGet.error === 0) {
      articleData.article = resGet.article;
      articleData.feed = resGet.feed;
      yt.value =
        articleData.feed.youtube !== null ? articleData.feed.youtube : false;
      if (articleData.feed.available) {
        articleFound.value = true;
        followed.value = collectionStore.isFollowed(articleData.feed.id);
        feedUrl.value = "/feeds/" + articleData.feed.id;

        fullHtmlArticle.value = articleData.article.fullText;
        articleContent.value = splitStringByNewLine(
          articleData.article.descriptionPlain
        );
      } else {
        articleFound.value = false;
      }

      articleLoaded.value = true;
    } else {
      articleFound.value = false;
      articleLoaded.value = true;
    }
  });
};

const getYoutubeEmbedUrl = (url) => {
  // Handle different YouTube URL formats
  const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
  const match = url.match(regExp);

  if (match && match[2].length === 11) {
    // Return embed URL
    return `https://www.youtube.com/embed/${match[2]}`;
  }

  return null; // Invalid URL
};

const goToOriginalLink = () => {
  window.open(articleData.article.link, "_blank");
};

onMounted(() => {
  usePingPong();
});

loadArticle();
</script>
