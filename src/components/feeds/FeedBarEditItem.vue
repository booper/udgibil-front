<template>
  <div class="w-full">
    <div
      class="mx-auto w-full ps-0 rounded-2xl bg-white py-1 pe-3 dark:bg-gray-800"
    >
      <div
        class="flex w-full items-center justify-left rounded bg-gray-100 ps-2 py-2 pe-3 text-left text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75 dark:bg-gray-900 dark:text-gray-300"
      >
        <input
          v-if="!system"
          class="rounded h-5 w-5 border-gray-300 dark:border-white/10 dark:bg-white/5 dark:text-indigo-600 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-900"
          type="checkbox"
          :value="1"
          @input="checkUnchecked"
          :checked="checked === 1 ? true : false"
        />
        <div v-else class="rounded h-5 w-5"></div>

        <div class="ms-2 w-full">
          <input
            maxlength="35"
            :value="title"
            @input="$emit('update:title', $event.target.value)"
            type="text"
            class="border pt-1 pb-1 ps-2 ps-2 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-400 focus:border-blue-400 block w-full dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps(["title", "checked", "system"]);
const emit = defineEmits(["update:title", "update:checked", "checkedChanged"]);
const checkUnchecked = (e) => {
  emit("update:checked", e.target.checked ? 1 : 0);
  emit("checkedChanged", e.target.checked ? 1 : 0);
};
</script>
