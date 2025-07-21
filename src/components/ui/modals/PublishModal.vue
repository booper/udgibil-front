<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-50" @close="open = false">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div
          class="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"
        />
      </TransitionChild>

      <div class="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden rounded-lg bg-white pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg dark:bg-gray-800"
            >
              <div
                class="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 dark:bg-gray-800"
              >
                <div
                  class="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100 dark:bg-green-900"
                >
                  <CheckIcon
                    class="h-6 w-6 text-green-600"
                    aria-hidden="true"
                  />
                </div>
                <div class="mt-3 text-center sm:mt-5">
                  <DialogTitle
                    as="h3"
                    class="text-base text-md font-semibold leading-6 text-gray-900 dark:text-gray-300"
                    >{{ modalPubTitle }}</DialogTitle
                  >
                  <div class="mt-2">
                    <p
                      class="text-md text-start text-gray-500 dark:text-gray-400"
                    >
                      {{ modalPubMsg }}
                    </p>
                    <p
                      class="text-md mt-3 text-start text-gray-500 dark:text-gray-400"
                    >
                      {{ modalPubMsg2 }}
                    </p>
                    <p
                      class="text-md mt-3 text-start text-gray-500 dark:text-gray-400"
                    >
                      {{ modalPubMsg3 }}
                      <a
                        href="https://your-domain.com/tos"
                        _target="blank"
                        class="text-blue-500"
                        >{{ modalPubMsg4 }}</a
                      >{{ modalPubMsg5 }}
                    </p>
                  </div>
                </div>
              </div>
              <div
                class="bg-gray-50 px-4 mt-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 dark:bg-gray-700"
              >
                <button
                  type="button"
                  class="inline-flex w-full justify-center rounded-md bg-indigo-500 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700 sm:ml-3 sm:w-auto dark:bg-indigo-700 dark:hover:bg-indigo-600 dark:text-gray-300"
                  @click="open = false"
                >
                  {{ modalIUnderstand }}
                </button>
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  TransitionChild,
  TransitionRoot,
} from "@headlessui/vue";
import { CheckIcon } from "@heroicons/vue/24/outline";
import { useSessionStore } from "@/stores/session";
import { useI18n } from "vue-i18n";

const open = ref(false);
const props = defineProps({
  openAlert: {
    type: Boolean,
    default: false,
  },
});

const sessionStore = useSessionStore();
const { t, locale } = useI18n({ useScope: "global" });
locale.value =
  sessionStore.getLang === null || sessionStore.getLang === undefined
    ? "en"
    : sessionStore.getLang;

const modalPubTitle = computed(() => t("modalPubTitle"));
const modalPubMsg = computed(() => t("modalPubMsg"));
const modalPubMsg2 = computed(() => t("modalPubMsg2"));
const modalPubMsg3 = computed(() => t("modalPubMsg3"));
const modalPubMsg4 = computed(() => t("modalPubMsg4"));
const modalPubMsg5 = computed(() => t("modalPubMsg5"));
const modalIUnderstand = computed(() => t("modalIUnderstand"));

watch(
  () => props.openAlert,
  (val) => {
    open.value = val;
  }
);
</script>
