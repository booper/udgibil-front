import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { generateUniqueHash } from "@/helpers/utils";
import { usePost } from "@/composibles/networks";

export const useCollectionStore = defineStore("collections", () => {
  const collections = ref([]);
  const mutated = ref(false);
  const activityMutated = ref(false);
  function setCollections(colls) {
    collections.value = colls;
    mutated.value = true;
  }

  function setMutated(val) {
    mutated.value = val;
  }

  const isFollowed = computed(() => (feedId) => {
    for (const item of collections.value) {
      for (const feed of item.feeds) {
        if (feed.feedId === feedId) {
          return true; // Found the feedId
        }
      }
    }
    return false;
    //return findValueInFeedCollections(collections.value, id);
  });

  const getCollections = computed(() => {
    return collections.value;
  });

  const getMutated = computed(() => {
    return mutated;
  });

  const getCollectionsForFollow = computed(() => {
    return collections.value.filter((item) => item.availableforfollow);
  });

  function addFeedToCollection(
    feedId,
    feed,
    collectionTitle = "Default Collection"
  ) {
    const feedsToAdd = {
      feedId: feedId,
      title: feed.title,
      desc: feed.description,
      image: feed.image,
    };

    const item = collections.value.find(
      (item) => item.title === collectionTitle
    );

    if (item) {
      item.feeds.push(feedsToAdd);
    } else {
      collections.value.push({
        id: generateUniqueHash(),
        checked: 0,
        title: collectionTitle,
        feeds: [feedsToAdd],
        system: false,
        defaultOpen: true,
        availableforfollow: true,
      });
    }

    mutated.value = true;
    const req = usePost();
    const url = ref("/user/collections/feed/add");
    const postData = ref({ upd: { collections: collections }, feedId: feedId });
    req.request(url, postData).then(() => {});
  }

  function removeFeedFromCollection(feedId) {
    let found = false;

    for (const item of collections.value) {
      for (let i = 0; i < item.feeds.length; i++) {
        if (item.feeds[i].feedId === feedId) {
          item.feeds.splice(i, 1);
          found = true; // Set found to true if the feed is found and removed
          break; // Exit the inner loop once the feed is removed
        }
      }
      if (found) {
        break; // Exit the outer loop once the feed is found and removed
      }
    }

    if (!found) {
      return;
    }

    mutated.value = true;

    const req = usePost();
    const url = ref("/user/addfeed");
    const postData = ref({ collections: collections });
    req.request(url, postData).then(() => {});
  }

  function addCollection(collectionName = "", feedId = "", feed = {}) {
    const feedsArr = [];
    if (feedId.length > 0) {
      feedsArr.push({
        feedId: feedId,
        title: feed.title,
        desc: feed.description,
        image: feed.image,
      });
    }

    const newCollection = {
      id: generateUniqueHash(),
      checked: 0,
      title: collectionName,
      feeds: feedsArr,
      system: false,
      defaultOpen: true,
      availableforfollow: true,
    };

    collections.value.push(newCollection);
    mutated.value = true;
    const req = usePost();
    const url = ref("/user/addfeed");
    const postData = ref({ collections: collections });
    req.request(url, postData).then(() => {});
  }

  function updateCollection() {
    const req = usePost();
    const url = ref("/user/addfeed");
    const postData = ref({ collections: collections });
    req.request(url, postData).then(() => {});
  }

  function changeOpenCloseState(id, state) {
    for (const item of collections.value) {
      if (item.id === id) {
        item.defaultOpen = !state;
        break;
      }
    }
    updateCollection();
  }

  function refreshActivity() {
    activityMutated.value = !activityMutated.value;
  }

  const getActivityMutated = computed(() => {
    return activityMutated;
  });

  return {
    collections,
    activityMutated,
    setCollections,
    removeFeedFromCollection,
    isFollowed,
    getCollections,
    addFeedToCollection,
    getCollectionsForFollow,
    getActivityMutated,
    addCollection,
    getMutated,
    setMutated,
    updateCollection,
    changeOpenCloseState,
    refreshActivity,
  };
});
