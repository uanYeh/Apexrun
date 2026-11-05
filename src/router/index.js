import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
      meta: { title: "Home" },
    },
    {
      path: "/about",
      name: "About",
      component: () => import("@/views/AboutView.vue"),
      meta: { title: "About" },
    },
    {
      path: "/products",
      name: "Products",
      component: () => import("@/views/ProductView.vue"),
      meta: { title: "Products" },
    },
    {
      path: "/products/:id",
      name: "Product",
      component: () => import("@/views/ProductDetailView.vue"),
      meta: { title: "Product" },
    },
    {
      path: "/news",
      name: "News",
      component: () => import("@/views/NewsView.vue"),
      meta: { title: "News" },
    },
    {
      path: "/news/:id",
      name: "news-detail",
      component: () => import("../views/NewsDetailView.vue"),
      meta: { title: "News" },
    },
    {
      path: "/faq",
      name: "Faq",
      component: () => import("@/views/FaqView.vue"),
      meta: { title: "FAQ" },
    },
    {
      path: "/delivery",
      name: "Delivery",
      component: () => import("@/views/DeliveryView.vue"),
      meta: { title: "Delivery" },
    },
    {
      path: "/return",
      name: "Return",
      component: () => import("@/views/ReturnView.vue"),
      meta: { title: "Returns" },
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/views/CartView.vue"),
      meta: { title: "Cart" },
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: () => import("@/views/CheckoutView.vue"),
      meta: { title: "Checkout" },
    },
    {
      path: "/order/:id",
      name: "Order",
      component: () => import("@/views/OrderView.vue"),
      meta: { title: "Order" },
    },
    {
      path: "/favorite",
      name: "Favorite",
      component: () => import("@/views/FavoriteView.vue"),
      meta: { title: "Favorites" },
    },
  ],
  scrollBehavior() {
    return { top: 0 };
  },
});

router.afterEach((to) => {
  document.title = to.meta.title ? `${to.meta.title} | Apexrun` : "Apexrun";
});

export default router;
