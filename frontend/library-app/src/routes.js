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
  {
    path: "/book/create",
    name: "book.create",
    component: () => import("./components/pages/buku/Create.vue"),
  },
  {
    path: "/book/update/:id",
    name: "book.update",
    component: () => import("./components/pages/buku/Update.vue"),
  },

  // RAK BUKU
  {
    path: "/bookshelf",
    name: "bookshelf.index",
    component: () => import("./components/pages/rak/Bookshelf.vue"),
  },
  {
    path: "/bookshelf/create",
    name: "bookshelf.create",
    component: () => import("./components/pages/rak/Create.vue"),
  },
  {
    path: "/bookshelf/update/:id",
    name: "bookshelf.update",
    component: () => import("./components/pages/rak/Update.vue"),
  },
];
