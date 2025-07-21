<template>
  <div
    class="hidden sm:block w-full py-6 px-5 rounded-md bg-white border px-2 dark:bg-gray-900 dark:border-gray-700 mt-4 hover:bg-gray-50 dark:hover:bg-gray-800"
    :class="$attrs.class"
  >
    <div class="flex" :class="yt ? 'items-center' : 'items-start'">
      <div
        class="w-12 cursor-pointer h-12 mr-4 sm:mb-0 mb-4 inline-flex items-center justify-center flex-shrink-0"
        :class="yt ? '' : 'pt-2'"
        @click="clickOnFeedItem"
      >
        <img
          class="rounded h-12 w-12 cursor-pointer"
          :src="props.feedItem.image.url"
          referrerpolicy="no-referrer"
        />
      </div>
      <div class="flex-grow text-left">
        <div class="flex items-center">
          <div class="flex-grow break-all cursor-pointer pe-3">
            <div
              class="text-black text-xl align-top title-font font-medium dark:text-gray-300"
              @click="clickOnFeedItem"
            >
              {{ props.feedItem.title }}
            </div>
          </div>
          <div v-if="!noFollow" class="ms-2">
            <BtnFollow
              v-show="!followed"
              :feedId="props.feedItem.id"
              :feed="feedItem"
            />

            <!-- <button
              v-show="followed"
              @click="clickedOnFollowUnfollowBtn"
              class="h-8 p-3 cursor-pointer border border-red-300 inline-flex items-center justify-center rounded bg-white text-red-600 flex-shrink-0 hover:bg-red-100 dark:bg-gray-800 dark:border-red-400 dark:text-red-400 dark:hover:bg-red-700 dark:hover:text-white"
            >
              <HugeCrossIcon class="h-4 w-4" />
              <span class="ms-1 text-xs">{{ btnUnfollow }}</span>
            </button> -->
            <button
              v-show="followed"
              @click="clickedOnFollowUnfollowBtn"
              class="h-8 p-3 cursor-pointer border border-gray-300 inline-flex items-center justify-center rounded bg-white text-gray-600 flex-shrink-0 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
            >
              <span class="ms-1 text-xs">{{ btnFollowing }}</span>
            </button>
          </div>
          <div v-else>
            <button
              class="h-8 p-3 cursor-pointer inline-flex items-center justify-center rounded bg-indigo-100 text-indigo-600 flex-shrink-0 hover:bg-indigo-500 hover:text-white dark:bg-indigo-700 dark:text-white"
              @click="clickOnFollowSharedFeed"
            >
              <PlusIcon />
              <span class="ms-1 text-sm">{{ btnFollow }}</span>
            </button>
          </div>

          <Popper ref="popperRef">
            <span
              class="cursor-pointer hover:text-black dark:hover:text-white"
              v-tippy="'Share Article'"
            >
              <ElipsisVerticalSolidIcon
                class="ps-2 dark:text-gray-300 h-5 w-5"
              />
            </span>
            <template #content="{ close: hpe }">
              <div
                class="rounded-md w-44 overflow-y-auto border border-gray-300 bg-white shadow-sm z-50 dark:border-gray-700 dark:bg-gray-900"
              >
                <div class="text-sm font-medium text-gray-900">
                  <div
                    class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer border-b dark:border-b-gray-700 hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
                    @click="doCopyFeedLink"
                  >
                    <LinkIcon class="me-2" />

                    <div>{{ lblCopyLink }}</div>
                  </div>
                  <div
                    class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
                    @click="hpe"
                  >
                    <TwitterIcon class="me-2" />

                    <ShareNetwork
                      @open="OpenShare"
                      network="Twitter"
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
                      :url="feedLink"
                      :title="feedTitle"
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
        <div
          v-if="!yt"
          class="mt-2 cursor-pointer leading-relaxed text-base text-gray-600 text-sm dark:text-gray-400 dark:text-gray-400 dark:hover:text-white"
          @click="clickOnFeedItem"
        >
          {{
            props.feedItem.description === null
              ? ""
              : props.feedItem.description
          }}
        </div>
      </div>
    </div>
  </div>
  <div
    class="sm:hidden w-full py-6 px-5 rounded-md bg-white border px-2 dark:bg-gray-900 dark:border-gray-700"
    :class="$attrs.class"
  >
    <div class="text-center">
      <img
        class="mx-auto rounded h-12 w-12 cursor-pointer"
        :src="props.feedItem.image.url"
        referrerpolicy="no-referrer"
      />
      <div
        class="text-black mt-2 text-xl align-top title-font font-medium dark:text-gray-300"
        @click="clickOnFeedItem"
      >
        {{ props.feedItem.title }}
      </div>
    </div>
    <div
      class="mt-2 cursor-pointer leading-relaxed text-base text-gray-600 text-sm dark:text-gray-400 dark:text-gray-400 dark:hover:text-white"
      @click="clickOnFeedItem"
    >
      {{
        props.feedItem.description === null ? "" : props.feedItem.description
      }}
    </div>
    <div class="flex justify-between mt-4">
      <Popper ref="popperRef">
        <span
          class="cursor-pointer hover:text-black dark:hover:text-white"
          v-tippy="'Share Article'"
          ><div class="flex items-start gap-x-2">
            <ShareIcon class="ps-2 dark:text-gray-300 h-6 w-6" />
            <span>Share</span>
          </div>
          <!-- <ElipsisVerticalSolidIcon class="ps-2 dark:text-gray-300 h-5 w-5" /> -->
        </span>
        <template #content="{ close: hpe }">
          <div
            class="rounded-md w-44 overflow-y-auto border border-gray-300 bg-white shadow-sm z-50 dark:border-gray-700 dark:bg-gray-900"
          >
            <div class="text-sm font-medium text-gray-900">
              <div
                class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer border-b dark:border-b-gray-700 hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
                @click="doCopyFeedLink"
              >
                <LinkIcon class="me-2" />

                <div>{{ lblCopyLink }}</div>
              </div>
              <div
                class="flex items-center text-left px-4 py-2 hover:bg-indigo-600 cursor-pointer hover:text-white dark:hover:bg-indigo-700 dark:text-gray-400 dark:hover:text-white"
                @click="hpe"
              >
                <TwitterIcon class="me-2" />

                <ShareNetwork
                  @open="OpenShare"
                  network="Twitter"
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
                  :url="feedLink"
                  :title="feedTitle"
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
      <div>
        <div v-if="!noFollow" class="ms-2">
          <BtnFollow
            v-show="!followed"
            :feedId="props.feedItem.id"
            :feed="feedItem"
          />

          <button
            v-show="followed"
            @click="clickedOnFollowUnfollowBtn"
            class="h-8 p-3 cursor-pointer border border-gray-300 inline-flex items-center justify-center rounded bg-white text-gray-600 flex-shrink-0 hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-400 dark:hover:bg-gray-700"
          >
            <span class="ms-1 text-xs">{{ btnFollowing }}</span>
          </button>
        </div>
        <div v-else>
          <button
            class="h-8 p-3 cursor-pointer inline-flex items-center justify-center rounded bg-indigo-100 text-indigo-600 flex-shrink-0 hover:bg-indigo-500 hover:text-white dark:bg-indigo-700 dark:text-white"
            @click="clickOnFollowSharedFeed"
          >
            <PlusIcon />
            <span class="ms-1 text-sm">{{ btnFollow }}</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";

