<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 px-6 py-20">
    <div class="mt-20 flex justify-center gap-6 items-center">
      <ArrowCurved
        class="text-gray-400 dark:text-gray-400 -scale-100 rotate-90"
      />
      <div class="dark:text-gray-400">{{ chooseFeedToRead }}</div>
    </div>
    <div class="mt-6 flex flex-col justify-center gap-6 items-center">
      <div class="dark:text-gray-400">{{ msgOr }}</div>
      <button
        @click="goAdd"
        class="flex items-center inline-flex rounded-full border border-indigo-100 text-indigo-600 font-medium bg-indigo-100 px-4 py-1 hover:bg-indigo-500 hover:text-white dark:bg-indigo-600 dark:border-indigo-600 dark:hover:bg-indigo-700 dark:text-gray-300"
      >
        <PlusIcon :h="5" />
        <span class="ms-1">{{ addNewFeed }}</span>
      </button>
    </div>
  </div>
</template>
<script setup>
import { computed } from "vue";
import ArrowCurved from "@/components/ui/svg/ArrowCurved.vue";
import PlusIcon from "@/components/icons/PlusIcon.vue";
import router from "@/router";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";
const { t, locale } = useI18n({ useScope: "global" });
const sessionStore = useSessionStore();
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const addNewFeed = computed(() => t("addNewFeed"));
const chooseFeedToRead = computed(() => t("chooseFeedToRead"));
const msgOr = computed(() => t("msgOr"));
const goAdd = () => {
  router.push("/feeds/add");
};
</script>
