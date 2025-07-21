import { defineStore } from "pinia";
import { useLocalStorage } from "@vueuse/core";

export const useUserStore = defineStore("user", {
  state: () => {
    return {
      auth: useLocalStorage("auth", 0),
      onboard: useLocalStorage("onboard", 0),
      token: useLocalStorage("token", null),
      userId: null,
      userName: null,
      userEmail: null,
      userPicture: null,
      userSince: null,
      collections: null,
      myfeeds: null,
      liked: null,
    };
  },
  actions: {
    setUser(user) {
      this.auth = 1;
      this.onboard = user.onBoard ? 1 : 0;
      this.userId = user.id;
      this.userName = user.name;
      this.userEmail = user.email;
      this.userPicture = user.picture;
      this.createdAt = user.createdAt;
      this.collections = user.collections;
      this.readlater = user.readlater;
      this.myfeeds = user.myfeeds;
      this.liked = user.likedHistory;
    },

    resetUser(user) {
      this.userId = user.id;
      this.userName = user.name;
      this.userEmail = user.email;
      this.userPicture = user.picture;
      this.userSince = user.createdAt;
      this.collections = user.collections;
      this.myfeeds = user.myfeeds;
      this.liked = user.likedHistory;
    },

    setToken(token) {
      this.token = token;
    },

    removeUser() {
      this.auth = 0;
      this.onboard = 0;
      this.userId = null;
      this.userName = null;
      this.userEmail = null;
      this.userPicture = null;
      this.createdAt = null;
      this.collections = null;
      this.readlater = null;
      this.myfeeds = null;
      this.liked = null;
    },

    removeToken() {
      this.token = null;
    },
  },
  getters: {
    isAuth(state) {
      return state.auth === 1 ? true : false;
    },
    isOnBoard(state) {
      return state.onboard === 1 ? true : false;
    },

    getToken(state) {
      return state.token;
    },

    getUserId(state) {
      return state.userId;
    },

    getCollections(state) {
      return state.collections;
    },

    getUserPic(state) {
      return state.userPicture;
    },
  },
});
