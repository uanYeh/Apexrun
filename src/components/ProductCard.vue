<template>
  <div class="card h-100 product-card border-0 rounded-0 position-relative">
    <div class="photo-img">
      <img :src="product.imageUrl" class="card-img-top rounded-0" :alt="product.title" />
    </div>
    <!-- 收藏按鈕 -->
    <button
      type="button"
      class="btn-favorite position-absolute top-0 end-0 m-2 z-2"
      :aria-label="isFavorite(product.id) ? 'Remove from favorites' : 'Add to favorites'"
      @click.prevent.stop="toggleFavorite(product.id)"
    >
      <span class="heart-icon">
        <i
          class="bi heart-icon"
          :class="isFavorite(product.id) ? 'bi-heart-fill is-active' : 'bi-heart'"
        ></i>
      </span>
    </button>
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
        @click.prevent="addCart"
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
import { Offcanvas } from "bootstrap";
import { useCartStore } from "@/stores/cart";
import { useFavoriteStore } from "@/stores/favorite";

export default {
  props: ["product"],
  emits: ["add-cart"],

  computed: {
    ...mapState(useCartStore, ["loadingItem"]),
    ...mapState(useFavoriteStore, ["favorites"]),
    // 這個商品有沒有顏色或尺寸要選
    hasOptions() {
      const { colors, sizes } = this.product;
      return (
        (Array.isArray(colors) && colors.length > 0) || (Array.isArray(sizes) && sizes.length > 0)
      );
    },
  },

  methods: {
    addCart() {
      if (this.loadingItem) return;
      // 有規格：打開購物車面板選規格
      if (this.hasOptions) {
        useCartStore().openQuickAdd(this.product);
        Offcanvas.getOrCreateInstance(document.getElementById("CartOffcanvas")).show();
        return;
      }
      // 沒有規格：直接加入購物車
      this.$emit("add-cart", this.product.id);
    },
    isFavorite(id) {
      return this.favorites.includes(id);
    },
    getProduct(id) {
      this.$router.push(`product/${id}`);
    },
    toggleFavorite(id) {
      useFavoriteStore().toggleFavorite(id);
    },
  },
};
</script>
