<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white"
  >
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <div v-if="!isShowError" class="flex justify-center items-center">
        <ProcessPulse />
      </div>
      <div v-if="isShowError">{{ errMsg.error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, toValue, computed } from "vue";
import { useRouter } from "vue-router";
import { useGet } from "../composibles/networks";
import { useUserStore } from "@/stores/user.js";
import { useSessionStore } from "@/stores/session.js";
import { useCollectionStore } from "@/stores/collections.js";
import { useBookmarksStore } from "@/stores/bookmarks.js";
import ProcessPulse from "@/components/ui/ProcessPulse.vue";

const userStore = useUserStore();
const collectionStore = useCollectionStore();
const bookmarksStore = useBookmarksStore();
const sessionStore = useSessionStore();
let isLoginError = ref(false);

const props = defineProps({
  code: String,
});
const router = useRouter();
const url = ref("/auth/google");
const params = ref({ code: props.code });
// const { res, error, request } = useGet();
const req = useGet();
const isShowError = computed(() => {
  return req.res.value === null && req.error.value !== null;
});

const errMsg = computed(() => {
  return toValue(req.error);
});

req.request(url, params).then(() => {
  if (req.res !== null) {
    const resAuth = toValue(req.res);

    if (resAuth.error === 1) {
      isLoginError.value = true;
      userStore.removeUser();
      sessionStore.logout();
      collectionStore.setCollections(null);
      // router.push("/auth");
    } else {
      isLoginError.value = false;
      sessionStore.setToken(resAuth.token);
      sessionStore.setSession(resAuth.userData);
      sessionStore.changeTheme();
      userStore.setUser(resAuth.userData);

      collectionStore.setCollections(resAuth.userData.collections);
      bookmarksStore.setBookmarks(resAuth.userData.bookmarks);

      resAuth.userData.onBoard
        ? router.push("/feeds")
        : router.push("/onboard");
    }
  }
});
onMounted(() => {
  // axios
});
</script>
