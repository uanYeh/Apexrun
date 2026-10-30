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
      name: "About",
      component: () => import("@/views/AboutView.vue"),
    },
    {
      path: "/products",
      name: "Products",
      component: () => import("@/views/ProductView.vue"),
    },
    {
      path: "/products/:id",
      name: "Product",
      component: () => import("@/views/ProductDetailView.vue"),
    },
    {
      path: "/news",
      name: "News",
      component: () => import("@/views/NewsView.vue"),
    },
    {
      path: "/faq",
      name: "Faq",
      component: () => import("@/views/FaqView.vue"),
    },
    {
      path: "/delivery",
      name: "Delivery",
      component: () => import("@/views/DeliveryView.vue"),
    },
    {
      path: "/return",
      name: "Return",
      component: () => import("@/views/ReturnView.vue"),
    },
    {
      path: "/cart",
      name: "Cart",
      component: () => import("@/views/CartView.vue"),
    },
    {
      path: "/checkout",
      name: "Checkout",
      component: () => import("@/views/CheckoutView.vue"),
    },
    {
      path: "/order",
      name: "Order",
      component: () => import("@/views/OrderView.vue"),
    },
    {
      path: "/admin/login",
      name: "admin-login",
      component: () => import("@/views/admin/LoginView.vue"),
    },
    {
      path: "/admin/dashobard",
      name: "dashobard",
      component: () => import("@/views/admin/DashboardView.vue"),
    },
  ],
});

export default router;
