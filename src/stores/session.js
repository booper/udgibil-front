import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useSessionStore = defineStore(
  "session",
  () => {
    const token = ref(null);
    const lang = ref(null);
    const name = ref(null);
    const board = ref(null);
    const anu = ref(false);
    const theme = ref("system");

    const isAuth = computed(() => token.value !== null);
    const isAnu = computed(() => anu.value);
    const getName = computed(() => name.value);
    const getToken = computed(() => token.value);
    const getLang = computed(() => lang.value);
    const getOnBoard = computed(() => {
      if (board.value === "1") {
        return true;
      } else {
        return false;
      }
    });
    const getTheme = computed(() => theme.value);

    function logout() {
      token.value = null;
      name.value = null;
      board.value = null;
      theme.value = null;
      lang.value = null;
      anu.value = false;
    }

    function changeTheme() {
      if (
        theme.value === "dark" ||
        (theme.value === "system" &&
          window.matchMedia("(prefers-color-scheme: dark)").matches)
      ) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }

    function setTheme(t) {
      theme.value = t;
    }
    function setToken(tk) {
      token.value = tk;
    }
    function setLang(l) {
      lang.value = l;
    }
    function setSession(user) {
      name.value = user.name;
      board.value = user.onBoard ? "1" : "0";
      theme.value = user.theme;
      lang.value = user.language;
      anu.value = user.anu;
    }

    function setOnBoard(isOnBoard) {
      board.value = isOnBoard ? "1" : "0";
    }

    function setName(nm = "") {
      name.value = nm;
    }

    return {
      anu,
      token,
      lang,
      board,
      theme,
      isAuth,
      isAnu,
      setToken,
      getName,
      setName,
      getToken,
      logout,
      setOnBoard,
      setSession,
      getOnBoard,
      setTheme,
      changeTheme,
      getTheme,
      getLang,
      setLang,
    };
  },
  {
    persist: true,
  }
);
