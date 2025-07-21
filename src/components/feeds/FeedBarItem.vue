<template>
  <div class="w-full">
    <div
      class="mx-auto w-full ps-0 rounded-2xl bg-white py-1 pe-3 dark:bg-gray-800"
    >
      <Disclosure v-slot="{ open }" :defaultOpen="defOpen">
        <DisclosureButton
          @click="collectionOpenClose(open)"
          class="flex w-full justify-between rounded bg-gray-100 ps-2 py-2 pe-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 dark:bg-gray-900 dark:text-gray-300"
        >
          <span class="handle-col-drag cursor-grab"
            ><DragDotsVerticalIcon
          /></span>
          <span>{{ props.collection.title }}</span>
          <ChevronUpIcon
            :class="open ? 'rotate-180 transform' : ''"
            class="h-5 w-5 text-indigo-500"
          />
        </DisclosureButton>
        <DisclosurePanel class="px-0 pt-1 pb-0 text-sm text-gray-500">
          <ul class="divide-y">
            <draggable
              class="w-full"
              :list="props.collection.feeds"
              handle=".handle-feed-drag"
              group="feeds"
              item-key="id"
              @update="moveFeedItem"
              @end="dragEnded"
            >
              <template #item="{ element }">
                <li>
                  <CollectionsFeedItem
                    :fId="element.feedId"
                    :fImage="element.image.url"
                    :fTitle="element.title"
                    @clickFeed="goToArticlesList"
                  />
                </li>
              </template>
              <template v-if="!props.collection.feeds.length" #header>
                <div class="text-center py-2 dark:text-gray-400">
                  {{ feedsNotFound }}
                </div>
              </template>
            </draggable>
          </ul>
        </DisclosurePanel>
      </Disclosure>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/vue";
import { ChevronUpIcon } from "@heroicons/vue/20/solid";
import { useCollectionStore } from "@/stores/collections.js";
import router from "@/router";
import CollectionsFeedItem from "@/components/feeds/CollectionsFeedItem.vue";
import draggable from "vuedraggable";
import DragDotsVerticalIcon from "@/components/icons/DragDotsVerticalIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const collectionStore = useCollectionStore();
const sessionStore = useSessionStore();
const props = defineProps({
  collection: {
    type: Object,
  },
});

const dragEnded = () => {
  // collectionStore.updateCollection();
  // console.log("dragEnded");
  collectionStore.updateCollection();
};

const defOpen = ref(props.collection.defaultOpen);
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const feedsNotFound = computed(() => t("feedsNotFound"));
const moveFeedItem = () => {
  collectionStore.refreshActivity();
  collectionStore.updateCollection();
};

const goToArticlesList = (id) => {
  router.push({
    path: "/feeds/" + id,
  });
};

const collectionOpenClose = (open) => {
  collectionStore.changeOpenCloseState(props.collection.id, open);
};
</script>
