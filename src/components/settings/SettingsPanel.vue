<template>
  <div class="w-full sm:w-9/12 lg:w-7/12 pt-3 px-6 dark:bg-gray-800">
    <div class="pt-2 ps-0">
      <div class="flex items-center justify-between w-full">
        <span class="text-xl dark:text-gray-300">{{ profileTitle }}</span>
      </div>
    </div>
    <div class="mt-6">
      <div class="flex justify-between sm:max-w-sm pe-1">
        <span
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >{{ nameLbl }}</span
        >
        <div
          v-if="!nameEditMode"
          v-tippy="tippyEditYourName"
          class="flex items-center gap-1 cursor-pointer"
          @click="editName"
        >
          <PenIcon class="text-indigo-600 dark:text-indigo-400" :h="3" />
          <span
            class="block text-sm font-medium leading-6 text-indigo-600 dark:text-indigo-400"
            >{{ editLbl }}</span
          >
        </div>
      </div>
      <div class="mt-2">
        <input
          ref="nameInput"
          :disabled="!nameEditMode"
          maxlength="100"
          v-model.trim="name"
          class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-sm sm:text-sm sm:leading-6 dark:ring-gray-600 dark:focus:ring-indigo-600 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
          :class="!nameEditMode ? 'cursor-not-allowed' : ''"
        />
      </div>
      <div v-if="nameEditMode" class="flex py-4">
        <button
          class="text-gray-400 py-1 px-4 ps-0 rounded dark:hover:text-gray-200"
          @click="cancelEditName"
          type="button"
        >
          {{ btnCancel }}
        </button>
        <button
          class="bg-indigo-600 text-white py-1 px-4 rounded dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
          @click="doChangeName"
          type="button"
        >
          {{ btnSave }}
        </button>
      </div>
    </div>

    <div class="flex justify-between pe-1 mt-6">
      <span
        class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
        >{{ aboutLbl }}</span
      >
      <div
        v-if="!aboutEditMode"
        v-tippy="tippyEditAbout"
        class="flex items-center gap-1 cursor-pointer"
        @click="aboutEditMode = true"
      >
        <PenIcon class="text-indigo-600 dark:text-indigo-400" :h="3" />
        <span
          class="block text-sm font-medium leading-6 text-indigo-600 dark:text-indigo-400"
          >{{ editLbl }}</span
        >
      </div>
    </div>

    <TextAreaAutoSize
      :placeholder="placeholder"
      class="border mt-2 border-gray-300 p-2 text-gray-900 text-sm rounded-md focus:ring-blue-400 focus:border-blue-400 block w-full dark:focus:ring-indigo-600 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
      :rows="2"
      :focused="aboutEditMode"
      :disabled="!aboutEditMode"
      :value="aboutMe"
      v-model="aboutMe"
      :class="!aboutEditMode ? 'cursor-not-allowed' : ''"
      @keydown="tAChange"
    />
    <div v-if="aboutEditMode" class="flex py-4">
      <button
        class="text-gray-400 py-1 px-4 ps-0 rounded dark:hover:text-gray-200"
        @click="aboutEditMode = false"
        type="button"
      >
        {{ btnCancel }}
      </button>
      <button
        class="bg-indigo-600 text-white py-1 px-4 rounded dark:text-gray-300 dark:hover:bg-indigo-700 dark:hover:text-white"
        @click="doChangeAbout"
        type="button"
      >
        {{ btnSave }}
      </button>
    </div>
    <div
      class="mb-2 mt-6 text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
    >
      {{ lblAvatar }}
    </div>
    <div
      class="flex flex-col md:flex-row items-top justify-between items-start border-b pb-6 dark:border-gray-700"
    >
      <div class="lg:w-9/12 sm:w-8/12 xs:w-full">
        <WarningAlert :title="alertImageTitle" :message="alertImageDesc" />
      </div>
      <div class="p-4 pt-0 ps-0 flex flex-col">
        <div class="flex mb-4">
          <img
            v-if="!processSave"
            :src="previewPic"
            referrerpolicy="no-referrer"
            class="h-24 w-24 mb-1 rounded-md"
          />
          <div v-else class="h-24 w-24 flex items-center justify-center mb-1">
            <div
              class="animate-spin h-10 w-10 inline-block border-[3px] border-current border-t-transparent text-indigo-600 rounded-full dark:text-indigo-500"
              role="status"
              aria-label="loading"
            ></div>
          </div>
        </div>
        <label
          v-if="!processSave"
          for="file-upload"
          class="px-4 py-1 border border-indigo-500 text-center text-indigo-500 rounded cursor-pointer hover:bg-indigo-600 hover:text-white dark:text-indigo-500 dark:border-indigo-500 dark:hover:bg-indigo-600 dark:hover:border-indigo-600 dark:hover:text-gray-300"
        >
          {{ lblUpload }}
        </label>
        <input
          type="file"
          id="file-upload"
          accept="image/jpeg, image/png, image/gif, image/webp"
          style="display: none"
          ref="fileInput"
          @change="previewImage"
        />
      </div>
    </div>

    <div class="mt-10 pt-2 ps-0">
      <div class="flex items-center justify-between w-full">
        <span class="text-xl dark:text-gray-300">{{ lblSystemPrefs }}</span>
      </div>
    </div>
    <div class="mt-6">
      <div class="sm:col-span-3">
        <label
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >{{ lblLang }}</label
        >
        <div class="mt-2">
          <select
            @change="changeLang"
            v-model="langSettings"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:ring-gray-600 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
          >
            <!-- <option value="en">English</option>
            <option value="ru">Русский</option> -->
            <option
              v-for="lang in languages"
              :key="lang.code"
              :value="lang.code"
            >
              {{ lang.name }}
            </option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-6">
      <div class="sm:col-span-3">
        <label
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >{{ lblTheme }}</label
        >
        <div class="mt-2">
          <select
            @change="changeTheme"
            v-model="themeSettings"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 dark:ring-gray-600 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
          >
            <option value="system">{{ slThemSys }}</option>
            <option value="light">{{ slThemeLight }}</option>
            <option value="dark">{{ slThemeDark }}</option>
          </select>
        </div>
      </div>
    </div>
    <div class="mt-6 flex justify-between gap-4 ps-0 items-center">
      <div>
        <label
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >{{ lblArticleDateTime }}</label
        >
        <div class="mt-2">
          <select
            @change="changeArticleDateTime"
            v-model="articleDateTime"
            class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 dark:ring-gray-600 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
          >
            <option value="ago">{{ slDateTimeAgo }}</option>
            <option value="exact">{{ slDateTimeExact }}</option>
          </select>
        </div>
      </div>
      <div>
        <label
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >{{ lblTitleSize }}</label
        >
        <SizeSwitcher
          class="mt-2"
          :list="sizesList"
          :selectedValue="selectedTitleSize"
          @changeSize="changeArticleTitleSize"
        />
      </div>
      <div>
        <label
          class="block text-sm font-medium leading-6 text-gray-900 dark:text-gray-400"
          >{{ lblTextSize }}</label
        >
        <SizeSwitcher
          class="mt-2"
          :list="sizesList"
          :selectedValue="selectedTextSize"
          @changeSize="changeArticleTextSize"
        />
      </div>
    </div>

    <div class="mt-6">
      <div class="p-2 border border-gray-200 dark:border-gray-700 rounded-md">
        <ArticlePanel :article="exampleArticle" :previewFeed="true" />
      </div>
    </div>
    <div class="mt-6">&nbsp;</div>
  </div>
