<template>
  <div class="card h-100 product-card border-0 rounded-0 position-relative">
    <div class="photo-img">
      <img :src="product.imageUrl" class="card-img-top rounded-0" :alt="product.title" />
    </div>
    <p
      v-if="product.origin_price > product.price"
      class="position-absolute bg-warning px-2 py-0 mt-1 text-uppercase fw-semibold"
    >
      sale
    </p>
    <div class="card-body p-1 pt-2 pb-4">
      <p class="mb-2 fs-5 fw-medium">
        ${{ product.price }}
        <span
          v-if="product.origin_price !== product.price"
          class="fs-6 text-light-emphasis text-decoration-line-through"
          >${{ product.origin_price }}</span
        >
      </p>
      <p class="card-text mb-2 fs-6 fw-medium content-truncate">{{ product.content }}</p>
      <p class="card-brands mb-2 fs-7 fw-semibold">{{ product.category }}</p>
      <a
        class="icon-cart"
        :class="{ 'is-loading': loadingItem === product.id }"
        href="#CartOffcanvas"
        role="button"
        aria-controls="CartOffcanvas"
        :style="{ cursor: loadingItem === product.id ? 'wait' : 'pointer' }"
        :aria-disabled="loadingItem === product.id"
        @click.prevent="addCart(product.id)"
      >
        <span
          v-if="loadingItem === product.id"
          class="spinner-border text-light"
          style="width: 1.5rem; height: 1.5rem; border-width: 0.2em"
          role="status"
        >
          <span class="visually-hidden">Loading...</span>
        </span>
        <i v-else class="bi bi-cart-plus-fill fs-4"></i>
        <span class="d-block d-md-none">add to cart</span>
      </a>
      <RouterLink :to="`/products/${product.id}`" class="stretched-link z-1"></RouterLink>
    </div>
  </div>
</template>

<script>
import { mapState } from "pinia";
import { useCartStore } from "@/stores/cart";

export default {
  props: ["product"],
  emits: ["add-cart"],

  computed: {
    ...mapState(useCartStore, ["loadingItem"]),
  },

  methods: {
    addCart(id) {
      if (this.loadingItem) return;
      this.$emit("add-cart", id);
    },
    getProduct(id) {
      this.$router.push(`product/${id}`);
    },
  },
};
</script>