defineOptions({
  inheritAttrs: false
});
import { useCollectionStore } from "@/stores/collections.js";
import BtnFollow from "@/components/ui/BtnFollow.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import ElipsisVerticalSolidIcon from "@/components/icons/ElipsisVerticalSolidIcon.vue";
import Popper from "vue3-popper";
import LinkIcon from "@/components/icons/LinkIcon.vue";
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
import { useToast } from "vue-toastification";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";
import ShareIcon from "@/components/icons/ShareIcon.vue";
import HugeCrossIcon from "@/components/icons/HugeCrossIcon.vue";

const toast = useToast();
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const props = defineProps({
  feedItem: Object,
  noFollow: {
    type: Boolean,
    default: false,
  },
  searchPanel: {
    type: Boolean,
    default: false,
  },
});

// console.log("feedItem", props.feedItem);

// "btnFollowing": "Following",
// "btnFollow": "Follow"

const btnFollowing = computed(() => t("btnFollowing"));
const btnUnfollow = computed(() => t("btnUnfollow"));
const btnFollow = computed(() => t("btnFollow"));
const lblCopyLink = computed(() => t("lblCopyLink"));

const collectionStore = useCollectionStore();
const emit = defineEmits(["feedItemClicked"]);
const feedTitle = ref(props.feedItem.title);
const yt = ref(props.feedItem.youtube);
// console.log("yt", yt);

const feedLink = computed(() => {
  return import.meta.env.VITE_SHARE_FEED_URL + props.feedItem.id;
});

const clickOnFeedItem = () => {
  emit("feedItemClicked", props.feedItem);
};

const followed = ref(collectionStore.isFollowed(props.feedItem.id));

watch(
  () => collectionStore.isFollowed(props.feedItem.id),
  (val) => {
    followed.value = val;
  }
);

const clickedOnFollowUnfollowBtn = () => {
  collectionStore.removeFeedFromCollection(props.feedItem.id);
  //followed.value = false;
};

const clickOnFollowSharedFeed = () => {
  emit("feedItemClicked", props.feedItem);
};

const doCopyFeedLink = () => {
  const shareLink = import.meta.env.VITE_SHARE_FEED_URL + props.feedItem.id;
  navigator.clipboard.writeText(shareLink);
  toast("Link to feed copied to clipboard", { position: "top-right" });
};

const OpenShare = () => {};
</script>
