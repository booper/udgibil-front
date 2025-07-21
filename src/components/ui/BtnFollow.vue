<template>
  <Popper ref="popperRef" @open:popper="cancelCollectionCreation">
    <button
      class="h-8 p-3 cursor-pointer inline-flex items-center justify-center rounded bg-indigo-100 text-indigo-600 flex-shrink-0 hover:bg-indigo-500 hover:text-white dark:bg-indigo-700 dark:text-white"
    >
      <PlusIcon />
      <span class="ms-1 text-sm">{{ lblFollow }}</span>
    </button>
    <template #content="{ close: hp }">
      <div
        class="rounded-md w-64 -mt-2 -mb-2 max-h-64 overflow-y-auto border border-gray-300 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-900"
      >
        <div
          class="p-2 sticky top-0 z-10 bg-white border-b dark:border-gray-700 dark:bg-gray-900"
        >
          <div class="flex justify-between items-center">
            <div class="text-sm font-medium text-gray-900">
              <input
                v-show="!createCollection"
                v-model="searchCollectionVal"
                @keyup="handleSearchCollection"
                type="text"
                id="simple-search"
                class="border pt-1 pb-1 ps-2 ps-2 border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-400 focus:border-blue-400 block w-full dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
                placeholder="Search Collection"
                required
              />
              <p v-show="createCollection" class="pt-1 pb-1 dark:text-gray-300">
                {{ titleNewCollection }}
              </p>
            </div>
            <div
              class="text-sm font-medium border border-indigo-400 pt-1 pb-1 ps-1 pe-1 rounded text-gray-300 cusror-pointer dark:text-indigo-400"
              @click="renderCreateCollection"
              v-show="!createCollection"
            >
              <PlusIcon />
            </div>
          </div>
        </div>

        <div class="overflow-y-auto h-full p-2">
          <ul
            v-if="selectCollection"
            role="list"
            class="divide-y divide-gray-100 dark:divide-gray-700"
          >
            <li
              v-if="!collectionList.length"
              class="p-2 rounded-md hover:bg-indigo-50 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
            >
              {{ noCollectionFound }}
            </li>
            <li
              v-for="(col, index) in collectionList"
              :key="col.id"
              @click="doFollow(index)"
              class="p-2 hover:bg-indigo-50 cursor-pointer focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50 dark:hover:bg-gray-700 dark:hover:text-white dark:text-gray-400"
            >
              {{ col.title }}
            </li>
          </ul>
          <Transition name="slide-fade">
            <CreateCollection
              v-if="createCollection"
              @cancel="cancelCollectionCreation"
              @create="createNewCollection"
              @closePop="hp"
            />
          </Transition>
        </div>
      </div>
    </template>
  </Popper>
</template>

<script setup>
import Popper from "vue3-popper";
import { ref, watch, computed } from "vue";
import { useCollectionStore } from "@/stores/collections.js";
import CreateCollection from "@/components/ui/CreateCollection.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const collectionStore = useCollectionStore();
const collectionList = ref([]);
const selectCollection = ref(true);
const createCollection = ref(false);
const searchCollectionVal = ref("");
const popperRef = ref(null);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

collectionList.value = collectionStore.getCollectionsForFollow;
const handleSearchCollection = () => {
  if (searchCollectionVal.value.length > 0) {
    const searchValueLower = searchCollectionVal.value.toLowerCase();
    collectionList.value = collectionStore.getCollectionsForFollow.filter(
      (item) => {
        return item.title.toLowerCase().includes(searchValueLower); //includes(searchCollectionVal.value)
      }
    );
  } else {
    collectionList.value = collectionStore.getCollectionsForFollow;
  }
};

const props = defineProps({
  feedId: String,
  feed: Object,
});

const lblFollow = computed(() => t("lblFollow"));
const titleNewCollection = computed(() => t("titleNewCollection"));
const noCollectionFound = computed(() => t("noCollectionFound"));

watch(
  () => collectionStore.getCollectionsForFollow,
  (val) => {
    collectionList.value = val;
  }
);

const renderCreateCollection = () => {
  selectCollection.value = false;
  createCollection.value = true;
};

const cancelCollectionCreation = () => {
  createCollection.value = false;
  selectCollection.value = true;
};

const createNewCollection = (data) => {
  collectionStore.addCollection(data, props.feedId, props.feed);
};

const doFollow = (index) => {
  collectionStore.addFeedToCollection(
    props.feedId,
    props.feed,
    collectionList.value[index].title
  );
};
</script>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-enter-from {
  transform: translateX(20px);
  opacity: 0;
}
:deep(.popper #arrow::before) {
  background: #ffffff;
  z-index: 9999999;
  border-left: 1px solid #b2b2b2 !important;
  border-top: 1px solid #b2b2b2 !important;
}
</style>
