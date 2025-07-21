<template>
  <div class="flex justify-center h-screen bg-white">
    <div class="lg:w-1/2 xl:max-w-screen-sm bg-white">
      <div
        class="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12"
      >
        <div class="cursor-pointer flex items-center">
          <MainLogo class="text-indigo-700" />
        </div>
      </div>
      <div class="mt-10 px-12">
        <h2
          class="text-center text-2xl text-slate-900 font-display font-semibold lg:text-left xl:text-2xl xl:text-bold"
        >
          What interests you most?
        </h2>
        <div class="text-gray-500">Pick at least one category of interest.</div>
        <div class="mt-12">
          <div class="mt-10">
            <div
              class="flex flex-wrap border border-gray-200 rounded-md ps-4 py-4"
            >
              <div
                v-for="item in interestOptions"
                :key="item.id"
                class="w-1/2 px-4 py-3"
              >
                <input
                  class="me-3 rounded-md h-5 w-5"
                  type="checkbox"
                  :id="'item-' + item.id"
                  v-model="checkedCategories"
                  :value="item.lang.en"
                  checked
                />
                <label
                  class="text-lg leading-6 align-middle"
                  :for="'item-' + item.id"
                >
                  {{ item.lang.en }}
                </label>
              </div>
            </div>

            <div class="mt-20 text-center">
              <button
                @click="start"
                class="bg-indigo-700 hover:bg-indigo-700 text-white px-8 font-bold py-2 rounded"
              >
                Let's Go!
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, toValue } from "vue";
import { usePost, useGet } from "@/composibles/networks";
import { useUserStore } from "@/stores/user.js";
import { useSessionStore } from "@/stores/session.js";
import MainLogo from "@/components/ui/MainLogo.vue";
import router from "@/router";
import { useToast } from "vue-toastification";

const isProcess = ref(false);
const url = ref("/user/update");
const urlCat = ref("/info/categories/default");
const req = usePost();
const reqGet = useGet();
const contentLoaded = ref(false);
const interestOptions = ref([]);
const toast = useToast();
const checkedCategories = ref([]);
const params = ref({});

reqGet.request(urlCat, params).then(() => {
  contentLoaded.value = true;
  const resGet = toValue(reqGet.res);
  if (resGet.error === 0) {
    interestOptions.value = resGet.categories;
  }
});

const start = () => {
  const cats = toValue(checkedCategories);
  if (cats.length === 0) {
    toast.error("Please select at least one category");

    return false;
  }
  const langBrowser = navigator.language || navigator.userLanguage;
  const lang = langBrowser !== null ? langBrowser.split("-")[0] : "en";

  const postData = {
    language: lang,
    categories: cats,
    onBoard: true,
  };

  isProcess.value = true;

  req.request(url, postData).then(() => {
    isProcess.value = false;
    const userStore = useUserStore();
    const sessionStore = useSessionStore();
    const uData = toValue(req.res);
    userStore.setUser(uData.userData);
    sessionStore.setOnBoard(true);

    router.push("/feeds");
  });
};
</script>
