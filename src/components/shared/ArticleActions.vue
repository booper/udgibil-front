<template>
  <div
    class="flex text-slate-500 dark: dark:bg-gray-800 dark:text-gray-400"
    :class="[gapClass]"
  >
    <span
      class="cursor-pointer hover:text-black dark:hover:text-white"
      v-tippy="tippyBookmarkArticle"
      @click="toggleBookmark"
    >
      <BookmarkEmptyIcon v-if="!isBookmarked" :h="5" />
      <BookmarkSolidIcon class="text-indigo-700" v-else :h="5" />
    </span>
    <span
      class="cursor-pointer hover:text-black dark:hover:text-white"
      v-tippy="ubCopyToClipboard"
      @click="copyLinkToClipboard"
    >
      <LinkIcon :h="6" />
    </span>
    <Popper ref="popperRef">
      <span
        class="cursor-pointer hover:text-black dark:hover:text-white"
        v-tippy="shareArticle"
      >
        <ShareIcon :h="5" />
      </span>
      <template #content="{ close: hpe }">
        <div
          class="rounded-md w-44 overflow-y-auto border border-gray-300 bg-white shadow-sm z-50 dark:border-gray-700 dark:bg-gray-900"
        >
          <div class="text-sm font-medium text-gray-900">
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <TwitterIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="Twitter"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Twitter
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <LinkedInIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="LinkedIn"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                LinkedIn
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <FacebookIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="facebook"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Facebook
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <TelegramIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="Telegram"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Telegram
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <BufferIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="Buffer"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Buffer
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <RedditIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="Reddit"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Reddit
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <HackerNewsIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="HackerNews"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                HackerNews
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <FlippBoardIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="FlipBoard"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                FlipBoard
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <PocketIcon class="me-2" />
              <ShareNetwork
                @open="OpenShare"
                network="Pocket"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Pocket
              </ShareNetwork>
            </div>
            <div
              class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
              @click="hpe"
            >
              <EmailIcon class="me-2" />

              <ShareNetwork
                @open="OpenShare"
                network="Email"
                :url="computedLink"
                :title="articleTitle"
                hashtags="Udgibil"
                class="flex-grow"
              >
                Email
              </ShareNetwork>
            </div>
          </div>
        </div></template
      >
    </Popper>
  </div>
</template>

<script setup>
import { computed, reactive, ref, watch } from "vue";

import Popper from "vue3-popper";
import { useToast } from "vue-toastification";
import { useBookmarksStore } from "@/stores/bookmarks.js";
import BookmarkEmptyIcon from "@/components/icons/BookmarkEmptyIcon.vue";
import BookmarkSolidIcon from "@/components/icons/BookmarkSolidIcon.vue";
import LinkIcon from "@/components/icons/LinkIcon.vue";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import TwitterIcon from "@/components/icons/TwitterIcon.vue";
import LinkedInIcon from "@/components/icons/LinkedInIcon.vue";
import FacebookIcon from "@/components/icons/FacebookIcon.vue";
import TelegramIcon from "@/components/icons/TelegramIcon.vue";
import BufferIcon from "@/components/icons/BufferIcon.vue";
import RedditIcon from "@/components/icons/RedditIcon.vue";
import HackerNewsIcon from "@/components/icons/HackerNewsIcon.vue";
import FlippBoardIcon from "@/components/icons/FlipBoardIcon.vue";
import PocketIcon from "@/components/icons/PocketIcon.vue";
import EmailIcon from "@/components/icons/EmailIcon.vue";
import { usePost } from "@/composibles/networks";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const props = defineProps({
  articleData: {
    type: Object,
  },
  size: {
    type: String,
  },
  articleType: {
    type: String,
  },
});

const emit = defineEmits(["toggleBookmark"]);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const tippyBookmarkArticle = computed(() => t("tippyBookmarkArticle"));
const ubCopyToClipboard = computed(() => t("ubCopyToClipboard"));
const shareArticle = computed(() => t("shareArticle"));

const articleTitle = ref(props.articleData.title);
// const articleLink = ref(props.articleData.link);
const toast = useToast();
const bookmarkStore = useBookmarksStore();
const bookmarks = ref(bookmarkStore.getBookmarksList);
const isBookmarked = computed(() => {
  const isb =
    props.articleType === "bookmark"
      ? bookmarks.value.includes(props.articleData.originArticleId)
      : bookmarks.value.includes(props.articleData.id);

  return isb;
});

const gapClass = computed(() => {
  if (props.size === "small") {
    return "justify-between";
  } else {
    return "gap-6";
  }
});

watch(bookmarkStore.getBookmarksList, (val) => {
  bookmarks.value = val;
});
const copyLinkToClipboard = () => {
  const shareLink = computedLink.value;
  navigator.clipboard.writeText(shareLink);
  toast("Link to article copied to clipboard", { position: "top-right" });
  incSharedCount();
};

const computedLink = computed(() => {
  // const oId = props.articleData.originArticleId;
  // const aId = props.articleData.id;
  const shareId = isBookmarked.value
    ? props.articleData.originArticleId
    : props.articleData.id;

  return import.meta.env.VITE_SHARE_ARTICLE_URL + shareId;
});

const OpenShare = () => {
  incSharedCount();
};
const incSharedCount = () => {
  const req = usePost();
  const userUrl = ref("/articles/update/share");
  const shareId =
    props.articleType === "bookmark"
      ? props.articleData.originArticleId
      : props.articleData.id;
  const userParams = reactive({ id: shareId });
  req.request(userUrl, userParams);
};

const toggleBookmark = () => {
  const articleid =
    props.articleType === "bookmark"
      ? props.articleData.originArticleId
      : props.articleData.id;
  if (isBookmarked.value) {
    bookmarkStore.removeBookmark(articleid);
    toast("Article has been removed from bookmarked", {
      position: "top-right",
    });
  } else {
    bookmarkStore.addBookmark(articleid);
    toast("Article has been bookmarked", { position: "top-right" });
    const req = usePost();
    const userUrl = ref("/articles/update/bookmarks");
    const userParams = reactive({ id: articleid });
    req.request(userUrl, userParams);
  }
  emit("toggleBookmark", { bookmarkId: props.articleData.id });
};
</script>