</template>

<script setup>
import {
  ref,
  watch,
  reactive,
  computed,
  toValue,
  nextTick,
  watchEffect,
} from "vue";
import { useSessionStore } from "@/stores/session";
import { useToast } from "vue-toastification";
import ImageKit from "imagekit-javascript";
import TextAreaAutoSize from "@/components/ui/TextAreaAutoSize.vue";
import { useUserStore } from "@/stores/user";
import { useGet } from "@/composibles/networks";
import WarningAlert from "@/components/ui/WarningAlert.vue";
import PenIcon from "@/components/icons/PenIcon.vue";
import ArticlePanel from "@/components/articles/ArticlePanel.vue";
import SizeSwitcher from "@/components/shared/SizeSwitcher.vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n({ useScope: "global" });
const nameInput = ref(null);
const nameEditMode = ref(false);
const aboutEditMode = ref(false);
const userStore = useUserStore();
const preview = ref(null);
const fileInput = ref(null);
const processSave = ref(false);
const toast = useToast();
const startUserPic = ref(userStore.getUserPic);
const reqGet = useGet();
const urlIKAuth = ref("/info/ikauth");
const params = reactive({});
const aboutMe = ref(userStore.getUserAbout);
const name = ref(userStore.getUserName);
const articleDateTime = ref(userStore.getArticleDateTime);
const sessionStore = useSessionStore();

