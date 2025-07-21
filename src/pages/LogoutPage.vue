<template>
  <h1>Logging out</h1>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import { useUserStore } from "@/stores/user.js";
import { useSessionStore } from "@/stores/session.js";

const userStore = useUserStore();
const sessionStore = useSessionStore();

const router = useRouter();

onMounted(() => {
  sessionStore.logout();
  userStore.removeUser();
  router.push("/auth");
});
</script>
