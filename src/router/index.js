import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: () => import("../page/LoginView.vue"),
    },
    {
      path: "/register",
      component: () => import("../page/Register.vue"),
    },
    {
      path: "/home",
      component: () => import("../views/Home.vue"),
    },
    {
      path: "/report",
      component: () => import("../views/Report.vue"),
    },
    {
      path: "/history",
      component: () => import("../views/history.vue"),
    },
    {
      path: "/maps",
      component: () => import("../views/Maps.vue"),
    },
    {
      path: "/robot",
      component: () => import("../views/Robot.vue"),
    },
    {
      path: "/robot/new",
      component: () => import("../views/New.vue"),
    },
    {
      path: "/settings",
      component: () => import("../views/Setting.vue"),
    },
    {
      path: "/task",
      component: () => import("../views/Task.vue"),
    },
    {
      path: "/battery",
      component: () => import("../page/Batery.vue"),
    },
    {
      path: "/mapping",
      component: () => import("../page/Mapping.vue"),
    },
    {
      path: "/docking",
      component: () => import("../page/Docking.vue"),
    },
    {
      path: "/erorhandling",
      component: () => import("../page/Eror.vue"),
    },
    {
      path: "/planner",
      component: () => import("../page/Planner.vue"),
    },
    {
      path: "/profile",
      component: () => import("../page/Profile.vue"),
    },
  ],
});

export default router;
