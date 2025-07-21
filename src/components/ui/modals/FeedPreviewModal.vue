<template>
  <TransitionRoot as="template" :show="showModal">
    <Dialog as="div" class="relative z-10" @close="closeModal">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:p-6 dark:bg-gray-800"
            >
              <div class="absolute right-0 top-0 hidden pr-1 pt-1 sm:block">
                <button
                  type="button"
                  class="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none dark:bg-gray-800 dark:text-gray-500"
                  @click="closeModal"
                >
                  <span class="sr-only">{{ btnClose }}</span>
                  <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                </button>
              </div>
              <div class="">
                <FeedBoxItem :feedItem="props.feed" :searchPanel="true" />

                <p class="text-gray-500 text-md mt-4 dark:text-gray-300">
                  {{ lblRecentArticles }}
                </p>
                <ProcessPulse ref="focus" v-if="!loadedArticles" />
                <div v-if="loadedArticles">
                  <div
                    v-if="foundArticles.length > 0"
                    class="divide-y divide-gray-200 dark:divide-gray-700"
                  >
                    <ArticlePanel
                      v-for="article in foundArticles"
                      :key="article.id"
                      :article="article"
                      :previewFeed="true"
                    />
                  </div>
                  <div v-else>
                    <!-- <NotFound
                      marginTop="pt-2"
                      marginBottom="pb-4"
                      msg="No Articles Found"
                    /> -->
                    <div class="flex justify-center mb-12">
                      <!-- <button
                        v-if="!processRefreshArticles"
                        @click="onRefresh"
                        type="button"
                        class="flex items-center gap-x-2 rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
                      >
                        <HugeRefreshIcon />
                        Load Articles
                      </button> -->
                      <div>
                        <ProcessPulse
                          :msg="'Extracting this feed first time, it might take a monment..'"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { defineEmits, watch, reactive, toValue, ref, computed } from "vue";
import FeedBoxItem from "@/components/feeds/FeedBoxItem.vue";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import { useGet } from "@/composibles/networks";
import ArticlePanel from "@/components/articles/ArticlePanel.vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";
// import NotFound from "@/components/shared/NotFound.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";
import {
  Dialog,
  DialogPanel,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
// import HugeRefreshIcon from "@/components/icons/HugeRefreshIcon.vue";

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const reqGet = useGet();
const urlRecentArticles = ref("/articles/recent");
const urlRefreshArticles = ref("/sofeco/id");
const loadedArticles = ref(false);
const foundArticles = ref([]);
const props = defineProps({
  showModal: Boolean,
  feed: Object,
});
const focus = ref(null);
const params = reactive({});
const emit = defineEmits(["closeModalWindow"]);
const btnClose = computed(() => t("btnClose"));
const lblRecentArticles = computed(() => t("lblRecentArticles"));
const processRefreshArticles = ref(false);

watch(
  () => props.showModal,
  async (isShow) => {
    if (isShow) {
      foundArticles.value = [];
      loadedArticles.value = false;
      await loadRecentArticles();
      if (!foundArticles.value.length) {
        await onRefresh();
      }
    }
  }
);

const onRefresh = async () => {
  processRefreshArticles.value = true;

  params.id = props.feed.id;
  await reqGet.request(urlRefreshArticles, params);
  await loadRecentArticles();
  //loadRecentArticles();
};

const loadRecentArticles = async () => {
  params.feedId = props.feed.id;
  await reqGet.request(urlRecentArticles, params);
  const resGet = toValue(reqGet.res);

  if (resGet.error === 0) {
    foundArticles.value = resGet.articles;
    loadedArticles.value = true;
    processRefreshArticles.value = false;
  }
};

const closeModal = () => {
  emit("closeModalWindow");
};
</script>
