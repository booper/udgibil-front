<template>
  <div class="relative w-full sm:w-9/12 lg:w-7/12 pt-3 px-6 dark:bg-gray-800">
    <div
      v-if="processRefreshArticles"
      class="fixed top-0 left-1/2 transform -translate-x-1/2 z-50 rounded-b-lg bg-green-200 dark:bg-indigo-700 p-4 text-sm text-gray-800 dark:text-gray-200 shadow-lg"
    >
      REFRESHING FEED...
    </div>
    <div v-if="loadingProcessFeed"><ProcessPulse /></div>
    <div v-else>
      <div v-if="feedFound">
        <FeedBoxItem :feedItem="feedData" />

        <ArticleListToolBox
          class="mt-2 mb-4"
          @changeViewMode="doChangeViewMode"
          @refreshArticles="refreshArticles"
          :viewMode="viewMode"
          :refreshBtn="true"
        />
        <div
          v-if="viewMode === 'list'"
          class="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <ArticlePanel
            v-for="article in foundArticles"
            :key="article.id"
            :article="article"
            @articleClicked="articleClicked"
          />
        </div>

        <div
          v-if="viewMode === 'card'"
          class="flex flex-wrap justify-between mt-4"
        >
          <ArticleCard
            v-for="article in foundArticles"
            :key="article.id"
            :article="article"
            @articleClicked="articleClicked"
          />
        </div>
        <div
          v-if="viewMode === 'titles'"
          class="divide-y divide-gray-200 dark:divide-gray-700"
        >
          <ArticlesTitles
            v-for="article in foundArticles"
            :key="article.id"
            :article="article"
            @articleClicked="articleClicked"
          />
        </div>
        <keep-alive v-if="!processRefreshArticles">
          <InfiniteLoading
            @infinite="loadArticles"
            :firstload="firstLoad"
            :key="infiniteLoadingArticlesKey"
          >
            <template #spinner>
              <ProcessPulse />
            </template>
            <template #complete>
              <div v-if="foundArticles.length == 0">
                <NotFound :msg="articlesNotFound" />
              </div>
              <div v-else></div>
            </template>
          </InfiniteLoading>
        </keep-alive>
        <div v-else><ProcessPulse /></div>
      </div>
      <div v-else>
        <NotFoundFeed
          :msg="feedNotFound"
          :feedId="props.id"
          @unfollow="unfollow"
        />
      </div>
    </div>
  </div>
</template>
<script>
export default {
  components: { NotFound },
  name: "FeedArticlesList",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
// import { useRoute } from "vue-router";
import {
  onMounted,
  reactive,
  ref,
  watch,
  toValue,
  onActivated,
  nextTick,
  computed,
} from "vue";

import { useGet } from "@/composibles/networks";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import InfiniteLoading from "v3-infinite-loading";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import ArticlePanel from "@/components/articles/ArticlePanel.vue";
import ArticleCard from "@/components/articles/ArticleCard.vue";
import ArticlesTitles from "@/components/articles/ArticlesTitles.vue";
import router from "@/router";
import { useFeedsStore } from "@/stores/feeds.js";
import { useUserStore } from "@/stores/user.js";
import NotFound from "@/components/shared/NotFound.vue";
import NotFoundFeed from "@/components/shared/NotFoundFeed.vue";
import ArticleListToolBox from "@/components/shared/ArticleListToolBox.vue";
import { usePingPong } from "@/composibles/PingPong";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const props = defineProps({
  id: String,
});
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
const reqGet = useGet();
const feedData = ref({});
const userStore = useUserStore();
const paramsArticle = reactive({});
const params = reactive({});
const feedFound = ref(true);
const isArticlesFound = ref(true);
const foundArticles = ref([]);
const firstLoad = ref(true);
const infiniteLoadingArticlesKey = ref(0);
const feedsStore = useFeedsStore();
const loadingProcessFeed = ref(false);
let page = 0;
const processRefreshArticles = ref(false);

const viewMode = ref(userStore.getArticleListViewMode);
const feedId = ref(props.id);
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const articlesNotFound = computed(() => t("articlesNotFound"));
const feedNotFound = computed(() => t("feedNotFound"));
watch(
  () => userStore.getArticleListViewMode,
  (val) => {
    viewMode.value = val;
  }
);

const loadFeedData = () => {
  const urlFeedById = ref("/feed/id");
  params.id = feedId.value;
  reqGet.request(urlFeedById, params).then(() => {
    loadingProcessFeed.value = false;
    const resGet = toValue(reqGet.res);
    if (resGet.error === 0) {
      feedData.value = resGet.feed;
      foundArticles.value = [];
      infiniteLoadingArticlesKey.value++;
      feedFound.value = feedData.value.available;
    } else {
      feedFound.value = false;
    }
  });
};

watch(
  () => props.id,
  (val) => {
    feedFound.value = false;
    loadingProcessFeed.value = true;
    isArticlesFound.value = true;
    feedId.value = val;

    feedsStore.setCurrentFeed(feedId.value);
    page = 0;
    loadFeedData();
  },
  { immediate: true }
);

const loadArticles = ($state) => {
  const urlRecentArticles = ref("/articles/all");
  paramsArticle.feedId = feedId.value;
  paramsArticle.page = page;
  reqGet.request(urlRecentArticles, paramsArticle).then(() => {
    const resGet = toValue(reqGet.res);

    if (resGet.error === 0) {
      isArticlesFound.value = true;
      foundArticles.value.push(...resGet.articles);

      if (resGet.articles.length < 20) {
        $state.complete();
      } else {
        $state.loaded();
        page++;
      }
    } else {
      isArticlesFound.value = false;
    }
  });
};

const articleClicked = (articleId) => {
  router.push("/article/" + articleId);
};

const doChangeViewMode = (mode) => {
  viewMode.value = mode;
  userStore.updateArticleListViewMode(mode);
};

const refreshArticles = async () => {
  processRefreshArticles.value = true;
  await onRefresh();
  processRefreshArticles.value = false;
  page = 0;
  foundArticles.value = [];
  infiniteLoadingArticlesKey.value++;
};

const onRefresh = async () => {
  const urlRefreshArticles = ref("/sofeco/id");
  params.id = feedId.value;
  await reqGet.request(urlRefreshArticles, params);

  //loadRecentArticles();
};

const unfollow = () => {
  feedsStore.setCurrentFeed(null);
  router.push("/feeds");
};

onMounted(() => {
  loadFeedData();
  feedsStore.setCurrentFeed(feedId.value);
  usePingPong();
});

onActivated(async () => {
  await nextTick();
  // usePingPong();
});
</script>
