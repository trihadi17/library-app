export const routes = [
  // DASHBOARD
  {
    path: "/",
    name: "dashboard",
    component: () => import("./components/Dashboard.vue"),
  },

  // BUKU
  {
    path: "/book",
    name: "book.index",
    component: () => import("./components/pages/buku/Book.vue"),
  },
  //   {
  //     path: "/book",
  //     name: "book.create",
  //     component: () => import("./components/pages/buku/Create.vue"),
  //   },
  //   {
  //     path: "/book",
  //     name: "book.update",
  //     component: () => import("./components/pages/buku/Update.vue"),
  //   },
];