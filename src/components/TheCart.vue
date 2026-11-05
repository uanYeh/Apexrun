<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="CartOffcanvas"
    aria-labelledby="CartOffcanvasLabel"
    ref="cartOffcanvas"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="CartOffcanvasLabel">Cart ({{ cartStore.totalQty }} items)</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <hr class="my-0" />

    <!-- 選規格（從商品卡片加入有規格的商品時出現） -->
    <CartQuickAdd />

    <!-- Just Added 提示 -->
    <div v-if="cartStore.lastAdded" class="bg-light px-3 py-3 border-bottom">
      <div class="d-flex align-items-center gap-2 mb-2">
        <i class="bi bi-check-circle-fill text-success fs-4"></i>
        <p class="mb-0 fw-bold fs-5">Just added to your cart</p>
      </div>
      <div class="d-flex align-items-center gap-3">
        <img :src="cartStore.lastAdded.imageUrl" class="cart-item-img" />
        <div class="flex-grow-1 overflow-hidden">
          <p class="fw-bold mb-1 cart-item-title">{{ cartStore.lastAdded.title }}</p>
          <p v-if="variantLabel(cartStore.lastAdded)" class="mb-0 fs-7 text-muted">
            {{ variantLabel(cartStore.lastAdded) }}
          </p>
          <p class="mb-0 fs-7 text-muted">qty: {{ cartStore.lastAdded.qty }}</p>
        </div>
        <span class="fw-bold">${{ currency(cartStore.lastAdded.total) }}</span>
      </div>
    </div>

    <div class="offcanvas-body d-flex flex-column" style="overflow: hidden">
      <!-- 空購物車 -->
      <div v-if="cartStore.carts.length === 0" class="text-center text-muted mt-5">
        <i class="bi bi-cart fs-1"></i>
        <p class="mt-2">Your cart is empty</p>
      </div>

      <!-- 購物車列表（小尺寸） -->
      <CartItemList v-else size="sm" class="flex-grow-1 overflow-y-auto" />

      <!-- 總計 + 按鈕 -->
      <div v-if="cartStore.carts.length > 0" class="mt-auto flex-shrink-0">
        <hr />
        <div class="d-flex justify-content-between mb-3">
          <span class="fw-bold">Total</span>
          <span class="fw-bold">${{ currency(cartStore.total) }}</span>
        </div>
        <div class="d-flex gap-2">
          <button class="btn btn-outline-primary w-50 rounded-0 py-3" data-bs-dismiss="offcanvas">
            Keep Shopping
          </button>
          <RouterLink
            to="/cart"
            class="btn btn-primary w-50 rounded-0 py-3"
            data-bs-dismiss="offcanvas"
            @click.prevent="$router.push('/cart')"
          >
            View Cart
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartItemList from "@/components/CartItemList.vue";
import CartQuickAdd from "@/components/CartQuickAdd.vue";
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";
import { Offcanvas } from "bootstrap";

export default {
  components: { CartItemList, CartQuickAdd },
  setup() {
    const cartStore = useCartStore();
    cartStore.getCart();
    return { cartStore };
  },
  watch: {
    // 換頁時（例如點商品回到詳細頁），關掉購物車面板
    $route() {
      const offcanvas = Offcanvas.getInstance(this.$refs.cartOffcanvas);
      if (offcanvas) offcanvas.hide();
    },
  },
  methods: {
    currency,
    // 規格文字（Just added 提示用）
    variantLabel(v) {
      return [v.color, v.size].filter(Boolean).join(" / ");
    },
  },
  mounted() {
    // 關掉購物車面板時，清掉 Just added 和選規格區
    this.$refs.cartOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
      this.cartStore.lastAdded = null;
      this.cartStore.closeQuickAdd();
    });
  },
};
</script>
