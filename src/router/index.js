import { createRouter, createWebHashHistory } from "vue-router";

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "home",
      component: () => import("@/views/HomeView.vue"),
    },
    {
      path: "/about",
      name: "about",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/products",
      name: "products",
      component: () => import("@/views/ProductView.vue"),
    },
    {
      path: "/products/:id",
      name: "product",
      component: () => import("@/views/ProductDetailView.vue"),
    },
    {
      path: "/news",
      name: "news",
      component: () => import("@/views/NewsView.vue"),
    },
    {
      path: "/faq",
      name: "faq",
      component: () => import("@/views/FaqView.vue"),
    },
    {
      path: "/delivery",
      name: "delivery",
      component: () => import("@/views/DeliveryView.vue"),
    },
    {
      path: "/return",
      name: "return",
      component: () => import("@/views/ReturnView.vue"),
    },
    {
      path: "/cart",
      name: "cart",
      component: () => import("@/views/CartView.vue"),
    },
    {
      path: "/checkout",
      name: "checkout",
      component: () => import("@/views/CheckoutView.vue"),
    },
    {
      path: "/order",
      name: "order",
      component: () => import("@/views/OrderView.vue"),
    },
  ],
});

export default router;
