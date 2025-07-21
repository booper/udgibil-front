<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 px-6 pt-3 pb-20">
    <ProcessPulse v-if="!articleLoaded" />
    <div v-else>
      <div class="h-full flex flex-col relative">
        <div
          class="sticky top-0 p-4 z-50 ps-0 border-b bg-white dark:bg-gray-800 dark:border-gray-600"
        >
          <div class="flex items-center justify-between w-full">
            <div
              class="flex items-center text-md text-indigo-500 cursor-pointer"
              @click="goBack"
            >
              <ChevronLeftIcon />
              <span class="ps-2">{{ btnBackBookmark }}</span>
            </div>

            <ArticleActions
              :articleData="articleData.article"
              :articleType="'bookmark'"
            />
          </div>
        </div>

        <div class="flex-grow overflow-y-auto mt-4">
          <p class="text-left text-xs text-gray-500 mb-2 dark:text-gray-400">
            {{ datePub }}
          </p>
          <h1 class="text-3xl text-left mb-2 dark:text-gray-300">
            {{ articleData.article.title }}
          </h1>

          <div v-if="followed" class="flex items-center mb-10">
            <div
              class="flex-1 truncate text-sm text-left text-gray-400 hover:text-indigo-500 ms-1 cursor-pointer dark:text-gray-500 dark:hover:text-indigo-500"
              @click="goBack"
            >
              {{ articleData.feed.title }}
            </div>
            <div class="text-left text-sm text-gray-400 dark:text-gray-500">
              {{ author }}
            </div>
          </div>

          <div v-else>
            <div class="text-left text-sm text-gray-400">{{ author }}</div>
            <div class="mt-10 mb-10">
              <FeedBoxItem :feedItem="articleData.feed" />
            </div>
          </div>

          <img
            class="rounded-md w-full"
            :src="articleData.article.image.url"
            referrerpolicy="no-referrer"
          />
          <div v-if="!isUsersArticle" class="mt-10 text-left text-gray-800">
            <p v-for="p in articleContent" :key="p" class="my-4 text-lg">
              {{ p }}
            </p>
          </div>
          <div v-else>
            <ViewUsersArticle
              :article="articleData.article"
              class="mt-10 text-left text-gray-800"
            />
          </div>
          <div class="mt-5 text-center" v-if="!isUsersArticle">
            <button
              @click="goToOriginalLink"
              class="rounded-md px-8 py-2 mt-10 border border-indigo-600 text-indigo-600"
            >
              {{ btnReadSource }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "BookmarkArticleView",
  inheritAttrs: false,
  customOptions: {},
};
</script>

<script setup>
import { reactive, ref, toValue, computed, watch } from "vue";
import { useRoute } from "vue-router";
import { useGet } from "@/composibles/networks";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import { splitStringByNewLine } from "@/helpers/utils";
import ArticleActions from "@/components/shared/ArticleActions.vue";
import { useCollectionStore } from "@/stores/collections.js";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import { DateTime } from "luxon";
import ViewUsersArticle from "@/components/articles/ViewUsersArticle.vue";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";
import { useUserStore } from "@/stores/user";
import { useTimeAgo } from "@/composibles/timeago.js";

const { t, locale } = useI18n({ useScope: "global" });

const collectionStore = useCollectionStore();
const reqGet = useGet();
const route = useRoute();
const params = reactive({});
const articleUrl = ref("/bookmarks/id");
const id = ref(route.params.id); //route.params.id;
const articleData = reactive({});
const articleLoaded = ref(false);
const articleContent = ref([]);
const isUsersArticle = ref(false);
const sessionStore = useSessionStore();
const userStore = useUserStore();

locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const btnBackBookmark = computed(() => t("btnBackBookmark"));
const articleDateTime = ref(userStore.getArticleDateTime);
const btnReadSource = computed(() => t("btnReadSource"));
// const datePub = computed(() => {
//   const dt = DateTime.fromISO(articleData.article.pubDate).toLocal();
//   return dt.toLocaleString(DateTime.DATETIME_SHORT);
// });

// const isUsersArticle = computed(() => {
//   return articleData.article.userId !== null;
// });
watch(
  () => userStore.getArticleDateTime,
  (newVal) => {
    articleDateTime.value = newVal;
  }
);

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

const followed = ref(false);

const author = computed(() => {
  const a =
    articleData.article.author !== null
      ? "by " + articleData.article.author
      : "";
  return a;
});

const goBack = () => {
  window.history.back();
};
const loadArticle = () => {
  params.id = id;
  reqGet.request(articleUrl, params).then(() => {
    const resGet = toValue(reqGet.res);
    if (resGet.error === 0) {
      articleData.article = resGet.article;
      articleData.feed = resGet.feed;
      followed.value = collectionStore.isFollowed(articleData.feed.id);
      articleLoaded.value = true;
      articleContent.value = splitStringByNewLine(
        articleData.article.descriptionPlain
      );
      isUsersArticle.value = articleData.article.userId !== null;
    } else {
      //feedFound.value = false;
    }
  });
};

const goToOriginalLink = () => {
  window.open(articleData.article.link, "_blank");
};

loadArticle();
</script>
