<script setup>
import { ref, reactive, computed, toValue } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useCollectionStore } from "@/stores/collections.js";
import { RouterView } from "vue-router";
import { useGet } from "@/composibles/networks";
import { useBookmarksStore } from "@/stores/bookmarks.js";
import { useSessionStore } from "@/stores/session.js";

const sessionStore = useSessionStore();
const userStore = useUserStore();
const collectionStore = useCollectionStore();
const isAuthenticated = computed(() => sessionStore.isAuth);
const userId = computed(() => userStore.getUserId);
const bookmarksStore = useBookmarksStore();

if (
  isAuthenticated.value &&
  (userId.value === null || userId.value === undefined)
) {
  sessionStore.changeTheme();
  const req = useGet();
  const userUrl = ref("/user/data");
  const userParams = reactive({});
  req.request(userUrl, userParams).then(() => {
    const resGet = toValue(req.res);
    userStore.setUser(resGet.userData);
    collectionStore.setCollections(resGet.userData.collections);
    bookmarksStore.setBookmarks(resGet.userData.bookmarks);
  });
}
</script>

<template>
  <RouterView />
</template>
