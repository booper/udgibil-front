import { ref, toValue } from "vue";
import axios from "axios";
import { useSessionStore } from "@/stores/session.js";

const urlPrefix = ref(import.meta.env.VITE_API_URL);

const res = ref(null);
const error = ref(null);

export function useImageKitAuthUrl() {
  return { ikUrl: urlPrefix.value + "/info/ikauth" };
}

export function usePost() {
  const sessionStore = useSessionStore();
  const token = ref(sessionStore.getToken);
  const request = async (url, data) => {
    const urll = toValue(urlPrefix) + toValue(url);
    const dt = toValue(data);

    try {
      const response = await axios({
        method: "post",
        url: urll,
        data: dt,
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "application/json",
        },
      });
      res.value = response.data;
      error.value = null;
    } catch (err) {
      // Handle the error appropriately
      res.value = null;
      error.value = err.response ? err.response.data : err.message;
    }
  };

  return { res, error, request };
}

export function useGet() {
  const sessionStore = useSessionStore();
  const token = ref(sessionStore.getToken);
  const request = async (url, data) => {
    const urll = toValue(urlPrefix) + toValue(url);
    const dt = toValue(data);

    try {
      const response = await axios({
        method: "get",
        url: urll,
        params: dt,
        headers: {
          Authorization: `Bearer ${toValue(token)}`,
          "Content-Type": "application/json",
        },
      });
      res.value = response.data;
      error.value = null;
    } catch (err) {
      // Handle the error appropriately
      res.value = null;
      error.value = err.response ? err.response.data : err.message;
    }
  };

  return { res, error, request };
}

export function usePostFormData() {
  const sessionStore = useSessionStore();
  const token = ref(sessionStore.getToken);
  const request = async (url, data) => {
    const urll = toValue(urlPrefix) + toValue(url);
    const dt = toValue(data);

    try {
      const response = await axios({
        method: "post",
        url: urll,
        data: dt,
        headers: {
          Authorization: `Bearer ${token.value}`,
          "Content-Type": "multipart/form-data",
        },
      });
      res.value = response.data;
      error.value = null;
    } catch (err) {
      // Handle the error appropriately
      res.value = null;
      error.value = err.response ? err.response.data : err.message;
    }
  };

  return { res, error, request };
}
