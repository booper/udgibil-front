<template>
  <TransitionRoot as="template" :show="rightPanelOpened">
    <Dialog as="div" class="relative z-50" @close="closePanel">
      <TransitionChild
        as="template"
        enter="ease-in-out duration-500"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in-out duration-500"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 sm:duration-700"
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 sm:duration-700"
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-md">
                <div
                  class="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl dark:bg-slate-900"
                >
                  <div class="px-4 sm:px-6">
                    <div class="flex items-start justify-between">
                      <DialogTitle
                        class="text-base font-semibold leading-6 text-gray-900"
                        ><MainLogo
                      /></DialogTitle>
                      <div class="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          class="relative rounded-md bg-white text-gray-400 focus:outline-none focus:ring-0 focus:ring-white dark:bg-slate-900 dark:text-gray-300"
                          @click="closePanel"
                        >
                          <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div
                    class="relative mt-6 flex-1 px-4 sm:px-6 divide-y divide-gray-300 dark:divide-white/10"
                  >
                    <ul class="pt-2 pb-4 space-y-1 text-sm">
                      <li
                        :class="
                          activeMenu === 'feeds'
                            ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-300   rounded-md'
                        "
                        class=""
                      >
                        <router-link
                          to="/feeds"
                          class="flex items-center p-2 space-x-3 rounded-md"
                          @click="toggleMenu"
                        >
                          <ListIcon />
                          <span>{{ feeds }}</span>
                        </router-link>
                      </li>
                      <li
                        :class="
                          activeMenu === 'search'
                            ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-300 rounded-md'
                        "
                        class=""
                      >
                        <router-link
                          to="/search"
                          class="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <MagnifyingGlassIcon />
                          <span>{{ lblSearch }}</span>
                        </router-link>
                      </li>
                      <li
                        :class="
                          activeMenu === 'bookmarks'
                            ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-300 rounded-md'
                        "
                      >
                        <router-link
                          to="/bookmarks"
                          class="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <BookmarkEmptyIcon />
                          <span>{{ titleBookmark }}</span>
                        </router-link>
                      </li>
                      <li
                        :class="
                          activeMenu === 'pub'
                            ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 rounded-md'
                        "
                      ></li>
                    </ul>
                    <ul class="pt-4 pb-2 space-y-1 text-sm">
                      <li
                        :class="
                          activeMenu === 'settings'
                            ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-300 rounded-md'
                        "
                      >
                        <router-link
                          to="/settings"
                          class="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <GearIcon />
                          <span>{{ lblSettings }}</span>
                        </router-link>
                      </li>
                      <li
                        :class="
                          activeMenu === 'support'
                            ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
                            : 'text-gray-600 dark:text-gray-300 rounded-md'
                        "
                      ></li>
                      <li class="text-gray-600 dark:text-gray-300 rounded-md">
                        <router-link
                          to="/logout"
                          class="flex items-center p-2 space-x-3 rounded-md"
                        >
                          <PowerOffIcon />
                          <span>{{ lblLogout }}</span>
                        </router-link>
                      </li>
                    </ul>
                  </div>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref, watch, computed } from "vue";
import { useMenuStore } from "@/stores/menus.js";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import BookmarkEmptyIcon from "@/components/icons/BookmarkEmptyIcon.vue";
import GearIcon from "@/components/icons/GearIcon.vue";
import ListIcon from "@/components/icons/ListIcon.vue";
import PowerOffIcon from "@/components/icons/PowerOffIcon.vue";
import PenIcon from "@/components/icons/PenIcon.vue";
import MainLogo from "@/components/ui/MainLogo.vue";
import QuestionCircleIcon from "@/components/icons/QuestionCircleIcon.vue";
// import FeedsIcon from "@/components/icons/FeedsIcon.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { XMarkIcon } from "@heroicons/vue/24/outline";

const props = defineProps({
  open: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(["closed"]);

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const rightPanelOpened = ref(false);
const menuStore = useMenuStore();
const activeMenu = ref(menuStore.getActiveMenuItem.value);

const feeds = computed(() => t("feeds"));
const lblSearch = computed(() => t("lblSearch"));
const titleBookmark = computed(() => t("titleBookmark"));
const lblWrite = computed(() => t("lblWrite"));
const lblSettings = computed(() => t("lblSettings"));
const lblLogout = computed(() => t("lblLogout"));
const lblSupport = computed(() => t("lblSupport"));

watch(menuStore.getActiveMenuItem, (newValue) => {
  activeMenu.value = newValue;
});

const toggleMenu = () => {};
watch(
  () => props.open,
  (open) => {
    rightPanelOpened.value = open;
  }
);

const closePanel = () => {
  rightPanelOpened.value = false;
  emit("closed");
};
</script>
