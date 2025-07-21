<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 pt-3 px-6 dark:bg-gray-800">
    <div class="ps-0 pt-2">
      <div class="flex items-center justify-between w-full">
        <span class="text-xl dark:text-gray-300">{{ titleBookmark }}</span>
      </div>
    </div>
    <ArticleListToolBox
      class="mt-2 mb-4"
      @changeViewMode="doChangeViewMode"
      :viewMode="viewMode"
    />
    <div
      v-if="viewMode === 'list'"
      class="divide-y divide-gray-200 dark:divide-gray-700"
    >
      <BookmarkArticleTitleItem
        v-for="article in foundBookmarksArticles"
        :key="article.id"
        :article="article"
        @articleClicked="articleClicked"
      />
    </div>
    <div v-if="viewMode === 'card'" class="flex flex-wrap justify-between mt-4">
      <ArticleCard
        v-for="article in foundBookmarksArticles"
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
        v-for="article in foundBookmarksArticles"
        :key="article.id"
        :article="article"
        @articleClicked="articleClicked"
      />
    </div>
    <keep-alive>
      <InfiniteLoading
        @infinite="loadBookmarksArticles"
        :firstload="firstLoad"
        :key="infiniteLoadingBookmarksArticlesKey"
      >
        <template #spinner>
          <ProcessPulse />
        </template>
        <template #complete>
          <div v-if="foundBookmarksArticles.length == 0"><not-found /></div>
          <div v-else></div>
        </template>
      </InfiniteLoading>
    </keep-alive>
  </div>
</template>
<script>
export default {
  components: { NotFound },
  name: "BookmarksArticlesList",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { reactive, ref, toValue, watch, computed } from "vue";
import { useGet } from "@/composibles/networks";
import InfiniteLoading from "v3-infinite-loading";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import BookmarkArticleTitleItem from "@/components/bookmarks/BookmarkArticleTitleItem.vue";
import router from "@/router";
import NotFound from "@/components/shared/NotFound.vue";
import ArticleListToolBox from "@/components/shared/ArticleListToolBox.vue";
import { useUserStore } from "@/stores/user.js";
import ArticleCard from "@/components/articles/ArticleCard.vue";
import ArticlesTitles from "@/components/articles/ArticlesTitles.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
const userStore = useUserStore();
const reqGet = useGet();
const urlBookmarksArticles = ref("/bookmarks/all");
const params = reactive({});
const foundBookmarksArticles = ref([]);
const firstLoad = ref(true);
const infiniteLoadingBookmarksArticlesKey = ref(0);
const sessionStore = useSessionStore();
const viewMode = ref(userStore.getArticleListViewMode);
let page = 0;

locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

watch(
  () => userStore.getArticleListViewMode,
  (val) => {
    viewMode.value = val;
  }
);

const titleBookmark = computed(() => t("titleBookmark"));
const loadBookmarksArticles = ($state) => {
  params.page = page;
  reqGet.request(urlBookmarksArticles, params).then(() => {
    const resGet = toValue(reqGet.res);

    if (resGet.error === 0) {
      foundBookmarksArticles.value.push(...resGet.articles);

      if (resGet.articles.length < 20) {
        $state.complete();
      } else {
        $state.loaded();
        page++;
      }
    }
  });
};

const articleClicked = (articleId) => {
  router.push("/bookmarks/" + articleId);
};

const doChangeViewMode = (mode) => {
  viewMode.value = mode;
  userStore.updateArticleListViewMode(mode);
};
</script>
