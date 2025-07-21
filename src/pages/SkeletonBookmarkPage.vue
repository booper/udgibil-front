<script setup>
import { onMounted } from "vue";
import { usePingPong } from "@/composibles/PingPong";

onMounted(() => {
  usePingPong();
});
</script>

<template>
  <div class="flex gap-1 max-w-7xl mx-auto relative">
    <router-view name="bleft"></router-view>
    <router-view name="bcenter" v-slot="{ Component }">
      <keep-alive include="BookmarksArticlesList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <router-view name="bright"></router-view>
  </div>
</template>
