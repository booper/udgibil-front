<template>
  <div class="flex mt-4">
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
        v-model="selectedLang"
        @change="handleSerachInput"
        class="px-4 py-3 pr-9 block w-full border-l-0 border-gray-400 rounded-r-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
      >
        <option v-for="lang in languages" :key="lang.code" :value="lang.code">
          {{ lang.name }}
        </option>
      </select>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, toValue } from "vue";
import router from "@/router";
import { useRelatedTopics } from "@/stores/relatedTopics.js";
import { useGet } from "@/composibles/networks";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import TimesIcon from "@/components/icons/TimesIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const searchQuery = ref("");
const selectedLang = ref("en");
const relatedTopicsStore = useRelatedTopics();
const params = reactive({});
const urlCat = ref("/info/catsandlangs");
const reqGet = useGet();
const langOptions = ref([]);
const props = defineProps({
  selLang: {
    type: String,
  },

  searchString: {
    type: String,
    required: true,
  },
});
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;
const placeholderSearchFeed = computed(() => t("placeholderSearchFeed"));
const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "uk", name: "Українська" },
  { code: "zh", name: "中文" },
  { code: "ru", name: "Русский" },
];

selectedLang.value = props.selLang;
searchQuery.value = props.searchString;

const clearInput = () => {
  searchQuery.value = "";
  relatedTopicsStore.setCurrentTopic(null);
  router.push({
    path: "/feeds/add",
    query: { l: selectedLang.value },
  });
};

watch(
  () => relatedTopicsStore.getCurrentTopic,
  (newVal) => {
    if (newVal !== null && newVal.length > 0) {
      searchQuery.value = "#" + newVal;
      handleSerachInput();
    }
  }
);

watch(
  () => props.searchString,
  (newVal) => {
    searchQuery.value = newVal;
  }
);

watch(
  () => props.selLang,
  (newVal) => {
    selectedLang.value = newVal;
  }
);

const handleSerachInput = () => {
  const sLang = encodeURIComponent(selectedLang.value);
  const encodedSearchQuery = encodeURIComponent(searchQuery.value.trim());

  if (encodedSearchQuery.length < 2) {
    return false;
  }

  router.push({
    path: "/feeds/search",
    query: { q: encodedSearchQuery, l: sLang },
  });
};

const showClearIcon = computed(() => searchQuery.value.length > 0);

reqGet.request(urlCat, params).then(() => {
  const resGet = toValue(reqGet.res);
  if (resGet.error === 0) {
    langOptions.value = resGet.languages;
  }
});

const handleSearchKeyUp = (e) => {
  if (e.key === "Backspace" && searchQuery.value.length === 0) {
    router.push({
      path: "/feeds/add",
    });
  }
};
</script>
