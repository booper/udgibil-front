<template>
  <div class="relative h-full flex flex-col">
    <div
      class="sticky top-0 p-2 z-50 ps-0 border-b bg-white dark:bg-gray-800 dark:border-gray-600"
    >
      <div class="flex items-center justify-between px-4 w-full">
        <router-link to="/"><MainLogo /></router-link>

        <router-link
          to="/auth"
          class="h-8 p-3 cursor-pointer inline-flex items-center justify-center rounded bg-indigo-100 text-indigo-600 flex-shrink-0 hover:bg-indigo-500 hover:text-white dark:bg-indigo-700 dark:text-white"
        >
          Signup
        </router-link>
      </div>
    </div>
    <div class="w-3xl max-w-3xl mx-auto">
      <ProcessPulse v-if="!feedLoaded" />
      <div v-else>
        <div
          v-if="feedFound"
          class="flex-grow overflow-y-auto mt-4 px-6 md:px-2"
        >
          <div class="mt-5 mb-10">
            <FeedBoxItem
              :feedItem="feedData"
              :noFollow="true"
              @feedItemClicked="goAuth"
            />
          </div>
          <h3 class="text-2xl">Recent Articles</h3>
          <div
            v-if="isArticlesFound"
            class="divide-y divide-gray-200 dark:divide-gray-700"
          >
            <ArticlePanel
              v-for="article in foundArticles"
              :key="article.id"
              :article="article"
              :previewFeed="true"
              @articleClicked="goAuth"
            />
          </div>
          <div v-else><NotFound msg="No Articles Found" /></div>
        </div>
        <div v-else><NotFound msg="Feed Not Found" /></div>
      </div>
    </div>
    <div class="w-5xl max-w-5xl mx-auto mb-20"><CtaBox @click="goAuth" /></div>
  </div>
</template>
<script setup>
import { reactive, ref, toValue, onMounted } from "vue";
import { useSessionStore } from "@/stores/session.js";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import MainLogo from "@/components/ui/MainLogo.vue";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import { useDevice } from "next-vue-device-detector";
import { useGet } from "@/composibles/networks";
import ArticlePanel from "@/components/articles/ArticlePanel.vue";
import NotFound from "@/components/shared/NotFound.vue";
import CtaBox from "@/components/shared/CtaBox.vue";
// import ArticleCard from "@/components/articles/ArticleCard.vue";

const feedLoaded = ref(false);

const d = useDevice();
const props = defineProps({
  id: {
    type: String,
  },
});
const sessionStore = useSessionStore();
const isAuthenticated = sessionStore.isAuth;
if (isAuthenticated) {
  window.location.href = import.meta.env.VITE_HOST + "/feeds/" + props.id;
}
const reqGet = useGet();
const feedData = ref({});
const foundArticles = ref([]);
const feedId = ref(props.id);
const feedFound = ref(false);
const paramsArticle = reactive({});
const isArticlesFound = ref(true);

const loadFeedData = () => {
  const urlFeedById = ref("/shared/feed/id");
  const params = reactive({});
  params.id = feedId.value;
  reqGet.request(urlFeedById, params).then(() => {
    feedLoaded.value = true;
    const resGet = toValue(reqGet.res);
    if (resGet.error === 0) {
      feedData.value = resGet.feed;
      foundArticles.value = [];
      feedFound.value = feedData.value.available;
      loadArticles();
    } else {
      feedFound.value = false;
    }
  });
};

const loadArticles = () => {
  const urlRecentArticles = ref("/shared/articles/all");
  paramsArticle.feedId = feedId.value;
  paramsArticle.page = 0;
  reqGet.request(urlRecentArticles, paramsArticle).then(() => {
    const resGet = toValue(reqGet.res);

    if (resGet.error === 0) {
      isArticlesFound.value = true;
      foundArticles.value.push(...resGet.articles);

      // if (resGet.articles.length < 20) {
      //   $state.complete();
      // } else {
      //   $state.loaded();
      // }
    } else {
      isArticlesFound.value = false;
    }
  });
};

const goAuth = () => {
  const host = d.mobile
    ? import.meta.env.VITE_MOBILE_HOST
    : import.meta.env.VITE_HOST;

  window.location.href = host + "/auth?f=" + props.id;
};

onMounted(() => {
  loadFeedData();
});
</script>
