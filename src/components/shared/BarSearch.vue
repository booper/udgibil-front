<template>
  <div class="relative w-full mt-3">
    <div
      class="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none dark:text-gray-400"
    >
      <MagnifyingGlassIcon />
    </div>
    <input
      type="text"
      class="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-400 focus:border-blue-400 block w-full pl-10 pr-10 p-2 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
      :placeholder="lblSearch"
      v-model="searchVal"
      @keyup="$emit('search', searchVal)"
    />
    <button
      class="absolute inset-y-0 right-0 pr-3 flex items-center"
      v-if="showClearFeedsAndCollectionsIcon"
      @click="clearFeedsAndCollectionsInput"
    >
      <TimesIcon class="dark:text-gray-400" />
    </button>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import TimesIcon from "@/components/icons/TimesIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const emit = defineEmits(["search"]);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const lblSearch = computed(() => t("lblSearch"));

const searchVal = ref("");
const showClearFeedsAndCollectionsIcon = computed(
  () => searchVal.value.length > 0
);

const clearFeedsAndCollectionsInput = () => {
  searchVal.value = "";
  emit("search", searchVal.value);
};
</script>
