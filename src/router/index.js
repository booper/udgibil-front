import { createRouter, createWebHistory } from "vue-router";

import { useSessionStore } from "@/stores/session.js";
import { useMenuStore } from "@/stores/menus.js";
import { useFeedsStore } from "@/stores/feeds.js";

import NotFound from "@/pages/NotFound.vue";
import FeedsBar from "@/components/feeds/FeedsBar.vue";
import NavRight from "@/components/shared/NavRight.vue";
import FeedHome from "@/components/feeds/FeedHome.vue";
import SearchFeeds from "@/components/search/feeds/SearchFeeds.vue";
import AddFeeds from "@/components/search/feeds/AddFeeds.vue";
import FeedArticlesList from "@/components/feeds/FeedArticlesList.vue";
import SearchFeedsRight from "@/components/search/feeds/SearchFeedsRight.vue";
import ArticleView from "@/components/articles/ArticleView.vue";
import SkeletonPage from "@/pages/SkeletonPage.vue";
import SkeletonBookmarkPage from "@/pages/SkeletonBookmarkPage.vue";
import BookmarksArticlesList from "@/components/bookmarks/BookmarksArticlesList.vue";
import BookmarkArticleView from "@/components/bookmarks/BookmarkArticleView.vue";
import SkeletonSearchPage from "@/pages/SkeletonSearchPage.vue";
import SearchArticlesList from "@/components/search/articles/SearchArticlesList.vue";
import SettingsPage from "@/pages/SettingsPage.vue";

const Router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/feeds",
      meta: {
        requiresAuth: true,
      },
    },
    {
      path: "/a/:id",
      component: () => import("@/pages/ViewSharedArticle.vue"),
      props: true,
    },
    {
      path: "/f/:id",
      component: () => import("@/pages/ViewSharedFeed.vue"),
      props: true,
    },
    {
      path: "/feeds",
      component: SkeletonPage,
      children: [
        {
          path: "",
          components: {
            left: FeedsBar,
            center: FeedHome,
            right: NavRight,
          },
        },
        {
          path: "add",
          components: {
            left: FeedsBar,
            center: AddFeeds,
            right: SearchFeedsRight,
          },
          props: (route) => ({ l: route.query.l }),
        },
        {
          path: "search",
          components: {
            left: FeedsBar,
            center: SearchFeeds,
            right: SearchFeedsRight,
          },
        },
        {
          path: ":id",
          components: {
            left: FeedsBar,
            center: FeedArticlesList,
            right: NavRight,
          },
          props: true,
        },
      ],

      meta: {
        requiresAuth: true,
        menu: "feeds",
      },
    },

    {
      path: "/article",
      name: "ArticleView",
      component: SkeletonPage,
      meta: {
        requiresAuth: true,
      },
      children: [
        {
          path: ":id",
          components: {
            left: FeedsBar,
            center: ArticleView,
            right: NavRight,
          },
        },
      ],
    },

    {
      path: "/bookmarks",
      component: SkeletonBookmarkPage,
      children: [
        {
          path: "",
          name: "BookmarksArticlesList",
          components: {
            bleft: FeedsBar,
            bcenter: BookmarksArticlesList,
            bright: NavRight,
          },
        },

        {
          path: ":id",
          name: "BookmarkArticleView",
          components: {
            bleft: FeedsBar,
            bcenter: BookmarkArticleView,
            bright: NavRight,
          },
        },
      ],

      meta: {
        requiresAuth: true,
        menu: "bookmarks",
      },
    },

    {
      path: "/search",
      component: SkeletonSearchPage,
      children: [
        {
          path: "",
          name: "SearchArticlesList",
          components: {
            sleft: FeedsBar,
            scenter: SearchArticlesList,
            sright: NavRight,
          },
          props: (route) => ({ q: route.query.q, opt: route.query.opt }),
        },

        {
          path: "article/:id",
          components: {
            sleft: FeedsBar,
            scenter: ArticleView,
            sright: NavRight,
          },
          props: { scenter: { fromSearch: true } },
        },
      ],

      meta: {
        requiresAuth: true,
        menu: "search",
      },
    },

    {
      path: "/settings",
      component: SettingsPage,
      meta: {
        requiresAuth: true,
        menu: "settings",
      },
    },

    {
      path: "/onboard",
      component: () => import("../pages/OnBoardPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    {
      path: "/auth",
      component: () => import("../pages/AuthPage.vue"),
      props: (route) => ({ ...route.query }),
    },
    {
      path: "/auth/google",
      component: () => import("../pages/AuthGoogle.vue"),
      props: (route) => ({ ...route.query }),
    },
    {
      path: "/logout",
      component: () => import("../pages/LogoutPage.vue"),
      meta: {
        requiresAuth: true,
      },
    },

    { path: "/:notFound(.*)", component: NotFound },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { left: 0, top: 0 };
    }
  },
});

Router.beforeEach((to, from, next) => {
  const sessionStore = useSessionStore();
  const onBoard = sessionStore.getOnBoard;
  const isAuthenticated = sessionStore.isAuth;
  const isAnuAuth = sessionStore.isAnu;

  if (to.meta.menu !== undefined && to.meta.menu !== null) {
    const menuStore = useMenuStore();
    menuStore.setActiveMenu(to.meta.menu);
  }

  if (to.matched.some((route) => route.meta.requiresAuth)) {
    if (!isAuthenticated) {
      const articlePathRegex = /^\/article\/([^\/]+)$/; // Assuming the id is a number
      const matchArticle = to.path.match(articlePathRegex);

      const feedPathRegex = /^\/feeds\/([^\/]+)$/; // Assuming the id is a number
      const matchFeed = to.path.match(feedPathRegex);

      if (matchArticle) {
        const articleId = matchArticle[1];
        next("/a/" + articleId);
      } else if (matchFeed) {
        const feedId = matchFeed[1];
        next("/f/" + feedId);
      } else {
        next("/auth");
      }
    } else if (to.path === "/logout") {
      next();
    } else if (!onBoard && to.path !== "/onboard") {
      next("/onboard");
    } else if (onBoard && to.path == "/onboard") {
      next("/feeds");
    } else if (to.path === "/feeds") {
      const feedsStore = useFeedsStore();
      const cf = feedsStore.getCurrentFeed;
      if (cf !== null && cf !== undefined) {
        next({ path: `/feeds/${cf}` });
      } else {
        next();
      }
    } else {
      next();
    }
  } else if (to.matched.some((route) => route.meta.requiresAnuAuth)) {
    if (isAuthenticated && isAnuAuth) {
      next();
    } else {
      next("/");
    }
  } else {
    if (isAuthenticated && to.path === "/auth") {
      next("/feeds");
    } else if (isAuthenticated && to.path === "/auth/google") {
      next("/feeds");
    } else {
      next();
    }
  }
});

export default Router;
