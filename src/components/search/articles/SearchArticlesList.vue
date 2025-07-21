<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 pt-3 px-6 dark:bg-gray-800">
    <div class="pt-2 ps-0">
      <div class="flex items-center justify-between w-full">
        <span class="text-xl dark:text-gray-200">{{
          titleSearchArticles
        }}</span>
      </div>
    </div>
    <SearchLine :searchString="searchQuery" />
    <ArticleListToolBox
      class="mt-2 mb-4"
      @changeViewMode="doChangeViewMode"
      :viewMode="viewMode"
      :refreshBtn="false"
    />
    <div
      v-if="viewMode === 'list'"
      class="divide-y divide-gray-200 dark:divide-gray-600"
    >
      <ArticlePanel
        v-for="article in foundSearchArticles"
        :key="article.id"
        :article="article"
        :showFeed="true"
        @articleClicked="articleClicked"
      />
    </div>

    <div v-if="viewMode === 'card'" class="flex flex-wrap justify-between mt-4">
      <ArticleCard
        v-for="article in foundSearchArticles"
        :key="article.id"
        :article="article"
        :showFeed="true"
        @articleClicked="articleClicked"
      />
    </div>
    <div
      v-if="viewMode === 'titles'"
      class="divide-y divide-gray-200 dark:divide-gray-700"
    >
      <ArticlesTitles
        v-for="article in foundSearchArticles"
        :key="article.id"
        :article="article"
        @articleClicked="articleClicked"
      />
    </div>
    <keep-alive>
      <InfiniteLoading
        @infinite="doSearch"
        :firstload="firstLoad"
        :key="infiniteLoadingSearchArticlesKey"
      >
        <template #spinner>
          <ProcessPulse />
        </template>
        <template #complete>
          <div v-if="foundSearchArticles.length == 0"><NotFound /></div>
          <div v-else></div>
        </template>
      </InfiniteLoading>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: "SearchArticlesList",
  inheritAttrs: false,
  customOptions: {},
};
</script>
<script setup>
import { reactive, ref, watch, toValue, onMounted, computed } from "vue";
import { useGet } from "@/composibles/networks";
import InfiniteLoading from "v3-infinite-loading";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import ArticlePanel from "@/components/articles/ArticlePanel.vue";
import ArticleCard from "@/components/articles/ArticleCard.vue";
import ArticlesTitles from "@/components/articles/ArticlesTitles.vue";
import router from "@/router";
import SearchLine from "@/components/search/articles/SearchLine.vue";
// import { useFeedsStore } from "@/stores/feeds.js";
import { useUserStore } from "@/stores/user.js";
import ArticleListToolBox from "@/components/shared/ArticleListToolBox.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const userStore = useUserStore();
const reqGet = useGet();
const urlSearchArticles = ref("/search");
const paramSearch = reactive({});
const foundSearchArticles = ref([]);
const firstLoad = ref(true);
const infiniteLoadingSearchArticlesKey = ref(0);
const searchQuery = ref("");
const searchOption = ref("");
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

// let stopWatching;
let page = 0;

const titleSearchArticles = computed(() => t("titleSearchArticles"));

const props = defineProps({
  q: String,
  opt: String,
});
const viewMode = ref(userStore.getArticleListViewMode);

watch([() => props.q, () => props.opt], ([newQ, newOpt]) => {
  handleUrlQuery(newQ, newOpt);
  infiniteLoadingSearchArticlesKey.value++;
});

watch(
  () => userStore.getArticleListViewMode,
  (val) => {
    viewMode.value = val;
  }
);

const doSearch = ($state) => {
  const encodedEnteredSearchQuery = encodeURIComponent(
    searchQuery.value.trim()
  );

  if (encodedEnteredSearchQuery.length > 0) {
    paramSearch.q = encodedEnteredSearchQuery;
    paramSearch.p = page;
    paramSearch.opt = searchOption.value;

    reqGet.request(urlSearchArticles, paramSearch).then(() => {
      const resGet = toValue(reqGet.res);

      if (resGet.articles !== null && resGet.articles.length > 0) {
        foundSearchArticles.value.push(...resGet.articles);
        if (resGet.articles.length < 20) {
          $state.complete();
        } else {
          $state.loaded();
          page++;
        }
      } else {
        foundSearchArticles.value = [];
        $state.complete();
      }
    });
  } else {
    $state.complete();
  }
};

const handleUrlQuery = (q, opt) => {
  firstLoad.value = true;
  page = 0;
  foundSearchArticles.value = [];
  searchOption.value = opt;
  if (q !== null && q !== undefined) {
    searchQuery.value = decodeURIComponent(q.trim());
  } else {
    searchQuery.value = "";
  }
};

onMounted(() => {
  handleUrlQuery(props.q, props.opt);
});

const articleClicked = (articleId) => {
  router.push("/search/article/" + articleId);
};

const doChangeViewMode = (mode) => {
  viewMode.value = mode;
  userStore.updateArticleListViewMode(mode);
};
</script>
