import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useMenuStore = defineStore("menus", () => {
  const activeMenuItem = ref("");

  function setActiveMenu(menuItem = "feeds") {
    activeMenuItem.value = menuItem;
  }

  const getActiveMenuItem = computed(() => {
    return activeMenuItem;
  });

  return { setActiveMenu, getActiveMenuItem };
});
