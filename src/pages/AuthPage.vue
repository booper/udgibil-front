<template>
  <div class="lg:flex">
    <div class="lg:w-1/2 xl:max-w-screen-sm">
      <div
        class="py-12 bg-indigo-100 lg:bg-white flex justify-center lg:justify-start lg:px-12 dark:bg-slate-800"
      >
        <div class="cursor-pointer flex items-center"><MainLogo /></div>
      </div>
      <div
        class="mt-10 px-12 sm:px-24 md:px-48 lg:px-12 lg:mt-16 xl:px-24 xl:max-w-2xl"
      >
        <h2
          class="text-center text-4xl text-gray-900 font-display font-semibold lg:text-left xl:text-5xl xl:text-bold dark:text-gray-300"
        >
          {{ titleText }}
        </h2>
        <div class="mt-12">
          <div class="mt-10">
            <button
              v-if="!isProcess"
              @click="login"
              type="button"
              class="flex items-center justify-center bg-white text-black p-4 w-full rounded-full tracking-wide border-2 border-gray-300 font-semibold font-display hover:shadow-md hover:bg-gray-50 dark:bg-slate-900 dark:border-slate-700"
            >
              <img
                src="@/assets/img/partners/google.svg"
                referrerpolicy="no-referrer"
              />
              <span class="ml-3 dark:text-gray-300">{{ btnText }}</span>
            </button>
            <button
              v-else
              disabled
              type="button"
              class="flex items-center justify-center bg-white text-black p-4 w-full rounded-full tracking-wide border-2 border-gray-300 font-semibold font-display dark:bg-slate-900 dark:border-slate-700"
            >
              <div class="flex justify-center items-center">
                <div
                  class="animate-spin h-5 w-5 inline-block border-[3px] border-current border-t-transparent text-indigo-600 rounded-full dark:text-indigo-500"
                ></div>
              </div>
            </button>
          </div>
          <div class="mt-10 text-sm text-gray-400">
            By sign in to Udgibil.com account you agree and accept our
            <a
              class="text-indigo-300 hover:text-indigo-500"
              href="/tos"
              target="_blank"
              >Terms & Services</a
            >
          </div>
          <div
            class="mt-12 text-sm font-display font-semibold text-gray-700 text-center dark:text-gray-500"
          >
            &copy; 2024

            <a
              href="#"
              class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
              >Udgibil RSS Reader</a
            >
          </div>
        </div>
      </div>
    </div>
    <div
      class="hidden lg:flex lg:relative lg:flex-col bg-indigo-50 flex-1 h-screen dark:bg-slate-700"
    >
      <!-- <div class="transform duration-200 hover:scale-110 cursor-pointer"></div> -->

      <div
        class="lg:absolute lg:top-16 lg:start-20 bg-white rounded-xl p-6 w-[65%] shadow-lg"
      >
        <div class="flex justify-end">
          <QuotationIcon class="text-indigo-300 -mt-12 h-16 w-16" />
        </div>
        <p class="text-xl">
          The most powerful person in the world is the storyteller. The
          storyteller sets the vision, values, and agenda of an entire
          generation that is to come.
        </p>
        <div class="flex items-center justify-end mt-4 gap-x-2">
          <img src="/quot/2.jpg" class="h-6 w-6 rounded-full" />
          <p class="text-gray-400">Steve Jobs</p>
        </div>
      </div>
      <div
        class="lg:absolute lg:top-64 lg:start-[340px] 2xl:start-[550px] bg-white rounded-xl mt-6 p-6 w-[50%] shadow-lg"
      >
        <div class="flex justify-end">
          <QuotationIcon class="text-indigo-300 -mt-12 h-16 w-16" />
        </div>
        <p class="text-xl">
          The first step in blogging is not writing them but reading them
        </p>
        <div class="flex items-center justify-end mt-4 gap-x-2">
          <img src="/quot/1.jpg" class="h-6 w-6 rounded-full" />
          <p class="text-gray-400">Jeff Jarvis</p>
        </div>
      </div>

      <div
        class="lg:absolute lg:top-[470px] lg:start-20 bg-white rounded-xl mt-6 p-6 w-[75%] shadow-lg"
      >
        <div class="flex justify-end">
          <QuotationIcon class="text-indigo-300 -mt-12 h-16 w-16" />
        </div>
        <p class="text-xl">
          Reading news is not just about staying up-to-date; it's about
          fostering a mindset of curiosity, empathy, and continuous learning.
        </p>
        <div class="flex items-center justify-end mt-4 gap-x-2">
          <img src="/quot/3.jpg" class="h-6 w-6 rounded-full" />
          <p class="text-gray-400">Carlos Slim</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import MainLogo from "@/components/ui/MainLogo.vue";
import { useDevice } from "next-vue-device-detector";
import QuotationIcon from "@/components/icons/QuotationIcon.vue";
const d = useDevice();

if (d.mobile) {
  window.location.href = import.meta.env.VITE_MOBILE_HOST + "/auth";
}
const isProcess = ref(false);

const props = defineProps({
  utm_source: {
    type: String,
    default: "top",
  },
});

const login = () => {
  isProcess.value = true;

  google.accounts.oauth2
    .initCodeClient({
      client_id: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID,
      scope: "email profile openid",
      ux_mode: "redirect",
      redirect_uri: import.meta.env.VITE_HOST + "/auth/google",
    })
    .requestCode();
};

onMounted(() => {
  document.documentElement.classList.remove("dark");
});

const btnText = computed(() => {
  let st = "Sign in with Google";
  if (props.utm_source === "topReg" || props.utm_source === "footerReg") {
    return "Sign Up with Google";
  }

  return st;
});

const titleText = computed(() => {
  let st = "Sign in";
  if (props.utm_source === "topReg" || props.utm_source === "footerReg") {
    return "Sign Up";
  }

  return st;
});
</script>
