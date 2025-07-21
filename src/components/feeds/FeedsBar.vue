<template>
  <div
    class="w-3/12 ps-4 h-screen sticky top-0 flex-shrink-0 py-1 flex flex-col border-r-2 border-gray-100 hidden md:block dark:border-white/10 z-50"
  >
    <div class="h-full flex flex-col relative">
      <div class="sticky top-0 p-4 ps-0 border-b dark:border-white/10">
        <div class="flex items-center justify-between w-full">
          <router-link class="text-xl dark:text-gray-300" to="/feeds">{{
            feedsTitle
          }}</router-link>
          <button
            @click="goAdd"
            class="flex items-center inline-flex rounded-full border border-indigo-100 text-indigo-600 font-medium bg-indigo-100 px-4 py-1 hover:bg-indigo-500 hover:text-white dark:bg-indigo-600 dark:border-indigo-600 dark:hover:bg-indigo-700 dark:text-gray-300"
          >
            <PlusIcon :h="5" />
            <span class="ms-1">{{ addBtnTitle }}</span>
          </button>
        </div>

        <div class="relative w-full mt-3">
          <div
            class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none dark:text-gray-400"
          >
            <MagnifyingGlassIcon />
          </div>
          <input
            type="text"
            id="simple-search"
            class="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 pr-10 p-2 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
            :placeholder="searchFeedPlaceholder"
            v-model="searchFeedsVal"
            @keyup="handleSearchFeeds"
          />
          <button
            class="absolute inset-y-0 right-0 pr-3 flex items-center"
            v-if="showClearFeedsAndCollectionsIcon"
            @click="clearFeedsAndCollectionsInput"
          >
            <TimesIcon class="dark:text-gray-400" />
          </button>
        </div>
      </div>
      <div
        v-if="feedsCollectionsList.length === 0"
        class="flex-grow overflow-y-auto mt-2 text-center text-gray-400 dark:text-gray-300 pt-20"
      >
        {{ noFeedsCollectionsFound }}
      </div>
      <div v-else class="flex-grow overflow-y-auto mt-2">
        <KeepAlive>
          <div v-if="!manageCollection">
            <draggable
              :list="feedsCollectionsList"
              handle=".handle-col-drag"
              group="collections"
              item-key="title"
              @change="collectionMoved"
              @end="dragEnded"
            >
              <template #item="{ element }">
                <FeedBarItem :collection="element" />
              </template>
            </draggable>
          </div>
        </KeepAlive>
        <div v-if="manageCollection">
          <draggable
            :list="feedsCollectionsListEdit"
            group="collections"
            item-key="id"
          >
            <template #item="{ element }">
              <FeedBarEditItem
                v-model:title="element.title"
                v-model:checked="element.checked"
                :system="element.system"
                @checkedChanged="checkedChange"
              />
            </template>
          </draggable>
        </div>
      </div>

      <div
        id="footer"
        class="sticky bottom-0 border-t-2 border-gray-100 dark:border-white/10 py-4 ps-0 pe-2 text-center"
      >
        <div v-if="!manageCollection" class="flex items-center justify-between">
          <a
            @click="enableManageCollection"
            class="text-indigo-400 text-sm cursor-pointer dark:text-indigo-600 dark:border-indigo-600"
            >{{ manageCollectionLink }}</a
          >
          <Popper ref="popperRef">
            <div
              class="cursor-pointer rounded-full border border-indigo-400 px-4 py-1 text-indigo-400 text-sm dark:text-indigo-600 dark:border-indigo-600 dark:border-gray-700 dark:bg-gray-900"
            >
              + <span class="hidden lg:inline">{{ addBtnTitle }}</span>
            </div>
            <template #content="{ close: hpe }">
              <div
                class="rounded-md w-64 max-h-64 overflow-y-auto border border-gray-300 bg-white shadow-sm z-50 dark:border-gray-700 dark:bg-gray-900 z-50"
              >
                <div
                  class="p-1 ps-3 sticky top-0 z-10 border-b text-start bg-gray-50 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-300"
                >
                  <p class="pt-1 pb-1 text-sm">New Collection</p>
                </div>

                <div class="text-sm font-medium text-gray-900">
                  <div class="overflow-y-auto h-full p-2">
                    <CreateCollection
                      :singleWindow="true"
                      @cancel="cancelCollectionCreationOnFeedBar"
                      @create="createNewCollectionFromFeedBar"
                      @closePop="hpe"
                    />
                  </div>
                </div>
              </div>
            </template>
          </Popper>
        </div>

        <div v-if="manageCollection" class="flex justify-between">
          <div class="px-2 flex items-center gap-2">
            <input
              class="rounded h-5 w-5 border-gray-350 dark:border-white/10 dark:bg-white/5 dark:text-indigo-600 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-900"
              :checked="checAllCheckBox"
              type="checkbox"
              @change="handleCheckboxAllChange"
            />
            <span
              class="text-red-400 text-sm cursor-pointer"
              @click="removeBulkCollection"
              >Delete</span
            >
          </div>
          <div class="px-2 flex items-center gap-2">
            <a
              @click="cancelManageCollections"
              class="text-gray-400 text-sm cursor-pointer"
              >Cancel</a
            >
            <div
              @click="updateCollections"
              class="text-indigo-400 text-sm cursor-pointer border border-indigo-400 rounded-md px-2 py-1"
            >
              Update
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import { useCollectionStore } from "@/stores/collections.js";
import { useSessionStore } from "@/stores/session";
import FeedBarItem from "@/components/feeds/FeedBarItem.vue";
import FeedBarEditItem from "@/components/feeds/FeedBarEditItem.vue";
import draggable from "vuedraggable";
import Popper from "vue3-popper";
import router from "@/router";
import CreateCollection from "@/components/ui/CreateCollection.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import TimesIcon from "@/components/icons/TimesIcon.vue";
import { useI18n } from "vue-i18n";

