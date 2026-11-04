<template>
  <div class="cart-num">
    <a href="#" class="position-relative mx-3" aria-label="Open cart" @click.prevent="openCart">
      <i class="bi bi-bag fs-4 text-dark"></i>
      <span
        v-if="totalQty"
        class="position-absolute translate-middle badge rounded-pill bg-danger d-flex justify-content-center align-items-center text-white fw-bolder"
      >
        {{ totalQty }}
      </span>
    </a>
  </div>
</template>

<script>
import { Offcanvas } from "bootstrap";
import { useCartStore } from "@/stores/cart";

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  computed: {
    // 購物車總件數（所有規格的數量加總）
    totalQty() {
      return this.cartStore.carts.reduce((sum, item) => sum + item.qty, 0);
    },
  },
  methods: {
    openCart() {
      const el = document.getElementById("CartOffcanvas");
      const offcanvas = Offcanvas.getOrCreateInstance(el);
      offcanvas.show();
    },
  },
};
</script>
