<!-- TheBreadcrumb.vue -->
<template>
  <ul class="list-unstyled d-flex fs-6 overflow-hidden flex-nowrap">
    <li class="px-2 flex-shrink-0">
      <RouterLink class="link-dark text-decoration-none fw-semibold" to="/">Home</RouterLink>
    </li>
    <template v-for="(crumb, index) in crumbs" :key="index">
      <span class="flex-shrink-0">/</span>
      <li class="px-2 breadcrumb-item-last">
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
  props: {
    productTitle: {
      type: String,
      default: "",
    },
  },
  computed: {
    crumbs() {
      const route = this.$route;
      const crumbs = [];

      if (route.name === "Products") {
        crumbs.push({ label: "Products", to: "/products" });
        if (route.query.category) {
          crumbs.push({ label: route.query.category, to: null });
        }
      } else if (route.name === "Product") {
        crumbs.push({ label: "Products", to: "/products" });
        crumbs.push({ label: this.productTitle || route.params.id, to: null });
      } else {
        crumbs.push({ label: route.name, to: null });
      }

      return crumbs;
    },
  },
};
</script>
