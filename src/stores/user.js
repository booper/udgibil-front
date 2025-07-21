import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { usePost } from "@/composibles/networks";

export const useUserStore = defineStore("user", () => {
  const userId = ref(null);
  const userName = ref(null);
  const userEmail = ref(null);
  const userPicture = ref(null);
  const userSince = ref(null);
  const myfeeds = ref(null);
  const liked = ref(null);
  const about = ref(null);
  const lang = ref(null);
  const articleDateTime = ref(null);
  const articleTitleSize = ref(null);
  const articleTextSize = ref(null);
  const articleListViewMode = ref(null);

  function updatePic(pic) {
    userPicture.value = pic;
    const reqPost = usePost();
    const url = ref("/user/update");
    const uData = {
      picture: pic,
    };
    reqPost.request(url, uData);
  }

  function updateName(nm) {
    userName.value = nm;
    const reqPost = usePost();
    const url = ref("/user/update");
    const uData = {
      name: nm,
    };
    reqPost.request(url, uData);
  }

  function updateArticleTitleAndTextSizes(title, text) {
    articleTitleSize.value = title;
    articleTextSize.value = text;
    const reqPost = usePost();
    const url = ref("/user/update");
    const uData = {
      articleTitleSize: title,
      articleTextSize: text,
    };
    reqPost.request(url, uData);
  }

  function updateAbout(ab) {
    about.value = ab;
    const reqPost = usePost();
    const url = ref("/user/update");
    const uData = {
      about: ab,
    };
    reqPost.request(url, uData);
  }

  function updateArticleDateTime(dt) {
    articleDateTime.value = dt;
    const reqPost = usePost();
    const url = ref("/user/update");
    const uData = {
      articleDateTime: dt,
    };
    reqPost.request(url, uData);
  }

  function updateArticleListViewMode(mode) {
    articleListViewMode.value = mode;
    const reqPost = usePost();
    const url = ref("/user/update");
    const uData = {
      articleListViewMode: mode,
    };
    reqPost.request(url, uData);
  }

  function setUser(user) {
    userId.value = user.id;
    userName.value = user.name;
    userEmail.value = user.email;
    userPicture.value = user.picture;
    userSince.value = user.createdAt;
    myfeeds.value = user.myfeeds;
    liked.value = user.likedHistory;
    about.value = user.about;
    lang.value = user.language;
    articleDateTime.value = user.articleDateTime;
    articleTitleSize.value = user.articleTitleSize;
    articleTextSize.value = user.articleTextSize;
    articleListViewMode.value = user.articleListViewMode;
  }

  function removeUser() {
    userId.value = null;
    userName.value = null;
    userEmail.value = null;
    userPicture.value = null;
    userSince.value = null;
    myfeeds.value = null;
    liked.value = null;
    about.value = null;
    lang.value = null;
    articleDateTime.value = null;
    articleTitleSize.value = null;
    articleTextSize.value = null;
    articleListViewMode.value = null;
  }

  const getArticleListViewMode = computed(() => {
    return articleListViewMode.value;
  });

  const getArticleTitleSize = computed(() => {
    return articleTitleSize.value;
  });

  const getArticleTextSize = computed(() => {
    return articleTextSize.value;
  });

  const getUserId = computed(() => {
    return userId.value;
  });

  const getUserName = computed(() => {
    return userName.value;
  });
  const getUserEmail = computed(() => {
    return userEmail.value;
  });

  const getUserPic = computed(() => {
    return userPicture.value;
  });
  const getUserAbout = computed(() => {
    return about.value;
  });
  const getArticleDateTime = computed(() => {
    return articleDateTime.value;
  });
  const getLang = computed(() => {
    return lang.value;
  });

  return {
    setUser,
    removeUser,
    updatePic,
    updateName,
    updateAbout,
    updateArticleDateTime,
    updateArticleTitleAndTextSizes,
    updateArticleListViewMode,
    getUserId,
    getUserName,
    getUserEmail,
    getUserPic,
    getUserAbout,
    getArticleDateTime,
    getArticleTitleSize,
    getArticleTextSize,
    getArticleListViewMode,
    getLang,
  };
});
