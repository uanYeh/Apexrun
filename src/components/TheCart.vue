<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="CartOffcanvas"
    aria-labelledby="CartOffcanvasLabel"
    ref="cartOffcanvas"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="CartOffcanvasLabel">Cart ({{ totalQty }} items)</h5>
      <button
        type="button"
        class="btn-close"
        data-bs-dismiss="offcanvas"
        aria-label="Close"
      ></button>
    </div>
    <hr class="my-0" />

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

      <!-- ✏️ 修改：改用共用的購物車列表（小尺寸） -->
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
import CartItemList from "@/components/CartItemList.vue"; // ✅ 新增
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";

export default {
  components: { CartItemList }, // ✅ 新增
  setup() {
    const cartStore = useCartStore();
    cartStore.getCart();
    return { cartStore };
  },
  computed: {
    // 購物車總件數
    totalQty() {
      return this.cartStore.carts.reduce((sum, item) => sum + item.qty, 0);
    },
  },
  methods: {
    currency,
    // 規格文字（Just added 提示用）
    variantLabel(v) {
      return [v.color, v.size].filter(Boolean).join(" / ");
    },
    // 🗑️ 刪除 updateQty、removeItem：移到 CartItemList 裡了
  },
  mounted() {
    this.$refs.cartOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
      this.cartStore.lastAdded = null;
    });
  },
};
</script>
