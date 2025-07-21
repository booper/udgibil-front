<script setup></script>

<template>
  <div class="flex gap-1 max-w-7xl mx-auto relative">
    <router-view name="left"></router-view>
    <router-view name="center"></router-view>
    <router-view name="right"></router-view>
  </div>
</template>
