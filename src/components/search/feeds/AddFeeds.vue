<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 px-6 pt-3 dark:bg-gray-800">
    <div class="ps-0 pt-2">
      <div class="flex gap-x-2 items-center w-full">
        <ChevronLeftIcon
          @click="goBack"
          class="cursor-pointer dark:text-gray-300"
        />
        <h3 class="text-xl dark:text-gray-300">
          {{ titleSearchforfeedstofollow }}
        </h3>
      </div>

      <InputSearchFeed :searchString="s" :selLang="sl" />

      <ProcessPulse v-if="process" />

      <div v-if="!process">
        <h3 class="text-gray-600 text-lg my-5 dark:text-gray-400">
          {{ titleMostPopularTopics }}
        </h3>
        <div class="flex flex-wrap justify-between my-6">
          <CategoryItem
            v-for="pitem in popularCats"
            :key="pitem.id"
            :item="pitem"
            boxType="big"
            @categorySelected="changeTopic"
          />
        </div>
        <h3 class="text-gray-600 text-lg my-5 mt-8 dark:text-gray-400">
          {{ titleExploreTopics }}
        </h3>
        <div class="flex flex-wrap justify-between my-6">
          <CategoryItem
            v-for="item in restCats"
            :key="item.id"
            :item="item"
            @categorySelected="changeTopic"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toValue, reactive, computed } from "vue";
import { useGet } from "@/composibles/networks";
import { useRelatedTopics } from "@/stores/relatedTopics.js";
import CategoryItem from "@/components/search/feeds/CategoryItem.vue";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";
import InputSearchFeed from "@/components/search/feeds/InputSearchFeed.vue";
import ChevronLeftIcon from "@/components/icons/ChevronLeftIcon.vue";
import { useRouter } from "vue-router";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const router = useRouter();
const urlCat = ref("/info/catsandlangs");
const reqGet = useGet();
const interestOptions = ref([]);
const langOptions = ref([]);
const s = ref("");
const process = ref(true);
const params = reactive({});
const relatedTopicsStore = useRelatedTopics();
const popularCats = ref([]);
const restCats = ref([]);
const sl = ref("en");
const props = defineProps({
  l: {
    type: String,
    default: "en",
  },
});
const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const titleSearchforfeedstofollow = computed(() =>
  t("titleSearchforfeedstofollow")
);
const titleMostPopularTopics = computed(() => t("titleMostPopularTopics"));
const titleExploreTopics = computed(() => t("titleExploreTopics"));

sl.value = props.l;
reqGet.request(urlCat, params).then(() => {
  const resGet = toValue(reqGet.res);
  if (resGet.error === 0) {
    interestOptions.value = [...resGet.categories];
    langOptions.value = resGet.languages;
    popularCats.value = interestOptions.value.slice(0, 6);
    interestOptions.value.slice(0, 6);
    restCats.value = interestOptions.value.slice(6);
  }
  process.value = false;
});

const changeTopic = (data) => {
  relatedTopicsStore.setCurrentTopic(data.topic);
};

const goBack = () => {
  router.push("/feeds");
};
</script>
