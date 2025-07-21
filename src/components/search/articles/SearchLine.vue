<template>
  <div class="flex mt-4">
    <!-- <div class="relative flex-grow">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <MagnifyingGlassIcon :h="4" class="dark:text-gray-500" />
      </div>
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSerachInput"
        @keyup="handleSearchKeyUp"
        class="border border-gray-400 py-3 text-gray-900 text-sm rounded-l-lg focus:ring-blue-400 focus:border-blue-400 block w-full pr-10 pl-10 p-2 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
        :placeholder="placeholderSearchFeed"
        required
      />
      <button
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        v-if="showClearIcon"
        @click="clearInput"
      >
        <TimesIcon :h="5" class="dark:text-gray-500" />
      </button>
    </div>
    <div class="w-1/4">
      <select
        v-model="selectedSearchOpt"
        @change="handleSerachInput"
        class="px-4 py-3 pr-9 block w-full border-l-0 border-gray-400 rounded-r-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
      >
        <option selected value="feeds">{{ slFollowedFeeds }}</option>
        <option value="global">{{ slGlobaly }}</option>
      </select>
    </div> -->
    <div class="relative flex-grow">
      <div
        class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none"
      >
        <MagnifyingGlassIcon :h="4" class="dark:text-gray-500" />
      </div>
      <input
        type="text"
        v-model="searchQuery"
        @keyup.enter="handleSerachInput"
        @keyup="handleSearchKeyUp"
        class="border border-gray-400 py-3 text-gray-900 text-sm rounded-lg focus:ring-blue-400 focus:border-blue-400 block w-full pr-10 pl-10 p-2 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
        :placeholder="placeholderSearchFeed"
        required
      />
      <button
        class="absolute inset-y-0 right-0 pr-3 flex items-center"
        v-if="showClearIcon"
        @click="clearInput"
      >
        <TimesIcon :h="5" class="dark:text-gray-500" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import router from "@/router";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import TimesIcon from "@/components/icons/TimesIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;
const placeholderSearchFeed = computed(() => t("placeholderSearchFeed"));
const slFollowedFeeds = computed(() => t("slFollowedFeeds"));
const slGlobaly = computed(() => t("slGlobaly"));

const searchQuery = ref("");
const selectedSearchOpt = ref("feeds");
const props = defineProps({
  searchString: {
    type: String,
    required: true,
  },
});

searchQuery.value = props.searchString;

const clearInput = () => {
  searchQuery.value = "";

  router.push({
    path: "/search",
  });
};

watch(
  () => props.searchString,
  (newVal) => {
    searchQuery.value = newVal;
  }
);

const handleSerachInput = () => {
  const encodedSearchQuery = encodeURIComponent(searchQuery.value.trim());

  if (encodedSearchQuery.length < 3) {
    return false;
  }

  router.push({
    path: "/search",
    query: { q: encodedSearchQuery, opt: selectedSearchOpt.value },
  });
};

const showClearIcon = computed(() => searchQuery.value.length > 0);

const handleSearchKeyUp = (e) => {
  if (e.key === "Backspace" && searchQuery.value.length === 0) {
    router.push({
      path: "/search",
    });
  }
};
</script>
