<template>
  <div class="relative">
    <input
      v-if="!selectDisabled"
      maxlength="15"
      type="text"
      v-model.trim="searchTag"
      class="border border-gray-300 text-gray-900 text-sm rounded-md focus:ring-blue-400 focus:border-blue-400 block w-full p-2 dark:ring-gray-600 dark:bg-white/5 dark:border-gray-600 dark:text-gray-300"
      :placeholder="props.placeHolder"
      @keyup="handleKeyup"
    />
    <div
      v-if="!selectDisabled"
      :class="open ? 'block' : 'hidden'"
      @click="handleClickInside"
      ref="container"
    >
      <div class="absolute z-40 left-0 mt-1 w-full">
        <div
          class="py-1 max-h-60 overflow-y-auto text-sm bg-white rounded-md shadow-lg border border-gray-300 dark:bg-gray-900 dark:border-gray-700"
        >
          <div
            v-for="tag in tagsList"
            :key="tag"
            class="px-4 py-2 cursor-pointer hover:bg-indigo-50 dark:text-gray-300 dark:hover:bg-gray-800"
            @click="addTag(tag)"
          >
            {{ tag }}
          </div>
        </div>
      </div>
    </div>
    <div class="mt-1">
      <TagItem
        :disabled="selectDisabled"
        v-for="(tag, index) in selectedTagList"
        :key="tag"
        :tag="tag"
        @remove="removeTag(index)"
        :index="index"
      />
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, onUnmounted, toValue, reactive, watch } from "vue";
import { useGet } from "@/composibles/networks";
import TagItem from "@/components/ui/TagItem.vue";
import { useToast } from "vue-toastification";

const reqGet = useGet();
const container = ref(null);
const searchTag = ref("");
const toast = useToast();
const open = ref(false);
const tagsList = ref([]);
const selectedTagList = ref([]);
const urlTopics = ref("/info/topics");
const params = reactive({});

const props = defineProps({
  modelValue: Array,
  placeHolder: String,
  disabled: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue", ["changed"]]);
const selectDisabled = ref(props.disabled);

watch(
  () => props.modelValue,
  (newValue) => {
    selectedTagList.value = newValue;
  },
  { immediate: true }
);

watch(
  () => props.disabled,
  (newValue) => {
    selectDisabled.value = newValue;
  }
);

const handleClickOutside = (event) => {
  if (container.value && !container.value.contains(event.target)) {
    open.value = false;
  }
};

const handleKeyup = (e) => {
  if (e.key === "Enter") {
    if (searchTag.value.length > 2) {
      addTag(searchTag.value);
    }
  }
  if (e.key !== "Escape") {
    params.q = searchTag.value;
    reqGet.request(urlTopics, params).then(() => {
      const resGet = toValue(reqGet.res);
      if (resGet.error === 0) {
        tagsList.value = resGet.topics.filter(
          (item) => !selectedTagList.value.includes(item)
        );
      }

      if (tagsList.value.length > 0) {
        open.value = true;
      } else {
        open.value = false;
      }
    });
  }
};

const addTag = (tag) => {
  if (selectedTagList.value.length > 20) {
    toast("You can select only 19 topics");
  }
  if (
    !selectedTagList.value.includes(tag) &&
    selectedTagList.value.length < 20
  ) {
    tag = keepCharsAndNumbers(tag);
    if (tag.length < 3) {
      return;
    }
    tag = tag.replace(/\s+/g, "-");
    selectedTagList.value.push(tag.toLowerCase());
    clearSearch();
  }
  emit("update:modelValue", selectedTagList.value);
  emit("changed");
};

function keepCharsAndNumbers(inputString) {
  // Use a regular expression to match letters and numbers from any language
  const regex = /[^\p{L}\p{N}]/gu;

  // Replace characters that do not match the regex with an empty string
  const result = inputString.replace(regex, "");

  return result;
}

// const handleClickInside = () => {
//   open.value = true;
// };

const clearSearch = () => {
  searchTag.value = "";
  tagsList.value = [];
  open.value = false;
};

const removeTag = (index) => {
  selectedTagList.value.splice(index, 1);
  emit("update:modelValue", selectedTagList.value);
  emit("changed");
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