// import { useFeedsStore } from "@/stores/feeds.js";

// const feedsStore = useFeedsStore();
const collectionStore = useCollectionStore();
const sessionStore = useSessionStore();
const feedsCollectionsList = ref([]);
const feedsCollectionsListEdit = ref([]);
const checAllCheckBox = ref(false);
const manageCollection = ref(false);
const searchFeedsVal = ref("");
const popperRef = ref(null);

feedsCollectionsList.value = collectionStore.getCollections;

const { t, locale } = useI18n({ useScope: "global" });
const validLocales = ["en", "ru", "uk", "es", "de", "fr", "it", "pt", "zn"];
const userLang = sessionStore.getLang;
const safeLocale =
  userLang === null ||
  userLang === undefined ||
  !validLocales.includes(userLang)
    ? "en"
    : userLang;
locale.value = safeLocale;

const feedsTitle = computed(() => t("feeds"));
const addBtnTitle = computed(() => t("btnAdd"));
const manageCollectionLink = computed(() => t("manageCollection"));
const searchFeedPlaceholder = computed(() => t("searchFeed"));
const noFeedsCollectionsFound = computed(() => t("feedNotFound"));
const goAdd = () => {
  router.push("/feeds/add");
};

const dragEnded = () => {
  // collectionStore.updateCollection();
  // console.log("dragEnded");
};

watch(collectionStore.getMutated, (val) => {
  if (val === true) {
    feedsCollectionsList.value = collectionStore.getCollections;
    collectionStore.setMutated(false);
  }
});

const enableManageCollection = () => {
  manageCollection.value = true;
  feedsCollectionsListEdit.value = [];
  feedsCollectionsListEdit.value = [...collectionStore.getCollections];
};

const updateCollections = () => {
  manageCollection.value = false;
  collectionStore.setCollections(feedsCollectionsListEdit.value);
  collectionStore.updateCollection();
};

const collectionMoved = () => {
  collectionStore.updateCollection();
};

/**
 * Updates the value of checAllCheckBox based on the checked state of each item in feedsCollectionsListEdit.
 *
 * @return {boolean} Returns true if any item in feedsCollectionsListEdit is checked; otherwise, returns false.
 */
const checkedChange = () => {
  checAllCheckBox.value = feedsCollectionsListEdit.value.some(
    (item) => item.checked === 1
  )
    ? true
    : false;
};

/**
 * Handles the change event of the checkbox for selecting all items.
 *
 * @param {Event} event - The change event object.
 * @return {void} No return value.
 */
const handleCheckboxAllChange = (event) => {
  checAllCheckBox.value = event.target.checked;

  feedsCollectionsListEdit.value.forEach(
    (item) => (item.checked = checAllCheckBox.value ? 1 : 0)
  );
};

const removeBulkCollection = () => {
  for (let i = feedsCollectionsListEdit.value.length - 1; i >= 0; i--) {
    if (
      feedsCollectionsListEdit.value[i].checked === 1 &&
      !feedsCollectionsListEdit.value[i].system
    ) {
      feedsCollectionsListEdit.value.splice(i, 1);
    }
  }
  checAllCheckBox.value = false;
};

const cancelManageCollections = () => {
  manageCollection.value = false;
  checAllCheckBox.value = false;
  feedsCollectionsListEdit.value.forEach((item) => (item.checked = 0));
};

const handleSearchFeeds = () => {
  if (searchFeedsVal.value.length > 0) {
    const searchValueLower = searchFeedsVal.value.toLowerCase();

    feedsCollectionsList.value = findMatches(
      collectionStore.getCollections,
      searchValueLower
    );
  } else {
    feedsCollectionsList.value = collectionStore.getCollections;
  }
};

const findMatches = (array, searchString) => {
  return array
    .map((item) => {
      const matchingFeeds = item.feeds.filter((feed) =>
        feed.title.toLowerCase().includes(searchString)
      );

      return {
        ...item,
        feeds: matchingFeeds,
      };
    })
    .filter((item) => item.feeds.length > 0);
};

const showClearFeedsAndCollectionsIcon = computed(
  () => searchFeedsVal.value.length > 0
);

const clearFeedsAndCollectionsInput = () => {
  searchFeedsVal.value = "";
  handleSearchFeeds();
};

const cancelCollectionCreationOnFeedBar = () => {
  // createCollection.value = false;
};

const createNewCollectionFromFeedBar = (data) => {
  collectionStore.addCollection(data);
};
</script>
