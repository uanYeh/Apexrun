<!-- <template>
  <ul class="list-unstyled d-flex fs-6">
    <li class="px-2">
      <RouterLink class="link-dark text-decoration-none fw-semibold" to="/">Home</RouterLink>
    </li>
    /
    <li class="px-2">
      <RouterLink class="link-dark text-decoration-none fw-semibold" to="/products"
        >Products</RouterLink
      >
    </li>
    /
    <li class="px-2 active" aria-current="page">Shoes</li>
  </ul>
</template> -->
<!-- TheBreadcrumb.vue -->
<template>
  <ul class="list-unstyled d-flex fs-6">
    <li class="px-2">
      <RouterLink class="link-dark text-decoration-none fw-semibold" to="/">Home</RouterLink>
    </li>
    <template v-for="(crumb, index) in crumbs" :key="index">
      /
      <li class="px-2">
        <RouterLink
          v-if="crumb.to"
          class="link-dark text-decoration-none fw-semibold"
          :to="crumb.to"
        >
          {{ crumb.label }}
        </RouterLink>
        <span v-else class="active" aria-current="page">{{ crumb.label }}</span>
      </li>
    </template>
  </ul>
</template>

<script>
export default {
  computed: {
    crumbs() {
      const route = this.$route;
      const crumbs = [];

      if (route.name === "products") {
        crumbs.push({ label: "Products", to: "/products" });
        if (route.query.category) {
          crumbs.push({ label: route.query.category, to: null });
        }
      } else if (route.name === "product") {
        crumbs.push({ label: "Products", to: "/products" });
        crumbs.push({ label: route.params.id, to: null });
      } else {
        // 其他頁面用 route.name 自動產生
        crumbs.push({ label: route.name, to: null });
      }

      return crumbs;
    },
  },
};
</script>
