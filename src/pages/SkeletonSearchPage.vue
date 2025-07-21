<script setup>
import { onMounted } from "vue";
import { usePingPong } from "@/composibles/PingPong";

onMounted(() => {
  usePingPong();
});
</script>

<template>
  <div class="flex gap-1 max-w-7xl mx-auto relative">
    <router-view name="sleft"></router-view>
    <router-view name="scenter" v-slot="{ Component }">
      <keep-alive include="SearchArticlesList">
        <component :is="Component"></component>
      </keep-alive>
    </router-view>
    <router-view name="sright"></router-view>
  </div>
</template>
