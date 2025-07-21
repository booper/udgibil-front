<template>
  <div class="w-7/12 px-6 pt-3 dark:bg-gray-800">
    <div class="ps-0 pt-2">
      <div class="flex gap-x-2 items-center w-full">
        <ChevronLeftIcon
          @click="goBack"
          class="cursor-pointer dark:text-gray-300"
        />
        <h3 class="text-xl dark:text-gray-300">{{ titleSearchForFeeds }}</h3>
      </div>
      <InputSearchFeed :searchString="searchQuery" :selLang="selectedLang" />
      <div v-if="searchSuccess">
        <section class="text-gray-600 body-font pt-6">
          <FeedBoxItem
            class="mb-4"
            v-for="feed in foundFeeds"
            :key="feed.id"
            :feedItem="feed"
            :searchPanel="true"
            @feedItemClicked="itemClicked"
          />
        </section>

        <InfiniteLoading
          @infinite="doSearch"
          :firstload="firstLoad"
          ref="infiniteLoading"
          :key="infiniteLoadingKey"
        >
          <template #spinner>
            <ProcessPulse />
          </template>
          <template #complete>
            <div v-if="foundFeeds.length == 0"><not-found /></div>
            <div v-else></div>
          </template>
        </InfiniteLoading>
      </div>
      <div v-else>
        <NotFound :msg="feedsNotFound" />
      </div>
    </div>
  </div>
  <FeedPreviewModal
    :title="feedViewTitle"
    :showModal="showModal"
    :feed="feedPreviewData"
    @closeModalWindow="showModal = !showModal"
  />
</template>

<script setup>
import { ref, reactive, toValue, onMounted, watch, computed } from "vue";
import { useGet } from "@/composibles/networks";
import { useRoute } from "vue-router";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import { useRelatedTopics } from "@/stores/relatedTopics.js";
import FeedPreviewModal from "@/components/ui/modals/FeedPreviewModal.vue";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import InfiniteLoading from "v3-infinite-loading";
import InputSearchFeed from "@/components/search/feeds/InputSearchFeed.vue";
import NotFound from "@/components/shared/NotFound.vue";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const reqGet = useGet();
// const process = ref(true);
const searchQuery = ref("");
const router = useRouter();
// const interestOptions = ref([]);
const paramSearch = reactive({});
const firstLoad = ref(true);
const route = useRoute();
const selectedLang = ref("en");
const foundFeeds = ref([]);
const relatedTopicsStore = useRelatedTopics();
const feedViewTitle = ref("Feed Preview");
const showModal = ref(false);
const feedPreviewData = reactive({});
let page = 0;
const infiniteLoadingKey = ref(0);
const searchSuccess = ref(true);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const titleSearchForFeeds = computed(() => t("titleSearchForFeeds"));
const feedsNotFound = computed(() => t("feedsNotFound"));
const doSearch = ($state) => {
  const encodedSelectedLang = encodeURIComponent(selectedLang.value);
  const encodedEnteredSearchQuery = encodeURIComponent(
    searchQuery.value.trim()
  );
  paramSearch.q = encodedEnteredSearchQuery;
  paramSearch.l = encodedSelectedLang;
  paramSearch.p = page;

  const urlSearch = ref("/feed/search");

  reqGet.request(urlSearch, paramSearch).then(() => {
    const resGet = toValue(reqGet.res);
    if (resGet.error === 0) {
      searchSuccess.value = true;
      if (resGet.feeds !== null && resGet.feeds.length > 0) {
        foundFeeds.value.push(...resGet.feeds);
        if (resGet.feeds.length < 20) {
          $state.complete();
        } else {
          $state.loaded();
          page++;
        }
      } else {
        foundFeeds.value = [];
        $state.complete();
      }

      relatedTopicsStore.setRelatedTopics(
        resGet.related === null ? [] : resGet.related
      );
    } else {
      searchSuccess.value = false;
    }
  });
};

watch([() => route.query.q, () => route.query.l], (newVal) => {
  page = 0;

  handleUrlQuery(newVal[0], newVal[1]);
  infiniteLoadingKey.value++;
});

const handleUrlQuery = (q, l) => {
  firstLoad.value = true;
  relatedTopicsStore.setRelatedTopics([]);
  relatedTopicsStore.setCurrentTopic(null);
  if (q !== null && q !== undefined && l !== null && l !== undefined) {
    searchQuery.value = decodeURIComponent(q.trim());
    selectedLang.value = l;
    foundFeeds.value = [];
    searchSuccess.value = true;
  }
};

onMounted(() => {
  relatedTopicsStore.setCurrentTopic(null);
  handleUrlQuery(route.query.q, route.query.l);
});

const itemClicked = (data) => {
  for (let key in feedPreviewData) {
    delete feedPreviewData[key];
  }

  Object.assign(feedPreviewData, data);
  showModal.value = true;
};

const goBack = () => {
  router.push("/feeds/add");
};
</script>
