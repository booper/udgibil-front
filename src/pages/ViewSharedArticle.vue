<template>
  <div class="relative h-full flex flex-col">
    <div
      class="sticky top-0 p-2 z-50 ps-0 border-b bg-white dark:bg-gray-800 dark:border-gray-600"
    >
      <div class="flex items-center justify-between px-4 w-full">
        <MainLogo />

        <router-link
          to="/auth"
          class="h-8 p-3 cursor-pointer inline-flex items-center justify-center rounded bg-indigo-100 text-indigo-600 flex-shrink-0 hover:bg-indigo-500 hover:text-white dark:bg-indigo-700 dark:text-white"
        >
          Signup
        </router-link>
      </div>
    </div>
    <div class="w-3xl max-w-3xl mx-auto">
      <ProcessPulse v-if="!articleLoaded" />
      <div v-else>
        <div v-if="articleFound" class="relative h-full flex flex-col">
          <div class="flex-grow overflow-y-auto mt-4 px-6 md:px-2">
            <h1 class="text-3xl text-left mb-2 dark:text-gray-300">
              {{ articleTitle }}
            </h1>
            <div class="flex items-center justify-between mt-4">
              <p
                class="text-left text-xs text-gray-500 mb-2 dark:text-gray-400"
              >
                {{ datePub }}
              </p>
              <p
                class="text-left text-xs text-gray-500 mb-2 dark:text-gray-400"
              >
                {{ author }}
              </p>
            </div>

            <div class="mt-5 mb-10">
              <FeedBoxItem
                :feedItem="articleData.feed"
                :noFollow="true"
                @feedItemClicked="goAuth"
              />
            </div>

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
            <div class="mt-5 text-center" v-if="!isUsersArticle">
              <button
                @click="goToOriginalLink"
                class="rounded-md px-8 py-2 mt-10 border border-indigo-600 text-indigo-600"
              >
                Read Source
              </button>
            </div>
          </div>
        </div>
        <div v-else><NotFound msg="Article not found" /></div>
      </div>
    </div>
    <div class="w-5xl max-w-5xl mx-auto mb-20"><CtaBox @click="goAuth" /></div>
  </div>

  <!-- <div class="flex gap-1 max-w-7xl mx-auto">
    <div
      class="w-2/12 ps-4 h-screen sticky top-0 flex-shrink-0 py-1 flex flex-col hidden md:block"
    ></div>
    <div class="w-full sm:w-9/12 lg:w-7/12 pb-20 dark:bg-slate-800">
      <ProcessPulse v-if="!articleLoaded" />
      <div v-else>
        <div v-if="articleFound" class="relative h-full flex flex-col">
          <div
            class="sticky top-0 p-2 z-50 ps-0 border-b bg-white dark:bg-gray-800 dark:border-gray-600"
          >
            <div class="flex items-center justify-between ps-2 w-full">
              <MainLogo />

              <router-link
                to="/auth"
                class="h-8 p-3 cursor-pointer inline-flex items-center justify-center rounded bg-indigo-100 text-indigo-600 flex-shrink-0 hover:bg-indigo-500 hover:text-white dark:bg-indigo-700 dark:text-white"
              >
                Signup
              </router-link>
            </div>
          </div>
          <div class="flex-grow overflow-y-auto mt-4 px-6 md:px-2">
            <h1 class="text-3xl text-left mb-2 dark:text-gray-300">
              {{ articleTitle }}
            </h1>
            <div class="flex items-center justify-between mt-4">
              <p
                class="text-left text-xs text-gray-500 mb-2 dark:text-gray-400"
              >
                {{ datePub }}
              </p>
              <p
                class="text-left text-xs text-gray-500 mb-2 dark:text-gray-400"
              >
                {{ author }}
              </p>
            </div>

            <div class="mt-5 mb-10">
              <FeedBoxItem
                :feedItem="articleData.feed"
                :noFollow="true"
                @feedItemClicked="goAuth"
              />
            </div>

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
              <p
                v-for="p in articleContent"
                :key="p"
                class="my-4"
                :class="computedText"
              >
                {{ p }}
              </p>
            </div>
            <div v-else class="mt-8">
              <ViewUsersArticle
                :article="articleData.article"
                :class="computedText"
              />
            </div>
            <div class="mt-5 text-center" v-if="!isUsersArticle">
              <button
                @click="goToOriginalLink"
                class="rounded-md px-8 py-2 mt-10 border border-indigo-600 text-indigo-600"
              >
                Read Source
              </button>
            </div>
          </div>
        </div>
        <div v-else><NotFound msg="Article not found" /></div>
      </div>
      <div class="px-6 md:px-2 mt-10"><CtaBox @click="goAuth" /></div>
    </div>
    <div
      class="h-full p-3 mt-2 space-y-2 w-60 text-gray-800 hidden md:block dark:text-gray-400"
    ></div>
  </div> -->
</template>

