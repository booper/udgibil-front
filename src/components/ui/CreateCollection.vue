<template>
  <div class="py-3">
    <input
      ref="inputCollectionTitle"
      type="text"
      id="simple-search"
      v-model="collectionTitle"
      class="mt-2 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-400 focus:border-blue-400 block w-full p-2 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
      maxlength="35"
      @keyup.enter="btnCreate"
      :placeholder="placeholderCollectionTitle"
      required
    />
    <div class="flex justify-between items-center pt-3">
      <button
        class="bg-white text-gray-400 text-sm py-1 rounded-lg cursor-pointer dark:bg-gray-900"
        @click="btnCancel"
      >
        {{ btnCancelText }}
      </button>
      <button
        @click="btnCreate"
        class="bg-indigo-600 text-sm text-white py-1 rounded-md px-4 cursor-pointer dark:bg-indigo-700"
      >
        {{ btnCreateText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick, computed } from "vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const props = defineProps({
  singleWindow: Boolean,
});
const emits = defineEmits(["cancel", "create", "closePop"]);
const collectionTitle = ref("");
const inputCollectionTitle = ref(null);
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const btnCancelText = computed(() => t("btnCancel"));
const btnCreateText = computed(() => t("btnCreate"));
const placeholderCollectionTitle = computed(() =>
  t("placeholderCollectionTitle")
);

const btnCancel = () => {
  emits("cancel");
  if (
    props.singleWindow !== null &&
    props.singleWindow !== undefined &&
    props.singleWindow
  ) {
    emits("closePop");
  }
};

const btnCreate = () => {
  if (collectionTitle.value.trim().length > 0) {
    emits("create", collectionTitle.value);
    emits("closePop");
  }
};

onMounted(() => {
  collectionTitle.value = "";
  nextTick(() => {
    inputCollectionTitle.value.focus();
  });
});

onBeforeUnmount(() => {
  collectionTitle.value = "";
});
</script>