const sizesList = ref([
  { size: "sm", label: "S" },
  { size: "md", label: "M" },
  { size: "lg", label: "L" },
  { size: "xl", label: "XL" },
]);
const selectedTitleSize = ref(userStore.getArticleTitleSize);
const selectedTextSize = ref(userStore.getArticleTextSize);
const validLocales = ["en", "ru", "uk", "es", "de", "fr", "it", "pt", "zh"];
const userLang = sessionStore.getLang;
const safeLocale = 
  userLang === null || userLang === undefined || !validLocales.includes(userLang)
    ? "en"
    : userLang;
locale.value = safeLocale;
const langSettings = ref(locale.value);

let ikToken = null;
let ikSignature = null;
let ikExpire = null;

const profileTitle = computed(() => t("profileTitle"));
const nameLbl = computed(() => t("name"));
const tippyEditYourName = computed(() => t("tippyEditYourName"));
const btnCancel = computed(() => t("btnCancel"));
const btnSave = computed(() => t("btnSave"));
const aboutLbl = computed(() => t("aboutLbl"));
const tippyEditAbout = computed(() => t("tippyEditAbout"));
const editLbl = computed(() => t("edit"));
const placeholder = computed(() => t("plhldrAbout"));
const lblAvatar = computed(() => t("lblAvatar"));
const alertImageTitle = computed(() => t("alertImageTitle"));
const alertImageDesc = computed(() => t("alertImageDesc"));
const lblUpload = computed(() => t("lblUpload"));
const lblSystemPrefs = computed(() => t("lblSystemPrefs"));
const lblLang = computed(() => t("lblLang"));
const lblTheme = computed(() => t("lblTheme"));
const slThemSys = computed(() => t("slThemSys"));
const slThemeLight = computed(() => t("slThemeLight"));
const slThemeDark = computed(() => t("slThemeDark"));
const lblArticleDateTime = computed(() => t("lblArticleDateTime"));
const slDateTimeAgo = computed(() => t("slDateTimeAgo"));
const slDateTimeExact = computed(() => t("slDateTimeExact"));
const lblTitleSize = computed(() => t("lblTitleSize"));
const lblTextSize = computed(() => t("lblTextSize"));
const exampleArticleTitle = computed(() => t("exampleArticleTitle"));
const exampleArticleText = computed(() => t("exampleArticleText"));

const exampleArticle = reactive({
  id: 0,
  title: exampleArticleTitle.value,
  descriptionPlain: exampleArticleText.value + " " + exampleArticleTitle.value,
  feedId: 0,
  userId: 0,
  image: {
    url: import.meta.env.VITE_NO_IMAGE_ALT,
  },
  pubDate: "2023-11-29T14:55:00.000+00:00",
});

