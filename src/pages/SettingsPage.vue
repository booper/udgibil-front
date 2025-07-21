<script setup>
import FeedsBar from "@/components/feeds/FeedsBar.vue";
import NavRight from "@/components/shared/NavRight.vue";
import SettingsPanel from "@/components/settings/SettingsPanel.vue";
import { onMounted } from "vue";
import { usePingPong } from "@/composibles/PingPong";

onMounted(() => {
  usePingPong();
});
</script>

<template>
  <div class="flex gap-1 max-w-7xl mx-auto relative">
    <FeedsBar />
    <SettingsPanel />
    <NavRight />
  </div>
</template>
