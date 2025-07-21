import "@/assets/style.css";

import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import App from "./App.vue";
import router from "./router";
import Toast from "vue-toastification";
import "@/assets/css/toastification.css";
import VueSocialSharing from "vue-social-sharing";
import VueTippy from "vue-tippy";
import "tippy.js/dist/tippy.css";
import NotFound from "@/components/shared/NotFound.vue";
import { createDeviceDetector } from "next-vue-device-detector";
import { createI18n } from "vue-i18n";
import en from "@/languages/en.json";
import ru from "@/languages/ru.json";
import uk from "@/languages/uk.json";
import es from "@/languages/es.json";
import de from "@/languages/de.json";
import fr from "@/languages/fr.json";
import zn from "@/languages/zn.json";
import it from "@/languages/it.json";
import pt from "@/languages/pt.json";

const app = createApp(App);
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);
app.use(pinia);
app.use(router);
app.use(
  VueTippy,

  {
    directive: "tippy", // => v-tippy
    component: "tippy", // => <tippy/>
    componentSingleton: "tippy-singleton", // => <tippy-singleton/>,
    defaultProps: {
      placement: "bottom",
      allowHTML: false,
    },
  }
);
app.use(Toast, {
  position: "top-center",
  timeout: 2000,
  draggable: true,
  hideProgressBar: true,
  transition: "Vue-Toastification__fade",
});
app.use(VueSocialSharing);
const deviceDetector = createDeviceDetector();
app.use(deviceDetector);
app.component("NotFound", NotFound);
const i18n = createI18n({
  legacy: false, // you must set `false`, to use Composition API
  locale: "en",
  fallbackLocale: "en",
  messages: {
    en,
    ru,
    uk,
    de,
    fr,
    it,
    pt,
    zn,
    es,
  },
});
app.use(i18n);
app.mount("#app");
