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
        <p class="fs-5 fw-bolder">Cart ({{ totalQty }} items)</p>
        <div class="row g-3">
          <!-- ✏️ 修改：改用共用的購物車列表 -->
          <CartItemList class="col-12 col-lg-8" />

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
import CartItemList from "@/components/CartItemList.vue"; // ✅ 新增
import { useCartStore } from "@/stores/cart";
import { currency } from "@/methods/filters";

export default {
  components: { TheHeader, TheFooter, CartItemList }, // ✏️ 修改：加上 CartItemList
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
      // 🗑️ 刪除 loadingKey：移到 CartItemList 裡了
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
    // 🗑️ 刪除 variantLabel、updateQty、removeItem：移到 CartItemList 裡了
  },
  computed: {
    // 購物車總件數
    totalQty() {
      return this.cartStore.carts.reduce((sum, item) => sum + item.qty, 0);
    },
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
