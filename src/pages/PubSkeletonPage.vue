<script setup>
import { onMounted } from "vue";
import { usePingPong } from "@/composibles/PingPong";

onMounted(() => {
  usePingPong();
});
</script>

<template>
  <div class="flex gap-1 max-w-7xl mx-auto relative">
    <router-view name="pleft" v-slot="{ Component }">
      <keep-alive include="MyFeedsBar">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <router-view name="pcenter" v-slot="{ Component }">
      <keep-alive include="MyFeedArticlesList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <router-view name="pright"></router-view>
  </div>
</template>
