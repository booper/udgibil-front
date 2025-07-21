import { ref } from "vue";
import { usePost } from "@/composibles/networks";
import { useDevice } from "next-vue-device-detector";

export function usePingPong() {
  const reqPost = usePost();
  const d = useDevice();

  const url = ref("/ping");
  const postData = ref({});
  postData.value.device = d;
  reqPost.request(url, postData).then(() => {});
}
