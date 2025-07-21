<template>
  <div
    class="mx-auto max-w-2xl rounded-3xl ring-1 ring-gray-200 sm:mt-20 lg:mx-0 lg:flex lg:max-w-none"
  >
    <div class="p-8 sm:p-10 lg:flex-auto">
      <h3 class="text-2xl font-bold tracking-tight text-gray-900">
        {{ titleCreateAccount }}
      </h3>
      <p class="text-gray-500 pt-1">
        {{ ctaMsg }}
      </p>

      <div class="mt-10 flex items-center gap-x-4">
        <h4 class="flex-none text-sm font-semibold leading-6 text-indigo-600">
          {{ ctaWhatsIncluded }}
        </h4>
        <div class="h-px flex-auto bg-gray-100" />
      </div>
      <ul
        role="list"
        class="mt-8 grid grid-cols-1 gap-4 text-sm leading-6 text-gray-600 sm:grid-cols-2 sm:gap-6"
      >
        <li
          v-for="feature in includedFeatures"
          :key="feature"
          class="flex gap-x-3"
        >
          <CheckIcon
            class="h-6 w-5 flex-none text-indigo-600"
            aria-hidden="true"
          />
          {{ feature }}
        </li>
      </ul>
    </div>
    <div class="-mt-2 p-2 lg:mt-0 lg:w-full lg:max-w-xs lg:flex-shrink-0">
      <div
        class="rounded-2xl bg-gray-50 py-10 text-center ring-1 ring-inset ring-gray-900/5 lg:flex lg:flex-col lg:justify-center lg:py-16"
      >
        <div class="mx-auto max-w-xs px-8">
          <p class="text-base font-semibold text-gray-600">
            {{ ctaDoNotWorry }}
          </p>
          <p class="mt-6 flex items-baseline justify-center gap-x-2">
            <span class="text-5xl font-bold tracking-tight text-gray-900">{{
              lblFree
            }}</span>
          </p>
          <a
            href="#"
            class="mt-10 block w-full rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >{{ lblGetStarted }}</a
          >
          <p class="mt-6 text-xs leading-5 text-gray-600">
            {{ ctaMsg2 }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { CheckIcon } from "@heroicons/vue/20/solid";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const titleCreateAccount = computed(() => t("titleCreateAccount"));
const ctaMsg = computed(() => t("ctaMsg"));
const ctaWhatsIncluded = computed(() => t("ctaWhatsIncluded"));
const ctaDoNotWorry = computed(() => t("ctaDoNotWorry"));
const lblFree = computed(() => t("lblFree"));
const lblGetStarted = computed(() => t("lblGetStarted"));
const ctaMsg2 = computed(() => t("ctaMsg2"));

const includedFeatures = [
  "Unlimited feeds",
  "Instant Updates",
  "Unlimited Collections",
  "Unlimited Publications",
];
</script>