<script setup>
import { useSessionStore } from "@/stores/session.js";
import {
  reactive,
  ref,
  toValue,
  computed,
  onMounted,
  nextTick,
  watch,
} from "vue";
// import { useRoute } from "vue-router";
import { useGet } from "@/composibles/networks";
// import router from "@/router";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import { splitStringByNewLine } from "@/helpers/utils";
import { DateTime } from "luxon";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import ViewUsersArticle from "@/components/articles/ViewUsersArticle.vue";
import NotFound from "@/components/shared/NotFound.vue";
import MainLogo from "@/components/ui/MainLogo.vue";
import { useDevice } from "next-vue-device-detector";
import CtaBox from "@/components/shared/CtaBox.vue";

const d = useDevice();
const props = defineProps({
  id: {
    type: String,
  },
});

const sessionStore = useSessionStore();
const isAuthenticated = sessionStore.isAuth;
if (isAuthenticated) {
  window.location.href = import.meta.env.VITE_HOST + "/article/" + props.id;
}

// const articleStore = useArticleStore();
const reqGet = useGet();
// const route = useRoute();
// const userStore = useUserStore();
const selectedTextSize = ref("md");
const id = ref(props.id);
const articleData = reactive({});
const articleLoaded = ref(false);
const feedUrl = ref("");
const articleContent = ref([]);
const articleFound = ref(false);
const noImage = ref(import.meta.env.VITE_NO_IMAGE);
const fullHtmlArticle = ref(null);
const articleTitle = computed(() => {
  return articleData.article.title.length
    ? articleData.article.title
    : "No Title";
});

const artileComputedLInk = computed(() => {
  return import.meta.env.VITE_HOST + "/a/" + props.id;
});

const datePub = computed(() => {
  const dt = props.preview
    ? DateTime.now()
    : DateTime.fromISO(articleData.article.pubDate).toLocal();

  return dt.toLocaleString(DateTime.DATETIME_SHORT);
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
const articleDesc = ref("");
const articleImg = ref("");
const articleOgTitle = ref("");
const loadArticle = () => {
  const articleUrl = ref("/shared/articles/id");
  const params = reactive({});
  params.id = id;

  reqGet.request(articleUrl, params).then(() => {
    const resGet = toValue(reqGet.res);
    if (resGet.error === 0) {
      articleData.article = resGet.article;
      articleData.feed = resGet.feed;

      if (articleData.feed.available) {
        articleFound.value = true;
        // followed.value = collectionStore.isFollowed(articleData.feed.id);
        feedUrl.value = "/feeds/" + articleData.feed.id;
        articleDesc.value = articleData.article.title;
        articleImg.value = articleData.article.image.url;
        articleOgTitle.value = articleData.article.title;
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

loadArticle();

const goAuth = () => {
  const host = d.mobile
    ? import.meta.env.VITE_MOBILE_HOST
    : import.meta.env.VITE_HOST;
  // if (d.mobile) {
  //   window.location.href = import.meta.env.VITE_MOBILE_HOST + "/a/" + props.id;
  // }
  window.location.href = host + "/auth?a=" + props.id;
};
const goToOriginalLink = () => {
  window.open(articleData.article.link, "_blank");
};

onMounted(() => {
  // <meta property="og:url" content="{{shortURL}}">
  // <meta property="og:description" content="{{desc}}">
  // <meta property="og:site_name" content="{{a.rss_title}}">
  // <meta property="og:image" content="{{a.item_enclosure_url}}">
  // <meta property="og:title" content="{{a.item_title}}">
  // <meta property="og:type" content="website">
  watch(
    () => articleFound.value,
    (val) => {
      if (val) {
        nextTick(() => {
          const metaOgUrlTag = document.createElement("meta");
          metaOgUrlTag.setAttribute("property", "og:url");
          metaOgUrlTag.content = artileComputedLInk.value;
          document.head.appendChild(metaOgUrlTag);

          const metaOgDesc = document.createElement("meta");
          metaOgDesc.setAttribute("property", "og:description");
          metaOgDesc.content = articleDesc.value;
          document.head.appendChild(metaOgDesc);

          const metaOgSite = document.createElement("meta");
          metaOgSite.setAttribute("property", "og:og:site_name");
          metaOgSite.content = "https://your-domain.com";
          document.head.appendChild(metaOgSite);

          const metaOgImg = document.createElement("meta");
          metaOgImg.setAttribute("property", "og:image");
          metaOgImg.content = articleImg.value;
          document.head.appendChild(metaOgImg);

          const metaOgTitle = document.createElement("meta");
          metaOgTitle.setAttribute("property", "og:title");
          metaOgTitle.content = articleOgTitle.value;
          document.head.appendChild(metaOgTitle);

          const metaOgType = document.createElement("meta");
          metaOgType.setAttribute("property", "og:type");
          metaOgType.content = "website";
          document.head.appendChild(metaOgType);
        });
      }
    }
  );
});
</script>
