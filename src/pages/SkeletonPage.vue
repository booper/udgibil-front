<script setup>
import { onMounted } from "vue";
import { usePingPong } from "@/composibles/PingPong";

onMounted(() => {
  usePingPong();
});
</script>

<template>
  <div class="flex gap-1 max-w-7xl mx-auto relative">
    <router-view name="left"></router-view>
    <router-view name="center" v-slot="{ Component }">
      <keep-alive include="FeedArticlesList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <router-view name="right"></router-view>
  </div>
</template>