const languages = [
  { code: "en", name: "English" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "fr", name: "Français" },
  { code: "it", name: "Italiano" },
  { code: "pt", name: "Português" },
  { code: "uk", name: "Українська" },
  { code: "zh", name: "中文" },
  { code: "ru", name: "Русский" },
];
watch(
  () => userStore.getUserPic,
  (newVal) => {
    startUserPic.value = newVal;
  }
);

watch(
  () => userStore.getUserName,
  (newVal) => {
    name.value = newVal;
  }
);

watch(
  () => userStore.getUserAbout,
  (newVal) => {
    aboutMe.value = newVal;
  }
);

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

const previewPic = computed(() => {
  return preview.value !== null ? preview.value : startUserPic.value;
});

var imagekit = new ImageKit({
  publicKey: import.meta.env.VITE_IMAGEKIT_KEY,
  urlEndpoint: import.meta.env.VITE_IMAGEKIT_URL,
});

const previewImage = (event) => {
  const input = event.target;

  if (input.files) {
    processSave.value = true;
    const file = input.files[0];
    reqGet.request(urlIKAuth, params).then(() => {
      const resGet = toValue(reqGet.res);

      ikToken = resGet.token;
      ikSignature = resGet.signature;
      ikExpire = resGet.expire;

      imagekit
        .upload({
          file: file,
          fileName: file.name,
          useUniqueFileName: true,
          token: ikToken,
          signature: ikSignature,
          expire: ikExpire,
          extensions: [
            {
              name: "aws-auto-tagging",
              minConfidence: 80,
              maxTags: 10,
            },
          ],
        })
        .then((result) => {
          var imageURL = imagekit.url({
            src: result.url,
            transformation: [
              {
                height: "300",
                width: "300",
                cropMode: "cm-pad_extract",
              },
            ],
          });
          toast("Avatar updated successfully", { position: "top-right" });
          processSave.value = false;
          preview.value = imageURL;
          userStore.updatePic(imageURL);
        })
        .then((error) => {
          console.log(error);
        });
    });
  }
};

const themeSettings = ref(sessionStore.getTheme);

const changeTheme = () => {
  sessionStore.setTheme(themeSettings.value);
  sessionStore.changeTheme();
};

const changeLang = () => {
  sessionStore.setLang(langSettings.value);
  locale.value = langSettings.value;
};

const tAChange = (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    return false;
  }
};

const editName = () => {
  nameEditMode.value = true;
  nextTick(() => {
    nameInput.value.focus();
  });
};

const cancelEditName = () => {
  nameEditMode.value = false;
};

const doChangeName = () => {
  if (name.value.length < 5) {
    toast.error("Name must be at least 5 characters long");
    return false;
  }
  toast("Name updated successfully", { position: "top-right" });
  nameEditMode.value = false;
  userStore.updateName(name.value);
};

const doChangeAbout = () => {
  if (aboutMe.value.length < 15) {
    toast.error("About must be at least 15 characters long");
    return false;
  }

  toast("About updated successfully", { position: "top-right" });
  aboutEditMode.value = false;
  userStore.updateAbout(aboutMe.value);
};

const changeArticleDateTime = () => {
  toast("Article Date Time updated successfully", { position: "top-right" });
  userStore.updateArticleDateTime(articleDateTime.value);
};

const changeArticleTitleSize = (size) => {
  selectedTitleSize.value = size;
  toast("Article Title Soize Updated Successfully", { position: "top-right" });
  userStore.updateArticleTitleAndTextSizes(
    selectedTitleSize.value,
    selectedTextSize.value
  );
};

const changeArticleTextSize = (size) => {
  selectedTextSize.value = size;
  toast("Article Title Soize Updated Successfully", { position: "top-right" });
  userStore.updateArticleTitleAndTextSizes(
    selectedTitleSize.value,
    selectedTextSize.value
  );
};
</script>
