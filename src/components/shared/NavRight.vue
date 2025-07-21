<template>
  <div
    class="fixed z-40 -right-[35px] top-1/2 transform -translate-y-1/2 -rotate-90 lg:hidden"
  >
    <button
      @click="openMenu = true"
      class="bg-indigo-500 pt-1 pb-1 text-white gap-2 px-4 rounded-t-xl flex items-center"
    >
      <Bars3Icon class="h-4 w-4" aria-hidden="true" />{{ menu }}
    </button>
  </div>
  <div
    class="h-full p-3 mt-2 space-y-2 w-60 text-gray-800 hidden lg:block dark:text-gray-400"
  >
    <MainLogo />
    <div class="divide-y divide-gray-300 dark:divide-white/10">
      <ul class="pt-2 pb-4 space-y-1 text-sm">
        <li
          :class="
            activeMenu === 'feeds'
              ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
              : 'text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 rounded-md'
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
              : 'text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 rounded-md'
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
              : 'text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 rounded-md'
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
      </ul>
      <ul class="pt-4 pb-2 space-y-1 text-sm">
        <li
          :class="
            activeMenu === 'settings'
              ? 'bg-gray-100 text-indigo-700 dark:text-indigo-400 rounded-md dark:bg-gray-900 dark:text-gray-300'
              : 'text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 rounded-md'
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
          class="text-gray-600 dark:text-gray-400 dark:hover:text-gray-300 dark:hover:bg-gray-900 rounded-md"
        >
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
  <MenuNav :open="openMenu" @closed="openMenu = false" />
</template>

<script setup>
import { ref, computed } from "vue";
import { useMenuStore } from "@/stores/menus.js";
import { watch } from "vue";
import MainLogo from "@/components/ui/MainLogo.vue";
import BookmarkEmptyIcon from "@/components/icons/BookmarkEmptyIcon.vue";
import MagnifyingGlassIcon from "@/components/icons/MagnifyingGlassIcon.vue";
import GearIcon from "@/components/icons/GearIcon.vue";
import ListIcon from "@/components/icons/ListIcon.vue";
import { Bars3Icon } from "@heroicons/vue/24/outline";
import PowerOffIcon from "@/components/icons/PowerOffIcon.vue";
import MenuNav from "@/components/shared/MenuNav.vue";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;
const menuStore = useMenuStore();
const activeMenu = ref(menuStore.getActiveMenuItem.value);
const openMenu = ref(false);

const menu = computed(() => t("menu"));
const feeds = computed(() => t("feeds"));
const lblSearch = computed(() => t("lblSearch"));
const titleBookmark = computed(() => t("titleBookmark"));
const lblSettings = computed(() => t("lblSettings"));
const lblLogout = computed(() => t("lblLogout"));

watch(menuStore.getActiveMenuItem, (newValue) => {
  activeMenu.value = newValue;
});

const toggleMenu = () => {};
</script>
