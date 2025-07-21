<template>
  <div class="flex gap-2 items-center justify-end">
    <button
      v-if="showRefreshBtn"
      v-tippy="btnRefreshFeed"
      @click="$emit('refreshArticles')"
      type="button"
      class="py-1.5 px-3 inline-flex items-center gap-x-1 text-sm font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 dark:text-white dark:hover:bg-gray-800 dark:focus:outline-none dark:focus:ring-1 dark:focus:ring-gray-600"
    >
      <RefreshIcon />
    </button>

    <div
      class="flex bg-gray-100 hover:bg-gray-200 rounded-lg transition p-0.5 border-1 dark:bg-gray-700 dark:hover:bg-gray-600"
    >
      <nav class="flex space-x-2" aria-label="Tabs" role="tablist">
        <button
          type="button"
          v-tippy="btnListview"
          @click="changeArticleViewMode('list')"
          class="py-1.5 px-4 inline-flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white"
          :class="
            selectedViewMode === 'list'
              ? 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:bg-slate-900'
              : 'bg-transparent'
          "
          role="tab"
        >
          <ListIcon />
        </button>
        <button
          type="button"
          v-tippy="btnCardView"
          @click="changeArticleViewMode('card')"
          class="py-1 px-4 inline-flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white"
          :class="
            selectedViewMode === 'card'
              ? 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:bg-slate-900'
              : 'bg-transparent'
          "
          role="tab"
        >
          <ColumnIcon />
        </button>
        <button
          type="button"
          v-tippy="btnTitleOnlyListView"
          @click="changeArticleViewMode('titles')"
          class="py-1 px-4 inline-flex items-center gap-x-2 text-sm text-gray-500 hover:text-gray-700 font-medium rounded-lg hover:hover:text-blue-600 disabled:opacity-50 disabled:pointer-events-none dark:text-gray-400 dark:hover:text-white"
          :class="
            selectedViewMode === 'titles'
              ? 'bg-white text-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:bg-slate-900'
              : 'bg-transparent'
          "
          role="tab"
        >
          <ListLightIcon />
        </button>
      </nav>
    </div>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import RefreshIcon from "@/components/icons/RefreshIcon.vue";
import ListIcon from "@/components/icons/ListIcon.vue";
import ColumnIcon from "@/components/icons/ColumnIcon.vue";
import ListLightIcon from "@/components/icons/ListLightIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const props = defineProps({
  viewMode: {
    type: String,
    default: "list",
  },
  refreshBtn: {
    type: Boolean,
    default: false,
  },
});
const showRefreshBtn = ref(props.refreshBtn);
const selectedViewMode = ref(props.viewMode);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const btnRefreshFeed = computed(() => t("btnRefreshFeed"));
const btnListview = computed(() => t("btnListview"));
const btnCardView = computed(() => t("btnCardView"));
const btnTitleOnlyListView = computed(() => t("btnTitleOnlyListView"));

watch(
  () => props.viewMode,
  () => {
    selectedViewMode.value = props.viewMode;
  }
);

watch(
  () => props.refreshBtn,
  () => {
    showRefreshBtn.value = props.refreshBtn;
  }
);

const emit = defineEmits(["changeViewMode", "refreshArticles"]);

const changeArticleViewMode = (viewMode) => {
  selectedViewMode.value = viewMode;
  emit("changeViewMode", viewMode);
};
</script>
