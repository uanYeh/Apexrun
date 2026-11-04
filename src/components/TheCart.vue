<template>
  <div
    class="offcanvas offcanvas-end"
    tabindex="-1"
    id="CartOffcanvas"
    aria-labelledby="CartOffcanvasLabel"
    ref="cartOffcanvas"
  >
    <div class="offcanvas-header">
      <h5 class="offcanvas-title" id="CartOffcanvasLabel">
        Cart ({{ cartStore.carts.length }} items)
      </h5>
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

      <!-- 購物車列表 -->
      <ul v-else class="list-unstyled flex-grow-1 overflow-y-auto">
        <li
          class="cart-item d-flex align-items-center py-3 border-bottom"
          v-for="item in cartStore.carts"
          :key="item.id"
        >
          <!-- 圖片 -->
          <img :src="item.product.imageUrl" :alt="item.product.title" class="cart-item-img me-3" />

          <!-- 商品資訊 -->
          <div class="flex-grow-1">
            <p class="fw-bold mb-1 cart-item-title me-2">{{ item.product.title }}</p>

            <!-- 數量控制 -->
            <div class="d-flex">
              <div>qty：</div>
              <div
                class="d-flex border"
                style="height: 28px"
                :style="loadingId === item.id ? 'pointer-events: none; opacity: 0.5' : ''"
              >
                <button
                  class="btn btn-light rounded-0 px-1 py-0"
                  @click="updateQty(item, item.qty - 1)"
                >
                  <i class="bi bi-dash fs-7"></i>
                </button>
                <input
                  type="number"
                  class="text-center border-0 px-2 fs-7 no-spinner"
                  style="width: 40px"
                  :value="item.qty"
                  min="1"
                  @change="updateQty(item, $event.target.value)"
                />
                <button
                  class="btn btn-light rounded-0 px-1 py-0"
                  @click="updateQty(item, item.qty + 1)"
                >
                  <i class="bi bi-plus fs-7"></i>
                </button>
              </div>
            </div>
          </div>

          <!-- 價格 + 刪除 -->
          <div class="d-flex align-items-center gap-2 ms-3">
            <span class="fw-bold">${{ currency(item.total) }}</span>
            <button
              class="btn-close me-2"
              :disabled="loadingId === item.id"
              @click="removeItem(item)"
            ></button>
          </div>
        </li>
      </ul>

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
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";

export default {
  setup() {
    const cartStore = useCartStore();
    cartStore.getCart();
    return { cartStore };
  },
  data() {
    return {
      loadingId: null, // 正在更新/刪除的購物車項目 id
    };
  },
  methods: {
    currency,
    async updateQty(item, qty) {
      const q = parseInt(qty);
      if (!q || q < 1) return;
      this.loadingId = item.id;
      try {
        await this.cartStore.updateCart(item.id, q, item.product_id);
      } finally {
        this.loadingId = null;
      }
    },
    async removeItem(item) {
      this.loadingId = item.id;
      try {
        await this.cartStore.removeCart(item.id);
      } finally {
        this.loadingId = null;
      }
    },
  },
  mounted() {
    this.$refs.cartOffcanvas.addEventListener("hidden.bs.offcanvas", () => {
      this.cartStore.lastAdded = null;
    });
  },
};
</script>
