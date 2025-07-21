import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { usePost } from "@/composibles/networks";

export const useBookmarksStore = defineStore("bookmarks", () => {
  const bookmarks = ref([]);
  const mutated = ref(false);

  function setBookmarks(bms) {
    bookmarks.value = bms;
    mutated.value = true;
  }

  function addBookmark(articleId) {
    bookmarks.value.push(articleId);

    const req = usePost();
    const url = ref("/bookmarks/add");
    const postData = ref({ articleId });
    req.request(url, postData).then(() => {});
  }

  function removeBookmark(articleId) {
    for (let i = bookmarks.value.length - 1; i >= 0; i--) {
      if (bookmarks.value[i] === articleId) {
        bookmarks.value.splice(i, 1);
      }
    }
    const req = usePost();
    const url = ref("/bookmarks/remove");
    const postData = ref({ articleId });
    req.request(url, postData).then(() => {});
  }

  const getBookmarksList = computed(() => {
    return bookmarks.value;
  });

  return {
    setBookmarks,
    addBookmark,
    removeBookmark,
    getBookmarksList,
  };
});
