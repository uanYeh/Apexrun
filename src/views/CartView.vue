<template>
  <TheHeader />
  <main class="container-xl py-3 my-6">
    <div class="row justify-content-center">
      <div class="stepper col-8 mb-4 px-0 d-flex flex-direction justify-content-between">
        <div class="d-flex align-items-center ps-0 bg-white pe-2">
          <div
            class="cart-number bg-primary text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            1
          </div>
          <p class="mb-0 fs-5 text-primary fw-semibold">Order Detail</p>
        </div>
        <div class="d-flex align-items-center ps-0 bg-white pe-2">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            2
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25">Shipping & Payment</p>
        </div>
        <div class="d-flex align-items-center ps-0 bg-white">
          <div
            class="cart-number bg-secondary bg-opacity-25 text-white my-0 rounded-circle d-flex align-items-center justify-content-center fs-5 fw-light me-2"
          >
            3
          </div>
          <p class="mb-0 fs-5 fw-semibold text-secondary text-opacity-25">Order Confirm</p>
        </div>
      </div>
      <div class="cart-pancel">
        <p class="fs-5 fw-bolder">Cart ({{ cartStore.carts.length }} items)</p>
        <div class="row g-3">
          <ul class="col-12 col-lg-8 list-unstyled">
            <li
              class="cart-item d-flex align-items-center py-3 border-bottom"
              v-for="item in cartStore.carts"
              :key="item.id"
            >
              <!-- 圖片 -->
              <img
                :src="item.product.imageUrl"
                :alt="item.product.title"
                class="cart-item-img me-3"
              />

              <!-- 商品資訊 -->
              <div class="flex-grow-1">
                <p class="fw-bold mb-1 cart-item-title me-2">{{ item.product.title }}</p>

                <!-- 數量控制 -->

                <div
                  class="d-inline-flex border"
                  :style="loadingId === item.id ? 'pointer-events: none; opacity: 0.5' : ''"
                >
                  <button
                    class="btn btn-light rounded-0 px-2"
                    @click="updateQty(item, item.qty - 1)"
                  >
                    <i class="bi bi-dash"></i>
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
                    class="btn btn-light rounded-0 px-2"
                    @click="updateQty(item, item.qty + 1)"
                  >
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>

              <!-- 價格 + 刪除 -->
              <div class="d-flex align-items-center gap-3 ms-3">
                <span class="fw-bold">${{ currency(item.total) }}</span>
                <button
                  class="btn-close"
                  :disabled="loadingId === item.id"
                  @click="removeItem(item)"
                ></button>
              </div>
            </li>
          </ul>
          <div class="col-12 col-lg-4">
            <div class="p-4 bg-light rounded-0">
              <h5 class="fw-bold mb-3">Order Summary</h5>
              <hr />

              <!-- Subtotal & Shipping -->
              <div class="d-flex justify-content-between mb-2">
                <span class="fw-bold">Subtotal</span>
                <span>${{ currency(cartStore.total) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Shipping</span>
                <span>Free</span>
              </div>

              <!-- Promo Code -->
              <p class="fw-bold mb-2">Promo Code</p>
              <div class="input-group mb-2">
                <input
                  type="text"
                  class="form-control rounded-0"
                  placeholder="promo code"
                  v-model="couponCode"
                  :disabled="couponSuccess"
                />
                <button
                  class="btn btn-secondary rounded-0"
                  @click="applyCoupon"
                  :disabled="couponSuccess"
                >
                  Apply
                </button>
                <button
                  v-if="couponSuccess"
                  class="btn btn-outline-secondary rounded-0"
                  @click="removeCoupon"
                >
                  Remove
                </button>
              </div>
              <p
                v-if="couponMsg"
                :class="couponSuccess ? 'text-success' : 'text-danger'"
                class="fs-7 mb-3"
              >
                {{ couponMsg }}
              </p>

              <hr />

              <!-- Order Total -->
              <div v-if="couponSuccess" class="d-flex justify-content-between mb-2 text-success">
                <span>Discount ({{ discountPercent }}% off)</span>
                <span>-${{ currency(discountAmount) }}</span>
              </div>
              <div class="d-flex justify-content-between mb-3">
                <span class="fw-bold">Order Total</span>
                <span class="fw-bold">${{ currency(cartStore.finalTotal) }}</span>
              </div>

              <!-- Checkout -->
              <button
                class="btn w-100 text-white rounded-0 bg-primary py-3"
                @click="$router.push('/checkout')"
              >
                Checkout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
  <TheFooter />
</template>

<script>
import TheHeader from "@/components/TheHeader.vue";
import TheFooter from "@/components/TheFooter.vue";
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";

export default {
  components: { TheHeader, TheFooter },
  setup() {
    const cartStore = useCartStore();
    cartStore.getCart();
    return { cartStore };
  },
  data() {
    return {
      couponCode: "",
      couponMsg: "",
      couponSuccess: false,
      loadingId: null,
    };
  },
  watch: {
    "cartStore.finalTotal"(val) {
      if (val < this.cartStore.total) {
        this.couponSuccess = true;
        this.couponCode = localStorage.getItem("couponCode") || "";
        this.couponMsg = this.couponCode
          ? `Promo code applied: ${this.couponCode}`
          : "Promo code applied";
      }
    },
  },
  methods: {
    currency,
    applyCoupon() {
      if (!this.couponCode.trim()) {
        this.couponMsg = "Please enter a promo code";
        this.couponSuccess = false;
        return;
      }
      this.cartStore.applyCoupon(this.couponCode).then((res) => {
        this.couponMsg = res.message;
        this.couponSuccess = res.success;
        if (res.success) {
          localStorage.setItem("couponCode", this.couponCode);
        }
      });
    },
    removeCoupon() {
      this.couponCode = "";
      this.couponMsg = "";
      this.couponSuccess = false;
      localStorage.removeItem("couponCode");
      this.cartStore.finalTotal = this.cartStore.total;
    },
    async updateQty(item, qty) {
      const q = parseInt(qty);
      if (!q || q < 1) return;
      this.loadingId = item.id;
      await this.cartStore.updateCart(item.id, q, item.product_id);
      this.loadingId = null;
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
  computed: {
    discountAmount() {
      return this.cartStore.total - this.cartStore.finalTotal;
    },
    discountPercent() {
      if (!this.cartStore.total) return 0;
      return Math.round((1 - this.cartStore.finalTotal / this.cartStore.total) * 100);
    },
  },
};
</script>
