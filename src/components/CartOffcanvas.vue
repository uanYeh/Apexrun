<template>
  <div class="cart-num">
    <a href="#" class="position-relative mx-3" @click.prevent="openCart">
      <i class="bi bi-bag fs-4 text-dark"></i>
      <span
        v-if="cartStore.carts.length"
        class="position-absolute translate-middle badge rounded-pill bg-danger d-flex justify-content-center align-items-center text-white fw-bolder"
      >
        {{ cartStore.carts.length }}
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
  methods: {
    openCart() {
      const el = document.getElementById("CartOffcanvas");
      const offcanvas = Offcanvas.getOrCreateInstance(el);
      offcanvas.show();
    },
  },
};
</script>
