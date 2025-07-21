<template>
  <div
    class="bg-white border m-4 border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
  >
    <div
      class="w-full rounded-t-lg h-44 bg-cover bg-center"
      :style="computedBg"
      @click="articleClicked"
      v-if="isImage"
    ></div>

    <div class="p-5">
      <h3
        class="mb-2 font-bold text-gray-800 dark:text-white"
        :class="computedTitle"
        @click="articleClicked"
      >
        {{ article.title }}
      </h3>

      <p
        class="mb-3 text-gray-500 dark:text-gray-400"
        :class="computedText"
        @click="articleClicked"
      >
        {{ truncatedText }}
      </p>

      <div
        class="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-4"
      >
        <div
          class="text-sm leading-relaxed tracking-normal text-gray-500 dark:text-gray-400"
        >
          {{ datePub }}
        </div>
        <ArticleActionBar
          :articleData="article"
          :articleType="props.articleType"
        />
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, ref, watch, watchEffect } from "vue";
import { useTimeAgo } from "@vueuse/core";
import { useUserStore } from "@/stores/user";
import { DateTime } from "luxon";
import ArticleActionBar from "@/components/feeds/ArticleActionBar.vue";

const props = defineProps({
  article: Object,
  previewFeed: {
    type: Boolean,
    default: false,
  },
  showFeed: {
    type: Boolean,
    default: false,
  },
  articleType: {
    type: String,
    default: "article",
  },
});

const emit = defineEmits(["articleTapped"]);

const noImage = import.meta.env.VITE_NO_IMAGE;

const userStore = useUserStore();
const truncatedText = computed(() => {
  let txt = "";
  if (
    props.article.descriptionPlain !== null &&
    props.article.descriptionPlain !== undefined &&
    props.article.descriptionPlain !== "null"
  ) {
    if (props.article.descriptionPlain.length <= 200) {
      txt = props.article.descriptionPlain;
    } else {
      txt = props.article.descriptionPlain.substr(0, 200) + "...";
    }
  }

  return txt;

  //   if (props.article.descriptionPlain.length <= 200)
  //     return props.article.descriptionPlain;
  //   return props.article.descriptionPlain.substr(0, 200) + "...";
});
const articleDateTime = ref(userStore.getArticleDateTime);
const selectedTitleSize = ref(userStore.getArticleTitleSize);
const selectedTextSize = ref(userStore.getArticleTextSize);

watch(
  () => userStore.getArticleDateTime,
  (newVal) => {
    articleDateTime.value = newVal;
  }
);
watchEffect(() => {
  selectedTitleSize.value = userStore.getArticleTitleSize;
  selectedTextSize.value = userStore.getArticleTextSize;
});

const computedTitle = computed(() => {
  let size = "text-lg";
  if (selectedTitleSize.value === "lg") {
    size = "text-xl";
  } else if (selectedTitleSize.value === "md") {
    size = "text-lg";
  } else if (selectedTitleSize.value === "sm") {
    size = "text-md";
  } else if (selectedTitleSize.value === "xl") {
    size = "text-2xl";
  }

  return size;
});

const isImage = computed(() => {
  return (
    props.article.image.url !== noImage && props.article.image.url !== null
  );
});

const computedText = computed(() => {
  return "text-" + selectedTextSize.value;
});

const computedBg = computed(() => {
  return `background-image: url('${props.article.image.url}')`;
});

const datePub = computed(() => {
  let articleTimeAgo = "";
  const dt = DateTime.fromISO(props.article.pubDate).toLocal();
  if (articleDateTime.value === "ago") {
    const timeAgo = useTimeAgo(dt);
    articleTimeAgo = timeAgo.value;
  } else {
    articleTimeAgo = dt.toLocaleString(DateTime.DATETIME_SHORT);
  }
  return articleTimeAgo;
});

const articleClicked = () => {
  emit("articleTapped", props.article.id);
};
</script>
