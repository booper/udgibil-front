<template>
  <div
    class="flex justify-center text-gray-500 dark:text-gray-400"
    :class="props.marginTop"
  >
    <HotCupDarkSvg />
  </div>
  <p
    class="text-center mt-3 text-gray-500 dark:text-gray-400"
    :class="props.marginBottom"
  >
    {{ props.msg }}
  </p>
  <p v-if="followed" class="text-center mt-3 text-gray-500 dark:text-gray-400">
    {{ msgNotFoundFeed }}
  </p>
  <div v-if="followed" class="flex items-center justify-center mt-10">
    <button
      @click="clickedOnUnfollowBtn"
      class="h-8 p-3 cursor-pointer border border-red-800 inline-flex items-center justify-center rounded bg-red-800 text-white"
    >
      <TimesIcon /><span class="ms-1 text-xs">{{ msgUnfollowFeed }}</span>
    </button>
  </div>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import HotCupDarkSvg from "@/components/ui/svg/HotCupDarkSvg.vue";
import { useCollectionStore } from "@/stores/collections.js";
import TimesIcon from "@/components/icons/TimesIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const msgNotFoundFeed = computed(() => t("msgNotFoundFeed"));
const msgUnfollowFeed = computed(() => t("msgUnfollowFeed"));

const collectionStore = useCollectionStore();
const props = defineProps({
  msg: {
    type: String,
    default: "No Records Found",
  },
  marginTop: {
    type: String,
    default: "pt-20",
  },
  marginBottom: {
    type: String,
    default: "",
  },
  feedId: {
    type: String,
    required: true,
  },
});

const emits = defineEmits(["unfollow"]);

const followed = ref(collectionStore.isFollowed(props.feedId));

watch(
  () => collectionStore.isFollowed(props.feedId),
  (val) => {
    followed.value = val;
  }
);
const clickedOnUnfollowBtn = () => {
  collectionStore.removeFeedFromCollection(props.feedId);
  emits("unfollow");
};
</script>
